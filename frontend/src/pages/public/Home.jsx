import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselSlides = [
    {
      id: 1,
      background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)",
      leftContent: {
        icon: "💻",
        title: "Full-Stack Development",
        subtitle: "End-to-end web solutions with modern technologies"
      },
      centerContent: {
        mainTitle: "Web Development",
        description: "Custom websites and web applications that drive business growth",
        stats: ["200+", "Websites", "Built"]
      },
      rightContent: {
        highlight: "Technologies We Use",
        features: ["React.js", "Node.js", "MongoDB", "AWS"]
      }
    },
    {
      id: 2,
      background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
      leftContent: {
        icon: "🚀",
        title: "Performance Optimized",
        subtitle: "Lightning-fast websites with SEO optimization"
      },
      centerContent: {
        mainTitle: "Speed & SEO",
        description: "Optimized for search engines and blazing fast performance",
        stats: ["<2s", "Load Time", "Average"]
      },
      rightContent: {
        highlight: "Performance Metrics",
        features: ["99.9% Uptime", "SEO Optimized", "Mobile First", "CDN Ready"]
      }
    },
    {
      id: 3,
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
      leftContent: {
        icon: "🎨",
        title: "Modern UI/UX",
        subtitle: "Beautiful, responsive designs that convert visitors"
      },
      centerContent: {
        mainTitle: "Design Excellence",
        description: "User-centered design with modern aesthetics and functionality",
        stats: ["100%", "Responsive", "Designs"]
      },
      rightContent: {
        highlight: "Design Features",
        features: ["Responsive Design", "Modern UI", "User Testing", "Accessibility"]
      }
    },
    {
      id: 4,
      background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      leftContent: {
        icon: "🔒",
        title: "Secure & Scalable",
        subtitle: "Enterprise-grade security with cloud scalability"
      },
      centerContent: {
        mainTitle: "Security First",
        description: "Bank-level security with scalable cloud infrastructure",
        stats: ["100%", "Secure", "Guaranteed"]
      },
      rightContent: {
        highlight: "Security Features",
        features: ["SSL Certificates", "DDoS Protection", "Regular Backups", "GDPR Compliant"]
      }
    },
    {
      id: 5,
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
      leftContent: {
        icon: "⚡",
        title: "24/7 Support",
        subtitle: "Round-the-clock maintenance and support services"
      },
      centerContent: {
        mainTitle: "Always Available",
        description: "Continuous monitoring and instant support when you need it",
        stats: ["24/7", "Support", "Available"]
      },
      rightContent: {
        highlight: "Support Services",
        features: ["Live Chat", "Phone Support", "Email Support", "Emergency Fixes"]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const goToSlide = (index) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const services = [
    {
      title: "Frontend Development",
      description: "Modern React.js applications with responsive design",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
      features: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Backend Development",
      description: "Robust Node.js APIs and server-side solutions",
      icon: "🖥️",
      color: "from-emerald-500 to-teal-500",
      features: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Full-Stack Development",
      description: "Complete web applications from frontend to backend",
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
      features: ["MERN Stack", "REST APIs", "Authentication", "Deployment"]
    },
    {
      title: "E-commerce Solutions",
      description: "Custom online stores and payment integrations",
      icon: "🛒",
      color: "from-orange-500 to-red-500",
      features: ["Shopping Cart", "Payment Gateway", "Inventory", "Analytics"]
    },
    {
      title: "Progressive Web Apps",
      description: "Fast, reliable, and engaging web applications",
      icon: "📱",
      color: "from-indigo-500 to-blue-500",
      features: ["Offline Support", "Push Notifications", "App-like", "Fast Loading"]
    },
    {
      title: "API Development",
      description: "RESTful and GraphQL APIs for modern applications",
      icon: "🔌",
      color: "from-violet-500 to-purple-500",
      features: ["REST APIs", "GraphQL", "Documentation", "Testing"]
    },
    {
      title: "Database Design",
      description: "Optimized database architecture and management",
      icon: "🗄️",
      color: "from-cyan-500 to-blue-500",
      features: ["MongoDB", "PostgreSQL", "Redis", "Optimization"]
    },
    {
      title: "DevOps & Deployment",
      description: "CI/CD pipelines and cloud deployment solutions",
      icon: "☁️",
      color: "from-slate-500 to-gray-500",
      features: ["AWS", "Docker", "CI/CD", "Monitoring"]
    }
  ];

  const stats = [
    { number: "200+", label: "Websites Built", icon: "🌐" },
    { number: "50+", label: "Happy Clients", icon: "😊" },
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "24/7", label: "Support Available", icon: "🛟" }
  ];

  const features = [
    {
      title: "Modern Tech Stack",
      description: "Latest technologies and frameworks for optimal performance",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Responsive Design",
      description: "Perfect experience across all devices and screen sizes",
      icon: "📱",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "SEO Optimized",
      description: "Search engine optimized for better visibility and ranking",
      icon: "🔍",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Fast Performance",
      description: "Lightning-fast loading times and smooth user experience",
      icon: "🚀",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Professional Hero Carousel */}
      <section className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-12 mx-4 shadow-2xl">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{ background: carouselSlides[currentSlide].background }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Content */}
              <div className="text-white space-y-4 transform transition-all duration-700">
                <div className="text-6xl mb-4 animate-bounce">
                  {carouselSlides[currentSlide].leftContent.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  {carouselSlides[currentSlide].leftContent.title}
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  {carouselSlides[currentSlide].leftContent.subtitle}
                </p>
              </div>

              {/* Center Content */}
              <div className="text-center text-white space-y-6 transform transition-all duration-700">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl">
                  {carouselSlides[currentSlide].centerContent.mainTitle}
                </h1>
                <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                  {carouselSlides[currentSlide].centerContent.description}
                </p>
                <div className="flex justify-center items-center space-x-6">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold">{carouselSlides[currentSlide].centerContent.stats[0]}</div>
                    <div className="text-sm opacity-80">{carouselSlides[currentSlide].centerContent.stats[1]}</div>
                    <div className="text-xs opacity-60">{carouselSlides[currentSlide].centerContent.stats[2]}</div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="text-white space-y-4 transform transition-all duration-700">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {carouselSlides[currentSlide].rightContent.highlight}
                  </h3>
                  <ul className="space-y-3">
                    {carouselSlides[currentSlide].rightContent.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <span className="text-emerald-400 text-lg">✓</span>
                        <span className="text-white/90 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentSlide ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}></div>
                {index === currentSlide && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-white/30 animate-ping"></div>
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` }}
          ></div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center mb-12 mx-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Project
          </Link>
          <Link
            to="/services"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white rounded-3xl mb-12 mx-4 shadow-xl border border-slate-100">
        <div className="px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Our Achievements</h2>
            <p className="text-slate-600">Delivering exceptional results for our clients</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 mb-12 mx-4">
        <div className="px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Web Development Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:rotate-1 shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-110 transition-all duration-300`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('&', '-and-').replace('(', '').replace(')', '')}`}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Learn More →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl mx-4 shadow-xl">
        <div className="px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose Our Web Development
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We deliver exceptional web solutions with proven methodologies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-all duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;