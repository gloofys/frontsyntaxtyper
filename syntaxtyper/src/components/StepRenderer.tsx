import React, { useMemo, useState } from "react";
import PreviewRunner from "./PreviewRunner";
import type { Step } from "../types";


export default function StepRenderer({ step }: { step: Step }) {
    if ((step as any).type === "typingChallenge") return <TypingChallenge step={step as any} />;
    if ((step as any).type === "explanation") return <Explanation step={step as any} />;
    if ((step as any).type === "quiz") return <Quiz step={step as any} />;
    if ((step as any).type === "typingChallengeWithBlanks") return <Blanks step={step as any} />;
// default text block (intro/summary)
    return (
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{(step as any).description}</div>
    );
}


function TypingChallenge({ step }: { step: { title: string; description: string; codeSnippet: string; tests?: string } }) {
    const [code, setCode] = useState(step.codeSnippet);
    return (
        <div>
            <p style={{ whiteSpace: "pre-wrap" }}>{step.description}</p>
            <textarea value={code} onChange={(e) => setCode(e.target.value)}
                      style={{ width: "100%", height: 140, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, padding: 8, margin: "12px 0" }} />
            <PreviewRunner mode="console" userCode={code} tests={step.tests} />
            <div style={{ marginTop: 8 }}>
                <button onClick={() => setCode(step.codeSnippet)} style={{ padding: "6px 10px" }}>Reset code</button>
            </div>
        </div>
    );
}

function Explanation({ step }: { step: { description: string } }) {
    return <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{step.description}</div>;
}


function Quiz({ step }: { step: { description: string; questions: { question: string; options: string[]; correctIndex: number }[] } }) {
    const [answers, setAnswers] = useState<number[]>(Array(step.questions.length).fill(-1));
    const score = useMemo(() => answers.reduce((s, a, i) => s + (a === step.questions[i].correctIndex ? 1 : 0), 0), [answers, step.questions]);


    return (
        <div>
            <p>{step.description}</p>
            {step.questions.map((q, qi) => (
                <div key={qi} style={{ margin: "12px 0" }}>
                    <div style={{ fontWeight: 600 }}>{q.question}</div>
                    {q.options.map((opt, oi) => (
                        <label key={oi} style={{ display: "block", marginTop: 6 }}>
                            <input
                                type="radio"
                                name={`q${qi}`}
                                checked={answers[qi] === oi}
                                onChange={() => setAnswers((prev) => { const next = [...prev]; next[qi] = oi; return next; })}
                            />
                            <span style={{ marginLeft: 8 }}>
{opt}
                                {answers[qi] !== -1 && oi === q.correctIndex && <span style={{ color: "#22c55e", marginLeft: 6 }}>(correct)</span>}
</span>
                        </label>
                    ))}
                </div>
            ))}
            <div style={{ marginTop: 8, fontWeight: 600 }}>Score: {score} / {step.questions.length}</div>
        </div>
    );
}

function Blanks({ step }: { step: { description: string; codeLines: string[]; blankLines: number[] } }) {
    const [fills, setFills] = useState<Record<number, string>>({});
    const finalCode = useMemo(() => {
        return step.codeLines.map((line, i) => (step.blankLines.includes(i) ? (fills[i] ?? "") : line)).join("\n");
    }, [fills, step.codeLines, step.blankLines]);


    return (
        <div>
            <p style={{ whiteSpace: "pre-wrap" }}>{step.description}</p>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                {step.codeLines.map((line, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr" }}>
                        <div style={{ background: "#f7f7f7", borderRight: "1px solid #eee", padding: "6px 8px", textAlign: "right", color: "#888" }}>{i + 1}</div>
                        <div style={{ padding: "6px 8px" }}>
                            {step.blankLines.includes(i) ? (
                                <input
                                    value={fills[i] ?? ""}
                                    onChange={(e) => setFills((p) => ({ ...p, [i]: e.target.value }))}
                                    placeholder={"/* type this line */"}
                                    style={{ width: "100%", fontFamily: "inherit", fontSize: 14 }}
                                />
                            ) : (
                                <pre style={{ margin: 0 }}>{line}</pre>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 12 }}>
                <PreviewRunner mode="console" userCode={finalCode} />
            </div>
        </div>
    );
}