export type QuizQuestion = {
    question: string;
    options: string[];
    correctIndex: number;
};


export type Step =
    | { title: string; description: string; type?: undefined } // Intro / Summary text
    | { title: string; type: "typingChallenge"; description: string; codeSnippet: string; tests?: string; exampleKey?: string }
    | { title: string; type: "explanation"; description: string; exampleKey?: string }
    | { title: string; type: "quiz"; description: string; questions: QuizQuestion[] }
    | { title: string; type: "typingChallengeWithBlanks"; description: string; codeLines: string[]; blankLines: number[] };


export interface Lesson {
    lessonId: number;
    language: string; // e.g., 'javascript'
    title: string;
    steps: Step[];
}