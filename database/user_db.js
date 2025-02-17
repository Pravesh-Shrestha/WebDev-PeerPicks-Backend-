const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  'PeerPicks_db', // Database name
  'postgres', // Username
  'admin123', // Password
  {
    host: 'localhost',
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to the database has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

connectDatabase();

module.exports = sequelize;
