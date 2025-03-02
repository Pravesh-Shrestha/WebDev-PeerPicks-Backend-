const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const User=require("./userModel")

const Message = sequelize.define("Message", {
    message_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    message_text: { 
        type: DataTypes.STRING, 
        allowNull: false },
    timestamp: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW },
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

// Association
Message.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
module.exports = Message;
