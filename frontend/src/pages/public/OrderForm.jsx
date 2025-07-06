import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const OrderForm = () => {
  const { serviceId, projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTier = searchParams.get('tier') || 'standard';
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    budget: "",
    timeline: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    company: "",
    requirements: "",
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPricingTier, setSelectedPricingTier] = useState(selectedTier);

  // Mock service/project data based on ID
  const getServiceData = () => {
    if (serviceId) {
      const services = {
        "website-development": {
          title: "Website Development",
          basePrice: "$500 - $7,000",
          timeline: "2-6 weeks",
          description: "Responsive, modern, and high-performing websites"
        },
        "web-application": {
          title: "Web Application Development",
          basePrice: "$3,000 - $30,000",
          timeline: "6-12 weeks",
          description: "Custom web applications for business processes"
        },
        "ecommerce": {
          title: "E-commerce Solutions",
          basePrice: "$2,000 - $25,000",
          timeline: "4-10 weeks",
          description: "Complete online store solutions"
        },
        "saas-development": {
          title: "SaaS Development",
          basePrice: "$10,000 - $100,000",
          timeline: "12-24 weeks",
          description: "Scalable Software-as-a-Service platforms"
        },
        "api-development": {
          title: "API Development",
          basePrice: "$1,500 - $15,000",
          timeline: "3-8 weeks",
          description: "Custom API development for integrations"
        },
        "bug-fixing": {
          title: "Bug Fixing & Maintenance",
          basePrice: "$50 - $500/hour",
          timeline: "1-5 days",
          description: "Professional debugging and maintenance"
        },
        "consultation": {
          title: "Project Planning & Consultation",
          basePrice: "$100 - $600/hour",
          timeline: "1-2 weeks",
          description: "Strategic planning and consultation"
        }
      };
      return services[serviceId] || services["website-development"];
    }
    return null;
  };

  const getProjectData = () => {
    if (projectId) {
      const projects = {
        "ecommerce-fashion": {
          title: "Fashion Hub E-commerce",
          basePrice: "$12,000",
          timeline: "8 weeks",
          description: "E-commerce platform for fashion retail"
        },
        "restaurant-management": {
          title: "Restaurant Management System",
          basePrice: "$25,000",
          timeline: "12 weeks",
          description: "Comprehensive restaurant management system"
        },
        "healthcare-portal": {
          title: "Healthcare Patient Portal",
          basePrice: "$35,000",
          timeline: "16 weeks",
          description: "Secure patient portal for healthcare"
        }
      };
      return projects[projectId] || projects["ecommerce-fashion"];
    }
    return null;
  };

  const serviceData = getServiceData();
  const projectData = getProjectData();
  const orderData = serviceData || projectData;

  // Pricing tiers for services
  const pricingTiers = {
    basic: { name: "Basic", price: "Starting from $100/hour", features: ["Basic features", "Email support", "Standard timeline"] },
    standard: { name: "Standard", price: "Starting from $200/hour", features: ["Advanced features", "Priority support", "Faster timeline"] },
    premium: { name: "Premium", price: "Starting from $400/hour", features: ["All features", "24/7 support", "Fastest timeline"] }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(files)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    navigate("/user/client-portal", { 
      state: { 
        message: "Order submitted successfully! We'll contact you within 24 hours." 
      } 
    });
  };

  const steps = serviceId ? [
    { number: 1, title: "Service Package" },
    { number: 2, title: "Project Details" },
    { number: 3, title: "Requirements" },
    { number: 4, title: "Contact Information" },
    { number: 5, title: "Review & Submit" }
  ] : [
    { number: 1, title: "Project Details" },
    { number: 2, title: "Requirements" },
    { number: 3, title: "Contact Information" },
    { number: 4, title: "Review & Submit" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {serviceId ? "Order Service" : "Order Similar Project"}
          </h1>
          <p className="text-slate-600">
            {serviceId 
              ? "Get started with our professional services" 
              : "Order a project similar to our completed work"
            }
          </p>
        </div>

        {/* Order Summary */}
        {orderData && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{orderData.title}</h2>
                <p className="text-slate-600">{orderData.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Starting from</p>
                <p className="text-2xl font-bold text-blue-600">{orderData.basePrice}</p>
                <p className="text-sm text-slate-600">Timeline: {orderData.timeline}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-300 text-slate-500"
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? "text-slate-900" : "text-slate-500"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-blue-600" : "bg-slate-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Package Selection (for services) */}
            {currentStep === 1 && serviceId && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Service Package</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.keys(pricingTiers).map((tier) => (
                    <div
                      key={tier}
                      onClick={() => setSelectedPricingTier(tier)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPricingTier === tier
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{pricingTiers[tier].name}</h4>
                        <div className="text-2xl font-bold text-blue-600 mb-4">{pricingTiers[tier].price}</div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {pricingTiers[tier].features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Project Details (for projects) or Step 2: Project Details (for services) */}
            {currentStep === (serviceId ? 2 : 1) && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your project title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project in detail"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Budget Range *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="$500 - $2,000">$500 - $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Timeline *
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="2-3 months">2-3 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Requirements (for projects) or Step 3: Requirements (for services) */}
            {currentStep === (serviceId ? 3 : 2) && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Requirements</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Detailed Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your specific requirements, features, and functionality needs..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attachments
                  </label>
                  <input
                    type="file"
                    name="attachments"
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Upload any relevant files (designs, documents, wireframes, etc.)
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information (for projects) or Step 4: Contact Information (for services) */}
            {currentStep === (serviceId ? 4 : 3) && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit (for projects) or Step 5: Review & Submit (for services) */}
            {currentStep === (serviceId ? 5 : 4) && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Review & Submit</h3>
                
                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  {serviceId && (
                    <div>
                      <h4 className="font-semibold text-slate-900">Service Package</h4>
                      <p className="text-slate-600"><strong>Package:</strong> {pricingTiers[selectedPricingTier].name}</p>
                      <p className="text-slate-600"><strong>Price:</strong> {pricingTiers[selectedPricingTier].price}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-slate-900">Project Details</h4>
                    <p className="text-slate-600"><strong>Title:</strong> {formData.projectTitle}</p>
                    <p className="text-slate-600"><strong>Description:</strong> {formData.description}</p>
                    <p className="text-slate-600"><strong>Budget:</strong> {formData.budget}</p>
                    <p className="text-slate-600"><strong>Timeline:</strong> {formData.timeline}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Requirements</h4>
                    <p className="text-slate-600">{formData.requirements}</p>
                    {formData.attachments.length > 0 && (
                      <p className="text-slate-600"><strong>Attachments:</strong> {formData.attachments.length} file(s)</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Contact Information</h4>
                    <p className="text-slate-600"><strong>Name:</strong> {formData.contactName}</p>
                    <p className="text-slate-600"><strong>Email:</strong> {formData.contactEmail}</p>
                    {formData.contactPhone && <p className="text-slate-600"><strong>Phone:</strong> {formData.contactPhone}</p>}
                    {formData.company && <p className="text-slate-600"><strong>Company:</strong> {formData.company}</p>}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Next Steps:</strong> After submitting, we'll review your requirements and contact you within 24 hours to discuss the project details and provide a detailed quote.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < (serviceId ? 5 : 4) ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={serviceId && currentStep === 1 && !selectedPricingTier}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Order"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm; 