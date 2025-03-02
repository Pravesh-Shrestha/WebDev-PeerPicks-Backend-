const { Rating } = require("../models/ratingModel");

exports.getRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ratings" });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ error: "Rating not found" });
        res.json(rating);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rating" });
    }
};

exports.createRating = async (req, res) => {
    try {
        const rating = await Rating.create(req.body);
        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ error: "Error creating rating" });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ error: "Rating not found" });

        await rating.update(req.body);
        res.json(rating);
    } catch (error) {
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
        res.status(500).json({ error: "Error deleting rating" });
    }
};
