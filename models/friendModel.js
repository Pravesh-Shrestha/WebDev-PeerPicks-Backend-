const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const Users = require("./userModel"); // Import the Users model

const Friendships = sequelize.define("Friendships", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId1: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: false,
  },
  userId2: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // Default status
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Sync the model with the database
Friendships.sync();

module.exports = Friendships;