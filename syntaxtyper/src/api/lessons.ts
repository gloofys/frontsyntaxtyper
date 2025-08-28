// src/api/lessons.ts

export const fetchLesson = async (language: string, lessonId: string) => {
    try {
        // Dynamically import only the requested lesson file
        const lesson = await import(
            `../data/lessons/${language}/${lessonId}.ts`
            );
        return lesson.default;
    } catch (error) {
        console.error(`❌ Failed to load lesson: ${language}/${lessonId}`, error);
        return null;
    }
};
