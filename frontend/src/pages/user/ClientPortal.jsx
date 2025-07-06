import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ClientPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    requirements: ""
  });
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Solutions Inc.",
    memberSince: "2023-01-15"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would call your API
    setIsLoggedIn(true);
    // Set authentication in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userData', JSON.stringify(user));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (registrationForm.password !== registrationForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Mock registration - in real app, this would call your API
    const newUser = {
      name: registrationForm.name,
      email: registrationForm.email,
      company: registrationForm.company,
      memberSince: new Date().toISOString().split('T')[0]
    };
    
    setIsLoggedIn(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  };

  const handleNavigateToUserDashboard = () => {
    navigate('/user/dashboard');
  };

  const handleNavigateToOrders = () => {
    navigate('/user/orders');
  };

  const handleNavigateToTasks = () => {
    navigate('/user/tasks');
  };

  const handleNavigateToProfile = () => {
    navigate('/user/profile');
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}!</h1>
              <p className="text-slate-600">Manage your projects and track your orders</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={handleNavigateToUserDashboard}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Dashboard</h3>
            <p className="text-sm text-slate-600">View your complete dashboard</p>
          </div>

          <div 
            onClick={handleNavigateToOrders}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">My Orders</h3>
            <p className="text-sm text-slate-600">Track your project orders</p>
          </div>

          <div 
            onClick={handleNavigateToTasks}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">My Tasks</h3>
            <p className="text-sm text-slate-600">View assigned tasks</p>
          </div>

          <div 
            onClick={handleNavigateToProfile}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Profile</h3>
            <p className="text-sm text-slate-600">Manage your profile</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Place New Order</h3>
              <p className="text-sm text-slate-600 mb-4">Start a new project or request a service</p>
              <Link 
                to="/order-form"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Order
              </Link>
            </div>

            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Support</h3>
              <p className="text-sm text-slate-600 mb-4">Get help with your projects or account</p>
              <Link 
                to="/contact"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Welcome to your client portal!</p>
                <p className="text-sm text-slate-600">You can now access all your project information</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Account activated</p>
                <p className="text-sm text-slate-600">Your client portal access has been granted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal; 