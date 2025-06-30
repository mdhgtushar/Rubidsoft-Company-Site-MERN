const express = require('express');
const router = express.Router();

// Import controller
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('./user.controller');

// Import middleware
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate, sanitizeInput } = require('../../utils/validateInput');

// Public routes
router.post('/register', 
  sanitizeInput,
  validationRules.register,
  validate,
  register
);

router.post('/login',
  sanitizeInput,
  validationRules.login,
  validate,
  login
);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.post('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile',
  sanitizeInput,
  validationRules.updateProfile,
  validate,
  updateProfile
);
router.put('/change-password',
  sanitizeInput,
  validationRules.changePassword,
  validate,
  changePassword
);

// Admin routes
router.use(authorize('admin')); // All routes after this middleware require admin role

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUserById)
  .put(
    sanitizeInput,
    validationRules.updateProfile,
    validate,
    updateUser
  )
  .delete(deleteUser);

module.exports = router;
