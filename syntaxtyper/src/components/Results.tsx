import React from "react";
import WPM from "./WPM.tsx";
import Accuracy from "./Accuracy.tsx";

interface ResultsProps {
    time: number;
    charCount: number;
    errors:number;
    snippet:string;
    onRetrySame?: () => void;
    onNewChallenge?: () => void;
    isCompleted: boolean;
}

const Results:React.FC<ResultsProps> = ({time, charCount, errors, snippet, onRetrySame, onNewChallenge}) => {
//     EXECUTION RESULTS TO BE ADDED HERE
    const executeSnippet = (code: string) => {
        if(code.includes("return")) return "Output: 42";
        return "no output available";
    };

    return(
        <div className = "bg-white p-6 rounded-lg shadow-lg max-w-xl text-center border">
            <h2 className = "text-2xl font-bold mb-2">Typing Test Complete!</h2>
            <p className = "text-xl mb-4">Results:</p>

            <div className = "flex justify-center space-x-6 mt-4">
                <div className="text-xl font-bold">Time: {time}s</div>
                <WPM time={time} charCount={charCount}/>
                <Accuracy correctChars={charCount - errors} totalChars={charCount}/>
            </div>

            <div className = "mt-6 bg-gray-100 p-4 rounded-md text-left font-mono">
                <h3 className="text-lg font-semibold">Code Execution result:</h3>
                <pre className = "text-sm text-gray-700">{executeSnippet(snippet)}</pre>
            </div>
            {(onRetrySame || onNewChallenge) && (
                <div className="flex justify-center space-x-4 mt-6">
                    {onRetrySame && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={onRetrySame}
                        >
                            Try Again (Same)
                        </button>
                    )}
                    {onNewChallenge && (
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={onNewChallenge}
                        >
                            New Challenge
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Results