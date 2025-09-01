// src/api/lessons.ts
import type { Lesson } from "../data/lessons/Lesson";

export const fetchLesson = async (language: string, lessonId: string): Promise<Lesson | null> => {
    try {
        const modules = import.meta.glob("../data/lessons/**/*.ts");
        for (const path in modules) {
            if (path.includes(`/${language}/`) && path.endsWith(`${lessonId}.ts`)) {
                const module: any = await modules[path]();
                return module.default as Lesson;
            }
        }
        console.error(`Lesson ${lessonId} not found for language ${language}`);
        return null;
    } catch (error) {
        console.error(`❌ Failed to load lesson: ${language}/${lessonId}`, error);
        return null;
    }
};
