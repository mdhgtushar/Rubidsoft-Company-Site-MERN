import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-80'} bg-white shadow-lg transition-all duration-300 ease-in-out relative z-20`}>
        <AdminHeader collapsed={sidebarCollapsed} />
        
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <svg 
            className={`w-4 h-4 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {location.pathname === '/admin' ? 'Dashboard' : 
                 location.pathname.includes('/admin/tasks') ? 'Task Management' :
                 location.pathname.includes('/admin/clients') ? 'Client Management' :
                 location.pathname.includes('/admin/services') ? 'Services Management' :
                 location.pathname.includes('/admin/products') ? 'Products Management' :
                 location.pathname.includes('/admin/orders') ? 'Order Management' :
                 location.pathname.includes('/admin/lab') ? 'R&D Lab' :
                 location.pathname.includes('/admin/contact') ? 'Contact Management' :
                 location.pathname.includes('/admin/blog') ? 'Blog Management' :
                 location.pathname.includes('/admin/settings') ? 'Settings' : 'Admin Panel'}
              </h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>•</span>
                <span>Rubidsoft Admin</span>
                <span>•</span>
                <span>v2.0</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500">admin@rubidsoft.com</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  🌐 View Site
                </Link>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  📊 Reports
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/admin" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            {location.pathname !== '/admin' && (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium">
                  {location.pathname.includes('/admin/tasks') ? 'Tasks' :
                   location.pathname.includes('/admin/clients') ? 'Clients' :
                   location.pathname.includes('/admin/services') ? 'Services' :
                   location.pathname.includes('/admin/products') ? 'Products' :
                   location.pathname.includes('/admin/orders') ? 'Orders' :
                   location.pathname.includes('/admin/lab') ? 'Lab' :
                   location.pathname.includes('/admin/contact') ? 'Contact' :
                   location.pathname.includes('/admin/blog') ? 'Blog' :
                   location.pathname.includes('/admin/settings') ? 'Settings' : 'Admin'}
                </span>
              </>
            )}
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>© 2024 Rubidsoft. All rights reserved.</span>
              <span>•</span>
              <span>Version 2.0.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span>Server Status: 🟢 Online</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default AdminLayout; 