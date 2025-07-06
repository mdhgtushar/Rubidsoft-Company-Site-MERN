import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication Service
export const authService = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  logout: async () => {
    return api.post('/auth/logout');
  },

  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token, password) => {
    return api.post('/auth/reset-password', { token, password });
  },
};

// User Service
export const userService = {
  getProfile: async () => {
    return api.get('/users/profile');
  },

  updateProfile: async (userData) => {
    return api.put('/users/profile', userData);
  },

  changePassword: async (passwordData) => {
    return api.put('/users/change-password', passwordData);
  },

  // Admin specific endpoints
  getAllUsers: async (params = {}) => {
    return api.get('/users', { params });
  },

  getUserById: async (userId) => {
    return api.get(`/users/${userId}`);
  },

  updateUser: async (userId, userData) => {
    return api.put(`/users/${userId}`, userData);
  },

  deleteUser: async (userId) => {
    return api.delete(`/users/${userId}`);
  },
};

// Project Service
export const projectService = {
  getAllProjects: async (params = {}) => {
    return api.get('/projects', { params });
  },

  getProjectBySlug: async (slug) => {
    return api.get(`/projects/${slug}`);
  },

  getFeaturedProjects: async (limit = 6) => {
    return api.get('/projects/featured', { params: { limit } });
  },

  getProjectsByCategory: async (category, params = {}) => {
    return api.get(`/projects/category/${category}`, { params });
  },

  // Admin endpoints
  createProject: async (projectData) => {
    return api.post('/projects', projectData);
  },

  updateProject: async (projectId, projectData) => {
    return api.put(`/projects/${projectId}`, projectData);
  },

  deleteProject: async (projectId) => {
    return api.delete(`/projects/${projectId}`);
  },

  toggleFeatured: async (projectId) => {
    return api.patch(`/projects/${projectId}/toggle-featured`);
  },

  togglePublished: async (projectId) => {
    return api.patch(`/projects/${projectId}/toggle-published`);
  },

  getProjectStats: async () => {
    return api.get('/projects/stats/overview');
  },
};

// Service Service
export const serviceService = {
  getAllServices: async (params = {}) => {
    return api.get('/services', { params });
  },

  getServiceBySlug: async (slug) => {
    return api.get(`/services/${slug}`);
  },

  getFeaturedServices: async (limit = 6) => {
    return api.get('/services/featured', { params: { limit } });
  },

  getServicesByCategory: async (category, params = {}) => {
    return api.get(`/services/category/${category}`, { params });
  },

  // Admin endpoints
  createService: async (serviceData) => {
    return api.post('/services', serviceData);
  },

  updateService: async (serviceId, serviceData) => {
    return api.put(`/services/${serviceId}`, serviceData);
  },

  deleteService: async (serviceId) => {
    return api.delete(`/services/${serviceId}`);
  },

  toggleActive: async (serviceId) => {
    return api.patch(`/services/${serviceId}/toggle-active`);
  },

  toggleFeatured: async (serviceId) => {
    return api.patch(`/services/${serviceId}/toggle-featured`);
  },

  updateServiceOrder: async (serviceId, order) => {
    return api.patch(`/services/${serviceId}/order`, { order });
  },

  getServiceStats: async () => {
    return api.get('/services/stats/overview');
  },
};

// Order Service
export const orderService = {
  createOrder: async (orderData) => {
    return api.post('/orders', orderData);
  },

  getUserOrders: async (params = {}) => {
    return api.get('/orders/user/me', { params });
  },

  getOrderById: async (orderId) => {
    return api.get(`/orders/${orderId}`);
  },

  addMessage: async (orderId, message) => {
    return api.post(`/orders/${orderId}/messages`, { message });
  },

  // Admin endpoints
  getAllOrders: async (params = {}) => {
    return api.get('/orders', { params });
  },

  updateOrder: async (orderId, orderData) => {
    return api.put(`/orders/${orderId}`, orderData);
  },

  deleteOrder: async (orderId) => {
    return api.delete(`/orders/${orderId}`);
  },

  updateOrderStatus: async (orderId, status) => {
    return api.patch(`/orders/${orderId}/status`, { status });
  },

  assignOrder: async (orderId, assignedTo) => {
    return api.patch(`/orders/${orderId}/assign`, { assignedTo });
  },

  getOrderStats: async () => {
    return api.get('/orders/stats/overview');
  },
};

// Blog Service
export const blogService = {
  getAllBlogPosts: async (params = {}) => {
    return api.get('/blog', { params });
  },

  getBlogPostBySlug: async (slug) => {
    return api.get(`/blog/${slug}`);
  },

  getFeaturedBlogPosts: async (limit = 6) => {
    return api.get('/blog/featured', { params: { limit } });
  },

  getBlogPostsByCategory: async (category, params = {}) => {
    return api.get(`/blog/category/${category}`, { params });
  },

  addComment: async (blogId, commentData) => {
    return api.post(`/blog/${blogId}/comments`, commentData);
  },

  // Admin endpoints
  createBlogPost: async (blogData) => {
    return api.post('/blog', blogData);
  },

  updateBlogPost: async (blogId, blogData) => {
    return api.put(`/blog/${blogId}`, blogData);
  },

  deleteBlogPost: async (blogId) => {
    return api.delete(`/blog/${blogId}`);
  },

  toggleFeatured: async (blogId) => {
    return api.patch(`/blog/${blogId}/toggle-featured`);
  },

  togglePublish: async (blogId) => {
    return api.patch(`/blog/${blogId}/publish`);
  },

  updateCommentStatus: async (blogId, commentId, isApproved) => {
    return api.patch(`/blog/${blogId}/comments/${commentId}`, { isApproved });
  },

  getBlogStats: async () => {
    return api.get('/blog/stats/overview');
  },
};

// Contact Service
export const contactService = {
  createContact: async (contactData) => {
    return api.post('/contact', contactData);
  },

  // Admin endpoints
  getAllContacts: async (params = {}) => {
    return api.get('/contact', { params });
  },

  getContactById: async (contactId) => {
    return api.get(`/contact/${contactId}`);
  },

  updateContact: async (contactId, contactData) => {
    return api.put(`/contact/${contactId}`, contactData);
  },

  deleteContact: async (contactId) => {
    return api.delete(`/contact/${contactId}`);
  },

  updateContactStatus: async (contactId, status) => {
    return api.patch(`/contact/${contactId}/status`, { status });
  },

  assignContact: async (contactId, assignedTo) => {
    return api.patch(`/contact/${contactId}/assign`, { assignedTo });
  },

  addNote: async (contactId, note) => {
    return api.post(`/contact/${contactId}/notes`, { note });
  },

  addResponse: async (contactId, responseData) => {
    return api.post(`/contact/${contactId}/responses`, responseData);
  },

  toggleSpam: async (contactId, isSpam) => {
    return api.patch(`/contact/${contactId}/spam`, { isSpam });
  },

  getContactStats: async () => {
    return api.get('/contact/stats/overview');
  },
};

// Task Service
export const taskService = {
  getUserTasks: async (params = {}) => {
    return api.get('/tasks/user/me', { params });
  },

  getTaskById: async (taskId) => {
    return api.get(`/tasks/${taskId}`);
  },

  updateTask: async (taskId, taskData) => {
    return api.put(`/tasks/${taskId}`, taskData);
  },

  updateTaskStatus: async (taskId, status) => {
    return api.patch(`/tasks/${taskId}/status`, { status });
  },

  addComment: async (taskId, comment) => {
    return api.post(`/tasks/${taskId}/comments`, { comment });
  },

  addTimeEntry: async (taskId, timeData) => {
    return api.post(`/tasks/${taskId}/time`, timeData);
  },

  // Admin endpoints
  getAllTasks: async (params = {}) => {
    return api.get('/tasks', { params });
  },

  createTask: async (taskData) => {
    return api.post('/tasks', taskData);
  },

  deleteTask: async (taskId) => {
    return api.delete(`/tasks/${taskId}`);
  },

  assignTask: async (taskId, assignedTo) => {
    return api.patch(`/tasks/${taskId}/assign`, { assignedTo });
  },

  getTaskStats: async () => {
    return api.get('/tasks/stats/overview');
  },
};

// Product Service
export const productService = {
  getAllProducts: async (params = {}) => {
    return api.get('/products', { params });
  },

  getProductBySlug: async (slug) => {
    return api.get(`/products/${slug}`);
  },

  getFeaturedProducts: async (limit = 6) => {
    return api.get('/products/featured', { params: { limit } });
  },

  getProductsByCategory: async (category, params = {}) => {
    return api.get(`/products/category/${category}`, { params });
  },

  addReview: async (productId, reviewData) => {
    return api.post(`/products/${productId}/reviews`, reviewData);
  },

  // Admin endpoints
  createProduct: async (productData) => {
    return api.post('/products', productData);
  },

  updateProduct: async (productId, productData) => {
    return api.put(`/products/${productId}`, productData);
  },

  deleteProduct: async (productId) => {
    return api.delete(`/products/${productId}`);
  },

  toggleFeatured: async (productId) => {
    return api.patch(`/products/${productId}/toggle-featured`);
  },

  togglePublish: async (productId) => {
    return api.patch(`/products/${productId}/publish`);
  },

  updateReviewStatus: async (productId, reviewId, isApproved) => {
    return api.patch(`/products/${productId}/reviews/${reviewId}`, { isApproved });
  },

  getProductStats: async () => {
    return api.get('/products/stats/overview');
  },
};

// Dashboard Service
export const dashboardService = {
  getDashboardStats: async () => {
    try {
      const [orderStats, contactStats, projectStats, serviceStats] = await Promise.all([
        orderService.getOrderStats(),
        contactService.getContactStats(),
        projectService.getProjectStats(),
        serviceService.getServiceStats()
      ]);

      return {
        orders: orderStats.data.data,
        contacts: contactStats.data.data,
        projects: projectStats.data.data,
        services: serviceStats.data.data
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  getRecentOrders: async (limit = 5) => {
    return orderService.getAllOrders({ limit, sort: '-createdAt' });
  },

  getRecentContacts: async (limit = 5) => {
    return contactService.getAllContacts({ limit, sort: '-createdAt' });
  },

  getRecentTasks: async (limit = 5) => {
    return taskService.getAllTasks({ limit, sort: '-createdAt' });
  },
};

export default api; 