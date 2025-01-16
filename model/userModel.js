const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");


const Test = sequelize.define("test", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    
  },
  email: {
    type: DataTypes.STRING,

  },
  password: {
    type: DataTypes.STRING,
    
  },
});

module.exports = Test;
