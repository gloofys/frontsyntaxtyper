import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import TypingBox from "../components/Typingbox.tsx";
import {fetchLesson} from "../api/lessons.ts";
import {useLessonStore} from "../context/LessonContext"
import Quiz from "../components/Quiz.tsx";
import TypingBoxWithBlanks from "../components/TypingBoxWithBlanks.tsx";
import { ExplanationPanel} from "../components/ExplanationPanel.tsx";
import Progress from "../components/Progress.tsx";


interface StepData {
    title: string;
    description: string;
    bullets?: string[];
    outro?: string;
    type?: string;
    questions?: QuizQuestion[];
    codeSnippet?: string;
    blankLines?: number[];
    exampleKey?: string;
    codeLines?: string[];
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
}


interface LessonData {
    steps: StepData[];
}

const LessonDetail: React.FC = () => {
    const {language, lessonId} = useParams<{ language: string; lessonId: string }>();
    const navigate = useNavigate();
    const selectedLanguage = language || "react";
    const lessonNumber = Number(lessonId);

    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {fetchLessons, totalLessons} = useLessonStore();

    useEffect(() => {
        async function fetchLessonData() {
            if (!lessonId) return;
            try {
                setLoading(true);
                const data = await fetchLesson(selectedLanguage, lessonId);
                if (!data) {
                    throw new Error("Failed to fetch lesson data");
                }
                setLessonData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLessonData();
    }, [selectedLanguage, lessonId])

    useEffect(() => {
        fetchLessons(selectedLanguage);
    }, [selectedLanguage]);

    const handleNext = () => {
        if (!lessonData) return;
        if (currentStep < lessonData.steps.length) {
            setCurrentStep((prev) => prev + 1);
        } else {
            navigate("/congratulations", {
                state: {
                    lessonNumber,
                    language: selectedLanguage,
                    totalLessons,
                },
            });
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const renderStepContent = () => {
        if (!lessonData) return null;
        const step = lessonData.steps[currentStep - 1];
        if (!step) {
            return <div>No content available for this step.</div>;
        }

        if (step.type === "typingChallenge") {
            return (
                <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2">{step.description}</p>
                    <TypingBox
                        selectedLanguage={selectedLanguage}
                        providedSnippet={step.codeSnippet}
                        disableResults={true}
                    />
                </div>
            );
        }

        if (step.type === "typingChallengeWithBlanks" && step.codeLines && step.blankLines) {
            return (
                <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2">{step.description}</p>
                    <TypingBoxWithBlanks
                        codeLines={step.codeLines}
                        blankLines={step.blankLines}
                        disableResults={true}
                    />
                </div>
            );
        }

        if (step.type === "quiz" && step.questions) {
            return (
                <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 mb-4">{step.description}</p>
                    <Quiz questions={step.questions} onComplete={handleNext} />
                </div>
            );
        }

        if (step.type === "explanation") {
            return (
                <ExplanationPanel
                    markdown={step.description!}
                    code={step.codeSnippet!}
                    exampleKey={step.exampleKey}
                />
            );
        }

        if (step.bullets) {
            return (
                <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    {step.description && (
                        <p className="mt-2">{step.description}</p>
                    )}
                    <ul className="list-disc list-inside mt-4 mb-4 space-y-1">
                        {step.bullets.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    {step.outro && <p className="mt-2">{step.outro}</p>}
                </div>
            );
        }

        return (
            <div>
                <h3 className="text-2xl px-6 font-bold">{step.title}</h3>
                <p className="mt-2 px-6 text-xl">{step.description}</p>
            </div>
        );
    };

    if (loading) {
        return <div>Loading lesson...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!lessonData) {
        return <div>No lesson data available.</div>;
    }

    const step = lessonData?.steps[currentStep - 1];

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="flex flex-col h-[90vh] border rounded-md bg-white overflow-hidden">
                <header className="p-4 border-b">
                    <h2 className="text-2xl font-bold">
                        {selectedLanguage.toUpperCase()} Lesson {lessonNumber}
                    </h2>
                    <p className="text-gray-600">
                        Step {currentStep} of {lessonData!.steps.length}
                    </p>
                    <Progress
                        value={currentStep}
                        max={lessonData!.steps.length}
                        showPercentage
                        heightClass="h-2"
                    />
                </header>

                <main
                    className={[
                        "flex-1",
                        "overflow-y-auto",
                        "p-4",
                        !["explanation", "typingChallenge", "typingChallengeWithBlanks"].includes(step?.type ?? "")
                        && "grid place-content-center",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {renderStepContent()}
                </main>

                <footer className="p-4 border-t flex justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        {currentStep === lessonData!.steps.length ? "Finish" : "Next"}
                    </button>
                </footer>
            </div>
        </div>

    );
};
export default LessonDetail;
