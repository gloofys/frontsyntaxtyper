import type {Lesson} from "../Lesson.ts";

const lesson6: Lesson = {
    lessonId: 6,
    language: "react",
    title: "Global State with useReducer + useContext",
    steps: [
        {
            title: "Introduction",
            description: `
By combining \`useReducer\` with \`useContext\`, you can manage shared state across your app in a scalable way.

This is a great alternative to external state libraries when your app grows.
        `.trim(),
        },
        {
            title: "Typing Challenge",
            type: "typingChallenge",
            description: "Create a TaskProvider using `useReducer` and `useContext`, and share task data across components.",
            codeSnippet: `
import React, { createContext, useContext, useReducer } from "react";

type Task = { id: number; text: string; completed: boolean };
type Action =
    | { type: "add"; text: string }
    | { type: "toggle"; id: number }
    | { type: "remove"; id: number };

const TaskContext = createContext<any>(null);

const reducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), text: action.text, completed: false }];
        case "toggle":
            return state.map(task =>
                task.id === action.id ? { ...task, completed: !task.completed } : task
            );
        case "remove":
            return state.filter(task => task.id !== action.id);
        default:
            return state;
    }
};

export const TaskProvider: React.FC = ({ children }) => {
    const [tasks, dispatch] = useReducer(reducer, []);
    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
    `.trim(),
            exampleKey: "TaskExample",
        },
        {
            title: "Live Preview & Explanation",
            type: "explanation",
            exampleKey: "TaskExample",
            description: `
**Combining useReducer + useContext**

---

**1. Set up the reducer and context**
\`\`\`tsx
const TaskContext = createContext(null);
const [tasks, dispatch] = useReducer(reducer, []);
\`\`\`

- You create state with \`useReducer\`, then share it with \`createContext\`.

---

**2. Provide the context**
\`\`\`tsx
<TaskContext.Provider value={{ tasks, dispatch }}>
  {children}
</TaskContext.Provider>
\`\`\`

- Now all components below can use the shared state and dispatch actions.

---

**3. Consume context with a custom hook**
\`\`\`tsx
const { tasks, dispatch } = useTasks();
\`\`\`

- This avoids prop drilling and centralizes logic.

---

**Why it works**

- \`useReducer\` holds state and updates it.
- \`useContext\` makes it accessible to any component.
- The pattern is testable, scalable, and decoupled.
`.trim(),
        },
        {
            title: "Quiz",
            type: "quiz",
            description: "Test your understanding of combining useReducer and useContext:",
            questions: [
                {
                    question: "What is the main benefit of combining `useReducer` with `useContext`?",
                    options: [
                        "It makes components render faster",
                        "It allows you to share complex state logic across components",
                        "It replaces the need for all other hooks",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "Where should the context provider be placed?",
                    options: [
                        "Inside the component using the state",
                        "Around the part of your app that needs access to the state",
                        "At the bottom of the component tree",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "What does the reducer function return?",
                    options: [
                        "The context object",
                        "A new state value",
                        "A JSX element",
                    ],
                    correctIndex: 1,
                },
            ],
        },
        {
            title: "Typing Challenge With Blanks",
            type: "typingChallengeWithBlanks",
            description: "Fill in the reducer logic and context usage to complete the task manager.",
            codeLines: [
                `import React, { createContext, useReducer, useContext } from "react";`,
                ``,
                `type Task = { id: number; text: string; completed: boolean };`,
                `type Action =`,
                `    | { type: "add"; text: string }`,
                `    | { type: "toggle"; id: number }`,
                `    | { type: "remove"; id: number };`,
                ``,
                `const TaskContext = createContext<any>(null);`,
                ``,
                `const reducer = (state: Task[], action: Action): Task[] => {`,
                `    switch (action.type) {`,
                `        case "add":`,
                `            return [...state, { id: Date.now(), text: action.text, completed: false }];`,
                `        case "toggle":`,
                `            return state.map(task =>`,
                `                task.id === action.id ? { ...task, completed: !task.completed } : task`,
                `            );`,
                `        case "remove":`,
                `            return state.filter(task => task.id !== action.id);`,
                `        default: return state;`,
                `    }`,
                `};`,
                ``,
                `export const TaskProvider: React.FC = ({ children }) => {`,
                `    const [tasks, dispatch] = useReducer(reducer, []);`,
                `    return (`,
                `        <TaskContext.Provider value={{ tasks, dispatch }}>`,
                `            {children}`,
                `        </TaskContext.Provider>`,
                `    );`,
                `};`,
                ``,
                `export const useTasks = () => useContext(TaskContext);`,
            ],
            blankLines: [3, 10, 33],
        },
        {
            title: "Summary",
            description: "Awesome! You’ve:",
            bullets: [
                "Learned to combine `useReducer` and `useContext` for global state.",
                "Created a shared task list provider pattern.",
                "Used a reducer to update state and context to share it.",
            ],
            outro: "Up next: performance tips for avoiding unnecessary re-renders with context and reducers.",
        },
    ],
};

export default lesson6;
