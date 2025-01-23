// controllers/businessController.js
const Business = require('../models/businessModel');

const BusinessController = {
  getAll: async (req, res) => {
    try {
      const businesses = await Business.findAll();
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch businesses' });
    }
  },

  create: async (req, res) => {
    const { name, description, location } = req.body;
    try {
      const business = await Business.create(name, description, location);
      res.status(201).json(business);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add business' });
    }
  },
};

module.exports = BusinessController;