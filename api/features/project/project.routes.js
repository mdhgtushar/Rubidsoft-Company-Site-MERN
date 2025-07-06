const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectStats,
  toggleFeatured,
  togglePublished
} = require('./project.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:slug', getProjectBySlug);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/stats/overview', getProjectStats);
router.patch('/:id/toggle-featured', toggleFeatured);
router.patch('/:id/toggle-published', togglePublished);

module.exports = router; 