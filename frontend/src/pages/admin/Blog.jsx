import React, { useState } from "react";

const initialBlogs = [
    {
        id: 1,
        title: "First Blog Post",
        author: "Admin",
        date: "2024-06-01",
        published: true,
    },
    {
        id: 2,
        title: "Second Blog Post",
        author: "Editor",
        date: "2024-06-02",
        published: false,
    },
];

export default function BlogAdmin() {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [form, setForm] = useState({ title: "", author: "", published: false });
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id === editingId ? { ...b, ...form } : b
                )
            );
            setEditingId(null);
        } else {
            setBlogs((prev) => [
                ...prev,
                {
                    ...form,
                    id: Date.now(),
                    date: new Date().toISOString().slice(0, 10),
                },
            ]);
        }
        setForm({ title: "", author: "", published: false });
    };

    const handleEdit = (blog) => {
        setForm({
            title: blog.title,
            author: blog.author,
            published: blog.published,
        });
        setEditingId(blog.id);
    };

    const handleDelete = (id) => {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setForm({ title: "", author: "", published: false });
        }
    };

    return (
        <div className="mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Blog Admin Management</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded p-4 mb-8 space-y-4"
            >
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Author</label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="published"
                        checked={form.published}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-medium">Published</label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update Blog" : "Add Blog"}
                </button>
            </form>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Author</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-center">Published</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="border-t">
                            <td className="py-2 px-4">{blog.title}</td>
                            <td className="py-2 px-4">{blog.author}</td>
                            <td className="py-2 px-4">{blog.date}</td>
                            <td className="py-2 px-4 text-center">
                                {blog.published ? (
                                    <span className="text-green-600 font-semibold">Yes</span>
                                ) : (
                                    <span className="text-gray-400">No</span>
                                )}
                            </td>
                            <td className="py-2 px-4 text-center space-x-2">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {blogs.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-400">
                                No blogs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}