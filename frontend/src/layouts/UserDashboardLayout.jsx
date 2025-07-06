import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const UserDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Dashboard Content with top padding for fixed header */}
      <div className="flex-1 bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout; 