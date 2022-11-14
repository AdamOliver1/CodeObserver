const express = require('express');
const cors = require('cors');
const expressWinston = require('express-winston')
const userRouter = require('../routers/userRouter');
const authRouter = require('../routers/authRouter');
const codeBlocksRouter = require('../routers/codeblockRouter');
const userCodeBlockRouter = require('../routers/userCodeBlockRouter');
const error = require('../middlewares/error');
const { logger, internalErrorsLogger } = require('../middlewares/logger')




module.exports = (app) => {

    app.use(express.json());
    app.use(expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true
    }))

    app.use(cors())
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/codeblock", codeBlocksRouter);
    app.use("/api/user-codeblock", userCodeBlockRouter);
    app.use(error)
    app.use(internalErrorsLogger);
}