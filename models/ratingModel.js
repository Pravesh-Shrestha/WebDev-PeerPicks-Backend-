const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/user_db');
const Business = require('./businessModel');

const Rating = sequelize.define('Rating', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.TEXT,
  },
});

Rating.belongsTo(Business);
module.exports = Rating;