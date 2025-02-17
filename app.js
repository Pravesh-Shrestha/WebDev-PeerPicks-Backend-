const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./database/user_db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/messages", messageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Database Connection
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
});
