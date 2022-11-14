require('express-async-errors');
const { logger } = require('./logger')

module.exports = function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).send('Somethong failed.');
    next();
}

process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
})

process.on('unhandledRejection', (ex) => {
    logger.error(ex.message, ex);
})