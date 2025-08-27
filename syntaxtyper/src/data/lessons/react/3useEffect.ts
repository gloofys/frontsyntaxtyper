// src/data/lesson3.ts
import { Lesson } from "../../types";

const lesson3: Lesson = {
    lessonId: 3,
    language: "react",
    title: "useEffect() Hook",
    steps: [
        {
            title: "Introduction",
            description: `
The \`useEffect\` hook lets you run side-effects in function components—things like subscriptions, timers, or data fetching.  
You pass it a function that React will call after every render (by default), and you can return a cleanup function to run before the next effect or on unmount.
      `.trim(),
        },
        {
            title: "Typing Challenge",
            type: "typingChallenge",
            description: "Create a simple timer component that increments a counter every second using `useEffect`.",
            codeSnippet: `
import React, { useState, useEffect } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);
    return () => clearInterval(id);
}, []);

    return <p>Seconds passed: {seconds}</p>;
}

export default Timer;
      `.trim(),
        },
        {
            title: "Live Preview & Explanation",
            type: "explanation",
            exampleKey: "Timer",
            description: `
**What you just built**

1. **State**  
   You declared \`seconds\` with \`useState(0)\`.

2. **Effect**  
   \`\`\`js
   useEffect(() => {
     const id = setInterval(() => {
       setSeconds(s => s + 1);
     }, 1000);
     return () => clearInterval(id);
   }, []);
   \`\`\`
   - The empty dependency array \`[]\` means “run once on mount.”  
   - The returned function cleans up the interval on unmount.

3. **Rendering**  
   Each tick updates state → React re-renders → UI shows the new seconds count.

**Why it works**

- **Side-effects belong in \`useEffect\`**, not in the render body.  
- **Cleanup** prevents memory leaks by clearing the timer when the component unmounts.  
- **Dependencies** control when your effect re-runs (empty array = only on mount).
        `.trim(),
            codeSnippet: `
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Seconds passed: {seconds}</p>;
}

export default Timer;
  `.trim(),
        },
        {
            title: "Quiz",
            type: "quiz",
            description: "Check your understanding of `useEffect`:",
            questions: [
                {
                    question: "What does an empty dependency array (`[]`) do?",
                    options: [
                        "Runs the effect on every render",
                        "Runs the effect only once, after the first render",
                        "Prevents the effect from ever running",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "Why return a cleanup function from `useEffect`?",
                    options: [
                        "To run code before the component mounts",
                        "To undo or clean up the side-effect (e.g. clear timers)",
                        "To define component props",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "What happens if you omit the dependency array entirely?",
                    options: [
                        "Effect runs just once on mount",
                        "Effect never runs",
                        "Effect runs after every render",
                    ],
                    correctIndex: 2,
                },
            ],
        },
        {
            title: "Summary",
            description: `
Great job! You’ve:

- Learned how to run side-effects (timers, subscriptions) with \`useEffect\`.  
- Seen how the cleanup function prevents memory leaks.  
- Understood the role of the dependency array.

Next up: we’ll explore context for global state with the \`useContext\` hook.
      `.trim(),
        },
    ],
};

export default lesson3;
