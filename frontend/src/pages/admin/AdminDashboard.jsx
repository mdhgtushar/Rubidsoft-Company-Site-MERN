import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Activity,
  Calendar
} from 'lucide-react';
import Button from '../../components/Button';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    // This would typically come from your API
    setStats({
      totalUsers: 1250,
      totalProducts: 89,
      totalOrders: 456,
      totalRevenue: 125000,
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">New user registered</p>
            <p className="text-xs text-gray-500">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">Order #1234 completed</p>
            <p className="text-xs text-gray-500">15 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">New product added</p>
            <p className="text-xs text-gray-500">1 hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts.toLocaleString()}
            icon={Package}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            color="purple"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="success" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
                <Button variant="warning" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
                <Button variant="outline" className="w-full">
                  <Activity className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 