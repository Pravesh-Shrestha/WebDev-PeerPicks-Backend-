const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
Users.sync();


// In models/userModel.js after the Users model definition

Users.hasMany(Friendships, { foreignKey: 'userId1' });
Users.hasMany(Friendships, { foreignKey: 'userId2' });
Users.hasMany(Messages, { foreignKey: 'senderId' });
Users.hasMany(Messages, { foreignKey: 'receiverId' });

module.exports = Users;