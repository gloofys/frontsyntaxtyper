import React from 'react';

export interface ProgressProps {
    value: number;
    max?: number;
    showPercentage?: boolean;
    className?: string;
    bgColorClass?: string;
    fillColorClass?: string;
    heightClass?: string;
}

const Progress: React.FC<ProgressProps> = ({
                                               value,
                                               max = 100,
                                               showPercentage = false,
                                               className = '',
                                               bgColorClass = 'bg-gray-200',
                                               fillColorClass = 'bg-blue-500',
                                               heightClass = 'h-2',
                                           }) => {
    const pct = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div
            className={`relative w-full ${bgColorClass} ${heightClass} rounded-full overflow-hidden ${className}`}
        >
            <div
                className={`${fillColorClass} h-full transition-width duration-300 ease-in-out`}
                style={{ width: `${pct}%` }}
            />
            {showPercentage && (
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
          {Math.round(pct)}%
        </span>
            )}
        </div>
    );
};

export default Progress;
