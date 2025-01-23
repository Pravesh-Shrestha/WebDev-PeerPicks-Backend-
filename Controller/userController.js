const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const UserController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({ username, email, password: hashedPassword });
      res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed.' });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await Users.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed.' });
    }
  },

  getProfile: async (req, res) => {
    const userId = req.user.id; // Extracted from the auth middleware

    try {
      const user = await Users.findByPk(userId, { attributes: ['id', 'username', 'email'] });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile.' });
    }
  },
};

module.exports = UserController;