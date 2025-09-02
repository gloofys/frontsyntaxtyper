import type { Step } from "../../../Lesson";

// Local helper type for overrides (partial Step by 1-based step index)
type LessonOverrides = { steps: Record<number, Partial<Step>> };

const finance: LessonOverrides = {
    steps: {
        // 1) Introduction
        1: {
            description:
                "React helps you build interactive UI for real-time dashboards — think portfolio overviews, P&L widgets, and risk indicators. In this track, we’ll frame examples around finance use-cases so the concepts click faster.",
        },

        // 2) Typing Challenge
        2: {
            description: "Type out a small component for a portfolio dashboard header.",
            codeSnippet: `import React from "react";

function PortfolioWelcome() {
    return <h1>Welcome to the Portfolio Dashboard</h1>;
}

export default PortfolioWelcome;`,
        },

        // 3) Explanation
        3: {
            description:
                "The component above is a simple React function component. Using JSX, you can render UI like a header for a portfolio dashboard. JSX lets you embed HTML-like syntax (e.g., <h1>) directly in JavaScript, which React transforms under the hood.",
        },

        // 5) Fill in the blanks
        5: {
            description:
                "Fill in the missing pieces to complete a basic finance-flavored component.",
            codeLines: [
                `import React from "react";`,
                ``,
                `function PortfolioWelcome() {`,
                `    return <h1>Welcome to the Portfolio Dashboard</h1>;`,
                `}`,
                ``,
                `export default PortfolioWelcome;`,
            ],
            // keep the same indices you used in the base lesson
            blankLines: [0, 2, 6],
        },

        // 6) Summary
        6: {
            description:
                "Nice work! You created and explained a small component tied to a finance use-case. You now know what JSX is, how to define a component, and how those pieces fit a portfolio dashboard. Next up: props and composing reusable widgets.",
        },
    },
};

export default finance;
