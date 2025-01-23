// controllers/ratingController.js
const Rating = require('../models/ratingModel');

const RatingController = {
  create: async (req, res) => {
    const { userId, businessId, rating, review } = req.body;
    try {
      const newRating = await Rating.create(userId, businessId, rating, review);
      res.status(201).json(newRating);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add rating' });
    }
  },
};

module.exports = RatingController;