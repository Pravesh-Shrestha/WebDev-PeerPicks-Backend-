const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('PeerPicks_db','postgres','admin123',{
    host:'localhost',
    dialect:'postgres',
    port:5432,
    logging:false,
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDatabase();

module.exports = sequelize;