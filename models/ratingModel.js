const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const User = require("./userModel");
const Business = require("./businessModel");

const Rating = sequelize.define("Rating", {
    rating_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: User,
            key: "user_id"
        },
        onDelete: "CASCADE"
    },
    business_id:{
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Business,
            key: "business_id"
        },
        onDelete: "CASCADE"
    },
    rating: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: { min: 1, max: 5 } 
    },
    review: { 
        type: DataTypes.STRING 
    },
    timestamp: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {
    timestamps: true
});

// Associations
Rating.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Rating.belongsTo(Business, { foreignKey: "business_id", onDelete: "CASCADE" });

module.exports = Rating;
