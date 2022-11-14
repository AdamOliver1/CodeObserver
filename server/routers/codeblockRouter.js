const express = require('express');
const { getCodeBlocks } = require('../repositories/codeblockRepository');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get(`/`, auth, async (req, res, next) => {
    const codes = await getCodeBlocks();
    res.status(200).send(codes);
});

module.exports = router;  