import type { Lesson, Step } from "../Lesson";
import type { LessonOverrides } from "../Lesson";

export function applyOverrides(base: Lesson, ov?: LessonOverrides): Lesson {
    if (!ov) return base;
    const steps = base.steps.map((step, idx) => {
        const patch = ov.steps?.[idx + 1]; // 1-based
        return patch ? ({ ...step, ...patch } as Step) : step;
    });
    return { ...base, steps };
}
