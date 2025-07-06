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
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
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
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
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
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We offer comprehensive web development and digital solutions to help your business grow.
          </p>
        </div>

        {/* Filter Categories */}
        {getCategories().length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filterCategory === "all"
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Services
              </button>
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filterCategory === category
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
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
                className="bg-white rounded-lg shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{getServiceIcon(service.category)}</div>
                    {service.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{service.category}</p>
                  <p className="text-slate-600 mb-4 line-clamp-3">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{formatPrice(service.pricing)}</span>
                    </div>
                    {service.timeline && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{service.timeline}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {service.features && service.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
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
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{getServiceIcon(selectedService.category)}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedService.title}</h2>
                      <p className="text-slate-600">{selectedService.category}</p>
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Overview</h3>
                    <p className="text-slate-600 mb-4">{selectedService.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Pricing:</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {formatPrice(selectedService.pricing)}
                        </span>
                      </div>
                      {selectedService.timeline && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Timeline:</span>
                          <span className="text-sm font-semibold text-slate-900">{selectedService.timeline}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Category:</span>
                        <span className="text-sm font-semibold text-slate-900">{selectedService.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h3>
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Our Process</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedService.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
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
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom solution that fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/order-form"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
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