require('dotenv').config();
const express = require('express');
const { initCodeBlocks } = require('./repositories/codeblockRepository');
const { initUsers } = require('./repositories/userRepository');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const { logger } = require('./middlewares/logger')

initCodeBlocks();
initUsers();
require('./startup/routes')(app)
require('./startup/db')(logger);
require('./startup/prod')(app);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on('connection', (socket) => {
    logger.info(`user connected ${socket.id}`);
    socket.on('join_room', (data) => {
        socket.join(data);
    })

    socket.on('send_code', (data) => {
        socket.to(data.room).emit('receive_code', data.code);
    })

    socket.on('send_link', (data) => {
        socket.to(data._id).emit('receive_link', data);
    })

    socket.on('disconnect', () => {
        logger.info("disconnect", socket.id);
    })
})

server.listen(process.env.PORT || 3002, () => {
    logger.info('app is up');
})