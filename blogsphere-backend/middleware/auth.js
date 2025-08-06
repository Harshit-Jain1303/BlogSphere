// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Remove "Bearer " prefix if present
        const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Invalid token' });
    }
};

module.exports = auth;
