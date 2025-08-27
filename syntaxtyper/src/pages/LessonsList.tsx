import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Lesson {
    lessonId: number;
    title: string;
}

const LessonsList: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const selectedLanguage = language?.toLowerCase() || "react";
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLessons() {
            try {
                setLoading(true);
                const response = await axios.get(`/api/lessons?language=${selectedLanguage}`);
                setLessons(response.data.lessons || []);
            } catch (err: any) {
                setError("Failed to fetch lessons");
            } finally {
                setLoading(false);
            }
        }
        fetchLessons();
    }, [selectedLanguage]);

    if (loading) return <div>Loading lessons...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {selectedLanguage.toUpperCase()} Lessons
                </h2>

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
            </div>
        </div>
    );
};

export default LessonsList;
