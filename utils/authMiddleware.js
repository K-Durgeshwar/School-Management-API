const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hardcoded admin JWT (this can be removed if you're using a dynamic user model)
const hardcodedAdmin = {
  id: "admin",
  role: "admin"
};

// Middleware for verifying JWT and authorizing admin
const protect = (req, res, next) => {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Decode the token and check the validity
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Here you can check if the user is the hardcoded admin or any other admin logic you may have
            if (decoded.id === hardcodedAdmin.id && decoded.role === hardcodedAdmin.role) {
                req.user = decoded;  // Attach user info to the request object
                next();  // Allow the request to proceed to the next middleware or route handler
            } else {
                return res.status(403).json({ message: 'Not authorized as admin' });  // Unauthorized access for non-admins
            }

        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed or expired' });  // Token validation failure
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });  // No token found in the request headers
    }
};

module.exports = protect;
