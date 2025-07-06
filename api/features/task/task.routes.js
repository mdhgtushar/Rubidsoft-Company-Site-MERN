const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  assignTask,
  addComment,
  addTimeEntry,
  getTaskStats,
  getUserTasks
} = require('./task.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// All routes require authentication
router.use(protect);

// User routes
router.get('/user/me', getUserTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id/status', updateTaskStatus);
router.post('/:id/comments', addComment);
router.post('/:id/time', addTimeEntry);

// Admin only routes
router.use(authorize('admin'));

router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id/assign', assignTask);
router.get('/stats/overview', getTaskStats);

module.exports = router; 