import React, { useState, useEffect, useRef } from "react";
import Results from "./Results.tsx";

interface TypingBoxWithBlanksProps {
    codeLines: string[];
    blankLines: number[];
    disableResults?: boolean;
}

const TypingBoxWithBlanks: React.FC<TypingBoxWithBlanksProps> = ({
                                                                     codeLines,
                                                                     blankLines,
                                                                     disableResults = false,
                                                                 }) => {
    const [input, setInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState<number[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [time, setTime] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const fullSnippet = codeLines.join("\n");

    useEffect(() => {
        let interval: number | undefined;
        if (!isCompleted) {
            interval = window.setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval !== undefined) clearInterval(interval);
        };
    }, [isCompleted]);

    useEffect(() => {
        if (currentIndex >= fullSnippet.length) {
            setIsCompleted(true);
        }
    }, [currentIndex, fullSnippet]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const getLineClass = (lineIndex: number): string => {
        return blankLines.includes(lineIndex)
            ? "text-transparent bg-blue-100 select-none"
            : "text-gray-700";
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!fullSnippet || isCompleted) return;

        const expectedChar = fullSnippet[currentIndex];

        if (e.key === "Enter") {
            e.preventDefault();
            if (expectedChar === "\n") {
                setCurrentIndex((prev) => prev + 1);
            } else {
                setErrors((prev) => [...prev, currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }
            return;
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const spaceCount = 4;
            const expectedSpaces = fullSnippet.slice(currentIndex, currentIndex + spaceCount);
            if (expectedSpaces === "    ") {
                setCurrentIndex((prev) => prev + spaceCount);
            } else {
                setErrors((prev) => [
                    ...prev,
                    ...Array.from({ length: spaceCount }, (_, i) => currentIndex + i),
                ]);
                setCurrentIndex((prev) => prev + spaceCount);
            }
            return;
        }

        if (e.key.length === 1) {
            if (e.key === expectedChar) {
                setInput((prev) => prev + e.key);
            } else {
                setErrors((prev) => [...prev, currentIndex]);
            }
            setCurrentIndex((prev) => prev + 1);
            return;
        }

        if (e.key === "Backspace" && currentIndex > 0) {
            e.preventDefault();
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setErrors((arr) => arr.filter((idx) => idx !== newIndex));
            if (fullSnippet[newIndex] !== "\n") {
                setInput((s) => s.slice(0, -1));
            }
            setIsCompleted(false);
            return;
        }
    };

    const resetState = () => {
        setInput("");
        setCurrentIndex(0);
        setErrors([]);
        setIsCompleted(false);
        setTime(0);
        inputRef.current?.focus();
    };

    const handleRetrySame = () => {
        resetState();
    };

    const handleNewChallenge = () => {
        // You can optionally implement fetching a new challenge if needed.
        resetState(); // for now just reset current
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            {!isCompleted ? (
                <>
                    <pre
                        className="bg-gray-100 p-4 rounded-md text-lg font-mono mb-4 w-full max-w-4xl leading-relaxed whitespace-pre-wrap"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {fullSnippet.split("").map((char, index) => {
                            const lineIndex = fullSnippet.slice(0, index).split("\n").length - 1;
                            let textClass = getLineClass(lineIndex);

                            if (index < currentIndex) {
                                textClass = errors.includes(index)
                                    ? "text-red-500 bg-red-200"
                                    : "text-green-500 bg-green-100";
                            } else if (index === currentIndex) {
                                textClass = "text-blue-500";
                            }

                            return (
                                <span key={index} className={`letter relative ${textClass}`}>
                                    {char === " " ? "\u00A0" : char === "\n" ? (
                                        <>
                                            <span className={textClass}>⏎</span>
                                            <br />
                                        </>
                                    ) : (
                                        char
                                    )}
                                    {index === currentIndex && (
                                        <span className="cursor-line absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 animate-blink"></span>
                                    )}
                                </span>
                            );
                        })}
                    </pre>

                    <input
                        ref={inputRef}
                        type="text"
                        className="opacity-0 absolute"
                        value={input}
                        onKeyDown={handleKeyPress}
                        readOnly
                    />
                </>
            ) : (
                <Results
                    time={time}
                    charCount={currentIndex}
                    errors={errors.length}
                    snippet={fullSnippet}
                    isCompleted={isCompleted}
                    {...(!disableResults && {
                        onRetrySame: handleRetrySame,
                        onNewChallenge: handleNewChallenge
                    })}
                />
            )}
        </div>
    );
};

export default TypingBoxWithBlanks;
