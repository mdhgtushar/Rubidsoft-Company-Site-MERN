import React, { useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: "project-planning",
      title: "Project Planning",
      icon: "📋",
      category: "Strategy",
      description: "Detailed planning and strategizing for successful project execution from concept to launch.",
      process: [
        "Initial project assessment and scope definition",
        "Requirements gathering and analysis",
        "Technology stack selection and architecture planning",
        "Project roadmap and timeline creation",
        "Resource allocation and team planning",
        "Risk assessment and mitigation strategies"
      ],
      pricing: {
        basic: "$100 - $200/hour",
        standard: "$200 - $400/hour",
        premium: "$400 - $600/hour"
      },
      timeline: "1-4 weeks",
      features: [
        "Comprehensive project documentation",
        "Technology stack recommendations",
        "Timeline and milestone planning",
        "Resource and budget estimation",
        "Risk management strategies",
        "Stakeholder communication plans"
      ]
    },
    {
      id: "bug-fixing",
      title: "Bug Fixing & Feature Additions",
      icon: "🐛",
      category: "Maintenance",
      description: "Efficient identification and resolution of issues, along with seamless integration of new functionalities.",
      process: [
        "Issue identification and analysis",
        "Root cause investigation and debugging",
        "Solution development and testing",
        "Feature requirement analysis",
        "Implementation and integration",
        "Quality assurance and deployment"
      ],
      pricing: {
        basic: "$50 - $150/hour",
        standard: "$150 - $300/hour",
        premium: "$300 - $500/hour"
      },
      timeline: "1-7 days",
      features: [
        "24/7 emergency support",
        "Performance optimization",
        "Security vulnerability fixes",
        "Code refactoring and improvements",
        "New feature development",
        "Comprehensive testing and validation"
      ]
    },
    {
      id: "backend-development",
      title: "Backend Development",
      icon: "⚙️",
      category: "Development",
      description: "Building robust, scalable, and secure server-side logic and APIs for your applications.",
      process: [
        "System architecture design",
        "Database schema design and optimization",
        "API development and documentation",
        "Security implementation and testing",
        "Performance optimization",
        "Deployment and monitoring setup"
      ],
      pricing: {
        basic: "$2,000 - $6,000",
        standard: "$6,000 - $15,000",
        premium: "$15,000 - $35,000"
      },
      timeline: "4-12 weeks",
      features: [
        "RESTful API development",
        "Database design and optimization",
        "Authentication and authorization",
        "Security and data protection",
        "Performance monitoring",
        "Scalable architecture design"
      ]
    },
    {
      id: "frontend-development",
      title: "Frontend Development",
      icon: "🎨",
      category: "Development",
      description: "Crafting intuitive and visually appealing user interfaces from design mockups (PSD to HTML / HTML to React).",
      process: [
        "Design analysis and requirements",
        "HTML/CSS structure creation",
        "Responsive design implementation",
        "JavaScript functionality development",
        "React component development",
        "Testing and optimization"
      ],
      pricing: {
        basic: "$1,500 - $4,000",
        standard: "$4,000 - $10,000",
        premium: "$10,000 - $25,000"
      },
      timeline: "3-8 weeks",
      features: [
        "PSD to HTML conversion",
        "Responsive design for all devices",
        "React component development",
        "Interactive UI elements",
        "Performance optimization",
        "Cross-browser compatibility"
      ]
    },
    {
      id: "website-development",
      title: "Website Development",
      icon: "🌐",
      category: "Development",
      description: "Creating dynamic and responsive websites using popular platforms and frameworks (WordPress, MERN, PHP).",
      process: [
        "Platform selection and setup",
        "Design and layout creation",
        "Content management system setup",
        "Functionality development",
        "Testing and optimization",
        "Deployment and launch"
      ],
      pricing: {
        basic: "$500 - $1,500",
        standard: "$1,500 - $3,500",
        premium: "$3,500 - $7,000"
      },
      timeline: "2-6 weeks",
      features: [
        "WordPress development",
        "MERN stack applications",
        "PHP-based solutions",
        "Responsive design",
        "SEO optimization",
        "Content management systems"
      ]
    },
    {
      id: "mern-development",
      title: "Web App Development (MERN)",
      icon: "🚀",
      category: "Development",
      description: "Developing full-fledged web applications with the MongoDB, Express.js, React, Node.js stack.",
      process: [
        "Application architecture design",
        "Database schema planning",
        "Backend API development",
        "Frontend React development",
        "Integration and testing",
        "Deployment and optimization"
      ],
      pricing: {
        basic: "$5,000 - $12,000",
        standard: "$12,000 - $25,000",
        premium: "$25,000 - $50,000"
      },
      timeline: "8-16 weeks",
      features: [
        "MongoDB database design",
        "Express.js backend APIs",
        "React frontend development",
        "Node.js server setup",
        "Real-time functionality",
        "Scalable architecture"
      ]
    },
    {
      id: "saas-development",
      title: "SaaS Development",
      icon: "☁️",
      category: "Enterprise",
      description: "Building multi-tenant, scalable Software as a Service solutions tailored to your business needs.",
      process: [
        "Business model analysis",
        "Multi-tenant architecture design",
        "Subscription system development",
        "User management and roles",
        "Payment integration",
        "Scaling and optimization"
      ],
      pricing: {
        basic: "$15,000 - $35,000",
        standard: "$35,000 - $75,000",
        premium: "$75,000 - $150,000"
      },
      timeline: "12-24 weeks",
      features: [
        "Multi-tenant architecture",
        "Subscription management",
        "User role management",
        "Payment gateway integration",
        "Analytics and reporting",
        "Automated billing systems"
      ]
    },
    {
      id: "whmcs-development",
      title: "WHMCS Development",
      icon: "💼",
      category: "Specialized",
      description: "Customizing and extending WHMCS for billing, client management, and automation.",
      process: [
        "WHMCS system analysis",
        "Custom module development",
        "Integration with third-party services",
        "Automation workflow setup",
        "Testing and deployment",
        "Training and documentation"
      ],
      pricing: {
        basic: "$1,000 - $3,000",
        standard: "$3,000 - $8,000",
        premium: "$8,000 - $20,000"
      },
      timeline: "2-8 weeks",
      features: [
        "Custom WHMCS modules",
        "Billing system integration",
        "Client management automation",
        "Third-party service integration",
        "Custom reporting",
        "Workflow automation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-wider">
            OUR SERVICES
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Comprehensive digital solutions to transform your business and drive growth
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Service Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Details */}
                <div className="p-8">
                  {/* Timeline & Pricing */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-black text-blue-900 mb-1">
                        ⏱️
                      </div>
                      <div className="text-sm font-bold text-blue-800">Timeline</div>
                      <div className="text-lg font-bold text-blue-900">
                        {service.timeline}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-black text-purple-900 mb-1">
                        💰
                      </div>
                      <div className="text-sm font-bold text-purple-800">Starting From</div>
                      <div className="text-lg font-bold text-purple-900">
                        {service.pricing.basic}
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/services/${service.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your requirements and create something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 