export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
}

export interface Step {
    title: string;
    description: string;
    bullets?: string[];
    outro?: string;
    type?: string;
    questions?: QuizQuestion[];
    codeSnippet?: string;
    codeLines?: string[];
    blankLines?: number[];
    exampleKey?: string;
}

export interface Lesson {
    lessonId: number;
    language: string;
    title: string;
    steps: Step[];
}
