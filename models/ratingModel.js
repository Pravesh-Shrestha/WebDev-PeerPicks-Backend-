const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const User = require("./userModel");
const Business = require("./businessModel");

const Rating = sequelize.define("Rating", {
    rating_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    rating: { 
        type: DataTypes.INTEGER,
         allowNull: false, 
        validate: { min: 1, max: 5 } },
    review: { 
        type: DataTypes.STRING ,
    },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: true
});

// Associations
Rating.belongsTo(User, { foreignKey: "users_user_id", onDelete: "CASCADE" });
Rating.belongsTo(Business, { foreignKey: "business_business_id", onDelete: "CASCADE" });
Rating.belongsTo(User, { foreignKey: "users_user_id2", onDelete: "CASCADE", as: "reviewedBy" });

module.exports = Rating;
