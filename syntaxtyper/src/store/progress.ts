// src/store/progress.ts
type Key = `${string}:${number}`; // e.g., "javascript:1"
type Progress = Record<Key, { completedStep: number; bestWPM?: number; bestAcc?: number }>;
const KEY = "st_progress_v1";

const load = (): Progress => JSON.parse(localStorage.getItem(KEY) || "{}");
const save = (p: Progress) => localStorage.setItem(KEY, JSON.stringify(p));

export function getProgress(lang: string, lessonId: number) {
    const p = load(); return p[`${lang}:${lessonId}`] || { completedStep: 0 };
}
export function setProgress(lang: string, lessonId: number, data: Partial<Progress[Key]>) {
    const p = load(); const k: Key = `${lang}:${lessonId}`;
    p[k] = { ...p[k], ...data }; save(p);
}
