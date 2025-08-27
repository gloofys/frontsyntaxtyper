import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface LessonSummary {
    lessonId: number;
    title: string;
}

interface LessonContextType {
    lessons: LessonSummary[];
    totalLessons: number;
    fetchLessons: (language: string) => Promise<void>;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lessons, setLessons] = useState<LessonSummary[]>([]);
    const [totalLessons, setTotalLessons] = useState(0);

    const fetchLessons = async (language: string) => {
        try {
            const res = await axios.get(`/api/lessons?language=${language}`);
            setLessons(res.data.lessons || []);
            setTotalLessons(res.data.lessons.length || 0);
        } catch (err) {
            console.error("Error fetching lessons", err);
            setLessons([]);
            setTotalLessons(0);
        }
    };

    return (
        <LessonContext.Provider value={{ lessons, totalLessons, fetchLessons }}>
            {children}
        </LessonContext.Provider>
    );
};

export const useLessonStore = () => {
    const context = useContext(LessonContext);
    if (!context) {
        throw new Error("useLessonStore must be used within a LessonProvider");
    }
    return context;
};
