const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getFeaturedServices,
  getServicesByCategory,
  getServiceStats,
  toggleActive,
  toggleFeatured,
  updateServiceOrder
} = require('./service.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.get('/', getAllServices);
router.get('/featured', getFeaturedServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:slug', getServiceBySlug);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.get('/stats/overview', getServiceStats);
router.patch('/:id/toggle-active', toggleActive);
router.patch('/:id/toggle-featured', toggleFeatured);
router.patch('/:id/order', updateServiceOrder);

module.exports = router; 