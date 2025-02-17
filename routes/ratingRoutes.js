const express = require('express');
const { createRating, getRatingsByBusiness } = require('../Controller/ratingController');

const router = express.Router();

// Route to create a new rating
router.post('/', createRating);

// Route to get ratings for a specific business
router.get('/business/:id', getRatingsByBusiness);

module.exports = router;