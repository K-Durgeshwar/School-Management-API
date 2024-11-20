const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hardcoded admin payload
const hardcodedAdmin = {
    id: "admin",
    role: "admin"
};

// Generate a token
const generateToken = () => {
    try {
        const token = jwt.sign(hardcodedAdmin, process.env.JWT_SECRET, {
            expiresIn: '6h' // Token will expire in 6 hour
        });
        console.log("Your JWT Token: ");
        console.log(token);
    } catch (error) {
        console.error("Error generating token: ", error);
    }
};

// Call the function to generate the token
generateToken();
