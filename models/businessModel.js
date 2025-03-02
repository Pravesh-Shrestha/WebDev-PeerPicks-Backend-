const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const User=require("./userModel")

const Business = sequelize.define("Business", {
    business_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    category: { 
        type: DataTypes.STRING 
    },
    location: { 
        type: DataTypes.STRING 
    },
    details: { 
        type: DataTypes.STRING
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
}, {
    timestamps: true
});
Business.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = Business;
