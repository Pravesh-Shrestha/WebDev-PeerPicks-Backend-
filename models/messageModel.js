const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const Users = require("./userModel"); // Import the Users model

const Messages = sequelize.define("Messages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Sync the model with the database
Messages.sync();

module.exports = Messages;