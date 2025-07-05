import React, { useState } from "react";

const Lab = () => {
    const [ideas, setIdeas] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddIdea = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            setIdeas([
                ...ideas,
                { id: Date.now(), title, description }
            ]);
            setTitle("");
            setDescription("");
        }
    };

    const handleRemoveIdea = (id) => {
        setIdeas(ideas.filter((idea) => idea.id !== id));
    };

    return (
        <div style={{ maxWidth: 600, margin: "40px auto" }}>
            <h2>Lab Management</h2>
            <form onSubmit={handleAddIdea} style={{ marginBottom: 24 }}>
                <input
                    type="text"
                    placeholder="Experiment/Idea Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: 8, padding: 8 }}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: 8, padding: 8 }}
                />
                <button type="submit" style={{ padding: "8px 16px" }}>
                    Add Idea
                </button>
            </form>
            <ul>
                {ideas.map((idea) => (
                    <li key={idea.id} style={{ marginBottom: 16, border: "1px solid #ccc", padding: 12, borderRadius: 6 }}>
                        <strong>{idea.title}</strong>
                        <p>{idea.description}</p>
                        <button onClick={() => handleRemoveIdea(idea.id)} style={{ color: "red" }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Lab;