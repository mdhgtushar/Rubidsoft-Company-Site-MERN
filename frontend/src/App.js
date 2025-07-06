import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import UserDashboardLayout from './layouts/UserDashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Projects from './pages/public/Projects';
import ProjectDetail from './pages/public/ProjectDetail';
import Contact from './pages/public/Contact';
import Works from './pages/public/Works';
import OrderForm from './pages/public/OrderForm';
import ServiceDetails from './pages/public/ServiceDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Blog from './pages/admin/Blog';
import ClientList from './pages/admin/ClientList';
import AdminContact from './pages/admin/Contact';
import Lab from './pages/admin/Lab';
import Products from './pages/admin/Products';
import ServicesAdminPage from './pages/admin/Services';
import Tasks from './pages/admin/Tasks';

// User Dashboard Pages
import UserDashboard from './pages/user/UserDashboard';
import ClientPortal from './pages/user/ClientPortal';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // This is a simple example - you'll want to implement proper auth logic
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  
  // if (allowedRoles && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
  
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
            <Route path="services" element={<Services />} />
            <Route path="services/:serviceId" element={<ServiceDetails />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="works" element={<Works />} />
            <Route path="services/:serviceId/order" element={<OrderForm />} />
            <Route path="projects/:projectId/order" element={<OrderForm />} />
            <Route path="*" element={<div>Page Not Found</div>} />
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
            <Route path="blog" element={<Blog />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="lab" element={<Lab />} />
            <Route path="products" element={<Products />} />
            <Route path="services" element={<ServicesAdminPage />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
          
          {/* User Dashboard Routes */}
          <Route 
            path="/user" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="client-portal" element={<ClientPortal />} />
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
