const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const Rating = require("./ratingModel");

const Message = sequelize.define("Message", {
    message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message_text: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: true
});

// Association
Message.belongsTo(Rating, { foreignKey: "rating_rating_id", onDelete: "SET NULL" });

module.exports = Message;
