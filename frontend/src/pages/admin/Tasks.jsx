import React, { useState } from "react";

const initialTasks = [
    { id: 1, title: "Design Homepage", description: "Create homepage UI", status: "Pending" },
    { id: 2, title: "API Integration", description: "Integrate backend APIs", status: "In Progress" },
];

const statusOptions = ["Pending", "In Progress", "Completed"];

export default function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);
    const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.description) return;
        if (editingId) {
            setTasks(tasks.map(task =>
                task.id === editingId ? { ...task, ...form } : task
            ));
            setEditingId(null);
        } else {
            setTasks([
                ...tasks,
                { ...form, id: Date.now() }
            ]);
        }
        setForm({ title: "", description: "", status: "Pending" });
    };

    const handleEdit = (task) => {
        setForm({ title: task.title, description: task.description, status: task.status });
        setEditingId(task.id);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setForm({ title: "", description: "", status: "Pending" });
        }
    };

    return (
        <div className="mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Task Management</h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                    <input
                        name="title"
                        placeholder="Task Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {editingId ? "Update" : "Create"} Task
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setForm({ title: "", description: "", status: "Pending" });
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">No tasks found.</td>
                            </tr>
                        )}
                        {tasks.map(task => (
                            <tr key={task.id} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-4">{task.title}</td>
                                <td className="py-2 px-4">{task.description}</td>
                                <td className="py-2 px-4">
                                    <span className={
                                        task.status === "Completed"
                                            ? "bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold"
                                            : task.status === "In Progress"
                                                ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold"
                                                : "bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold"
                                    }>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}