const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
console.log("userRoutes:", userRoutes); 

app.use('/users', userRoutes);

// Check the output
// const businessRoutes = require('./routes/businessRoutes');
// console.log("businessRoutes:", businessRoutes); // Check the output
// const ratingRoutes = require('./routes/ratingRoutes');
// console.log("ratingRoutes:", ratingRoutes); // Check the output

// ... rest of your app.js
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
