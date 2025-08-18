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
      <div className="bg-white min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to help your enterprise grow and succeed.
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
      <div className="bg-white min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to help your enterprise grow and succeed.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800 mb-4">Error Loading Services</h3>
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <button
              onClick={fetchServices}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Enterprise Development Services
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to transform your business operations 
            and drive sustainable growth in the digital age.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Filter by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg ${
                  filterCategory === "all"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Services
              </button>
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg ${
                    filterCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 shadow-lg cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <span className="text-3xl">{getServiceIcon(service.category)}</span>
                    </div>
                    {service.featured && (
                      <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {service.features && service.features.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-lg">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-bold text-blue-600">
                      {formatPrice(service.price)}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-lg">{service.duration || "Varies"}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-lg group">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Found</h3>
              <p className="text-gray-600 text-lg">No services match the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Let's discuss how our enterprise development services can help you achieve 
            your business goals and drive digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Get Started Today
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">{getServiceIcon(selectedService.category)}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedService.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{selectedService.description}</p>
                </div>
                
                {selectedService.features && selectedService.features.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center text-gray-600 mb-3">
                      <DollarSign className="w-6 h-6 mr-3" />
                      <span className="text-lg font-semibold">Price</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(selectedService.price)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock className="w-6 h-6 mr-3" />
                      <span className="text-lg font-semibold">Duration</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedService.duration || "Varies"}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <Link
                    to="/contact"
                    className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-lg"
                  >
                    Get Started
                  </Link>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services; 