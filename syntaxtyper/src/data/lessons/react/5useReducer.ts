import type {Lesson} from "../Lesson.ts";
const lesson5: Lesson = {
    lessonId: 5,
    language: "react",
    title: "useReducer() Hook",
    steps: [
        {
            title: "Introduction",
            description: `
The \`useReducer\` hook is an alternative to \`useState\` when managing complex state logic in React.

It helps organize state updates using a reducer function — similar to Redux.
      `.trim(),
        },
        {
            title: "Typing Challenge",
            type: "typingChallenge",
            description: "Create a counter with increment, decrement, and reset actions using `useReducer`.",
            codeSnippet: `
import React, { useReducer } from "react";

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const reducer = (state: number, action: Action): number => {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        case "reset":
            return 0;
        default:
            return state;
    }
};

const Counter: React.FC = () => {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </div>
    );
};
    `.trim(),
            exampleKey: "CounterExample",
        },
        {
            title: "Live Preview & Explanation",
            type: "explanation",
            exampleKey: "CounterExample",
            description: `
**How \`useReducer\` Works**

---

**1. Define a Reducer Function**
\`\`\`tsx
const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    case "reset": return 0;
    default: return state;
  }
};
\`\`\`
- A reducer takes the current state and an action, then returns a new state.

---

**2. Use the Reducer in Your Component**
\`\`\`tsx
const [count, dispatch] = useReducer(reducer, 0);
\`\`\`
- \\\`count\\\` is your state.
- \\\`dispatch\\\` sends an action to update state.

---

**3. Trigger Actions via Buttons**
\`\`\`tsx
<button onClick={() => dispatch({ type: "increment" })}>+</button>
\`\`\`
- Each button sends an action to the reducer.

---

**Why it works**
- \\\`useReducer\\\` is ideal for managing complex or multi-step updates.
- It centralizes logic and avoids scattered state handlers.
`.trim(),
        },
        {
            title: "Quiz",
            type: "quiz",
            description: "Test your understanding of `useReducer`:",
            questions: [
                {
                    question: "What does a reducer function return?",
                    options: [
                        "A new React component",
                        "An updated state value",
                        "An action object",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "What is the purpose of `dispatch()`?",
                    options: [
                        "To register the reducer",
                        "To trigger an effect",
                        "To send an action to the reducer",
                    ],
                    correctIndex: 2,
                },
                {
                    question: "When should you use `useReducer` instead of `useState`?",
                    options: [
                        "When you have a simple toggle",
                        "When state logic is complex or involves multiple actions",
                        "Only when using Redux",
                    ],
                    correctIndex: 1,
                },
            ],
        },
        {
            title: "Typing Challenge With Blanks",
            type: "typingChallengeWithBlanks",
            description: "Fill in the reducer and actions to complete the counter.",
            codeLines: [
                `import React, { useReducer } from "react";`,
                ``,
                `type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };`,
                ``,
                `const reducer = (state: number, action: Action): number => {`,
                `    switch (action.type) {`,
                `        case "increment": return state + 1;`,
                `        case "decrement": return state - 1;`,
                `        case "reset": return 0;`,
                `        default: return state;`,
                `    }`,
                `};`,
                ``,
                `const Counter: React.FC = () => {`,
                `    const [count, dispatch] = useReducer(reducer, 0);`,
                ``,
                `    return (`,
                `        <div>`,
                `            <p>Count: {count}</p>`,
                `            <button onClick={() => dispatch({ type: "increment" })}>+</button>`,
                `            <button onClick={() => dispatch({ type: "decrement" })}>-</button>`,
                `            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>`,
                `        </div>`,
                `    );`,
                `};`,
            ],
            blankLines: [1, 5, 14],
        },
        {
            title: "Summary",
            description: "Awesome! You’ve:",
            bullets: [
                "Learned the `useReducer` hook for managing complex state.",
                "Created actions and a reducer to handle updates.",
                "Dispatched actions from UI events to update state cleanly.",
            ],
            outro: "Next up: combining `useReducer` with `useContext` for scalable state architecture.",
        },
    ],
};

export default lesson5