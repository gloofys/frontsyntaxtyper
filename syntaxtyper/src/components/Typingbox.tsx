import React, { useState, useEffect, useRef } from "react";
import { fetchSnippet } from "../api/snippets";
import Results from "./Results.tsx";

interface TypingProps {
    selectedLanguage: string;
    providedSnippet?: string;
    disableResults?: boolean;
}
const TypingBox: React.FC<TypingProps> = ({selectedLanguage, providedSnippet, disableResults = false}) => {
    const [snippet, setSnippet] = useState("");
    const [input, setInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState<number[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (providedSnippet) {
            setSnippet(providedSnippet);
            setInput("");
            setCurrentIndex(0);
            setErrors([]);
            setIsCompleted(false);
            setIsRunning(false);
            setTime(0);
        } else if (selectedLanguage) {
            loadNewSnippet();
        }
    }, [selectedLanguage, providedSnippet]);


    useEffect(() => {
        let interval: number | undefined;
        if (isRunning) {
            interval = window.setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval !== undefined) clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if (snippet && currentIndex >= snippet.length) {
            setIsRunning(false);
            setIsCompleted(true);
            setCurrentIndex(snippet.length);
        }
    }, [currentIndex, snippet]);

    const loadNewSnippet = async () => {
        const data = await fetchSnippet(selectedLanguage);
        if (data) {
            setSnippet(data.text);
            setInput("");
            setCurrentIndex(0);
            setErrors([]);
            setIsCompleted(false);
            setIsRunning(false);
            setTime(0);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!snippet || isCompleted) return;

        if (!isRunning) setIsRunning(true);

        const expectedChar = snippet[currentIndex];

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
            const expectedSpaces = snippet.slice(currentIndex, currentIndex + spaceCount);
            if (expectedSpaces === "    ") {
                setCurrentIndex((prev) => prev + spaceCount);
            } else {
                setErrors((prev) => [
                    ...prev,
                    ...Array.from(Array(spaceCount).keys()).map((i) => currentIndex + i),
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

            setErrors((prev) => prev.filter((idx) => idx !== newIndex));

            // if it wasn't a newline, also remove from `input`
            if (snippet[newIndex] !== "\n") {
                setInput((prev) => prev.slice(0, -1));
            }

            setIsCompleted(false);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const resetStateWithSnippet = (newSnippet: string) => {
        setSnippet(newSnippet);
        setInput("");
        setCurrentIndex(0);
        setErrors([]);
        setIsCompleted(false);
        setIsRunning(false);
        setTime(0);
    };

    const handleRetrySame = () => {
        resetStateWithSnippet(snippet);
    };

    const handleNewChallenge = async () => {
        const data = await fetchSnippet(selectedLanguage);
        if (data) resetStateWithSnippet(data.text);
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">

            {!isCompleted ? (
                <>
          <pre
              className="bg-gray-100 p-4 rounded-md text-lg font-mono mb-4  w-full max-w-4xl leading-relaxed whitespace-pre-wrap"
              onClick={() => inputRef.current?.focus()}
          >
            {snippet.split("").map((char, index) => {
                let textColor = "text-black";
                if (index < currentIndex) {
                    textColor = errors.includes(index)
                        ? "text-red-500 bg-red-200"
                        : "text-green-500 bg-green-100";
                } else if (index === currentIndex) {
                    textColor = "text-blue-500";
                }

                return (
                    <span key={index} className={`letter relative ${textColor}`}>
                  {char === " " ? "\u00A0" : char === "\n" ? (
                      <span className={`relative ${textColor}`}>
                      ⏎
                          {index === currentIndex && (
                              <span className="cursor-line absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 animate-blink"></span>
                          )}
                          <br />
                    </span>
                  ) : (
                      char
                  )}
                        {index === currentIndex && char !== "\n" && (
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
                    snippet={snippet}
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

export default TypingBox;
