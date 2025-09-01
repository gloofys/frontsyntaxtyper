// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useIndustry } from "../context/IndustryContext";

interface HeaderProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedLanguage, onLanguageChange }) => {
    const { industry, setIndustry } = useIndustry();

    return (
        <header className="w-full bg-gray-500 p-4 flex justify-center items-center">
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold">Syntax Typer</h1>
                <nav className="ml-4">
                    <Link to={`/${selectedLanguage}/lessons`} className="text-white mx-2 hover:underline">Lessons</Link>
                    <Link to={`/${selectedLanguage}/challenges`} className="text-white mx-2 hover:underline">Challenges</Link>
                </nav>
            </div>

            <select
                className="ml-4 px-4 py-2 border rounded-md bg-gray-100"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
            >
                <option value="react">React</option>
                <option value="javascript">Javascript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
            </select>

            <select
                className="ml-2 px-4 py-2 border rounded-md bg-gray-100"
                value={industry}
                onChange={(e) => setIndustry(e.target.value as any)}
            >
                <option value="general">General</option>
                <option value="construction">Construction</option>
                <option value="finance">Finance</option>
            </select>
        </header>
    );
};

export default Header;
