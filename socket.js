const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        io.emit('user-connected', name);
    });
    socket.on('send-chat-message', message => {
        io.emit('chat-message', { message: message, name: users[socket.id] });
    });
});

server.listen(3000, () => {
    console.log('Socket.io server running');
});
