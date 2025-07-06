const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./user/user.routes');
const projectRoutes = require('./project/project.routes');
const serviceRoutes = require('./service/service.routes');
const orderRoutes = require('./order/order.routes');
const blogRoutes = require('./blog/blog.routes');
const contactRoutes = require('./contact/contact.routes');
const taskRoutes = require('./task/task.routes');
const productRoutes = require('./product/product.routes');

// Mount routes
router.use('/auth', userRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/orders', orderRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/tasks', taskRoutes);
router.use('/products', productRoutes);

module.exports = router;
