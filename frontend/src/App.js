import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import UserDashboardLayout from './layouts/UserDashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import Projects from './pages/public/Projects';
import Works from './pages/public/Works';
import OrderForm from './pages/public/OrderForm';
import ServiceDetails from './pages/public/ServiceDetails';
import Blog from './pages/public/Blog';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserOrders from './pages/user/UserOrders';
import UserTasks from './pages/user/UserTasks';
import UserProfile from './pages/user/UserProfile';
import OrderDetail from './pages/user/OrderDetail';
import TaskDetail from './pages/user/TaskDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlog from './pages/admin/Blog';
import AdminClientList from './pages/admin/ClientList';
import AdminContact from './pages/admin/Contact';
import AdminLab from './pages/admin/Lab';
import AdminProducts from './pages/admin/Products';
import AdminServices from './pages/admin/Services';
import AdminTasks from './pages/admin/Tasks';
import AdminOrders from "./pages/admin/Orders"
import AdminSettings from "./pages/admin/Settings"

// Auth Pages
import Login from './pages/user/Login';
import Client from './pages/user/Client';
import ClientPortal from './pages/user/ClientPortal';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <ClientLayout>
              <Home />
            </ClientLayout>
          } />
          <Route path="/about" element={
            <ClientLayout>
              <About />
            </ClientLayout>
          } />
          <Route path="/contact" element={
            <ClientLayout>
              <Contact />
            </ClientLayout>
          } />
          <Route path="/services" element={
            <ClientLayout>
              <Services />
            </ClientLayout>
          } />
          <Route path="/service/:serviceSlug" element={
            <ClientLayout>
              <ServiceDetails />
            </ClientLayout>
          } />
          <Route path="/projects" element={
            <ClientLayout>
              <Projects />
            </ClientLayout>
          } />
          <Route path="/works" element={
            <ClientLayout>
              <Works />
            </ClientLayout>
          } />
          <Route path="/order-form" element={
            <ClientLayout>
              <OrderForm />
            </ClientLayout>
          } />
          <Route path="/blog" element={<Blog />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/client" element={<Client />} />
          <Route path="/user/client-portal" element={
            <ClientLayout>
              <ClientPortal />
            </ClientLayout>
          } />

          {/* User Dashboard Routes */}
          <Route path="/user/dashboard" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <UserDashboard />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/orders" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <UserOrders />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/orders/:orderId" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <OrderDetail />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/tasks" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <UserTasks />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/tasks/:taskId" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <TaskDetail />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/profile" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboardLayout>
                <UserProfile />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* Temporary Admin Access for Testing */}
          <Route path="/admin-test" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          
          <Route path="/admin/blog" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminBlog />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/clients" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminClientList />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/contact" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminContact />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/lab" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminLab />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminServices />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/tasks" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminTasks />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </ProtectedRoute>
          } />


          {/* Redirect to home for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
