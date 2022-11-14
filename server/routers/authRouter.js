const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const { validateLoggin } = require('../services/validator');
const { findUserByUsername } = require('../repositories/userRepository');
const { getTokenById } = require('../repositories/userCodeBlockRepository');

const router = express.Router();

router.post(`/student-login`, async (req, res) => {
    //validation
    const { error } = validateLoggin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await findUserByUsername(req.body.username);
    if (!user) return res.status(400).send("Invalid username or password");

    const token = await getTokenById(req.body.tokenId)
    if (token) {
        const decode = jwt.verify(token.token, process.env.JWTPRIVATEKEY);
        if (!(decode.user._id.toString() === user._id.toString())) {
            return res.status(400).send("invalid token.");
        }
    } else return res.status(400).send("invalid token.");

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send("Invalid username or password");
    }

    res.send({ user: user, token: user.generateAuthToken() });
});



router.post(`/`, async (req, res) => {
    const { error } = validateLoggin(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const user = await findUserByUsername(req.body.username);

    if (!user) return res.status(400).send("Invalid username or password");

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send("Invalid username or password");
    }
    res.send({ user: user, token: user.generateAuthToken() });
});




module.exports = router;