import React from "react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

// Inner component that consumes context and renders the button
const ThemeInner: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const bgColor = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
    const border = theme === "dark" ? "border-white" : "border-black";

    return (
        <div className={`p-4 rounded border ${bgColor} ${border}`}>
            <p>Current theme: {theme}</p>
            <button
                onClick={toggleTheme}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Toggle Theme
            </button>
        </div>
    );
};

// Wrapper that provides context and displays the inner component
const ThemeToggler: React.FC = () => (
    <ThemeProvider>
        <ThemeInner />
    </ThemeProvider>
);

export default ThemeToggler;
