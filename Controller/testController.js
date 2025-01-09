// importing model
const Test = require("../model/test");

//create functions to get all test users
const getTest = async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
        console.log('Retreive all test users');
      } 
      catch (error) {
        res.status(500).json({ error: 'Failed to retrieve test data' });
      }
    };

//creating a function to create test users
const createTest = async (req, res) => {
    try {
        const { username, password } = req.body;
        const test = await Test.create(req.body);
        res.status(200).json(test);
        console.log('Test user created successfully');
      } 
      catch (error) {
        res.status(500).json({ error: 'Failed to create test user' });
      }
    };

module.exports = { getTest, createTest };
