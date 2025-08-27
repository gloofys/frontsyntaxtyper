import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface HeaderProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({selectedLanguage, onLanguageChange}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;
        onLanguageChange(newLanguage);

        const { pathname } = location;
        const parts = pathname.split("/");
        if (parts.length > 1) {
            parts[1] = newLanguage;
            const newPath = parts.join("/") || `/${newLanguage}`;
            navigate(newPath);
        } else {
            navigate(`/${newLanguage}`);
        }
    };

    return (
        <header className="w-full bg-gray-500 p-4 flex justify-center items-center">
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold">Syntax Typer</h1>
                <nav className="ml-4">
                    <Link to={`/${selectedLanguage}/lessons`} className="text-white mx-2 hover:underline">
                        Lessons
                    </Link>
                    <Link to={`/${selectedLanguage}/challenges`} className="text-white mx-2 hover:underline">
                        Challenges
                    </Link>
                </nav>
            </div>
            <select
                className="ml-4 px-4 py-2 border rounded-md text-white-400 bg-gray-100"
                value={selectedLanguage}
                onChange={handleLanguageChange}
            >
                <option value="react">React</option>
                <option value="javascript">Javascript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
            </select>
        </header>
    );
};

export default Header;