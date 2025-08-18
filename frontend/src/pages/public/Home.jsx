import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const carouselSlides = [
    {
      id: 1,
      background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)",
      title: "Enterprise Digital Transformation",
      subtitle: "Scalable solutions for growing businesses",
      description: "Modern web applications that drive business growth and efficiency",
      stats: ["200+", "Enterprise", "Solutions"],
        features: ["React.js", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      background: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
      title: "High Performance Solutions",
      subtitle: "Optimized for speed and reliability",
      description: "Lightning-fast applications with enterprise-grade reliability",
      stats: ["<2s", "Load Time", "Guaranteed"],
        features: ["99.9% Uptime", "SEO Optimized", "Mobile First", "CDN Ready"]
    },
    {
      id: 3,
      background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
      title: "Professional Design Excellence",
      subtitle: "Clean, modern interfaces that convert",
      description: "User-centered design with professional aesthetics and functionality",
      stats: ["100%", "Responsive", "Designs"],
        features: ["Responsive Design", "Modern UI", "User Testing", "Accessibility"]
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
      description: "Modern React.js applications with enterprise-grade architecture",
      icon: "⚛️",
      color: "from-blue-600 to-blue-700",
      features: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Backend Development",
      description: "Robust Node.js APIs and server-side solutions",
      icon: "🖥️",
      color: "from-green-600 to-green-700",
      features: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Full-Stack Development",
      description: "Complete web applications from frontend to backend",
      icon: "🚀",
      color: "from-purple-600 to-purple-700",
      features: ["MERN Stack", "REST APIs", "Authentication", "Deployment"]
    },
    {
      title: "E-commerce Solutions",
      description: "Custom online stores and payment integrations",
      icon: "🛒",
      color: "from-red-600 to-red-700",
      features: ["Shopping Cart", "Payment Gateway", "Inventory", "Analytics"]
    },
    {
      title: "Progressive Web Apps",
      description: "Fast, reliable, and engaging web applications",
      icon: "📱",
      color: "from-indigo-600 to-indigo-700",
      features: ["Offline Support", "Push Notifications", "App-like", "Fast Loading"]
    },
    {
      title: "API Development",
      description: "RESTful and GraphQL APIs for modern applications",
      icon: "🔌",
      color: "from-violet-600 to-violet-700",
      features: ["REST APIs", "GraphQL", "Documentation", "Testing"]
    }
  ];

  const stats = [
    { number: "200+", label: "Enterprise Solutions", icon: "🏢" },
    { number: "50+", label: "Corporate Clients", icon: "💼" },
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "24/7", label: "Enterprise Support", icon: "🛟" }
  ];

  const features = [
    {
      title: "Modern Tech Stack",
      description: "Latest technologies and frameworks for optimal performance",
      icon: "⚡",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Responsive Design",
      description: "Perfect experience across all devices and screen sizes",
      icon: "📱",
      color: "from-green-600 to-green-700"
    },
    {
      title: "SEO Optimized",
      description: "Search engine optimized for better visibility and ranking",
      icon: "🔍",
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Fast Performance",
      description: "Lightning-fast loading times and smooth user experience",
      icon: "🚀",
      color: "from-red-600 to-red-700"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Hero Section */}
      <header className={`relative overflow-hidden min-h-screen flex items-center transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Background accents */}
        <div className={`absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>
        <div className={`absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-200 to-cyan-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative w-full">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text Content */}
            <div className={`text-center lg:text-left transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <span className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                Trusted, Fast & Secure
              </span>
              <h1 className={`mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Enterprise Web Development
              </h1>
              <p className={`mt-3 text-lg text-slate-600 md:text-xl lg:text-2xl transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Transform your business with modern, scalable web applications built for enterprise success.
              </p>
              <p className={`mt-1 text-sm text-slate-500 lg:text-base transition-all duration-700 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>Professional web development solutions that drive growth and efficiency.</p>

              <div className={`mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start transition-all duration-700 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold shadow-sm bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                  Start Your Project →
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold shadow-sm bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:scale-105 transition-all duration-300">
                  View Services
                </Link>
              </div>

              {/* Trust metrics */}
              <div className={`mt-8 grid w-full grid-cols-3 items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm shadow-sm max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-800 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">200+</div>
                  <div className="text-xs text-slate-500">Solutions Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">50+</div>
                  <div className="text-xs text-slate-500">Corporate Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">5+</div>
                  <div className="text-xs text-slate-500">Years Experience</div>
                </div>
              </div>

              {/* Features */}
              <div className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap transition-all duration-700 delay-900 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:scale-105 transition-all duration-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.5 4.21l9 4.5a2 2 0 010 3.58l-9 4.5A2 2 0 015 14.5v-9a2 2 0 012.5-1.79z"/></svg>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Modern Tech Stack</div>
                    <div className="text-xs text-slate-500">React.js, Node.js, MongoDB</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:scale-105 transition-all duration-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Fast Performance</div>
                    <div className="text-xs text-slate-500">Optimized for speed</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:scale-105 transition-all duration-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2 .672 2 1.5S13.105 14 12 14s-2-.672-2-1.5M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">24/7 Support</div>
                    <div className="text-xs text-slate-500">Enterprise-grade support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual mockup */}
            <div className={`relative mx-auto h-[420px] w-full max-w-md transition-all duration-700 delay-1000 ${
              isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
            }`}>
              <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="h-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-3 w-16 rounded-full bg-slate-200"></div>
                    <div className="h-3 w-10 rounded-full bg-slate-200"></div>
                  </div>
                  {/* Dashboard card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs text-slate-500">Web Development</div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">Enterprise Solutions</div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                        <div className="text-[10px] text-slate-500">Frontend</div>
                        <div className="text-sm font-semibold">React.js</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                        <div className="text-[10px] text-slate-500">Backend</div>
                        <div className="text-sm font-semibold">Node.js</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                        <div className="text-[10px] text-slate-500">Database</div>
                        <div className="text-sm font-semibold">MongoDB</div>
                      </div>
                    </div>
                  </div>
                  {/* Activity */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <span className="text-slate-600">Frontend Dev</span>
                      <span className="font-semibold text-slate-900">React.js</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <span className="text-slate-600">Backend API</span>
                      <span className="font-semibold text-slate-900">Node.js</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <span className="text-slate-600">Database</span>
                      <span className="font-semibold text-slate-900">MongoDB</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-200/60 via-white to-cyan-200/60 blur-2xl"></div>
            </div>
          </div>

          {/* Social proof */}
          <div className={`mt-14 grid grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-3 lg:grid-cols-6 transition-all duration-700 delay-1100 ${
            isLoaded ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">React.js</div></div>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">Node.js</div></div>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">MongoDB</div></div>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">AWS</div></div>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">TypeScript</div></div>
            <div className="flex items-center justify-center"><div className="h-6 w-24 rounded-md bg-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-center">Tailwind</div></div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className={`py-20 bg-white relative overflow-hidden transition-all duration-1000 delay-1200 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        {/* Background accents */}
        <div className={`absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200 to-blue-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-1400 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>
        <div className={`absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-green-200 to-green-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-1600 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 delay-1300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              Proven Track Record
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl mb-4">
              Our Enterprise Success
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Delivering exceptional results for corporate clients worldwide with cutting-edge web solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group transition-all duration-700 delay-${1400 + index * 100} ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
                  {stat.number}
                </div>
                <div className="text-slate-700 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 bg-slate-50 relative overflow-hidden transition-all duration-1000 delay-1800 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        {/* Background accents */}
        <div className={`absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200 to-purple-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-2000 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>
        <div className={`absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-2200 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 delay-1900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500"></span>
              Comprehensive Solutions
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl mb-4">
              Enterprise Development Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Full-stack web development solutions tailored to enterprise business needs and scalability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 shadow-lg group relative overflow-hidden transition-all duration-700 delay-${2000 + index * 150} ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                {/* Service card background accent */}
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300 relative z-10`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed relative z-10">
                  {service.description}
                </p>
                <div className="mb-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-sm bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-medium border border-slate-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('&', '-and-').replace('(', '').replace(')', '')}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg group relative z-10"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Learn More</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 bg-white relative overflow-hidden transition-all duration-1000 delay-2400 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        {/* Background accents */}
        <div className={`absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-green-200 to-green-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-2600 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>
        <div className={`absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-200 to-cyan-500/40 blur-3xl opacity-50 transition-all duration-1000 delay-2800 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 delay-2500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              Why Choose Us
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl mb-4">
              Why Choose Our Enterprise Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We deliver exceptional web solutions with proven enterprise methodologies and cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center group relative transition-all duration-700 delay-${2600 + index * 150} ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <div className={`w-20 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-300 relative z-10`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                  {feature.description}
                </p>
                
                {/* Feature card background accent */}
                <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden transition-all duration-1000 delay-3000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        {/* Background accents */}
        <div className={`absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200 to-blue-500/20 blur-3xl opacity-50 transition-all duration-1000 delay-3200 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>
        <div className={`absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-500/20 blur-3xl opacity-50 transition-all duration-1000 delay-3400 ${
          isLoaded ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
        }`}></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className={`transition-all duration-700 delay-3100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white shadow-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
              Ready to Start?
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              Let's discuss how our enterprise development solutions can help you achieve 
              your business goals and drive digital transformation with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold shadow-sm bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-300"
              >
                Start Your Project →
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold shadow-sm bg-transparent text-white border-2 border-white hover:bg-white hover:text-slate-900 hover:scale-105 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
          
          {/* Additional CTA info */}
          <div className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-700 delay-3500 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-slate-300">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Free</div>
              <div className="text-sm text-slate-300">Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">48h</div>
              <div className="text-sm text-slate-300">Response Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;