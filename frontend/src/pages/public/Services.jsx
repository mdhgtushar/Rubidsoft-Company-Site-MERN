import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceService } from "../../services/apiService";
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  ArrowRight,
  Star
} from "lucide-react";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await serviceService.getAllServices({ 
        published: true,
        featured: false,
        limit: 50 
      });
      
      setServices(response.data.data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = () => {
    const categories = [...new Set(services.map(service => service.category))];
    return categories.filter(category => category);
  };

  const filteredServices = filterCategory === "all" 
    ? services 
    : services.filter(service => service.category === filterCategory);

  const getServiceIcon = (category) => {
    const icons = {
      "Strategy": "📋",
      "Development": "⚙️",
      "Design": "🎨",
      "Maintenance": "🔧",
      "Enterprise": "🏢",
      "Consultation": "💡",
      "default": "🚀"
    };
    return icons[category] || icons.default;
  };

  const formatPrice = (price) => {
    if (!price) return "Contact for pricing";
    if (typeof price === 'string') return price;
    if (typeof price === 'number') return `$${price.toLocaleString()}`;
    return "Contact for pricing";
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Services</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer comprehensive web development and digital solutions to help your business grow.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-4xl text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Services</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer comprehensive web development and digital solutions to help your business grow.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchServices}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We offer comprehensive web development and digital solutions to help your business grow.
          </p>
        </div>

        {/* Filter Categories */}
        {getCategories().length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-slate-100">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterCategory === "all"
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                All Services
              </button>
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filterCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedService(service)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{getServiceIcon(service.category)}</span>
                    </div>
                    {service.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">{service.category}</p>
                  <p className="text-slate-600 mb-4 line-clamp-3">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{formatPrice(service.pricing)}</span>
                    </div>
                    {service.timeline && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{service.timeline}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {service.features && service.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertCircle className="mx-auto text-4xl text-slate-400 mb-4" />
            <p className="text-slate-600">No services found in this category.</p>
          </div>
        )}

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{getServiceIcon(selectedService.category)}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{selectedService.title}</h2>
                      <p className="text-blue-600 font-medium">{selectedService.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Service Overview</h3>
                    <p className="text-slate-600 mb-4">{selectedService.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Pricing:</span>
                        <span className="text-sm font-semibold text-slate-800">
                          {formatPrice(selectedService.pricing)}
                        </span>
                      </div>
                      {selectedService.timeline && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Timeline:</span>
                          <span className="text-sm font-semibold text-slate-800">{selectedService.timeline}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Category:</span>
                        <span className="text-sm font-semibold text-slate-800">{selectedService.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features</h3>
                    <div className="space-y-2">
                      {selectedService.features && selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedService.process && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Our Process</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedService.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm text-slate-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex space-x-4">
                  <Link
                    to={`/service/${selectedService.slug}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-center shadow-lg"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Web Development Project?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
            Let's discuss your requirements and create a custom web solution that fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/order-form"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 