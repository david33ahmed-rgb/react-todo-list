
import React, { useState, useEffect } from "react";

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");

        return savedTasks
            ? JSON.parse(savedTasks)
            : ["coding", "play efootball", "watch suits"];
    });

    const [newTask, setNewTask] = useState("");

    // Save tasks whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleTaskChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask.trim()]);
            setNewTask("");
        }
    }

    function removeTask(index) {
        setTasks(t => t.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];

            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];

            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];

            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];

            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <input
                type="text"
                placeholder="Enter Task Here"
                value={newTask}
                onChange={handleTaskChange}
            />

            <button onClick={addTask} className="add-btn">
                Add
            </button>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>

                        <button
                            onClick={() => removeTask(index)}
                            className="delete-btn"
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => moveTaskUp(index)}
                            className="move-btn"
                        >
                            👆
                        </button>

                        <button
                            onClick={() => moveTaskDown(index)}
                            className="move-btn"
                        >
                            👇
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;
