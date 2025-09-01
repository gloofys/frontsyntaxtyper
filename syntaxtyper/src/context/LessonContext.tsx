import React, { createContext, useContext, useState, useCallback } from "react";
import type { Lesson } from "../data/lessons/Lesson";

interface LessonSummary {
    lessonId: number;
    title: string;
}

interface LessonContextType {
    lessons: Record<string, Lesson[]>;         // Store all lessons grouped by language
    totalLessons: number;
    fetchLessons: (language: string) => Promise<void>;
    getLessonsByLanguage: (language: string) => LessonSummary[];
    getLessonById: (language: string, id: number) => Lesson | undefined;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

const lessonModules = {
    react: import.meta.glob("../data/lessons/react/*.ts"),
    javascript: import.meta.glob("../data/lessons/javascript/*.ts"),
    typescript: import.meta.glob("../data/lessons/typescript/*.ts"),
    java: import.meta.glob("../data/lessons/java/*.ts"),
    // Add more languages if needed
};

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allLessons, setAllLessons] = useState<Record<string, Lesson[]>>({});
    const [totalLessons, setTotalLessons] = useState(0);

    const fetchLessons = useCallback(
        async (language: string) => {
            try {
                // ✅ Use cache if available
                if (allLessons[language]) {
                    setTotalLessons(allLessons[language].length);
                    return;
                }

                const modules = lessonModules[language];
                if (!modules) {
                    console.warn(`No lessons found for language: ${language}`);
                    setAllLessons((prev) => ({ ...prev, [language]: [] }));
                    setTotalLessons(0);
                    return;
                }

                // ✅ Dynamically import all lessons
                const loadedLessons: Lesson[] = await Promise.all(
                    Object.keys(modules).map(async (path) => {
                        const mod = await modules[path]() as { default: Lesson };
                        return mod.default;
                    })
                );

                setAllLessons((prev) => ({ ...prev, [language]: loadedLessons }));
                setTotalLessons(loadedLessons.length);
            } catch (err) {
                console.error(`Error fetching lessons for ${language}`, err);
                setAllLessons((prev) => ({ ...prev, [language]: [] }));
                setTotalLessons(0);
            }
        },
        [allLessons]
    );


    const getLessonsByLanguage = (language: string): LessonSummary[] => {
        return (
            allLessons[language]?.map((l) => ({
                lessonId: l.lessonId,
                title: l.title,
            })) || []
        );
    };

    const getLessonById = (language: string, id: number): Lesson | undefined => {
        return allLessons[language]?.find((l) => l.lessonId === id);
    };

    return (
        <LessonContext.Provider
            value={{
                lessons: allLessons,
                totalLessons,
                fetchLessons,
                getLessonsByLanguage,
                getLessonById,
            }}
        >
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
