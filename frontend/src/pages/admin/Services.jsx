import React, { useState } from "react";

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Project Planning",
      description: "Detailed planning and strategizing for successful project execution from concept to launch.",
      category: "Planning",
      price: "$500",
      duration: "1-2 weeks",
      status: "Active",
      features: ["Requirements Analysis", "Timeline Creation", "Resource Planning", "Risk Assessment"],
      icon: "📋"
    },
    {
      id: 2,
      title: "Bug Fixing & Feature Additions",
      description: "Efficient identification and resolution of issues, along with seamless integration of new functionalities.",
      category: "Maintenance",
      price: "$200",
      duration: "1-3 days",
      status: "Active",
      features: ["Bug Identification", "Code Review", "Testing", "Deployment"],
      icon: "🔧"
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Building robust, scalable, and secure server-side logic and APIs for your applications.",
      category: "Development",
      price: "$2000",
      duration: "2-4 weeks",
      status: "Active",
      features: ["API Development", "Database Design", "Security Implementation", "Performance Optimization"],
      icon: "⚙️"
    },
    {
      id: 4,
      title: "Frontend Development",
      description: "Crafting intuitive and visually appealing user interfaces from design mockups (PSD to HTML / HTML to React).",
      category: "Development",
      price: "$1500",
      duration: "2-3 weeks",
      status: "Active",
      features: ["UI/UX Implementation", "Responsive Design", "Cross-browser Compatibility", "Performance Optimization"],
      icon: "🎨"
    },
    {
      id: 5,
      title: "Website Development",
      description: "Creating dynamic and responsive websites using popular platforms and frameworks (WordPress, MERN, PHP).",
      category: "Development",
      price: "$3000",
      duration: "3-6 weeks",
      status: "Active",
      features: ["Custom Design", "CMS Integration", "SEO Optimization", "Mobile Responsive"],
      icon: "🌐"
    },
    {
      id: 6,
      title: "Web App Development (MERN)",
      description: "Developing full-fledged web applications with the MongoDB, Express.js, React, Node.js stack.",
      category: "Development",
      price: "$5000",
      duration: "4-8 weeks",
      status: "Active",
      features: ["Full-stack Development", "Database Integration", "User Authentication", "Real-time Features"],
      icon: "🚀"
    },
    {
      id: 7,
      title: "SaaS Development",
      description: "Building multi-tenant, scalable Software as a Service solutions tailored to your business needs.",
      category: "Enterprise",
      price: "$10000",
      duration: "8-12 weeks",
      status: "Active",
      features: ["Multi-tenancy", "Subscription Management", "Analytics Dashboard", "API Integration"],
      icon: "☁️"
    },
    {
      id: 8,
      title: "WHMCS Development",
      description: "Customizing and extending WHMCS for billing, client management, and automation.",
      category: "Customization",
      price: "$800",
      duration: "1-2 weeks",
      status: "Inactive",
      features: ["Module Development", "API Integration", "Custom Reports", "Automation Scripts"],
      icon: "💳"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [newService, setNewService] = useState({
    title: "",
    description: "",
    category: "Development",
    price: "",
    duration: "",
    status: "Active",
    features: ""
  });

  const categories = ["Planning", "Development", "Maintenance", "Enterprise", "Customization"];
  const statusOptions = ["Active", "Inactive"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || service.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddService = () => {
    if (newService.title && newService.description) {
      const service = {
        id: services.length + 1,
        ...newService,
        features: newService.features.split(',').map(feature => feature.trim()),
        icon: "📦"
      };
      setServices([...services, service]);
      setNewService({
        title: "",
        description: "",
        category: "Development",
        price: "",
        duration: "",
        status: "Active",
        features: ""
      });
      setShowAddModal(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      status: service.status,
      features: service.features.join(', ')
    });
    setShowAddModal(true);
  };

  const handleUpdateService = () => {
    if (editingService && newService.title && newService.description) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { 
              ...s, 
              ...newService,
              features: newService.features.split(',').map(feature => feature.trim())
            }
          : s
      ));
      setNewService({
        title: "",
        description: "",
        category: "Development",
        price: "",
        duration: "",
        status: "Active",
        features: ""
      });
      setEditingService(null);
      setShowAddModal(false);
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === "Active").length,
    inactive: services.filter(s => s.status === "Inactive").length,
    categories: [...new Set(services.map(s => s.category))].length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage your service offerings and pricing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Service</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Services</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏸️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-blue-600">{stats.categories}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📂</span>
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  service.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {service.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{service.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-green-600">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      +{service.features.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
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
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={newService.status}
                  onChange={(e) => setNewService({...newService, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., $500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2-4 weeks"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={newService.features}
                  onChange={(e) => setNewService({...newService, features: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter service description"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={editingService ? handleUpdateService : handleAddService}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingService ? "Update" : "Add"} Service
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingService(null);
                  setNewService({
                    title: "",
                    description: "",
                    category: "Development",
                    price: "",
                    duration: "",
                    status: "Active",
                    features: ""
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

export default Services;