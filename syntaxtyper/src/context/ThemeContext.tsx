import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
    theme: Theme;
    setTheme: (t: Theme) => void;
    resolvedTheme: "light" | "dark"; // actual applied theme
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "system");
    const media = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), []);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement.classList;
        const dark = t === "dark" || (t === "system" && media.matches);
        root.toggle("dark", dark);
    };

    // initial + on changes
    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // respond to OS changes when in 'system'
    useEffect(() => {
        const onChange = () => theme === "system" && applyTheme("system");
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [media, theme]);

    // cross-tab sync
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === "theme" && e.newValue) setThemeState(e.newValue as Theme);
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const setTheme = (t: Theme) => setThemeState(t);

    const resolvedTheme: "light" | "dark" = (theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme) as any;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
};
