// src/context/IndustryContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Industry } from "../data/lessons/Lesson";

const Ctx = createContext<{industry: Industry; setIndustry: (v: Industry)=>void} | undefined>(undefined);

export const IndustryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [industry, setIndustryState] = useState<Industry>("general");

    useEffect(() => {
        const saved = localStorage.getItem("industry") as Industry | null;
        if (saved) setIndustryState(saved);
    }, []);

    const setIndustry = (v: Industry) => {
        setIndustryState(v);
        localStorage.setItem("industry", v);
    };

    return <Ctx.Provider value={{ industry, setIndustry }}>{children}</Ctx.Provider>;
};

export const useIndustry = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useIndustry must be used within IndustryProvider");
    return v;
};
