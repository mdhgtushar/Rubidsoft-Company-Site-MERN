const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory,
  addReview,
  updateReviewStatus,
  getProductStats,
  toggleFeatured,
  togglePublish
} = require('./product.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:slug', getProductBySlug);

// Protected routes
router.use(protect);

// User routes
router.post('/:id/reviews', addReview);

// Admin only routes
router.use(authorize('admin'));

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/toggle-featured', toggleFeatured);
router.patch('/:id/publish', togglePublish);
router.patch('/:id/reviews/:reviewId', updateReviewStatus);
router.get('/stats/overview', getProductStats);

module.exports = router; 