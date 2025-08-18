import React, { useState } from "react";
import { contactService } from "../../services/apiService";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Send,
  MessageSquare
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    consultation: false,
    budget: "",
    timeline: "",
    projectType: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState([]);

  const services = [
    "Website Development",
    "Web Application Development", 
    "E-commerce Solutions",
    "SaaS Development",
    "API Development",
    "Bug Fixing & Maintenance",
    "Project Planning & Consultation",
    "UI/UX Design",
    "Mobile App Development",
    "Database Design",
    "Cloud Migration",
    "DevOps Services"
  ];

  const budgetRanges = [
    "$500 - $2,000",
    "$2,000 - $5,000", 
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+"
  ];

  const timelines = [
    "1-2 weeks",
    "2-4 weeks",
    "1-2 months", 
    "2-3 months",
    "3-6 months",
    "6+ months"
  ];

  const projectTypes = [
    "New Project",
    "Existing Project Enhancement",
    "Bug Fixes",
    "Performance Optimization",
    "Security Audit",
    "Code Review",
    "Consultation Only"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      attachments.forEach(file => {
        formDataToSend.append('attachments', file);
      });
      
      await contactService.submitContactForm(formDataToSend);
      
      setSuccess("Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        consultation: false,
        budget: "",
        timeline: "",
        projectType: ""
      });
      setAttachments([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Address",
      details: "123 Business District, Tech City, TC 12345",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: "hello@rubidsoft.com",
      color: "from-green-600 to-green-700"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Number",
      details: "+1 (555) 123-4567",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM EST",
      color: "from-red-600 to-red-700"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl overflow-hidden mb-16 mx-4 shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your business? Let's discuss how our enterprise development 
            solutions can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <div className="text-white">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {info.details}
          </p>
        </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

        {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-800">{success}</span>
                  </div>
          </div>
        )}
        
        {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-800">{error}</span>
                  </div>
          </div>
        )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select budget range</option>
                      {budgetRanges.map((budget, index) => (
                        <option key={index} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select timeline</option>
                      {timelines.map((timeline, index) => (
                        <option key={index} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  required
                  ></textarea>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments
                </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drop files here or click to upload
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                    >
                      Choose Files
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected files:</p>
                      <ul className="text-sm text-gray-500">
                        {attachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

                <div className="flex items-center">
                <input
                  type="checkbox"
                  name="consultation"
                  checked={formData.consultation}
                  onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                  <label className="ml-2 text-sm text-gray-700">
                    I would like a free consultation call
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                  </>
                ) : (
                  <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                  </>
                )}
              </button>
            </form>
          </div>

            {/* Map & Additional Info */}
              <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Location</h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Business District, Tech City, TC 12345</p>
                  </div>
                  </div>
                </div>

              {/* Business Hours */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Emergency Support:</strong> Available 24/7 for critical issues
                  </p>
                  </div>
                </div>

              {/* Response Time */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Time</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Initial response within 2 hours</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Detailed proposal within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Project kickoff within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl mx-4 shadow-lg">
        <div className="px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Don't wait to transform your business. Contact us today and let's discuss 
            how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Call Us Now
            </a>
            <a
              href="mailto:hello@rubidsoft.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Send Email
                </a>
              </div>
            </div>
      </section>
    </div>
  );
};

export default Contact; 