//Initializations
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/user_db");
const userRoute = require("./routes/userRoutes");

//creating a server
const app = express();

//creating a port
const PORT = 5000;

//creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoute);

// Database sync and server startup
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// app.get('/test',(req, res)=>{
//     res.send(`Get all users`)
// });

// app.post('/test',(req, res)=>{
//     res.send(`Create user`)
// });

// app.put('/user/:id',(req, res)=>{
//     res.send(`Update user ${req.params.id}`)
// });

// app.delete('/user/:id',(req, res)=>{
//     res.send(`Delete user ${req.params.id}`)
// });







