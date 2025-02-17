const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
  try {
    const { messageText, senderId, receiverId } = req.body;
    const message = await Message.create({
      Message_Text: messageText,
      Sender_ID: senderId,
      Receiver_ID: receiverId,
      Timestamp: new Date(),
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { Sender_ID: req.params.id },
          { Receiver_ID: req.params.id }
        ]
      }
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};