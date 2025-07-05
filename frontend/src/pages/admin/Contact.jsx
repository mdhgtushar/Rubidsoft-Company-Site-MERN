import React, { useEffect, useState } from "react";

const mockContacts = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I have a question.",
        date: "2024-06-01",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        message: "Can you help me with your service?",
        date: "2024-06-02",
    },
];

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Replace with API call in production
        setContacts(mockContacts);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            setContacts(contacts.filter((c) => c.id !== id));
        }
    };

    const filteredContacts = contacts.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="border rounded px-3 py-2 w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span className="text-gray-500">{filteredContacts.length} contacts</span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Message</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No contacts found.
                                </td>
                            </tr>
                        ) : (
                            filteredContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{contact.name}</td>
                                    <td className="py-2 px-4 border-b">{contact.email}</td>
                                    <td className="py-2 px-4 border-b">{contact.message}</td>
                                    <td className="py-2 px-4 border-b">{contact.date}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contact;