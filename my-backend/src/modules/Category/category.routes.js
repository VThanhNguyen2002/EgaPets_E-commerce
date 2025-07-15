const router = require('express').Router();
const controller = require('./category.controller');

// Get all categories
router.get('/', controller.getAll);

// Get category by ID
router.get('/:id(\\d+)', controller.getById);

module.exports = router;