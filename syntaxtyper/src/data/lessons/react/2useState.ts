import type {Lesson} from "../Lesson.ts";

const lesson2: Lesson = {
    lessonId: 2,
    language: "react",
    title: "useState() Hook",
    steps: [
        {
            title: "Introduction",
            description: `
The \`useState\` hook lets you add “state” to function components.  
You declare a piece of state with an initial value, then call its setter to update it—and React will re‑render your component with the new value.
      `.trim(),
        },
        {
            title: "Typing Challenge",
            description: "Create a simple counter component that uses the `useState` hook to track and update a count.",
            type: "typingChallenge",
            codeSnippet: `
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
        </div>
    );
}

export default Counter;
      `.trim(),
        },
        {
            title: "Live Preview & Explanation",
            type: "explanation",
            description: `
****What you just built****

1. **Rendered HTML**
   \`\`\`html
   <div>
     <p>You clicked 0 times</p>
     <button>Click me</button>
   </div>
   \`\`\`

2. **Interactive Behavior**
   - On first render you see a paragraph showing “You clicked 0 times” and a button labeled “Click me.”
   - Each time you click the button, the paragraph updates to reflect the new count.

****Why it works****

- **Destructuring:**  
  \`const [count, setCount] = useState(0)\` pulls out:
  1. \`count\` — the current state value, and  
  2. \`setCount\` — the function to update it.

- **Initial Value:**  
  Passing \`0\` into \`useState(0)\` means \`count\` starts at 0.

- **Updating State:**  
  When you call \`setCount(count + 1)\`, React:
  1. Schedules a re-render with the new value.  
  2. Runs your \`Counter\` function again.  
  3. Patches only the changed parts of the DOM (here, the number in the paragraph).

- **No Direct Mutation:**  
  Always use \`setCount\` instead of doing something like \`count++\`. Direct mutation won’t notify React, so the UI wouldn’t update.
  `.trim(),
            codeSnippet: `
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
        </div>
    );
}

export default Counter;
  `.trim(),
            exampleKey: "Counter",
        }
        ,
        {
            title: "Quiz",
            description: "Test your understanding of `useState`:",
            type: "quiz",
            questions: [
                {
                    question: "What does calling the updater function (e.g. `setCount`) do?",
                    options: [
                        "Directly mutates the state variable",
                        "Schedules a re-render with the new state value",
                        "Clears the component cache",
                    ],
                    correctIndex: 1,
                },
                {
                    question: "How do you initialize state to an object instead of a number?",
                    options: ["`useState({})`", "`useStateObject({})`", "`useObjectState({})`"],
                    correctIndex: 0,
                },
                {
                    question: "Why shouldn’t you do `count = count + 1` directly?",
                    options: [
                        "It’s invalid JavaScript",
                        "React won’t detect the change and re-render",
                        "It throws a runtime error",
                    ],
                    correctIndex: 1,
                },
            ],
        },
        {
            title: "Fill in the blanks",
            type: "typingChallengeWithBlanks",
            description: "Same Counter, but fill in the blanked lines yourself!",
            codeLines: [
                `import React, { useState } from "react";`,
                ``,
                `function Counter() {`,
                `    const [count, setCount] = useState(0);`,
                ``,
                `    return (`,
                `    <div>`,
                `        <p>You clicked {count} times</p>`,
                `        <button onClick={() => setCount(count + 1)}>`,
                `        Click me`,
                `        </button>`,
                `    </div>`,
                `    );`,
                `}`,
                ``,
                `export default Counter;`,
            ],
            blankLines: [3, 6, 8],  // zero-based indexes of the lines you want hidden
        },
        {
            title: "Summary",
            description: "Great job! You’ve:",
            bullets: [
                "Written your first stateful React component.",
                "Seen its rendered HTML and how clicks update the UI.",
                "Learned why you always use the setter function.",
            ],
            outro: "Next up: we’ll explore side-effects with the useEffect hook!",
        },
    ],
};

export default lesson2;
