import { useState, useEffect } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme === "true") setDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleComplete = (index) => {
        setTasks(tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t));
    };

    const updateTask = (index, newText) => {
        setTasks(tasks.map((t, i) => i === index ? { ...t, text: newText } : t));
        setEditingIndex(null);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className={darkMode ? "dark" : "light"}>
            <h2>To-Do List</h2>
            <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <input
                type="text"
                placeholder="Add a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>
            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(index)} />
                        {editingIndex === index ? (
                            <input type="text" value={t.text} onChange={(e) => updateTask(index, e.target.value)} />
                        ) : (
                            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.text}</span>
                        )}
                        <button onClick={() => setEditingIndex(index)}>Edit</button>
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
