
import js1 from "@/data/lessons/JavaScript/1-print-and-strings";
import react1 from "@/data/lessons/react/1";

export type Lesson = typeof js1;

export function listLanguages() { return ["javascript", "react"]; }

export function listLessons(lang: string): Lesson[] {
    if (lang === "javascript") return [js1];
    if (lang === "react") return [react1];
    return [];
}
