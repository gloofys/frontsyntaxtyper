import React, { useReducer, createContext, useContext, useState } from "react";

// Types
type Task = { id: number; text: string; completed: boolean };
type Action =
    | { type: "add"; text: string }
    | { type: "toggle"; id: number }
    | { type: "remove"; id: number };

// Context
const TaskContext = createContext<{ tasks: Task[]; dispatch: React.Dispatch<Action> } | null>(null);

// Reducer
const reducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), text: action.text, completed: false }];
        case "toggle":
            return state.map(task =>
                task.id === action.id ? { ...task, completed: !task.completed } : task
            );
        case "remove":
            return state.filter(task => task.id !== action.id);
        default:
            return state;
    }
};

// Provider
const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, dispatch] = useReducer(reducer, []);
    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook
const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used inside TaskProvider");
    return context;
};

// Inner UI
const TaskApp: React.FC = () => {
    const { tasks, dispatch } = useTasks();
    const [text, setText] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="New task"
                    className="border rounded px-2 py-1"
                />
                <button
                    onClick={() => {
                        if (text.trim()) {
                            dispatch({ type: "add", text });
                            setText("");
                        }
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-1 text-left">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-center justify-between border-b py-1"
                    >
                        <span
                            className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                            onClick={() => dispatch({ type: "toggle", id: task.id })}
                        >
                            {task.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: "remove", id: task.id })}
                            className="text-red-500 hover:underline text-sm"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exported Preview Component
const TaskExample: React.FC = () => {
    return (
        <TaskProvider>
            <div className="p-4 border rounded-md bg-gray-50 text-sm">
                <h4 className="text-lg font-semibold mb-2">Task Manager</h4>
                <TaskApp />
            </div>
        </TaskProvider>
    );
};

export default TaskExample;
