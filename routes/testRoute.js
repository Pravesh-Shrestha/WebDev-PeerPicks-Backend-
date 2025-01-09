//importing model
const Test = require("../model/test");

//creating a route
const getTest = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
        console.log('Retreive all test users');
      } 
      catch (error) {
        res.status(500).json({ error: 'Failed to retrieve test data' });
      }
    
    };
    
module.exports = { getTest };