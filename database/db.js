const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('test','postgres','admin123',{
    host:'localhost',
    dialect:'postgres',
    port:5432,
    logging:false,
});

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch(error){
        console.error("Unable to connect to the database:",error);
    }
}

testConnection();

module.exports = sequelize;