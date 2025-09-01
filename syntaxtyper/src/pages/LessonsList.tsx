import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLessonStore } from "../context/LessonContext";

const LessonsList: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const selectedLanguage = language?.toLowerCase() || "react";

    const { fetchLessons, getLessonsByLanguage } = useLessonStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLessons = async () => {
            try {
                setLoading(true);
                await fetchLessons(selectedLanguage);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadLessons();
    }, [selectedLanguage, fetchLessons]);

    const lessons = getLessonsByLanguage(selectedLanguage);

    if (loading) return <div className="p-4 text-center">Loading lessons...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {selectedLanguage.toUpperCase()} Lessons
                </h2>

                {lessons.length === 0 ? (
                    <div className="text-center text-gray-500">No lessons found.</div>
                ) : (
                    <div className="grid gap-6 place-items-center grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
                        {lessons.map((lesson) => (
                            <div key={lesson.lessonId} className="flex flex-col items-center">
                                <Link
                                    to={`/${selectedLanguage}/lesson/${lesson.lessonId}`}
                                    className="aspect-square w-24 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-xl flex items-center justify-center text-xl shadow transition"
                                >
                                    {lesson.lessonId}
                                </Link>
                                <p className="mt-2 text-sm text-center max-w-[8rem] break-words">
                                    {lesson.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonsList;
