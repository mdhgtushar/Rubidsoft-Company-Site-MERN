import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings,
  Calendar,
  MapPin
} from 'lucide-react';
import Button from '../../components/Button';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistItems: 0,
  });

  useEffect(() => {
    // Fetch user stats
    // This would typically come from your API
    setUserStats({
      totalOrders: 12,
      totalSpent: 1250,
      wishlistItems: 5,
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

  const RecentOrders = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Order #1234</p>
            <p className="text-sm text-gray-500">Delivered on March 15, 2024</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Delivered
          </span>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Order #1235</p>
            <p className="text-sm text-gray-500">Shipped on March 12, 2024</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Shipped
          </span>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
        </div>

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name || 'User Name'}</h2>
              <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
              <p className="text-sm text-gray-500">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={userStats.totalOrders}
            icon={ShoppingBag}
            color="blue"
          />
          <StatCard
            title="Total Spent"
            value={`$${userStats.totalSpent.toLocaleString()}`}
            icon={User}
            color="green"
          />
          <StatCard
            title="Wishlist Items"
            value={userStats.wishlistItems}
            icon={Heart}
            color="red"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View My Orders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                My Wishlist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 