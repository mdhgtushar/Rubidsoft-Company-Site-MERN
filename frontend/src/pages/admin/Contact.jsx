import React, { useState, useEffect } from "react";

const Contact = () => {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
            subject: "Website Development Inquiry",
            message: "Hello, I'm interested in getting a new website developed for my business. Could you please provide more information about your services and pricing?",
            date: "2024-01-15",
            status: "New",
            priority: "High",
            source: "Website Contact Form"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1 (555) 234-5678",
            subject: "Mobile App Development",
            message: "I need a mobile app developed for my startup. Looking for a reliable development team with experience in React Native.",
            date: "2024-01-14",
            status: "In Progress",
            priority: "Medium",
            source: "Email"
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1 (555) 345-6789",
            subject: "Consultation Request",
            message: "Would like to schedule a consultation to discuss our project requirements and get a quote.",
            date: "2024-01-13",
            status: "Responded",
            priority: "Low",
            source: "Phone Call"
        },
        {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah@example.com",
            phone: "+1 (555) 456-7890",
            subject: "Bug Fix Request",
            message: "There's a bug in our existing website that needs to be fixed urgently. Can you help?",
            date: "2024-01-12",
            status: "Resolved",
            priority: "High",
            source: "Support Ticket"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const statusOptions = ["New", "In Progress", "Responded", "Resolved"];
    const priorityOptions = ["Low", "Medium", "High", "Critical"];

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus;
        const matchesPriority = selectedPriority === "all" || contact.priority === selectedPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "New": return "bg-blue-100 text-blue-800";
            case "In Progress": return "bg-yellow-100 text-yellow-800";
            case "Responded": return "bg-green-100 text-green-800";
            case "Resolved": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Critical": return "bg-red-100 text-red-800";
            case "High": return "bg-orange-100 text-orange-800";
            case "Medium": return "bg-yellow-100 text-yellow-800";
            case "Low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setContacts(contacts.map(contact => 
            contact.id === id ? { ...contact, status: newStatus } : contact
        ));
    };

    const handleDeleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            setContacts(contacts.filter(contact => contact.id !== id));
        }
    };

    const handleViewDetails = (contact) => {
        setSelectedContact(contact);
        setShowDetailsModal(true);
    };

    const stats = {
        total: contacts.length,
        new: contacts.filter(c => c.status === "New").length,
        inProgress: contacts.filter(c => c.status === "In Progress").length,
        resolved: contacts.filter(c => c.status === "Resolved").length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
                    <p className="text-gray-600">Manage incoming inquiries and support requests</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        📧 Export Contacts
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        📊 Analytics
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📞</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">New</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🆕</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🔄</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Resolved</p>
                            <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Priority</option>
                            {priorityOptions.map(priority => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedStatus("all");
                                setSelectedPriority("all");
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            🔄 Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {contact.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                                <div className="text-sm text-gray-500">{contact.email}</div>
                                                <div className="text-xs text-gray-400">{contact.phone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{contact.subject}</div>
                                            <div className="text-sm text-gray-500 line-clamp-2">{contact.message}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={contact.status}
                                            onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(contact.status)}`}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(contact.priority)}`}>
                                            {contact.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewDetails(contact)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ View
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContact(contact.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Contact Details Modal */}
            {showDetailsModal && selectedContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <p className="text-sm text-gray-900">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                    <p className="text-sm text-gray-900">{selectedContact.source}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <p className="text-sm text-gray-900">{selectedContact.date}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedContact.priority)}`}>
                                        {selectedContact.priority}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <p className="text-sm text-gray-900">{selectedContact.subject}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={selectedContact.status}
                                    onChange={(e) => {
                                        handleStatusChange(selectedContact.id, e.target.value);
                                        setSelectedContact({...selectedContact, status: e.target.value});
                                    }}
                                    className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`, '_blank')}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                📧 Reply via Email
                            </button>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;