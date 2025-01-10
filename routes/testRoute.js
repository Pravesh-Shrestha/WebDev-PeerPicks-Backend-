const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.post('/', (req, res) => {
    res.send('Create user');
});

router.put('/:id', (req, res) => {
    res.send(`Update user ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete user ${req.params.id}`);
});

// Make sure to export the router
module.exports = router;