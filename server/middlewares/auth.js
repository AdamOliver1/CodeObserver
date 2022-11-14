const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.')
    // validate the token
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
    next();
}

module.exports = auth;