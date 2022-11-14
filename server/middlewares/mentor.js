
const mentor = (req, res, next) => {
    if (!req.user.isMentor) res.status(403).send('Access denied.');
    next();
}

module.exports = mentor; 