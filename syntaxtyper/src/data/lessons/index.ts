// src/data/lessons/index.ts
import type { Lesson } from "./Lesson";

// Dynamically import ALL lesson files under lessons/*/*.ts
const lessonModules = import.meta.glob<Lesson>("./*/**/*.ts", { eager: true });

// Convert modules into a flat array of lessons
export const lessons: Lesson[] = Object.values(lessonModules).map((module: any) => module.default);

// Sort lessons by ID for consistency
lessons.sort((a, b) => a.lessonId - b.lessonId);
