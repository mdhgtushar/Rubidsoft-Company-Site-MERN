import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getServiceById, getRelatedServices } from "../../data/services";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedPricing, setSelectedPricing] = useState("standard");
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const serviceData = getServiceById(serviceId);
    if (serviceData) {
      setService(serviceData);
    } else {
      navigate("/services", { replace: true });
    }
    setLoading(false);
  }, [serviceId, navigate]);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} - Rubidsoft`;
    }
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading web development service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-6">
      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>→</span>
            <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <span>→</span>
            <span className="text-slate-800 font-medium">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section - E-commerce Style */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Service Image/Icon */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-100">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-6xl mx-auto mb-8 shadow-lg">
                  {service.icon}
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Available Now
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-1">4.9/5</span>
                    </div>
                    <span>•</span>
                    <span>100+ Web Projects Completed</span>
                    <span>•</span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                HOT SALE
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                TRENDING
              </div>
            </div>

            {/* Right Side - Service Info */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
                  {service.category}
                </span>
                <h1 className="text-5xl font-black text-slate-800 mb-4 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Social Proof */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">500+</div>
                    <div className="text-sm text-slate-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1000+</div>
                    <div className="text-sm text-slate-600">Web Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">99%</div>
                    <div className="text-sm text-slate-600">Success Rate</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-600">Starting Price</div>
                        <div className="text-2xl font-bold text-green-600">{service.pricing.basic.price}</div>
                      </div>
                      <div className="text-3xl">💰</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-600">Delivery Time</div>
                        <div className="text-2xl font-bold text-blue-600">{service.timeline}</div>
                      </div>
                      <div className="text-3xl">⚡</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/services/${serviceId}/order?tier=${selectedPricing}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-lg"
                  >
                    🚀 Get Started Now
                  </Link>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-4 px-8 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 text-center text-lg"
                  >
                    ▶️ Watch Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-600">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">✓</span>
                    Free Consultation
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">✓</span>
                    Money Back Guarantee
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">✓</span>
                    Secure Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">Web Development Service Demo</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600">Demo video would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabbed Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            {[
              { id: "overview", label: "Overview", icon: "📋" },
              { id: "features", label: "Features", icon: "✨" },
              { id: "pricing", label: "Pricing", icon: "💰" },
              { id: "process", label: "Process", icon: "⚙️" },
              { id: "reviews", label: "Reviews", icon: "⭐" },
              { id: "faq", label: "FAQ", icon: "❓" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Why Choose This Service?</h4>
                    <ul className="space-y-3">
                      {service.benefits.slice(0, 4).map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Service Highlights</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-4">
                            ⏱️
                          </div>
                          <div>
                            <div className="font-semibold">Fast Delivery</div>
                            <div className="text-sm text-gray-600">{service.timeline}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white mr-4">
                            💰
                          </div>
                          <div>
                            <div className="font-semibold">Best Price</div>
                            <div className="text-sm text-gray-600">Starting from {service.pricing.basic.price}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                            🛡️
                          </div>
                          <div>
                            <div className="font-semibold">Quality Guarantee</div>
                            <div className="text-sm text-gray-600">100% satisfaction guaranteed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Package</h3>
                
                {/* Pricing Toggle */}
                <div className="flex justify-center mb-12">
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    {Object.keys(service.pricing).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedPricing(tier)}
                        className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                          selectedPricing === tier
                            ? 'bg-white text-blue-600 shadow-lg'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {service.pricing[tier].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Pricing Details */}
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {service.pricing[selectedPricing].name}
                      </h3>
                      <div className="text-6xl font-black text-blue-600 mb-2">
                        {service.pricing[selectedPricing].price}
                      </div>
                      <div className="text-lg text-gray-600 mb-4">
                        Duration: {service.pricing[selectedPricing].duration}
                      </div>
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Most Popular
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">What's Included:</h4>
                        <ul className="space-y-3">
                          {service.pricing[selectedPricing].features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-xl p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Deliverables:</h4>
                        <ul className="space-y-2 text-gray-700">
                          {service.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/services/${serviceId}/order?tier=${selectedPricing}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-lg"
                      >
                        🚀 Order Now - {service.pricing[selectedPricing].name}
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 border-2 border-blue-600 text-blue-600 py-4 px-8 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 text-center text-lg"
                      >
                        💬 Get Free Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Process Tab */}
            {activeTab === "process" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Process</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {service.process.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6">
                          {index + 1}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                          {step}
                        </h4>
                      </div>
                      {index < service.process.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Client Reviews</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      company: "TechStart Inc.",
                      rating: 5,
                      comment: "Excellent service! The team delivered exactly what we needed on time and within budget.",
                      avatar: "👩‍💼"
                    },
                    {
                      name: "Mike Chen",
                      company: "Digital Solutions",
                      rating: 5,
                      comment: "Professional, responsive, and high-quality work. Highly recommended!",
                      avatar: "👨‍💻"
                    },
                    {
                      name: "Emily Rodriguez",
                      company: "Innovate Labs",
                      rating: 5,
                      comment: "Outstanding communication and technical expertise. Will definitely work with them again.",
                      avatar: "👩‍🔬"
                    }
                  ].map((review, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-4">{review.avatar}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="text-sm text-gray-600">{review.company}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: "How long does the project take?",
                      answer: `Our typical delivery time for this service is ${service.timeline}. However, the exact timeline depends on the complexity and scope of your specific project.`
                    },
                    {
                      question: "What's included in the price?",
                      answer: "The price includes all development work, testing, deployment, and 30 days of post-launch support. Additional features or modifications may incur extra costs."
                    },
                    {
                      question: "Do you provide ongoing support?",
                      answer: "Yes! We offer various support packages including maintenance, updates, and technical support. We can discuss the best option for your needs."
                    },
                    {
                      question: "Can I request changes during development?",
                      answer: "Absolutely! We encourage feedback and collaboration throughout the development process. Minor changes are included, while major scope changes may require additional time and cost."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Services
            </h2>
            <p className="text-lg text-gray-600">
              Explore other services that might complement your project needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getRelatedServices(serviceId).map((relatedService) => (
              <div key={relatedService.id} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  {relatedService.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {relatedService.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {relatedService.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">{relatedService.pricing.basic.price}</span>
                  <Link
                    to={`/services/${relatedService.id}`}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of satisfied clients who have transformed their businesses with our {service.title.toLowerCase()} service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/services/${serviceId}/order`}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              🚀 Start Your Project Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              💬 Get Free Consultation
            </Link>
          </div>
          <div className="mt-8 text-blue-100 text-sm">
            <p>✨ Free consultation • 💰 Money-back guarantee • 🛡️ 100% secure</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails; 