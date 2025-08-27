import React from "react";
import {useParams} from "react-router-dom";
import TypingBox from "../components/Typingbox.tsx";

const Challenges:React.FC = () => {
    const { language } = useParams<{ language: string }>();
    // Fallback to "react" if language is undefined
    const selectedLanguage = language || "react";
    return (
        <div className="p-4">
            <h2 className = "text-2xl font-bold">{language?.toUpperCase()} Challenges</h2>
            <p className = "mt-2">
                Challenges for {language}!
            </p>
            <TypingBox selectedLanguage={selectedLanguage}/>
        </div>
    );
};

export default Challenges;