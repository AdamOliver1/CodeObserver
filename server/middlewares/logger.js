require('winston-mongodb');
const expressWinston = require('express-winston')
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    transports: [
        new transports.File({
            level: 'warn',
            filename: 'warnLogs.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'infoLogs.log'
        }),
        new transports.MongoDB({
            db: process.env.DB_CONNECTION,
            options: {
                useUnifiedTopology: true,
            }
        })

    ],
    format: format.combine(
        format.errors(),
        format.timestamp(),
        format.json(),
        format.metadata(),
        format.prettyPrint()
    ),
    statusLevels: true
})


const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`
})


const internalErrorsLogger = expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logsInternalErrors.log'
        }),
        new transports.MongoDB({
            db: process.env.DB_CONNECTION,
            options: {
                useUnifiedTopology: true,
            }
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat

    )
})

module.exports = { logger, internalErrorsLogger }