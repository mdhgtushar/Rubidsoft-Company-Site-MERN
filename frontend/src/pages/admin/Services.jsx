import React from "react";
import { useState } from "react";
const initialServices = [
    {
        title: "Project Planning",
        description:
            "Detailed planning and strategizing for successful project execution from concept to launch.",
    },
    {
        title: "Bug Fixing & Feature Additions",
        description:
            "Efficient identification and resolution of issues, along with seamless integration of new functionalities.",
    },
    {
        title: "Backend Development",
        description:
            "Building robust, scalable, and secure server-side logic and APIs for your applications.",
    },
    {
        title: "Frontend Development",
        description:
            "Crafting intuitive and visually appealing user interfaces from design mockups (PSD to HTML / HTML to React).",
    },
    {
        title: "Website Development",
        description:
            "Creating dynamic and responsive websites using popular platforms and frameworks (WordPress, MERN, PHP).",
    },
    {
        title: "Web App Development (MERN)",
        description:
            "Developing full-fledged web applications with the MongoDB, Express.js, React, Node.js stack.",
    },
    {
        title: "SaaS Development",
        description:
            "Building multi-tenant, scalable Software as a Service solutions tailored to your business needs.",
    },
    {
        title: "WHMCS Development",
        description:
            "Customizing and extending WHMCS for billing, client management, and automation.",
    },
];

const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "12px 0",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
};

const gridItemStyle = {
    flex: "1 1 300px",
    minWidth: "300px",
    maxWidth: "32%",
    boxSizing: "border-box",
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "4px 0 12px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
};

const buttonStyle = {
    marginRight: "8px",
    padding: "6px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.95rem",
};

const deleteButtonStyle = {
    ...buttonStyle,
    background: "#d32f2f",
};

const ServicesAdminPage = () => {
    const [services, setServices] = useState(initialServices);
    const [editIdx, setEditIdx] = useState(null);
    const [editData, setEditData] = useState({ title: "", description: "" });
    const [newService, setNewService] = useState({ title: "", description: "" });

    const handleEdit = (idx) => {
        setEditIdx(idx);
        setEditData(services[idx]);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSave = (idx) => {
        const updated = [...services];
        updated[idx] = editData;
        setServices(updated);
        setEditIdx(null);
    };

    const handleEditCancel = () => {
        setEditIdx(null);
    };

    const handleDelete = (idx) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            setServices(services.filter((_, i) => i !== idx));
        }
    };

    const handleNewChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleAddService = (e) => {
        e.preventDefault();
        if (!newService.title.trim() || !newService.description.trim()) return;
        setServices([...services, newService]);
        setNewService({ title: "", description: "" });
    };

    return (
        <div style={{ padding: "32px" }}>
            <h2 style={{ marginBottom: "24px" }}>Services Admin</h2>
            <form onSubmit={handleAddService} style={{ marginBottom: "32px", maxWidth: 600 }}>
                <h3>Add New Service</h3>
                <input
                    style={inputStyle}
                    name="title"
                    placeholder="Title"
                    value={newService.title}
                    onChange={handleNewChange}
                />
                <textarea
                    style={{ ...inputStyle, minHeight: 60 }}
                    name="description"
                    placeholder="Description"
                    value={newService.description}
                    onChange={handleNewChange}
                />
                <button style={buttonStyle} type="submit">
                    Add Service
                </button>
            </form>
            <div style={gridContainerStyle}>
                {services.map((service, idx) => (
                    <div style={gridItemStyle} key={idx}>
                        <div style={cardStyle}>
                            {editIdx === idx ? (
                                <>
                                    <input
                                        style={inputStyle}
                                        name="title"
                                        value={editData.title}
                                        onChange={handleEditChange}
                                    />
                                    <textarea
                                        style={{ ...inputStyle, minHeight: 60 }}
                                        name="description"
                                        value={editData.description}
                                        onChange={handleEditChange}
                                    />
                                    <button style={buttonStyle} onClick={() => handleEditSave(idx)}>
                                        Save
                                    </button>
                                    <button style={deleteButtonStyle} onClick={handleEditCancel}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 style={{ margin: "0 0 12px 0" }}>{service.title}</h3>
                                    <p style={{ color: "#555", margin: 0 }}>{service.description}</p>
                                    <div style={{ marginTop: 16 }}>
                                        <button style={buttonStyle} onClick={() => handleEdit(idx)}>
                                            Edit
                                        </button>
                                        <button style={deleteButtonStyle} onClick={() => handleDelete(idx)}>
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesAdminPage;