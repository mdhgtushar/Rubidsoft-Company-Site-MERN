const express = require('express');
const router = express.Router();

// Import feature routes
const userRoutes = require('./user/user.routes');

// Mount routes
router.use('/auth', userRoutes);
router.use('/users', userRoutes);

module.exports = router;
