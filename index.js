// const { Socket } = require('socket.io');

let app = require('express')();

let http = require('http').Server(app);
let io = require('socket.io')(http)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

http.listen(3000, () => {
    console.log("connected done")
})

io.on('connection', (socket) => {
    console.log('there is a connection')
    // console.log(Object.keys(io.sockets.connected).length)
    // io.emit('connection', Object.keys(io.socket.connected).length)

    socket.on('disconnect', () => {
        console.log('disconnected');
    })

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data))
    })

    // emitig others
    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data))
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data))
    })
    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('stopTyping', (data))
    })

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data))
    })

    socket.on('leaved', (data) => {
        socket.broadcast.emit('leaved', (data))
    })
})