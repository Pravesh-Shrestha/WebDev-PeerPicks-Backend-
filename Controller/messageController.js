const { Message } = require("../models/messageModel");

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) return res.status(404).json({ error: "Message not found" });
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: "Error fetching message" });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error creating message" });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) return res.status(404).json({ error: "Message not found" });

        await message.destroy();
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting message" });
    }
};
