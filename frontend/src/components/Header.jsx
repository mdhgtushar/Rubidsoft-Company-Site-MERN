import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isActive = useCallback((path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "HOME", icon: "🏢" },
    { path: "/about", label: "ABOUT", icon: "📊" },
    { path: "/services", label: "SERVICES", icon: "⚡" },
    { path: "/projects", label: "PROJECTS", icon: "��" },
    { path: "/blog", label: "BLOG", icon: "📰" },
    { path: "/contact", label: "CONTACT", icon: "📞" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl border-b-4 border-blue-900">
      {/* Professional Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900"></div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Corporate Logo */}
          <Link 
            to="/" 
            className="group relative z-10"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="flex items-center space-x-4">
              {/* Professional Logo Container */}
              <div className="relative">
                <div className={`w-14 h-14 bg-blue-900 rounded-none flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 ${isLogoHovered ? 'shadow-lg' : 'shadow-md'}`}>
                  <span className="text-white font-black text-2xl tracking-wider">R</span>
                  
                  {/* Corporate Accent */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-700"></div>
                </div>
                
                {/* Professional Indicators */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600"></div>
                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-gray-400"></div>
              </div>
              
              {/* Company Name - Banking Style */}
              <div className="relative">
                <span className="font-black text-3xl tracking-wider transition-all duration-300 text-blue-900 group-hover:scale-105 uppercase">
                  Rubidsoft
                </span>
                
                {/* Corporate Underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-900 group-hover:w-full transition-all duration-300"></div>
                
                {/* Professional Tagline */}
                <div className="absolute -bottom-6 left-0 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold tracking-wide uppercase">
                  Enterprise Solutions
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Corporate Style */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative px-6 py-4 font-bold transition-all duration-300 flex items-center space-x-2 uppercase tracking-wide ${
                  isActive(item.path)
                    ? "bg-blue-900 text-white shadow-lg"
                    : "text-gray-700 hover:text-white hover:bg-gray-100"
                }`}
              >
                {/* Professional Icon */}
                <div className={`w-6 h-6 flex items-center justify-center ${isActive(item.path) ? 'text-white' : 'text-blue-900'}`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                
                {/* Text */}
                <span className="relative z-10 font-bold">{item.label}</span>
                
                {/* Corporate Hover Effect */}
                <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Active Indicator */}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                )}
              </Link>
            ))}
            
            {/* Professional Client Portal Button */}
            <div className="relative ml-6">
              <Link
                to="/user/client-portal"
                className="group relative px-10 py-4 font-black transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 shadow-xl uppercase tracking-wider border-2 border-blue-700"
              >
                {/* Professional Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
                
                {/* Corporate Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center text-sm font-black text-blue-900 border-2 border-blue-900 px-4 py-2 rounded-md">
                  <div className="mr-3 w-1 h-1 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-blue-900 text-xs">🔐</span>
                  </div>
                  <span className="mr-1 text-blue-900">CLIENT</span>
                  <span className="font-extrabold text-blue-900">PORTAL</span>
                  <div className="ml-3 w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                    <span className="text-blue-900 text-xs font-bold">→</span>
                  </div>
                </span>
                
                {/* Professional Border Glow */}
                <div className="absolute inset-0 border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
                
                {/* Corporate Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-blue-600"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-600"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-600"></div>
              </Link>
              
              {/* Professional Status Indicator */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full shadow-lg border-2 border-white"></div>
            </div>
          </nav>

          {/* Mobile Menu Button - Corporate Style */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative p-4 transition-all duration-300 text-blue-900 hover:text-white hover:bg-gray-100 border border-gray-300"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-2'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-2'}`}></span>
            </div>
            
            {/* Corporate Accent */}
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-600"></div>
          </button>
        </div>

        {/* Mobile Menu - Corporate Style */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 border-t-2 border-blue-900">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center px-6 py-4 font-bold transition-all duration-300 uppercase tracking-wide ${
                    isActive(item.path)
                      ? "bg-blue-900 text-white shadow-lg"
                      : "text-gray-700 hover:text-white hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center mr-4 ${isActive(item.path) ? 'text-white' : 'text-blue-900'}`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  {item.label}
                  <div className="ml-auto w-2 h-2 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
              
              {/* Mobile Client Portal Button */}
              <Link
                to="/user/client-portal"
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 text-blue-900 px-8 py-4 font-black hover:from-blue-800 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-xl uppercase tracking-wider border-2 border-blue-700"
              >
                <div className="mr-3 w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                  <span className="text-blue-900 text-xs">🔐</span>
                </div>
                <span className="mr-1 text-blue-900">CLIENT</span>
                <span className="font-extrabold text-blue-900">PORTAL</span>
                <div className="ml-3 w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                  <span className="text-blue-900 text-xs font-bold">→</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;