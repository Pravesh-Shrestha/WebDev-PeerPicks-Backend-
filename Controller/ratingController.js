const Rating = require('../models/ratingModel');

exports.createRating = async (req, res) => {
  try {
    const { rating, review, userId, businessId } = req.body;
    const newRating = await Rating.create({
      Rating: rating,
      Review: review,
      User_ID: userId,
      Business_ID: businessId,
      Timestamp: new Date(),
    });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRatingsByBusiness = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { Business_ID: req.params.id },
    });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};