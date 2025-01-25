const express = require('express');
const FriendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure you have this middleware

const router = express.Router();

router.post('/send-request', authMiddleware, FriendController.sendRequest);
router.get('/friends', authMiddleware, FriendController.getFriends);

module.exports = router;