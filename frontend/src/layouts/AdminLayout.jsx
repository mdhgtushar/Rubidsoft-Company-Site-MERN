import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="w-96 bg-gray-100 border-r border-gray-300">
        <AdminHeader />
      </div>
      
      {/* Main Content Area - Single Scroll Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="bg-gray-100 border-b border-gray-300 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              <Link to="/admin">
                <b>Rubidsoft Super Admin V1.0</b>
              </Link>
            </h2>
            
            <div className="flex items-center space-x-4">
              <Link to="/admin/" className="text-gray-700 hover:text-gray-900">
                Settings
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/auth/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/auth/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 