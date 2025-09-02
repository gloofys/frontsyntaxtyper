// src/data/lessons/react/1.ts
import base from "./1/base";
import finance from "./1/industry/finance";
import construction from "./1/industry/construction";
import { applyOverrides } from "../_utils/composeLesson";
import type { Lesson } from "../Lesson";

// We export the BASE Lesson here.
// Industry-specific content will be applied at runtime in the UI
// by pulling the relevant overrides and merging with base.
const lesson: Lesson = base;
export default lesson;

// And we export an overrides registry (not part of Lesson interface)
export const industryOverrides = {
    finance,
    construction,
    general: undefined,
};
