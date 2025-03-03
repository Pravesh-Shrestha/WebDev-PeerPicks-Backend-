const  Business  = require("../models/businessModel");

// Get all businesses
exports.getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching businesses" });
    }
};

// Get a business by its ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findByPk(req.params.id);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: "Error fetching business" });
    }
};

// Create a new business
exports.createBusiness = async (req, res) => {
    try {
        // Log the incoming request body to debug
        console.log("Incoming Request Body:", req.body);

        // Check if all required fields are present in the request body
        const { name, category, location, details, user_id } = req.body;

        // Log each of the fields for further debugging
        console.log("Extracted Fields - Name:", name, "Category:", category, "Location:", location, "Details:", details, "User ID:", user_id);

        // Validate that user_id is provided
        if (!user_id) {
            console.log("User ID is missing in the request body");
            return res.status(400).json({ error: "User ID is required" });
        }

        // Validate other fields
        if (!name || !category || !location || !details) {
            console.log("One or more fields are missing");
            return res.status(400).json({ error: "All fields are required (name, category, location, details)" });
        }

        // Create the business record
        console.log("Creating business with provided data...");
        const business = await Business.create({
            name,
            category,
            location,
            details,
            user_id
        });

        // Log the created business object
        console.log("Business created successfully:", business);

        // Return the created business object
        res.status(201).json(business);
    } catch (error) {
        console.error("Error occurred while creating business:", error);  // Log error for debugging
        res.status(500).json({ error: "Error creating business" });
    }
};


// Update an existing business by its ID
exports.updateBusiness = async (req, res) => {
    try {
        const business = await Business.findByPk(req.params.id);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }

        // Update the business with the new data
        await business.update(req.body);
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: "Error updating business" });
    }
};

// Delete a business by its ID
exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByPk(req.params.id);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }

        await business.destroy();
        res.json({ message: "Business deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting business" });
    }
};
