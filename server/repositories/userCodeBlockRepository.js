const UserCodeBlock = require('../models/UserCodeBlock');
const jwt = require('jsonwebtoken');

module.exports.saveUserCodeBlock = async (user, codeBlock_id) => {

    let token = jwt.sign({
        user,
        codeBlock_id
    }, process.env.JWTPRIVATEKEY);

    const dbUserCodeBlock = new UserCodeBlock({
        token: token
    });
    return await dbUserCodeBlock.save();
}

module.exports.getTokenById = async (id) => {
    return await UserCodeBlock.findOne({ _id: id });
}
