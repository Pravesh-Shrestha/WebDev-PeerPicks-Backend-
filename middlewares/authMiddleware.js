const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];
  
  // If no token, return unauthorized
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token is not valid.' });
    }

    // If valid, save the user ID to the request for use in other routes
    req.user = { id: decoded.id }; // Assuming the token contains the user ID
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;