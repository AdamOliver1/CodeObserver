const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be black!"],
    },
    isMentor: { type: Boolean },
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be black!"],
        minlength: 5,
        maxlength: 1024
    }

}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isMentor: this.isMentor }, process.env.JWTPRIVATEKEY);

}

const User = mongoose.model("User", userSchema);

module.exports = User;

