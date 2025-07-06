const express = require('express');
const router = express.Router();
const {
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  addComment,
  updateCommentStatus,
  getBlogStats,
  toggleFeatured,
  togglePublish
} = require('./blog.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.get('/', getAllBlogPosts);
router.get('/featured', getFeaturedBlogPosts);
router.get('/category/:category', getBlogPostsByCategory);
router.get('/:slug', getBlogPostBySlug);
router.post('/:id/comments', addComment);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', createBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);
router.patch('/:id/toggle-featured', toggleFeatured);
router.patch('/:id/publish', togglePublish);
router.patch('/:id/comments/:commentId', updateCommentStatus);
router.get('/stats/overview', getBlogStats);

module.exports = router; 