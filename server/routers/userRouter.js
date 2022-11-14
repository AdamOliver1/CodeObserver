const express = require('express');
const { getUsers, findUserByEmail, findUserByUsername, registerUser } = require('../repositories/userRepository');
const { validateUser } = require('../services/validator');
const auth = require('../middlewares/auth');
const mentor = require('../middlewares/mentor');
const router = express.Router();

router.get(`/`, [auth, mentor], async (req, res) => {
    const users = await getUsers();
    res.status(200).send(users);
});

router.post(`/signup`, async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (await findUserByEmail(req.body.email) || await findUserByUsername(req.body.username)) {
        return res.status(400).send("User already registered");
    }

    const user = await registerUser(req.body);
    const { username, email, password } = user;
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).status(200).send({ username, email, password });
});


module.exports = router;