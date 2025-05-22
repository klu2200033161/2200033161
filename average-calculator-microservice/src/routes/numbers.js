const express = require('express');
const router = express.Router();
const averageController = require('../controllers/averageController');

router.get('/:numberid', averageController.calculateAverage);

module.exports = router;