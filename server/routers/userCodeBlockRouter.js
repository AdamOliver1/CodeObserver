const express = require('express');
const jwt = require('jsonwebtoken');
const { saveUserCodeBlock, getTokenById } = require('../repositories/userCodeBlockRepository');
const { validateUser } = require('../services/validator');
const { findById } = require('../repositories/codeblockRepository');
const auth = require('../middlewares/auth');
const mentor = require('../middlewares/mentor');
const router = express.Router();

//generate a new user-codeBlock token.
// save it to the db and respond the token/s id
router.post(`/`, [auth, mentor], async (req, res) => {
    const { error } = validateUser(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);
    const tokenId = await saveUserCodeBlock(req.body.user, req.body.codeBlock_id);
    return res.status(200).send(tokenId._id);
});

// verify the token and send the codeblock of the token's codeBlock_id
router.post('/verify', auth, async (req, res) => {
    const tokenId = req.body.tokenId;
    const token = await getTokenById(tokenId);
    if (token) {
        const decode = jwt.verify(token.token, process.env.JWTPRIVATEKEY);
        const codeBlock = await findById(decode.codeBlock_id);
        return res.status(200).send(codeBlock);
    }
    else {
        res.status(500).send("invalid token.");
    }
})

module.exports = router;  