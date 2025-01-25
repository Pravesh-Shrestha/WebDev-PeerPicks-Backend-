// controllers/messageController.js
const Messages = require('../models/messageModel');
const Users = require('../models/userModel');

const MessageController = {
  sendMessage: async (req, res) => {
    const senderId = req.user.id; // Current user's ID
    const { receiverId, message } = req.body;

    try {
      const newMessage = await Messages.create({ senderId, receiverId, message });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message.' });
    }
  },

  getMessages: async (req, res) => {
    const userId1 = req.user.id; // Current user's ID
    const userId2 = req.params.userId; // ID of the other user

    try {
      const messages = await Messages.findAll({
        where: {
          [Op.or]: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        },
        order: [['createdAt', 'ASC']],
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages.' });
    }
  },
};

module.exports = MessageController;