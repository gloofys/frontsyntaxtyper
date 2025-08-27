// src/examples/Timer.tsx
import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="p-4 bg-gray-50 rounded">
            <p>Seconds passed: {seconds}</p>
        </div>
    );
};

export default Timer;
