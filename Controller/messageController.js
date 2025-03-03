const { Message } = require("../models/messageModel");

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};

// Get a message by its ID
exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: "Error fetching message" });
    }
};

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        // Validate that user_id is provided in the request body
        if (!req.body.user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Ensure message text is provided
        if (!req.body.message_text) {
            return res.status(400).json({ error: "Message text is required" });
        }

        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error creating message" });
    }
};

// Delete a message by its ID
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        await message.destroy();
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting message" });
    }
};
