const io = require("socket.io")(3000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        io.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        io.emit('chat-message', {message:message, name:users[socket.id]})
    })
})
