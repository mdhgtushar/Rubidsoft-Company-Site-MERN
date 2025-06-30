import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';

// Layouts
import AdminLayout from './pages/user/Admin';
import ClientLayout from './pages/user/Client';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// User Pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import Works from './pages/user/Works';
import UserDashboard from './pages/user/UserDashboard';

// Components
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // This is a simple example - you'll want to implement proper auth logic
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="works" element={<Works />} />
          </Route>
          {/* Login Route */}
          <Route path="/login" element={<div>Login Page</div>} />
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<div>User Management</div>} />
            <Route path="settings" element={<div>Admin Settings</div>} />
          </Route>
          {/* User Dashboard Routes */}
          <Route 
            path="/user" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<div>User Profile</div>} />
            <Route path="orders" element={<div>User Orders</div>} />
          </Route>
          {/* Error Routes */}
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
