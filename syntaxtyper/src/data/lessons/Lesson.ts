// src/data/lessons/Lesson.ts
export type ByIndustry<T> = Partial<Record<Industry, T>>;

export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
}

export interface Step {
    title: string;
    description?: string;
    descriptionByIndustry?: ByIndustry<string>;

    bullets?: string[];
    bulletsByIndustry?: ByIndustry<string[]>;

    outro?: string;
    type?: string;

    questions?: QuizQuestion[];
    questionsByIndustry?: ByIndustry<QuizQuestion[]>;

    codeSnippet?: string;
    codeSnippetByIndustry?: ByIndustry<string>;

    codeLines?: string[];
    codeLinesByIndustry?: ByIndustry<string[]>;

    blankLines?: number[];
    exampleKey?: string;
}

export interface Lesson {
    lessonId: number;
    language: string;
    title: string;
    steps: Step[];
}

export type Industry = "general" | "construction" | "finance";
export type StepOverride = Partial<Step>;
export interface LessonOverrides {
    // 1-based step number → partial step fields to override
    steps: Record<number, StepOverride>;
}