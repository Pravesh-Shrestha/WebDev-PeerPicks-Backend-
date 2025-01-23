// const express = require('express');
// const router = express.Router();

// // Define your routes
// router.get('/', (req, res) => {
//     res.send('Get all users');
// });

// router.post('/', (req, res) => {
//     res.send('Create user');
// });

// router.put('/:id', (req, res) => {
//     res.send(`Update user ${req.params.id}`);
// });

// router.delete('/:id', (req, res) => {
//     res.send(`Delete user ${req.params.id}`);
// });

// // Make sure to export the router
// module.exports = router;



//Import the express library
// const express = require('express')

// const router = express.Router();

// const userController = require('../Controller/userController');

// router.post('/create_test', userController.createTest);
// router.get('/show_test', userController.getTest);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController'); // Adjust the path to your controller file

// Route to create a test user
router.post('/create_test', (userController.createTest));

// Route to retrieve all test users
router.get('/show_test', userController.getTest);

// Route to update a test user by ID
router.put('/update_test/:id', userController.updateTest);

// Route to delete a test user by ID
router.delete('/delete_test/:id', userController.deleteTest);

module.exports = router;
