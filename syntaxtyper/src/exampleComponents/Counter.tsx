
import React, { useState } from "react";

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="p-4 bg-gray-50 rounded">
            <p>You clicked {count} times</p>
            <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => setCount(count + 1)}
            >
                Click me
            </button>
        </div>
    );
};

export default Counter;
