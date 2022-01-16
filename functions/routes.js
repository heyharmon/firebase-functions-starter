const express = require('express');
const router = express.Router();

// Import controller(s)
const controller = require('./controller');

// Setup route(s)
router.get('/my-route', controller.get);

module.exports = router
