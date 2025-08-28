export interface Snippet {
    id: number;
    language: string;
    text: string;
    type: "lesson" | "challenge"; // new property
    lines: number;
    characters: number;
}