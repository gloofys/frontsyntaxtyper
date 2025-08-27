import React, {useState, useEffect} from "react";

interface TimerProps {
    isRunning: boolean;
    onTimeUpdate: (time: number) => void;
    isCompleted: boolean;
}

const Timer: React.FC<TimerProps> = ({isRunning, onTimeUpdate, isCompleted}) => {
    const [time, setTime] = useState(0);
    const [finalTime, setFinalTime] = useState<number | null>(null);

    useEffect(() => {
        let interval: number | undefined;
        if (isRunning) {
            interval = window.setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;
                    onTimeUpdate(newTime);
                    return newTime;
                });
            }, 1000);
        }
        return () => {
            if (interval !== undefined) clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if(isCompleted && time > 0) {
            setFinalTime(time);
        }
    }, [isCompleted]);


    return <div className="text-xl font-bold">Time: {finalTime !== null ? finalTime : time}s</div>;
};

export default Timer;
