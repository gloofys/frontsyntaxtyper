// src/utils/industry.ts
import type { ByIndustry, Industry } from "../data/lessons/Lesson";

export function pickByIndustry<T>(
    base: T | undefined,
    map: ByIndustry<T> | undefined,
    industry: Industry
): T | undefined {
    return map?.[industry] ?? map?.general ?? base;
}
