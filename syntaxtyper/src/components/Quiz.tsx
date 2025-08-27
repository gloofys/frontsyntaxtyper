import {useState} from "react";

interface QuizQuestion {
    question: string;
    options: string [];
    correctIndex: number;
}

interface QuizProps {
    questions: QuizQuestion[];
    onComplete?: () => void;
}

const Quiz: React.FC<QuizProps> = ({questions, onComplete}) => {
    const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
    const [submitted, setSubmitted] = useState(false)

    const handleSelect = (questionIndex: number, optionIndex: number) => {
        if (submitted) return
        const updated = [...answers]
        updated[questionIndex] = optionIndex
        setAnswers(updated)
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    const correctCount = answers.reduce((acc, answer, i) => {
        return answer === questions[i].correctIndex ? acc + 1 : acc;
    }, 0);

    return (
        <div className="space-y-6">
            {questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <p className="font-semibold">{q.question}</p>
                    <div className="mt-2 space-y-1">
                        {q.options.map((opt, oIndex) => {
                            const isSelected = answers[qIndex] === oIndex
                            const isCorrect = oIndex === q.correctIndex
                            const isWrong = submitted && isSelected && !isCorrect

                            return (
                                <button
                                    key={oIndex}
                                    onClick={() => handleSelect(qIndex, oIndex)}
                                    className={`block w-full text-left px-4 py-2 rounded border
                                    ${isSelected ? "border-blue-500 bg-blue-100" : "border-gray-600 hover:bg-gray-100"}
                                    ${submitted && isCorrect ? "border-green-500 bg-green-100" : ""}
                                    ${isWrong ? "border-red-500 bg-red-100" : ""}
                                    transition-colors duration-200
                                    `}
                                >
                                    {opt}
                                </button>
                            );
                        })
                        }
                    </div>
                </div>
            ))}

            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                    disabled={answers.includes(null)}
                >
                    Submit quiz
                </button>
            ) : (
                <div className="mt-4">
                    <p className="font-medium">
                        You got {correctCount} out of {questions.length} correct.
                    </p>
                    {onComplete && (
                        <button
                            onClick={onComplete}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Continue
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Quiz;