const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./users');
const itemRoutes = require('./items');

// Use routes
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;