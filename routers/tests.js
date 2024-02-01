const express = require('express');
const router = express.Router();
const testController = require('../controllers/tests');

// Create a new test
router.post('/', testController.createTest);

// Evaluate a test
router.post('/evaluate', testController.evaluateTest);

module.exports = router;
