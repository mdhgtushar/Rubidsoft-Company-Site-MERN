import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClientPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Solutions Inc.",
    memberSince: "2023-01-15"
  };

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      project: "E-commerce Website",
      status: "In Progress",
      progress: 75,
      startDate: "2024-01-15",
      estimatedCompletion: "2024-03-15",
      budget: "$8,500",
      requirements: "Responsive design, payment integration, inventory management"
    },
    {
      id: "ORD-002",
      project: "Mobile App Development",
      status: "Completed",
      progress: 100,
      startDate: "2023-11-01",
      completionDate: "2024-01-10",
      budget: "$15,000",
      requirements: "iOS and Android app, user authentication, push notifications"
    },
    {
      id: "ORD-003",
      project: "Website Maintenance",
      status: "Pending",
      progress: 0,
      startDate: "2024-03-01",
      estimatedCompletion: "2024-03-15",
      budget: "$500",
      requirements: "Security updates, performance optimization, content updates"
    }
  ];

  // Mock invoices data
  const invoices = [
    {
      id: "INV-001",
      orderId: "ORD-001",
      amount: "$4,250",
      status: "Paid",
      dueDate: "2024-02-15",
      downloadUrl: "#"
    },
    {
      id: "INV-002",
      orderId: "ORD-002",
      amount: "$15,000",
      status: "Paid",
      dueDate: "2024-01-10",
      downloadUrl: "#"
    },
    {
      id: "INV-003",
      orderId: "ORD-003",
      amount: "$500",
      status: "Pending",
      dueDate: "2024-03-15",
      downloadUrl: "#"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would call your API
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Portal</h1>
              <p className="text-slate-600">Access your projects, orders, and invoices</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact us to get started
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
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

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="flex border-b border-slate-200">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "orders", label: "My Orders", icon: "📋" },
              { id: "invoices", label: "Invoices", icon: "💰" },
              { id: "requirements", label: "Submit Requirements", icon: "📝" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Active Orders</p>
                      <p className="text-2xl font-bold text-blue-900">2</p>
                    </div>
                    <div className="text-2xl">📋</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Completed</p>
                      <p className="text-2xl font-bold text-green-900">1</p>
                    </div>
                    <div className="text-2xl">✅</div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Pending Invoices</p>
                      <p className="text-2xl font-bold text-orange-900">1</p>
                    </div>
                    <div className="text-2xl">💰</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Total Spent</p>
                      <p className="text-2xl font-bold text-purple-900">$19,750</p>
                    </div>
                    <div className="text-2xl">💳</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">New order placed</p>
                      <p className="text-sm text-slate-600">Website Maintenance - ORD-003</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Project completed</p>
                      <p className="text-sm text-slate-600">Mobile App Development - ORD-002</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">My Orders</h2>
              
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{order.project}</h3>
                        <p className="text-sm text-slate-600">Order ID: {order.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed" ? "bg-green-100 text-green-800" :
                        order.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Start Date: {order.startDate}</p>
                        <p className="text-sm text-slate-600">
                          {order.status === "Completed" ? "Completed: " + order.completionDate : "Estimated Completion: " + order.estimatedCompletion}
                        </p>
                        <p className="text-sm text-slate-600">Budget: {order.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-2">Progress</p>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{order.progress}% complete</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-900 mb-2">Requirements:</p>
                      <p className="text-sm text-slate-600">{order.requirements}</p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download Files
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "invoices" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Invoices</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Invoice ID</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-slate-200">
                        <td className="py-3 px-4 text-sm text-slate-900">{invoice.id}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{invoice.orderId}</td>
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{invoice.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{invoice.dueDate}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Requirements</h2>
              
              <div className="max-w-2xl">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select a service</option>
                      <option>Website Development</option>
                      <option>Web Application Development</option>
                      <option>E-commerce Solutions</option>
                      <option>SaaS Development</option>
                      <option>API Development</option>
                      <option>Bug Fixing & Maintenance</option>
                      <option>Project Planning & Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Detailed Requirements
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your project requirements in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Budget Range
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select budget range</option>
                      <option>$500 - $2,000</option>
                      <option>$2,000 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Timeline
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select timeline</option>
                      <option>1-2 weeks</option>
                      <option>2-4 weeks</option>
                      <option>1-2 months</option>
                      <option>2-3 months</option>
                      <option>3+ months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Attachments
                    </label>
                    <input
                      type="file"
                      multiple
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Upload any relevant files (designs, documents, etc.)
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit Requirements
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal; 