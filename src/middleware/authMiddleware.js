// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log('No token provided.');
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    try {
        const tokenWithoutBearer = token.split(' ')[1];
        console.log('Token without Bearer:', tokenWithoutBearer);

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        // Set user information in the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = authenticateUser;
