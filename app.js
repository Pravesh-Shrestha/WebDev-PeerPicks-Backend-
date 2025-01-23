// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/ratings', ratingRoutes);

module.exports = app;