import React from "react";
import { useTheme } from "../context/ThemeContext";

const Sun = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07 3.51 20.49M20.49 3.51l-1.42 1.42" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
);

const Moon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ThemeToggle: React.FC = () => {
    const { theme, setTheme, resolvedTheme } = useTheme(); // theme: 'light' | 'dark' | 'system'
    const isSystem = theme === "system";

    const lightActive = theme === "light" || (isSystem && resolvedTheme === "light");
    const darkActive  = theme === "dark"  || (isSystem && resolvedTheme === "dark");

    const onLight = () => setTheme(theme === "light" ? "system" : "light");
    const onDark  = () => setTheme(theme === "dark"  ? "system" : "dark");

    return (
        <div
            className="ml-2 inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur"
            role="group"
            aria-label="Theme"
        >
            <button
                type="button"
                onClick={onLight}
                className={[
                    "px-3 py-2 flex items-center gap-2",
                    lightActive ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100" : "text-slate-600 dark:text-slate-300",
                    "hover:bg-slate-200/80 dark:hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ].join(" ")}
                aria-pressed={theme === "light"}
                title={isSystem ? "Light (Auto via system)" : theme === "light" ? "Light (click to set Auto)" : "Switch to Light"}
            >
                <Sun className="h-4 w-4"/>
                <span className="hidden sm:inline text-sm">Light</span>
            </button>

            <button
                type="button"
                onClick={onDark}
                className={[
                    "px-3 py-2 flex items-center gap-2",
                    darkActive ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100" : "text-slate-600 dark:text-slate-300",
                    "hover:bg-slate-200/80 dark:hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ].join(" ")}
                aria-pressed={theme === "dark"}
                title={isSystem ? "Dark (Auto via system)" : theme === "dark" ? "Dark (click to set Auto)" : "Switch to Dark"}
            >
                <Moon className="h-4 w-4"/>
                <span className="hidden sm:inline text-sm">Dark</span>
            </button>
        </div>
    );
};

export default ThemeToggle;
