const User = require("../models/User");
const bcrypt = require('bcrypt');


const registerUser = async (body) => {
    const salt = await bcrypt.genSalt();
    body.password = await bcrypt.hash(body.password, salt);

    const dbUser = new User({
        username: body.username,
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        isMentor: body.isMentor
    });
    await dbUser.save();
    return dbUser;
}

const getUsers = async () => {
    return await User.find();
}

const findUserByEmail = async (email) => {

    return await User.findOne({ email: email });
}

const findUserByUsername = async (username) => {
    return await User.findOne({ username: username });
}

// initial data
const initUsers = async () => {
    let users = await User.find();
    if (users.length == 0) {


        await registerUser({
            username: 'michael1',
            email: 'michael1@gmail.com',
            password: "123456",
            firstName: 'michael',
            lastName: 'scott',
            isMentor: true
        });
        await registerUser({
            username: 'dwight1',
            email: 'dwight1@gmail.com',
            password: "123456",
            firstName: 'dwight',
            lastName: 'schrute',
            isMentor: false
        });
        await registerUser({
            username: 'jim1',
            email: 'jim1@gmail.com',
            password: "123456",
            firstName: 'jim',
            lastName: 'halpert',
            isMentor: false
        });
        await registerUser({
            username: 'pam1',
            email: 'pam1@gmail.com',
            password: "123456",
            firstName: 'pam',
            lastName: 'beesly',
            isMentor: false
        });
        await registerUser({
            username: 'stanley1',
            email: 'stanley1@gmail.com',
            password: "123456",
            firstName: 'stanley',
            lastName: 'hudson',
            isMentor: false
        });
        await registerUser({
            username: 'andy1',
            email: 'andy1@gmail.com',
            password: "123456",
            firstName: 'andy',
            lastName: 'bernard',
            isMentor: false
        })
    }
}

module.exports = {
    getUsers,
    findUserByEmail,
    findUserByUsername,
    registerUser,
    initUsers
};
