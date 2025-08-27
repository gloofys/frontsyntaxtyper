import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { examples } from "../exampleComponents";

interface Props {
    markdown: string;
    code: string;
    exampleKey?: string;
}

export const ExplanationPanel: React.FC<Props> = ({ markdown, code, exampleKey }) => {
    const ExampleComponent = exampleKey ? examples[exampleKey] : null;

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded shadow">
            <div className="prose max-w-none [&_hr]:mb-10">
                <ReactMarkdown
                    components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {markdown}
                </ReactMarkdown>
                {code && (
                    <SyntaxHighlighter language="jsx" style={tomorrow}>
                        {code.trim()}
                    </SyntaxHighlighter>
                )}
            </div>
            {ExampleComponent && (
                <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Live Preview</h4>
                    <ExampleComponent/>
                </div>
            )}
        </div>
    );
};
