import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminHeader = ({ collapsed = false }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('dashboard');

  const menuItems = [
    {
      section: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      link: '/admin',
      badge: null
    },
    {
      section: 'management',
      title: 'Management',
      icon: '⚙️',
      items: [
        { title: 'Tasks', icon: '📋', link: '/admin/tasks', badge: '12' },
        { title: 'Clients', icon: '👥', link: '/admin/clients', badge: '156' },
        { title: 'Orders', icon: '📦', link: '/admin/orders', badge: '89' },
        { title: 'Services', icon: '🛠️', link: '/admin/services', badge: '8' },
        { title: 'Products', icon: '📱', link: '/admin/products', badge: '24' }
      ]
    },
    {
      section: 'content',
      title: 'Content',
      icon: '📝',
      items: [
        { title: 'Blog', icon: '📰', link: '/admin/blog', badge: '15' },
        { title: 'Lab', icon: '🧪', link: '/admin/lab', badge: '6' }
      ]
    },
    {
      section: 'communication',
      title: 'Communication',
      icon: '💬',
      items: [
        { title: 'Contact', icon: '📞', link: '/admin/contact', badge: '23' }
      ]
    },
    {
      section: 'system',
      title: 'System',
      icon: '🔧',
      items: [
        { title: 'Settings', icon: '⚙️', link: '/admin/settings', badge: null }
      ]
    }
  ];

  const isActive = (link) => {
    if (link === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(link);
  };

  const isSectionActive = (section) => {
    return section.items?.some(item => isActive(item.link));
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Logo Section */}
      <div className={`p-6 border-b border-gray-200 ${collapsed ? 'px-4' : ''}`}>
        <Link to="/admin" className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-lg"
              src="https://scontent.fdac157-1.fna.fbcdn.net/v/t39.30808-6/470226643_1247796683055656_8928878490233155816_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-p_GxVmfj7oQ7kNvwHSJxra&_nc_oc=Adkaz0UyNeZhmMumGZQWeNKh2EuZ89ClHtG2B37o5rEDR3l-MGRFznFv7TsKSH0Uku4&_nc_zt=23&_nc_ht=scontent.fdac157-1.fna&_nc_gid=sgkqcWN1UsjOyJriadVIpg&oh=00_AfSJH1fytl6bRXVp3vnwZPjaqZmchrUcWvLvemy6boH5Ig&oe=686EAF7F"
              alt="Rubidsoft"
            />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">Rubidsoft</h1>
              <p className="text-xs text-gray-500 truncate">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((section) => (
          <div key={section.section}>
            {/* Single Menu Item */}
            {!section.items && (
              <Link
                to={section.link}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive(section.link)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{section.icon}</span>
                  {!collapsed && (
                    <span className="font-medium">{section.title}</span>
                  )}
                </div>
                {section.badge && !collapsed && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {section.badge}
                  </span>
                )}
              </Link>
            )}

            {/* Section with Sub-items */}
            {section.items && (
              <div>
                {/* Section Header */}
                <button
                  onClick={() => setExpandedSection(expandedSection === section.section ? null : section.section)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isSectionActive(section.section)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{section.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{section.title}</span>
                    )}
                  </div>
                  {!collapsed && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedSection === section.section ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Sub-items */}
                {(!collapsed && expandedSection === section.section) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.link}
                        to={item.link}
                        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                          isActive(item.link)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } justify-between`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm">{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            isActive(item.link)
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Collapsed Sub-items */}
                {collapsed && (
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.link}
                        to={item.link}
                        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 group relative ${
                          isActive(item.link)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        title={item.title}
                      >
                        <span className="text-sm">{item.icon}</span>
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className={`p-4 border-t border-gray-200 ${collapsed ? 'px-2' : ''}`}>
        {/* Quick Stats */}
        {!collapsed && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-xs font-medium text-blue-900 mb-2">Quick Stats</div>
            <div className="space-y-1 text-xs text-blue-700">
              <div className="flex justify-between">
                <span>Active Tasks:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>New Orders:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">Admin User</div>
              <div className="text-xs text-gray-500 truncate">admin@rubidsoft.com</div>
            </div>
          )}
          {!collapsed && (
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {!collapsed && (
          <div className="mt-4 space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>🌐</span>
              <span>View Site</span>
            </Link>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
