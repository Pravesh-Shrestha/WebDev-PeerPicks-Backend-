const Rating = require("../models/ratingModel"); 
const User = require('../models/userModel');
const Business = require('../models/businessModel');

exports.getRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            include: [
                { model: User, attributes: ['user_id', 'username'] },  
                { model: Business, attributes: ['business_id', 'business_name'] }  
            ]
        });
        res.json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching ratings" });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['user_id', 'username'] },  // Include user details
                { model: Business, attributes: ['business_id', 'business_name'] }  // Include business details
            ]
        });
        if (!rating) return res.status(404).json({ error: "Rating not found" });
        res.json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching rating" });
    }
};

exports.createRating = async (req, res) => {
    try {
        const { user_id, business_id, rating, review, ratingImage, isSaved } = req.body;

        // Validate that required fields are present
        if (!user_id || !business_id || !rating) {
            return res.status(400).json({ error: "User ID, Business ID, and Rating are required" });
        }

        // Ensure the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Check if the user and business exist
        const user = await User.findByPk(user_id);
        const business = await Business.findByPk(business_id);

        if (!user) return res.status(404).json({ error: "User not found" });
        if (!business) return res.status(404).json({ error: "Business not found" });

        // Create the rating entry
        const ratingEntry = await Rating.create({
            user_id,
            business_id,
            rating,
            review,
            ratingImage: ratingImage || null, // Use null if no image is provided
            isSaved: isSaved || false // Default to false if not provided
        });

        res.status(201).json(ratingEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating rating" });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ error: "Rating not found" });

        // Update the rating entry with new data
        const updatedRating = await rating.update(req.body);
        res.json(updatedRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating rating" });
    }
};

exports.deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ error: "Rating not found" });

        await rating.destroy();
        res.json({ message: "Rating deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting rating" });
    }
};
