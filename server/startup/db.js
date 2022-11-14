const mongoose = require('mongoose');


module.exports = async (logger) => {
    await mongoose.connect(process.env.DB_CONNECTION)
        .then(() => {
            console.log("connected to mongodb");
            logger.info("Connected to MongoDB")
        })
}