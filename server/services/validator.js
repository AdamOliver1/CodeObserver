const joi = require('joi');

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const usernameValidation = joi.string().min(3).max(30).required();
const emailValidation = joi.string().email().required();

const userSchema = joi.object({
    username: usernameValidation,
    email: emailValidation,
    password: joi.string().min(5).required()
}).unknown(true);

const authSchema = joi.object({
    username: usernameValidation
}).unknown(true);

module.exports.validateUser = validator(userSchema);
module.exports.validateLoggin = validator(authSchema);