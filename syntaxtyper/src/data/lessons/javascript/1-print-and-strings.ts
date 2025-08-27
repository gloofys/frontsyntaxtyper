import type { Lesson } from "../../types";


const lesson1: Lesson = {
lessonId: 1,
language: "javascript",
title: "Print & Strings (Hello, Name!)",
steps: [
{
title: "Introduction",
description: `
In this first lesson, you'll print a short greeting and learn what a string is.
That's it—keep it simple and focus on clean typing.
`.trim(),
},
{
title: "Typing Challenge",
type: "typingChallenge",
description: "Type the snippet exactly as shown to print a personalized greeting.",
codeSnippet: `
const name = 'Ada';
console.log('Hello, ' + name + '!');
`.trim(),
},
{
title: "Live Preview & Explanation",
type: "explanation",
description: `
What you used:\n- **String literal**: 'Ada'\n- **Variable**: const name = 'Ada';\n- **Output**: console.log('Hello, ' + name + '!');\n- **Concatenation**: join strings with +
`.trim(),
},
{
title: "Quiz",
type: "quiz",
description: "Quick basics:",
questions: [
{ question: "Which is a string?", options: ["42", "'42'", "name"], correctIndex: 1 },
{ question: "What does console.log do?", options: ["Declares a variable", "Prints to the console", "Creates a function"], correctIndex: 1 },
],
},
{
title: "Typing Challenge With Blanks",
type: "typingChallengeWithBlanks",
description: "Fill in the missing line to build the greeting string.",
codeLines: [
"const name = 'Ada';",
"const greeting = 'Hello, ' + name + '!';",
"console.log(greeting);",
],
blankLines: [1],
},
{
title: "Summary",
description: "Nice start! You printed text and combined strings without any extra complexity.",
},
],
};


export default lesson1;