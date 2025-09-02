// src/pages/LessonDetail.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TypingBox from "../components/Typingbox.tsx";
import TypingBoxWithBlanks from "../components/TypingBoxWithBlanks.tsx";
import Quiz from "../components/Quiz.tsx";
import { ExplanationPanel } from "../components/ExplanationPanel.tsx";
import Progress from "../components/Progress.tsx";

import { useLessonStore } from "../context/LessonContext";
import { useIndustry } from "../context/IndustryContext";

import { pickByIndustry } from "../utils/industry";
import type { Lesson, Step, Industry } from "../data/lessons/Lesson";

// ⬇️ make sure these exist as discussed
import { overridesRegistry } from "../data/lessons/_overrides";
import { applyOverrides } from "../data/lessons/_utils/composeLesson";

const LessonDetail: React.FC = () => {
    const { language, lessonId } = useParams<{ language: string; lessonId: string }>();
    const selectedLanguage = language?.toLowerCase() || "react";
    const lessonNumber = Number(lessonId);
    const navigate = useNavigate();

    const { fetchLessons, getLessonById, getLessonsByLanguage } = useLessonStore();
    const { industry } = useIndustry();

    const [lessonData, setLessonData] = useState<Lesson | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load the base lesson (once per language/lessonId)
    useEffect(() => {
        const loadLesson = async () => {
            try {
                setLoading(true);
                setError("");
                await fetchLessons(selectedLanguage);
                const full = getLessonById(selectedLanguage, lessonNumber);
                if (!full) throw new Error("Lesson not found");
                setLessonData(full);
            } catch (e: any) {
                setError(e?.message ?? "Failed to load lesson");
            } finally {
                setLoading(false);
            }
        };
        loadLesson();
    }, [selectedLanguage, lessonNumber, fetchLessons, getLessonById]);

    // 1) Select per-lesson overrides based on industry
    const resolvedLesson = useMemo(() => {
        if (!lessonData) return null;
        const key = `${selectedLanguage}:${lessonNumber}`; // e.g. "react:4"
        const perLesson = overridesRegistry[key];
        const ov =
            industry === "finance"
                ? perLesson?.finance
                : industry === "construction"
                    ? perLesson?.construction
                    : perLesson?.general; // can be undefined

        return applyOverrides(lessonData, ov);
        // lessonData is the base; ov is partial lesson overrides
    }, [lessonData, selectedLanguage, lessonNumber, industry]);

    // 2) (Optional) Resolve any remaining per-field ...ByIndustry in the selected step
    const resolvedStep = useMemo(() => {
        if (!resolvedLesson) return undefined;
        const base = resolvedLesson.steps[currentStep - 1];
        if (!base) return undefined;

        const resolve = <T,>(baseVal: T | undefined, map: any, ind: Industry) =>
            pickByIndustry<T>(baseVal, map, ind);

        return {
            ...base,
            description: resolve(base.description, (base as any).descriptionByIndustry, industry),
            bullets: resolve(base.bullets, (base as any).bulletsByIndustry, industry) ?? base.bullets,
            questions: resolve(base.questions, (base as any).questionsByIndustry, industry) ?? base.questions,
            codeSnippet: resolve(base.codeSnippet, (base as any).codeSnippetByIndustry, industry),
            codeLines: resolve(base.codeLines, (base as any).codeLinesByIndustry, industry) ?? base.codeLines,
        } as Step;
    }, [resolvedLesson, currentStep, industry]);

    const totalSteps = resolvedLesson?.steps.length ?? 0;

    const handleNext = () => {
        if (!resolvedLesson) return;
        if (currentStep < totalSteps) setCurrentStep((p) => p + 1);
        else {
            navigate("/congratulations", {
                state: {
                    lessonNumber,
                    language: selectedLanguage,
                    totalLessons: getLessonsByLanguage(selectedLanguage).length,
                },
            });
        }
    };

    const handlePrev = () => currentStep > 1 && setCurrentStep((p) => p - 1);

    if (loading) return <div>Loading lesson...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!resolvedLesson || totalSteps === 0) return <div>No lesson data available.</div>;
    if (!resolvedStep) return <div>Step not found for this lesson.</div>;

    const renderStepContent = (step: Step) => {
        switch (step.type) {
            case "typingChallenge":
                return (
                    <div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="mt-2">{step.description}</p>
                        <TypingBox
                            selectedLanguage={selectedLanguage}
                            providedSnippet={step.codeSnippet}
                            disableResults
                        />
                    </div>
                );
            case "typingChallengeWithBlanks":
                return (
                    <div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="mt-2">{step.description}</p>
                        <TypingBoxWithBlanks
                            codeLines={step.codeLines || []}
                            blankLines={step.blankLines || []}
                            disableResults
                        />
                    </div>
                );
            case "quiz":
                return (
                    <div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="mt-2 mb-4">{step.description}</p>
                        <Quiz questions={step.questions || []} onComplete={handleNext} />
                    </div>
                );
            case "explanation":
                return (
                    <ExplanationPanel
                        markdown={step.description}
                        code={step.codeSnippet}
                        exampleKey={step.exampleKey}
                    />
                );
            default:
                return (
                    <div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        {step.description && <p className="mt-2">{step.description}</p>}
                        {step.bullets && (
                            <ul className="list-disc list-inside mt-4 mb-4 space-y-1">
                                {step.bullets.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        )}
                        {step.outro && <p className="mt-2">{step.outro}</p>}
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="flex flex-col h-[90vh] border rounded-md bg-white overflow-hidden">
                <header className="p-4 border-b">
                    <h2 className="text-2xl font-bold">
                        {selectedLanguage.toUpperCase()} Lesson {lessonNumber}
                    </h2>
                    <p className="text-gray-600">
                        Step {currentStep} of {totalSteps}
                    </p>
                    <Progress value={currentStep} max={totalSteps} showPercentage heightClass="h-2" />
                </header>

                <main
                    className={[
                        "flex-1","overflow-y-auto","p-4",
                        !["explanation","typingChallenge","typingChallengeWithBlanks"].includes(resolvedStep?.type ?? "") &&
                        "grid place-content-center",
                    ].filter(Boolean).join(" ")}
                >
                    {renderStepContent(resolvedStep)}
                </main>

                <footer className="p-4 border-t flex justify-between">
                    <button onClick={handlePrev} disabled={currentStep === 1} className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50">
                        Previous
                    </button>
                    <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        {currentStep === totalSteps ? "Finish" : "Next"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default LessonDetail;
