import React, { useEffect, useState } from "react";

const mockClients = [
    { _id: "1", name: "Alice Johnson", email: "alice@example.com", company: "Acme Corp" },
    { _id: "2", name: "Bob Smith", email: "bob@example.com", company: "Globex Inc" },
    { _id: "3", name: "Charlie Lee", email: "charlie@example.com", company: "Initech" },
];

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with mock data
        setTimeout(() => {
            setClients(mockClients);
            setLoading(false);
        }, 800);
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg font-medium text-gray-500">Loading...</div>
            </div>
        );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6"></div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Client List</h2>
                <div className="overflow-x-auto"></div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Company
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {clients.map((client) => (
                                <tr key={client._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {client.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {client.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {client.company}
                                    </td>
                                </tr>
                            ))}
                            {clients.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-gray-400">
                                        No clients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div> 
    );
};

export default ClientList;