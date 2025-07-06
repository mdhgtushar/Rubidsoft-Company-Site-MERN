import React, { useState } from "react";

const Lab = () => {
    const [experiments, setExperiments] = useState([
        {
            id: 1,
            title: "AI-Powered Chatbot Integration",
            description: "Research and implement AI chatbot for customer support",
            category: "AI/ML",
            status: "In Progress",
            priority: "High",
            startDate: "2024-01-10",
            estimatedCompletion: "2024-02-15",
            team: ["John Doe", "Jane Smith"],
            budget: 5000,
            progress: 65
        },
        {
            id: 2,
            title: "Blockchain Payment System",
            description: "Explore blockchain technology for secure payments",
            category: "Blockchain",
            status: "Planning",
            priority: "Medium",
            startDate: "2024-01-20",
            estimatedCompletion: "2024-03-20",
            team: ["Mike Johnson"],
            budget: 8000,
            progress: 15
        },
        {
            id: 3,
            title: "Progressive Web App Framework",
            description: "Develop a reusable PWA framework for future projects",
            category: "Web Development",
            status: "Completed",
            priority: "Low",
            startDate: "2023-12-01",
            estimatedCompletion: "2024-01-15",
            team: ["Sarah Wilson", "Alex Brown"],
            budget: 3000,
            progress: 100
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingExperiment, setEditingExperiment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const [newExperiment, setNewExperiment] = useState({
        title: "",
        description: "",
        category: "Web Development",
        status: "Planning",
        priority: "Medium",
        startDate: "",
        estimatedCompletion: "",
        team: "",
        budget: ""
    });

    const categories = ["AI/ML", "Blockchain", "Web Development", "Mobile", "IoT", "Cybersecurity"];
    const statusOptions = ["Planning", "In Progress", "Testing", "Completed", "On Hold"];
    const priorityOptions = ["Low", "Medium", "High", "Critical"];

    const filteredExperiments = experiments.filter(experiment => {
        const matchesSearch = experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || experiment.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" || experiment.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-800";
            case "In Progress": return "bg-blue-100 text-blue-800";
            case "Testing": return "bg-purple-100 text-purple-800";
            case "Planning": return "bg-yellow-100 text-yellow-800";
            case "On Hold": return "bg-red-100 text-red-800";
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

    const handleAddExperiment = () => {
        if (newExperiment.title && newExperiment.description) {
            const experiment = {
                id: experiments.length + 1,
                ...newExperiment,
                team: newExperiment.team.split(',').map(member => member.trim()),
                budget: parseFloat(newExperiment.budget) || 0,
                progress: newExperiment.status === "Completed" ? 100 : 
                         newExperiment.status === "In Progress" ? 50 : 
                         newExperiment.status === "Testing" ? 75 : 0
            };
            setExperiments([...experiments, experiment]);
            setNewExperiment({
                title: "",
                description: "",
                category: "Web Development",
                status: "Planning",
                priority: "Medium",
                startDate: "",
                estimatedCompletion: "",
                team: "",
                budget: ""
            });
            setShowAddModal(false);
        }
    };

    const handleEditExperiment = (experiment) => {
        setEditingExperiment(experiment);
        setNewExperiment({
            title: experiment.title,
            description: experiment.description,
            category: experiment.category,
            status: experiment.status,
            priority: experiment.priority,
            startDate: experiment.startDate,
            estimatedCompletion: experiment.estimatedCompletion,
            team: experiment.team.join(', '),
            budget: experiment.budget.toString()
        });
        setShowAddModal(true);
    };

    const handleUpdateExperiment = () => {
        if (editingExperiment && newExperiment.title && newExperiment.description) {
            setExperiments(experiments.map(e => 
                e.id === editingExperiment.id 
                    ? { 
                        ...e, 
                        ...newExperiment,
                        team: newExperiment.team.split(',').map(member => member.trim()),
                        budget: parseFloat(newExperiment.budget) || 0,
                        progress: newExperiment.status === "Completed" ? 100 : 
                                 newExperiment.status === "In Progress" ? 50 : 
                                 newExperiment.status === "Testing" ? 75 : 0
                    }
                    : e
            ));
            setNewExperiment({
                title: "",
                description: "",
                category: "Web Development",
                status: "Planning",
                priority: "Medium",
                startDate: "",
                estimatedCompletion: "",
                team: "",
                budget: ""
            });
            setEditingExperiment(null);
            setShowAddModal(false);
        }
    };

    const handleDeleteExperiment = (id) => {
        if (window.confirm("Are you sure you want to delete this experiment?")) {
            setExperiments(experiments.filter(e => e.id !== id));
        }
    };

    const stats = {
        total: experiments.length,
        inProgress: experiments.filter(e => e.status === "In Progress").length,
        completed: experiments.filter(e => e.status === "Completed").length,
        totalBudget: experiments.reduce((sum, e) => sum + e.budget, 0)
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Research & Development Lab</h1>
                    <p className="text-gray-600">Manage experiments, prototypes, and innovative projects</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                    <span>🧪</span>
                    <span>New Experiment</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Experiments</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🧪</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🔄</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Budget</p>
                            <p className="text-2xl font-bold text-purple-600">${stats.totalBudget.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💰</span>
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
                            placeholder="Search experiments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                                setSelectedStatus("all");
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            🔄 Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Experiments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredExperiments.map((experiment) => (
                    <div key={experiment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(experiment.status)}`}>
                                    {experiment.status}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(experiment.priority)}`}>
                                    {experiment.priority}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {experiment.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-4">
                                {experiment.description}
                            </p>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Category:</span>
                                    <span className="font-medium">{experiment.category}</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Team:</span>
                                    <span className="font-medium">{experiment.team.join(', ')}</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Budget:</span>
                                    <span className="font-medium">${experiment.budget.toLocaleString()}</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Timeline:</span>
                                    <span className="font-medium">{experiment.startDate} - {experiment.estimatedCompletion}</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-500">Progress</span>
                                    <span className="font-medium">{experiment.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            experiment.progress === 100 ? 'bg-green-500' : 
                                            experiment.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                        }`}
                                        style={{ width: `${experiment.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditExperiment(experiment)}
                                    className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteExperiment(experiment.id)}
                                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {editingExperiment ? "Edit Experiment" : "New Experiment"}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experiment Title
                                </label>
                                <input
                                    type="text"
                                    value={newExperiment.title}
                                    onChange={(e) => setNewExperiment({...newExperiment, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter experiment title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newExperiment.category}
                                    onChange={(e) => setNewExperiment({...newExperiment, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={newExperiment.status}
                                    onChange={(e) => setNewExperiment({...newExperiment, status: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    value={newExperiment.priority}
                                    onChange={(e) => setNewExperiment({...newExperiment, priority: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {priorityOptions.map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget ($)
                                </label>
                                <input
                                    type="number"
                                    value={newExperiment.budget}
                                    onChange={(e) => setNewExperiment({...newExperiment, budget: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter budget"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={newExperiment.startDate}
                                    onChange={(e) => setNewExperiment({...newExperiment, startDate: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estimated Completion
                                </label>
                                <input
                                    type="date"
                                    value={newExperiment.estimatedCompletion}
                                    onChange={(e) => setNewExperiment({...newExperiment, estimatedCompletion: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Team Members (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={newExperiment.team}
                                    onChange={(e) => setNewExperiment({...newExperiment, team: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="e.g., John Doe, Jane Smith"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newExperiment.description}
                                    onChange={(e) => setNewExperiment({...newExperiment, description: e.target.value})}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Describe the experiment, objectives, and expected outcomes..."
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={editingExperiment ? handleUpdateExperiment : handleAddExperiment}
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                {editingExperiment ? "Update" : "Create"} Experiment
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingExperiment(null);
                                    setNewExperiment({
                                        title: "",
                                        description: "",
                                        category: "Web Development",
                                        status: "Planning",
                                        priority: "Medium",
                                        startDate: "",
                                        estimatedCompletion: "",
                                        team: "",
                                        budget: ""
                                    });
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lab;