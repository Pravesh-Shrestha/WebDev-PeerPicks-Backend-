const sequelize = require("../database/user_db");
const User = require("./userModel");
const Business = require("./businessModel");
const Rating = require("./ratingModel");
const Message = require("./messageModel");

// Sync all models with the database
sequelize.sync({ alter: true }) // Change to { force: true } for full reset
    .then(() => console.log("✅ Database synced successfully!"))
    .catch(err => console.error("❌ Error syncing database:", err));

module.exports = { User, Business, Rating, Message };
