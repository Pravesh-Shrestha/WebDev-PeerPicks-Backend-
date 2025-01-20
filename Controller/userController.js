// importing model
const Test = require("../model/userModel");

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
  
// Function to update test user by ID
const updateTest = async (req, res) => {
  try {
      const { id } = req.params; // Extract the ID from the route parameters
      const { username, password } = req.body; // Extract the updated fields from the request body

      // Find the test user by ID
      const test = await Test.findByPk(id);
      if (!test) {
          return res.status(404).json({ error: 'Test user not found' });
      }

      // Update the test user with new values
      await test.update({ username, password });
      res.status(200).json(test);
      console.log(`Test user with ID ${id} updated successfully`);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update test user' });
  }
};

// Function to delete test user by ID
const deleteTest = async (req, res) => {
  try {
      const { id } = req.params; // Extract the ID from the route parameters

      // Find the test user by ID
      const test = await Test.findByPk(id);
      if (!test) {
          return res.status(404).json({ error: 'Test user not found' });
      }

      // Delete the test user
      await test.destroy();
      res.status(200).json({ message: `Test user with ID ${id} deleted successfully` });
      console.log(`Test user with ID ${id} deleted successfully`);
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete test user' });
  }
};


module.exports = { getTest, createTest,updateTest,deleteTest };
