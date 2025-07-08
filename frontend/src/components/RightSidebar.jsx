import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const RightSidebar = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "info@rubidsoft.com",
    address: "123 Business Ave, Tech City, TC 12345",
    hours: "Mon-Fri: 9AM-6PM EST"
  };

  const socialLinks = [
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "GitHub", icon: "🐙", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Discord", icon: "🎮", url: "#" }
  ];

  const quickActions = [
    { name: "Get Quote", icon: "💰", path: "/contact" },
    { name: "Client Portal", icon: "🔐", path: "/user/client-portal" },
    { name: "Order Form", icon: "📝", path: "/order-form" },
    { name: "Support", icon: "🛟", path: "/contact" }
  ];

  const getPageSpecificInfo = () => {
    const path = location.pathname;
    
    if (path === "/") {
      return {
        title: "Web Development Hub",
        content: "Professional web development services with modern technologies and best practices.",
        stats: [
          { label: "Websites", value: "200+" },
          { label: "Technologies", value: "15+" },
          { label: "Experience", value: "5+ Years" }
        ]
      };
    } else if (path === "/about") {
      return {
        title: "About Our Team",
        content: "Expert web developers and designers committed to delivering exceptional digital solutions.",
        highlights: [
          "Expert Developers",
          "Modern Tech Stack",
          "24/7 Support",
          "Quality Assurance"
        ]
      };
    } else if (path === "/services") {
      return {
        title: "Our Web Services",
        content: "Comprehensive web development solutions from frontend to backend.",
        services: [
          "Frontend Development",
          "Backend APIs",
          "Full-Stack Apps",
          "E-commerce Solutions"
        ]
      };
    } else if (path === "/projects") {
      return {
        title: "Our Web Portfolio",
        content: "Showcasing our best web development projects and successful client websites.",
        categories: [
          "React Applications",
          "Node.js APIs",
          "E-commerce Sites",
          "Progressive Web Apps"
        ]
      };
    } else if (path === "/contact") {
      return {
        title: "Get In Touch",
        content: "Ready to start your web development project? Contact us for a free consultation.",
        contactMethods: [
          "Video Call",
          "Live Chat",
          "Email Support",
          "Phone Consultation"
        ]
      };
    } else if (path === "/blog") {
      return {
        title: "Web Dev Blog",
        content: "Latest insights and tutorials in web development and technology.",
        categories: [
          "React.js",
          "Node.js",
          "Web Design",
          "Performance"
        ]
      };
    }
    
    return {
      title: "Rubidsoft",
      content: "Professional web development solutions for modern businesses.",
      default: true
    };
  };

  const pageInfo = getPageSpecificInfo();

  return (
    <div className={`h-full overflow-y-auto transition-all duration-1000 custom-scrollbar ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
    }`}>
      {/* Contact Information Section */}
      <div className="border-b border-slate-200">
        <div 
          className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
          onClick={() => setIsContactExpanded(!isContactExpanded)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg animate-bounce">💻 Contact Info</h3>
            <span className="text-sm transform transition-transform duration-300">{isContactExpanded ? '−' : '+'}</span>
          </div>
        </div>
        
        <div className={`transition-all duration-500 overflow-hidden ${
          isContactExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-blue-600 text-sm">📱</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Phone</p>
                <p className="font-medium text-slate-800">{contactInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-blue-600 text-sm">✉️</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Email</p>
                <p className="font-medium text-slate-800">{contactInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mt-1 animate-pulse">
                <span className="text-blue-600 text-sm">📍</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Address</p>
                <p className="font-medium text-slate-800 text-sm">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-blue-600 text-sm">🕒</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Business Hours</p>
                <p className="font-medium text-slate-800">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Specific Information */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-lg text-slate-800 mb-3 animate-slide-up">{pageInfo.title}</h3>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed animate-slide-up-delay">{pageInfo.content}</p>
        
        {pageInfo.stats && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {pageInfo.stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 transform hover:scale-110 transition-all duration-300 animate-fade-in-up shadow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-bold text-blue-700 text-lg">{stat.value}</div>
                <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {pageInfo.highlights && (
          <div className="space-y-2">
            {pageInfo.highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 bg-emerald-50 rounded-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up border border-emerald-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-emerald-500 text-lg animate-bounce">✓</span>
                <span className="text-sm text-slate-700 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        )}
        
        {pageInfo.services && (
          <div className="space-y-2">
            {pageInfo.services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 bg-blue-50 rounded-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up border border-blue-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-blue-600 text-lg animate-pulse">⚡</span>
                <span className="text-sm text-slate-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        )}
        
        {pageInfo.categories && (
          <div className="space-y-2">
            {pageInfo.categories.map((category, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 bg-indigo-50 rounded-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up border border-indigo-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-indigo-600 text-lg animate-pulse">💻</span>
                <span className="text-sm text-slate-700 font-medium">{category}</span>
              </div>
            ))}
          </div>
        )}
        
        {pageInfo.contactMethods && (
          <div className="space-y-2">
            {pageInfo.contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 bg-orange-50 rounded-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up border border-orange-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-orange-600 text-lg animate-pulse">💬</span>
                <span className="text-sm text-slate-700 font-medium">{method}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-lg text-slate-800 mb-3 animate-slide-up">🚀 Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group transform hover:scale-105 animate-fade-in-up border border-slate-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 animate-pulse">
                <span className="text-lg">{action.icon}</span>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-lg text-slate-800 mb-3 animate-slide-up">🛠️ Tech Stack</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 rounded-xl p-2 text-center border border-blue-100">
            <span className="text-xs font-medium text-blue-700">React.js</span>
          </div>
          <div className="bg-green-50 rounded-xl p-2 text-center border border-green-100">
            <span className="text-xs font-medium text-green-700">Node.js</span>
          </div>
          <div className="bg-purple-50 rounded-xl p-2 text-center border border-purple-100">
            <span className="text-xs font-medium text-purple-700">MongoDB</span>
          </div>
          <div className="bg-orange-50 rounded-xl p-2 text-center border border-orange-100">
            <span className="text-xs font-medium text-orange-700">AWS</span>
          </div>
          <div className="bg-cyan-50 rounded-xl p-2 text-center border border-cyan-100">
            <span className="text-xs font-medium text-cyan-700">TypeScript</span>
          </div>
          <div className="bg-indigo-50 rounded-xl p-2 text-center border border-indigo-100">
            <span className="text-xs font-medium text-indigo-700">Tailwind</span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-4 pb-8">
        <h3 className="font-semibold text-lg text-slate-800 mb-3 animate-slide-up">🌐 Connect With Us</h3>
        <div className="flex space-x-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group transform hover:scale-125 animate-fade-in-up border border-slate-200"
              style={{ animationDelay: `${index * 100}ms` }}
              title={social.name}
            >
              <span className="text-lg group-hover:scale-110 transition-transform animate-bounce">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-up-delay {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          50% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up-delay 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        
        /* Custom Scrollbar Styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
          transform: scale(1.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(to bottom, #1d4ed8, #3730a3);
        }
        
        /* Firefox Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f5f9;
        }
        
        /* Hide scrollbar when not needed */
        .custom-scrollbar::-webkit-scrollbar-thumb:vertical {
          min-height: 30px;
        }
      `}</style>
    </div>
  );
};

export default RightSidebar; 