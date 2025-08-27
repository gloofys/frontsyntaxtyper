import { Lesson } from "../../types";

const lesson: Lesson = {
    lessonId: 1,
    language: "react",
    title: "Getting Started",
    steps: [
        {
            title: "Introduction",
            description:
                "React is a JavaScript library for building interactive user interfaces. In this lesson, you'll learn the basics of React components and JSX syntax.",
        },
        {
            title: "Typing Challenge",
            description: "Type out your first functional React component below.",
            type: "typingChallenge",
            codeSnippet: `import React from "react";

function Welcome() {
    return <h1>Hello, React!</h1>;
}

export default Welcome;`,
        },
        {
            title: "Explanation",
            description:
                "The component above is a simple React function component. It uses JSX, which lets you write HTML-like syntax directly in JavaScript. Notice how we use `<h1>` inside the return statement — that’s valid JSX!",
        },
        {
            title: "Quiz",
            description: "Answer the following questions to check your understanding.",
            type: "quiz",
            questions: [
                {
                    question: "What is JSX?",
                    options: [
                        "A CSS preprocessor",
                        "A syntax extension that lets you write HTML in JavaScript",
                        "A new JavaScript engine",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "What is the correct way to define a functional component in React?",
                    options: [
                        "function MyComponent() { return <div /> }",
                        "component MyComponent() => <div />",
                        "defineComponent(MyComponent) { <div /> }",
                    ],
                    correctIndex: 0,
                },
                {
                    question: "What must a React component return?",
                    options: ["A string", "A JSX element", "An object"],
                    correctIndex: 1,
                },
            ],
        },
        {
            title: "Fill in the blanks",
            type: "typingChallengeWithBlanks",
            description: "Fill in the missing pieces to complete your first React component.",
            codeLines: [
                `import React from "react";`,
                ``,
                `function Welcome() {`,
                `    return <h1>Hello, React!</h1>;`,
                `}`,
                ``,
                `export default Welcome;`,
            ],
            blankLines: [0, 2, 6],
        },
        {
            title: "Summary",
            description:
                "Nice work! You’ve learned what JSX is, how to define a simple React component, and practiced writing one yourself. Next, we’ll dive into using props and component composition.",
        },
    ],
};

export default lesson;
