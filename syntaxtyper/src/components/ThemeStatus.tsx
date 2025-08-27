import React from "react";
import { useTheme } from "../context/ThemeContext.tsx";

export const ThemeStatus: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const bgColor = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
    const border = theme === "dark" ? "border-white" : "border-black";

    return (
        <div className={`p-4 rounded border ${bgColor} ${border}`}>
            <p className="mb-2">Current theme: {theme}</p>
            <button
                onClick={toggleTheme}
                className="px-4 py-1 rounded border border-current hover:opacity-80"
            >
                Toggle Theme
            </button>
        </div>
    );
};
