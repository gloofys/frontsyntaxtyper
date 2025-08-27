// src/examples/CounterExample.tsx
import React, { useReducer } from "react";

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const reducer = (state: number, action: Action): number => {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        case "reset":
            return 0;
        default:
            return state;
    }
};

const CounterExample: React.FC = () => {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-semibold">Count: {count}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => dispatch({ type: "increment" })}
                    className="px-3 py-1 bg-green-300 text-white rounded hover:bg-green-600"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch({ type: "decrement" })}
                    className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch({ type: "reset" })}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CounterExample;
