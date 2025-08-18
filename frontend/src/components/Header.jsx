import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const location = useLocation();

  const isActive = useCallback((path) => {
    if (path === "/" && location.pathname === "/") return true;
    return path !== "/" && location.pathname.startsWith(path);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/services", label: "Services", icon: "⚡" },
    { path: "/projects", label: "Projects", icon: "💼" },
    { path: "/blog", label: "Blog", icon: "📝" },
    { path: "/contact", label: "Contact", icon: "📞" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center rounded-lg transform transition-all duration-300 ${isLogoHovered ? 'shadow-lg scale-105' : 'shadow-md'}`}>
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-300">Rubidsoft</span>
              <span className="text-sm text-gray-600 font-medium tracking-wide">Enterprise Solutions</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 text-sm ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <Link
              to="/user/client-portal"
              className="ml-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition-all duration-200 text-sm"
            >
              Client Portal →
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="space-y-1">
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 pt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium text-sm flex items-center space-x-3 transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              <Link
                to="/user/client-portal"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm"
              >
                Client Portal →
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
