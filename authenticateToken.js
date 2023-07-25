// authenticateToken.js

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.token; // Assuming the token is sent in a cookie named 'token'

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // If the token is valid, save the decoded payload to the request object for use in subsequent routes
    req.user = decoded;

    next();
  });
}

module.exports = authenticateToken;
