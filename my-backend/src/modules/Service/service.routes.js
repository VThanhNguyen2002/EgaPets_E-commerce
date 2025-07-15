const router = require('express').Router();
const controller = require('./service.controller');

// Get all services
router.get('/', controller.getAll);

// Get service by ID
router.get('/:id(\\d+)', controller.getById);

// Get service details with pricing
router.get('/:id(\\d+)/details', controller.getServiceDetails);

module.exports = router;