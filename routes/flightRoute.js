const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authUser } = require('../middleware/auth');

const schedule = require('../controllers/flightController.js');

// Schedule Flight
router.post('/', schedule.scheduleFlight);

router.get('/', schedule.allFlights);



module.exports = router;
