import React from "react";

interface AccuracyProps {
    correctChars: number;
    totalChars:number;
}

const Accuracy: React.FC<AccuracyProps> = ({ correctChars, totalChars}) => {
    const accuracy = totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(2) : "100";

    return <div className="text-xl font-bold">Accuracy: {accuracy}%</div>;
}

export default Accuracy;