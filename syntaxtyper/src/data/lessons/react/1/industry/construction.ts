import type { Step } from "../../../Lesson";

// Local helper type for overrides (partial Step by 1-based step index)
type LessonOverrides = { steps: Record<number, Partial<Step>> };

const construction: LessonOverrides = {
    steps: {
        // 1) Introduction
        1: {
            description:
                "React helps you build interactive UI for job site dashboards — project timelines, crew rosters, and safety indicators. We’ll use construction-flavored examples to make each concept more tangible.",
        },

        // 2) Typing Challenge
        2: {
            description: "Type out a small component for a site overview header.",
            codeSnippet: `import React from "react";

function SiteWelcome() {
    return <h1>Welcome to the Site!</h1>;
}

export default SiteWelcome;`,
        },

        // 3) Explanation
        3: {
            description:
                "This is a simple React function component using JSX. Imagine rendering a site header or status banner. JSX lets you mix HTML-like tags (like <h1>) directly in your JavaScript to produce dynamic UI for your project dashboard.",
        },

        // 5) Fill in the blanks
        5: {
            description:
                "Fill in the missing pieces to complete a basic construction-flavored component.",
            codeLines: [
                `import React from "react";`,
                ``,
                `function SiteWelcome() {`,
                `    return <h1>Welcome to the Site!</h1>;`,
                `}`,
                ``,
                `export default SiteWelcome;`,
            ],
            // keep the same indices you used in the base lesson
            blankLines: [0, 2, 6],
        },

        // 6) Summary
        6: {
            description:
                "Great job! You built and explained a small component in a construction context. You now understand JSX and basic components — next we’ll wire props and compose UI parts like tiles for crews, equipment, and timelines.",
        },
    },
};

export default construction;
