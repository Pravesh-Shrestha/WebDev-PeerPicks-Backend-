const express = require('express');
const MessageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure you have this middleware

const router = express.Router();

router.post('/send', authMiddleware, MessageController.sendMessage);
router.get('/:userId/messages', authMiddleware, MessageController.getMessages);

module.exports = router;