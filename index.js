const express = require("express");
const cors = require("cors");
const sequelize = require("./database/user_db");
const path = require("path");
// Import other routes as needed
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const businessRoutes = require("./routes/businessRoutes");

require('dotenv').config(); // Load environment variables from .env

// Creating a server
const app = express();

// Creating a port
const PORT = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Match your frontend’s port (e.g., Vite default)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use('/api/users', userRoutes); 
app.use('/messages', messageRoutes);
app.use('/ratings', ratingRoutes);
app.use('/businesses', businessRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Database sync and server startup
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
