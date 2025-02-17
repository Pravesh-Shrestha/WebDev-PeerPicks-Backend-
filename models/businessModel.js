const { DataTypes } = require("sequelize");
const sequelize = require("../database/user_db");
const Users = require("./userModel"); // Import the Users model

// Define the Business model
const Business = sequelize.define('Business', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address"
      }
    }
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of services provided
    defaultValue: []
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false, // Disable automatic creation of `updatedAt` and `createdAt` columns
  tableName: 'businesses' // Define the table name (optional)
});

// Sync the model with the database (creates the table if it doesn't exist)
sequelize.sync()
  .then(() => console.log('Business table has been created or exists!'))
  .catch(error => console.error('Error creating table: ', error));

module.exports = Business;
