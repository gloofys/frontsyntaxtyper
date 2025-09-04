// src/components/Header.tsx
import React from "react";
import {Link, useLocation, useNavigate, matchPath} from "react-router-dom";
import {useIndustry} from "../context/IndustryContext";
import ThemeToggle from "./ThemeToggle.tsx";


const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {industry, setIndustry} = useIndustry();

    const currentLang =
        location.pathname.split("/").filter(Boolean)[0] || "react"; // "/react/lessons" -> "react"

    const isLessonDetail = (pathname: string) => {
        return Boolean(
            matchPath({ path: "/:language/lesson/:lessonId" }, pathname) ||
            matchPath({ path: "/:language/:category/lesson/:lessonId" }, pathname)
        );
    };

    const replaceLang = (path: string, newLang: string) => {
        if (isLessonDetail(path)) {
            // if currently viewing a lesson, jump to the new language's lessons list
            return `/${newLang}/lessons`;
        }
        const parts = path.split("/").filter(Boolean);
        const tail = parts.slice(1).join("/") || "lessons";
        return `/${newLang}/${tail}`;
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value.toLowerCase();
        navigate(replaceLang(location.pathname, newLang));
    };

    return (
        <header className="w-full bg-gray-500 p-4 flex justify-center items-center">
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold">Syntax Typer</h1>
                <nav className="ml-4">
                    <Link to={`/${currentLang}/lessons`} className="text-white mx-2 hover:underline">
                        Lessons
                    </Link>
                    <Link to={`/${currentLang}/challenges`} className="text-white mx-2 hover:underline">
                        Challenges
                    </Link>
                </nav>
            </div>

            <select
                className="ml-4 px-4 py-2 border rounded-md bg-gray-100"
                value={currentLang}
                onChange={handleLanguageChange}
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
            <ThemeToggle />
        </header>
    );
};

export default Header;
