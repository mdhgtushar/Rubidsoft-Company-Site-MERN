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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const userService = {
  // Authentication
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  logout: async () => {
    return api.post('/auth/logout');
  },

  // User profile
  getProfile: async () => {
    return api.get('/user/profile');
  },

  updateProfile: async (userData) => {
    return api.put('/user/profile', userData);
  },

  // Password management
  changePassword: async (passwordData) => {
    return api.put('/user/change-password', passwordData);
  },

  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token, password) => {
    return api.post('/auth/reset-password', { token, password });
  },

  // Admin specific endpoints
  getAllUsers: async () => {
    return api.get('/admin/users');
  },

  getUserById: async (userId) => {
    return api.get(`/admin/users/${userId}`);
  },

  updateUser: async (userId, userData) => {
    return api.put(`/admin/users/${userId}`, userData);
  },

  deleteUser: async (userId) => {
    return api.delete(`/admin/users/${userId}`);
  },
};

export default userService; 