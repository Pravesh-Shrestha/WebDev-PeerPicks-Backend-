const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const UserController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (!email || !password || !username) {
        return res.status(400).json({ error: "Email, username, and password are required." });
      }

      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Users.create({ username, email, password: hashedPassword });
      res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Registration failed." });
    }
  },

 login: async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Ensure user.id is sent properly
    res.json({ 
      token, 
      user_id: user.user_id, 
      username: user.username, 
      email: user.email 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed." });
  }
},  

  getProfile: async (req, res) => {
    const userId = req.user.id; // Extracted from auth middleware

    try {
      const user = await Users.findByPk(userId, { attributes: ["id", "username", "email"] });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.json(user);
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      res.status(500).json({ error: "Failed to fetch user profile." });
    }
  },
};

module.exports = UserController;
