// API Base URL - Update this to match your backend server
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // User Management
  USER_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  ALL_USERS: '/users',
  
  // Projects
  PROJECTS: '/projects',
  FEATURED_PROJECTS: '/projects/featured',
  PROJECT_BY_SLUG: '/projects',
  
  // Services
  SERVICES: '/services',
  FEATURED_SERVICES: '/services/featured',
  SERVICE_BY_SLUG: '/services',
  
  // Orders
  ORDERS: '/orders',
  USER_ORDERS: '/orders/user/me',
  ORDER_MESSAGES: '/orders',
  
  // Blog
  BLOG_POSTS: '/blog',
  FEATURED_BLOG_POSTS: '/blog/featured',
  BLOG_POST_BY_SLUG: '/blog',
  BLOG_COMMENTS: '/blog',
  
  // Contact
  CONTACT: '/contact',
  CONTACT_RESPONSES: '/contact',
  CONTACT_NOTES: '/contact',
  
  // Tasks
  TASKS: '/tasks',
  USER_TASKS: '/tasks/user/me',
  TASK_COMMENTS: '/tasks',
  TASK_TIME_ENTRIES: '/tasks',
  
  // Products
  PRODUCTS: '/products',
  FEATURED_PRODUCTS: '/products/featured',
  PRODUCT_BY_SLUG: '/products',
  PRODUCT_REVIEWS: '/products',
  
  // File Upload
  UPLOAD: '/upload',
  
  // Dashboard Stats
  DASHBOARD_STATS: '/dashboard/stats',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Task Status
export const TASK_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Task Priority
export const TASK_PRIORITY = {
  URGENT: 'urgent',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  CLIENT: 'client',
};

// Contact Status
export const CONTACT_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in-progress',
  RESPONDED: 'responded',
  RESOLVED: 'resolved',
  SPAM: 'spam',
};

// Blog Post Status
export const BLOG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

// Product Status
export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  OUT_OF_STOCK: 'out-of-stock',
  DISCONTINUED: 'discontinued',
};

// File Upload Types
export const UPLOAD_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  VIDEO: 'video',
};

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: 'yyyy-MM-dd HH:mm:ss',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ROLE: 'userRole',
  IS_AUTHENTICATED: 'isAuthenticated',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You don\'t have permission to view this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  ORDER_CREATED: 'Order created successfully.',
  MESSAGE_SENT: 'Message sent successfully.',
  COMMENT_ADDED: 'Comment added successfully.',
  TASK_UPDATED: 'Task updated successfully.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
};

export const BLOG_ROUTE = "/blog"; 