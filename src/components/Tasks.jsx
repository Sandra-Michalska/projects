import { useState, useEffect } from 'react';
import NewTask from './NewTask.jsx';

export default function Tasks({ tasks, selectedProjectId, onAddTask, onDeleteTask }) {
    const [selectedProjectTasks, setSelectedProjectTasks] = useState([]);

    useEffect(() => {
        const selectedTasks = tasks.filter(task => task.projectId === selectedProjectId) || [];
        setSelectedProjectTasks(selectedTasks);
    }, [tasks, selectedProjectId]);

    return (
        <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <NewTask onAddTask={onAddTask} />
        {selectedProjectTasks.length === 0 && (
            <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
            </p>
        )}
        {selectedProjectTasks.length > 0 && (
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {selectedProjectTasks.map((task) => (
                <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                    className="text-stone-700 hover:text-red-500"
                    onClick={() => onDeleteTask(task.id)}
                >
                    Clear
                </button>
                </li>
            ))}
            </ul>
        )}
        </section>
    );
}