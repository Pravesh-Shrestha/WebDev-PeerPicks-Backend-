// routes/userRoutes.js
const express = require('express');
const UserController = require('../Controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware, UserController.getProfile); // Protected route

module.exports = router;