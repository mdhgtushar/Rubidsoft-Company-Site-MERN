import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardService, orderService, contactService, taskService } from "../../services/apiService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    totalRevenue: 0,
    pendingTasks: 0,
    activeServices: 0,
    totalOrders: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quickActions] = useState([
    {
      title: "Add New Client",
      description: "Register a new client",
      icon: "👤",
      link: "/admin/clients",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Create Task",
      description: "Assign new task",
      icon: "📋",
      link: "/admin/tasks",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Manage Services",
      description: "Update service offerings",
      icon: "⚙️",
      link: "/admin/services",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "View Orders",
      description: "Check recent orders",
      icon: "📦",
      link: "/admin/orders",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch dashboard stats
        const dashboardStats = await dashboardService.getDashboardStats();
        // Fetch recent data for activities
        const [recentOrders, recentContacts, recentTasks] = await Promise.all([
          orderService.getAllOrders({ limit: 3, sort: '-createdAt' }),
          contactService.getAllContacts({ limit: 3, sort: '-createdAt' }),
          taskService.getAllTasks({ limit: 3, sort: '-createdAt' })
        ]);
        // Defensive assignments
        setStats({
          totalClients: dashboardStats.contacts?.total || 0,
          totalProjects: dashboardStats.projects?.total || 0,
          totalRevenue: dashboardStats.orders?.totalRevenue || 0,
          pendingTasks: dashboardStats.tasks?.pending || 0,
          activeServices: dashboardStats.services?.active || 0,
          totalOrders: dashboardStats.orders?.total || 0
        });
        // Defensive: always set to array
        const ordersArr = Array.isArray(recentOrders.data?.data) ? recentOrders.data.data : [];
        const contactsArr = Array.isArray(recentContacts.data?.data) ? recentContacts.data.data : [];
        const tasksArr = Array.isArray(recentTasks.data?.data) ? recentTasks.data.data : [];
        // Create recent activities from real data
        const activities = [];
        ordersArr.forEach(order => {
          activities.push({
            id: order._id,
            type: "new_order",
            message: `New order received: ${order.service?.title || 'Service'}`,
            time: new Date(order.createdAt).toLocaleDateString(),
            icon: "💰",
            color: "bg-purple-500"
          });
        });
        contactsArr.forEach(contact => {
          activities.push({
            id: contact._id,
            type: "new_contact",
            message: `New inquiry from: ${contact.name}`,
            time: new Date(contact.createdAt).toLocaleDateString(),
            icon: "📧",
            color: "bg-blue-500"
          });
        });
        tasksArr.forEach(task => {
          activities.push({
            id: task._id,
            type: "task_assigned",
            message: `Task assigned: ${task.title}`,
            time: new Date(task.createdAt).toLocaleDateString(),
            icon: "🔧",
            color: "bg-orange-500"
          });
        });
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentActivities(activities.slice(0, 4));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setStats({
          totalClients: 0,
          totalProjects: 0,
          totalRevenue: 0,
          pendingTasks: 0,
          activeServices: 0,
          totalOrders: 0
        });
        setRecentActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            📊 Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+12%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+8%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+15%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600">-3</span>
            <span className="text-gray-600 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeServices}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+2</span>
            <span className="text-gray-600 ml-1">new this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+23</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`flex items-center p-4 rounded-lg text-white ${action.color} transition-all duration-300 transform hover:scale-105`}
                >
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <div>
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <Link to="/admin/activities" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center text-white`}>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Revenue chart would be displayed here</p>
              <p className="text-sm text-gray-500">Monthly revenue trends</p>
            </div>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Progress</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="text-sm font-medium">20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">New Clients</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <span className="text-3xl">👥</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Completed Tasks</p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Projects</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <span className="text-3xl">🚀</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Support Tickets</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <span className="text-3xl">🎫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 