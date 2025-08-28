import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TypingBox from "../components/TypingBox.tsx";
import { fetchSnippet } from "../api/snippets";
import type { Snippet } from "../data/snippets/Snippet";

const Challenges: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const selectedLanguage = language || "React";

    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        const loadSnippet = async () => {
            const data = await fetchSnippet(selectedLanguage);
            setSnippet(data);
        };
        loadSnippet();
    }, [selectedLanguage]);

    if (!snippet) {
        return <div className="p-4">Loading {selectedLanguage} challenge...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">
                {selectedLanguage.toUpperCase()} Challenge
            </h2>
            <p className="mt-2">{snippet.title}</p>
            <TypingBox selectedLanguage={selectedLanguage} snippet={snippet} />
        </div>
    );
};

export default Challenges;
