import React from "react";

interface WPMProps {
    time:number;
    charCount:number;
}

const WPM: React.FC<WPMProps> = ({ time, charCount}) => {
    const minutes = time/60;
    const cpm = minutes > 0 ? Math.round(charCount / minutes) : 0;

    return <div className="text-xl font-bold">Characters per minute: {cpm}</div>;
}

export default WPM;