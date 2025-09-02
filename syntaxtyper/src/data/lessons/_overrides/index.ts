// src/data/lessons/_overrides/index.ts
import financeReact1 from "../react/1/industry/finance";
import constructionReact1 from "../react/1/industry/construction";

// Add other lessons’ overrides here as you grow:
// import { industryOverrides as react4 } from "../react/4"; // example

export const overridesRegistry: Record<
    string,
    { general?: any; finance?: any; construction?: any } | undefined
> = {
    "react:1": {
        finance: financeReact1,
        construction: constructionReact1,
        // general is optional (falls back to base)
    },

    // "react:4": react4,
};
