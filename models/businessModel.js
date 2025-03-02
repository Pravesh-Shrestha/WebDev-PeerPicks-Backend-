const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");

const Business = sequelize.define("Business", {
    business_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    details: { type: DataTypes.STRING }
}, {
    timestamps: true
});

module.exports = Business;
