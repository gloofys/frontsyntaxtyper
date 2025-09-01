import type {Lesson} from "../Lesson.ts";

const lesson4: Lesson = {
    lessonId: 4,
    language: "react",
    title: "useContext() Hook",
    steps: [
        {
            title: "Introduction",
            description: `
The \`useContext\` hook lets you consume values from a React Context without prop-drilling. 
Context is ideal for global settings like themes, authentication status, or localization.
      `.trim(),
        },
        {
            title: "Typing Challenge",
            type: "typingChallenge",
            description: "Create a ThemeContext and provider, then build a nested component that reads and toggles the theme using `useContext`.",
            codeSnippet: `
import React, { createContext, useState, useContext } from "react";

interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {}
});

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeStatus: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};
      `.trim(),
            exampleKey: "ThemeToggler",
        },
        {
            title: "Live Preview & Explanation",
            type: "explanation",
            exampleKey: "ThemeToggler",
            description: `
**How \`useContext\` Works (Step-by-Step)**

---

**1. Define the Context**
\`\`\`tsx
import React, { createContext, useState, useContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
\`\`\`


- You define a TypeScript interface for your context's value.
- \`createContext\` sets up the context with a default value (used if there's no matching provider).
- This allows any descendant component to access \`theme\` and \`toggleTheme\`.

---

**2. Provide the Context**
\`\`\`tsx
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

- The \`ThemeProvider\` manages the current theme using \`useState\`.
- It wraps your app (or part of it) and passes down the context value.
- Now any component inside it can read or update the theme.

---

**3. Consume the Context**
\`\`\`tsx
export const ThemeStatus: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
\`\`\`

- You access context with \`useContext(ThemeContext)\`.
- Whenever the context value changes (e.g., via \`toggleTheme\`), the component re-renders with the updated state.

---

**Why it works**
- \`createContext\` sets up the context API.
- \`Provider\` gives descendants the actual value to use.
- \`useContext\` reads that value and subscribes the component to future updates.
    `.trim(),
        },
        {
            title: "Quiz",
            type: "quiz",
            description: "Test your understanding of `useContext`:",
            questions: [
                {
                    question: "What does `createContext(defaultValue)` do?",
                    options: [
                        "Creates a provider and consumer component",
                        "Defines a context object with the given default value",
                        "Automatically injects the value into props",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "How do you read context in a function component?",
                    options: [
                        "`const ctx = useContext(MyContext)`",
                        "`const ctx = MyContext.read()`",
                        "`renderContext(MyContext)`",
                    ],
                    correctIndex: 0,
                },
                {
                    question: "What happens if you call `useContext` outside of a matching provider?",
                    options: [
                        "You get `undefined` or the default value",
                        "It throws a runtime error",
                        "React will ignore the call",
                    ],
                    correctIndex: 0,
                },
            ],
        },
        {
            title: "Fill in the blanks",
            type: "typingChallengeWithBlanks",
            description: "Fill in the key Context functions yourself!",
            codeLines: [
                `import React, { createContext, useState, useContext } from "react";`,
                ``,
                `interface ThemeContextType {`,
                `    theme: "light" | "dark";`,
                `    toggleTheme: () => void;`,
                `}`,
                ``,
                `export const ThemeContext = createContext<ThemeContextType>({`,
                `    theme: "light",`,
                `    toggleTheme: () => {},`,
                `});`,
                ``,
                `export const ThemeProvider: React.FC = ({ children }) => {`,
                `    const [theme, setTheme] = useState<"light" | "dark">("light");`,
                `    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));`,
                ``,
                `    return (`,
                `        <ThemeContext.Provider value={{ theme, toggleTheme }}>`,
                `            {children}`,
                `        </ThemeContext.Provider>`,
                `    );`,
                `};`,
                ``,
                `export const ThemeStatus: React.FC = () => {`,
                `    const { theme, toggleTheme } = useContext(ThemeContext);`,
                ``,
                `    return (`,
                `        <div>`,
                `            <p>Current theme: {theme}</p>`,
                `            <button onClick={toggleTheme}>Toggle Theme</button>`,
                `        </div>`,
                `    );`,
                `};`,
            ],
            blankLines: [2, 9, 20],
        },
        {
            title: "Summary",
            description: "Great job! You’ve:",
            bullets: [
                "Created and provided a ThemeContext for global state.",
                "Consumed context with the useContext hook in a nested component.",
                "Learned how context avoids prop-drilling for shared data.",
            ],
            outro: "Next up: we’ll explore advanced state management with the useReducer hook!",
        },
    ],
};

export default lesson4;
