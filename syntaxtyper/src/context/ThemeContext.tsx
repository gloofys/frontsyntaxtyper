import React, {createContext, useState, useContext} from "react";


interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {
    },
});

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

// 4) (Optional) a convenience hook
export const useTheme = () => useContext(ThemeContext);
