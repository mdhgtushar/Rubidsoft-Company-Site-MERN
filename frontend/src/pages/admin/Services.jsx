import React, { useState, useEffect } from "react";
import { serviceService } from "../../services/apiService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [newService, setNewService] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    icon: "",
    image: "",
    features: [],
    pricing: {
      basic: { name: "Basic", price: 0, features: [] },
      professional: { name: "Professional", price: 0, features: [], popular: false },
      enterprise: { name: "Enterprise", price: 0, features: [] }
    },
    isActive: true,
    isFeatured: false,
    order: 1
  });

  const categoryOptions = ["web-development", "mobile-development", "ui-ux-design", "digital-marketing", "consulting"];
  const statusOptions = ["active", "inactive"];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceService.getAllServices();
        setServices(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again.');
        setServices([]); // Defensive fallback
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || (service.isActive ? "active" : "inactive") === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddService = async () => {
    try {
      await serviceService.createService(newService);
      setShowAddModal(false);
      setNewService({
        title: "",
        shortDescription: "",
        description: "",
        category: "",
        icon: "",
        image: "",
        features: [],
        pricing: {
          basic: { name: "Basic", price: 0, features: [] },
          professional: { name: "Professional", price: 0, features: [], popular: false },
          enterprise: { name: "Enterprise", price: 0, features: [] }
        },
        isActive: true,
        isFeatured: false,
        order: 1
      });
      // Refresh the services list
      const response = await serviceService.getAllServices();
      setServices(Array.isArray(response.data.data) ? response.data.data : []);
      alert('Service added successfully!');
    } catch (err) {
      console.error('Error adding service:', err);
      alert('Failed to add service. Please try again.');
    }
  };

  const handleEditService = async () => {
    try {
      await serviceService.updateService(selectedService._id, selectedService);
      setShowEditModal(false);
      setSelectedService(null);
      // Refresh the services list
      const response = await serviceService.getAllServices();
      setServices(Array.isArray(response.data.data) ? response.data.data : []);
      alert('Service updated successfully!');
    } catch (err) {
      console.error('Error updating service:', err);
      alert('Failed to update service. Please try again.');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await serviceService.deleteService(id);
        setServices(services.filter(service => service._id !== id));
        alert('Service deleted successfully!');
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await serviceService.toggleActive(id);
      setServices(services.map(service => 
        service._id === id ? { ...service, isActive: !currentStatus } : service
      ));
    } catch (err) {
      console.error('Error toggling service status:', err);
      alert('Failed to update service status. Please try again.');
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await serviceService.toggleFeatured(id);
      setServices(services.map(service => 
        service._id === id ? { ...service, isFeatured: !currentStatus } : service
      ));
    } catch (err) {
      console.error('Error toggling featured status:', err);
      alert('Failed to update featured status. Please try again.');
    }
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    featured: services.filter(s => s.isFeatured).length,
    webDevelopment: services.filter(s => s.category === "web-development").length,
    mobileDevelopment: services.filter(s => s.category === "mobile-development").length,
    design: services.filter(s => s.category === "ui-ux-design").length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              {categoryOptions.map(category => (
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
          <div key={service._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  service.isActive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {service.shortDescription}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{service.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-green-600">{service.pricing?.basic?.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{service.pricing?.basic?.name}</span>
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
                  onClick={() => {
                    setSelectedService(service);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
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
              {showEditModal ? "Edit Service" : "Add New Service"}
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
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newService.isActive ? "active" : "inactive"}
                  onChange={(e) => setNewService({...newService, isActive: e.target.value === "active"})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={newService.pricing?.basic?.price}
                  onChange={(e) => setNewService({...newService, pricing: {
                    ...newService.pricing,
                    basic: { ...newService.pricing.basic, price: parseFloat(e.target.value) }
                  }})}
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
                  value={newService.pricing?.basic?.name}
                  onChange={(e) => setNewService({...newService, pricing: {
                    ...newService.pricing,
                    basic: { ...newService.pricing.basic, name: e.target.value }
                  }})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Basic"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={newService.features.join(', ')}
                  onChange={(e) => setNewService({...newService, features: e.target.value.split(',').map(f => f.trim())})}
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
                onClick={showEditModal ? handleEditService : handleAddService}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {showEditModal ? "Update" : "Add"} Service
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedService(null);
                  setNewService({
                    title: "",
                    shortDescription: "",
                    description: "",
                    category: "",
                    icon: "",
                    image: "",
                    features: [],
                    pricing: {
                      basic: { name: "Basic", price: 0, features: [] },
                      professional: { name: "Professional", price: 0, features: [], popular: false },
                      enterprise: { name: "Enterprise", price: 0, features: [] }
                    },
                    isActive: true,
                    isFeatured: false,
                    order: 1
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