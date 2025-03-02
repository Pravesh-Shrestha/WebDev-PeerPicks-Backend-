const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/user_db");
const userRoutes = require("./routes/userRoutes");
// Import other routes as needed
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes); // Updated to match frontend URL
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