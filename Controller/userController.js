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

      res.json({
        token,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Login failed." });
    }
  },

  // Modified to accept `id` from the route parameters
 
  getProfile: async (req, res) => {
    const userId = req.params.user_id;  // Extract 'user_id' from route parameters (not 'id')
    try {
      // Fetch user by their ID using the User model
      const userProfile = await Users.findOne({ where: { user_id: userId } });
  
      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userProfile);  // Send back the profile data
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
}

module.exports = UserController;
