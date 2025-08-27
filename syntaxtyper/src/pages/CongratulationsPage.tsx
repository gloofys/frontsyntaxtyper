import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface StateType {
    lessonNumber: number;
    language: string;
    totalLessons: number;
}

const CongratulationsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as StateType | undefined;

    if (!state || !state.language || !state.lessonNumber) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Oops!</h1>
                <p>This page needs lesson data. Please return to your lessons.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const { lessonNumber, language, totalLessons } = state;

    const hasNextLesson = lessonNumber < totalLessons;

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">🎉 Congratulations!</h1>
            <p className="text-lg mb-2">
                You’ve completed <strong>{language.toUpperCase()}</strong> Lesson {lessonNumber}!
            </p>

            <div className="mt-6 flex justify-center space-x-4">
                <button
                    onClick={() => navigate(`/${language}/lessons`)}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                    Back to Lessons
                </button>

                {hasNextLesson && (
                    <button
                        onClick={() => navigate(`/${language}/lesson/${lessonNumber + 1}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Next Lesson
                    </button>
                )}
            </div>
        </div>
    );
};

export default CongratulationsPage;
