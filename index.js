//Initializations
const express = require("express");
const cors= require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");
const testRoute = require("./routes/testRoute");

//creating a server
const app=express();

//creating a port
const PORT=5000;

//creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//creating a route
app.get('/',(req, res)=>{
    res.send("This is web page")
})
app.get('/ourpartners',(req, res)=>{
    res.send(`Your Partners`)
})

app.use('/test',testRoute);
app.get('/test',testRoute);

//running on port
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.get('/test',(req, res)=>{
    res.send(`Get all users`)
});

app.post('/test',(req, res)=>{
    res.send(`Create user`)
});

app.put('/user/:id',(req, res)=>{
    res.send(`Update user ${req.params.id}`)
});

app.delete('/user/:id',(req, res)=>{
    res.send(`Delete user ${req.params.id}`)
});







