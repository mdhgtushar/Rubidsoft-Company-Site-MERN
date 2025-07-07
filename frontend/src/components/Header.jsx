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
    { path: "/", label: "HOME", icon: "🏢" },
    { path: "/about", label: "ABOUT", icon: "📊" },
    { path: "/services", label: "SERVICES", icon: "⚡" },
    { path: "/projects", label: "PROJECTS", icon: "💼" },
    { path: "/blog", label: "BLOG", icon: "📰" },
    { path: "/contact", label: "CONTACT", icon: "📞" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl border-b-4 border-blue-900 w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900"></div>

      <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-4 group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative">
              <div className={`w-12 h-12 bg-blue-900 flex items-center justify-center transform transition-all duration-300 ${isLogoHovered ? 'shadow-lg' : 'shadow-md'}`}>
                <span className="text-white text-xl font-black">R</span>
              </div>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-blue-900 uppercase group-hover:scale-105 transition-transform">Rubidsoft</span>
              <span className="text-xs text-gray-600 font-semibold tracking-wide">Enterprise Solutions</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 overflow-x-auto max-w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded font-semibold transition-colors duration-200 flex items-center space-x-1 text-sm ${
                  isActive(item.path)
                    ? "bg-blue-900 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <Link
              to="/user/client-portal"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded shadow hover:from-blue-800 hover:to-blue-700 text-sm"
            >
              🔐 Client Portal →
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 border border-gray-300 text-blue-900 rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded font-semibold text-sm flex items-center space-x-2 ${
                    isActive(item.path)
                      ? "bg-blue-900 text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              <Link
                to="/user/client-portal"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded font-bold text-sm"
              >
                🔐 Client Portal →
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
