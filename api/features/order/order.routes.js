const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  assignOrder,
  addMessage,
  getOrderStats,
  getUserOrders
} = require('./order.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.post('/', createOrder);

// Protected routes
router.use(protect);

// User routes
router.get('/user/me', getUserOrders);
router.get('/:id', getOrderById);
router.post('/:id/messages', addMessage);

// Admin only routes
router.use(authorize('admin'));

router.get('/', getAllOrders);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/assign', assignOrder);
router.get('/stats/overview', getOrderStats);

module.exports = router; 