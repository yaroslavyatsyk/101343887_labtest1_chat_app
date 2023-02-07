const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const http = require('http');
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const messageRoutes = require('./routes/message_routes');
const userRoutes = require('./routes/user_routes');

mongoose.connect('mongodb+srv://yaroslav9728:Mikki2009+@cluster0.elr77qb.mongodb.net/chatdb?retryWrites=true&w=majority').then((success) => {
    console.log('Successfully connected to database');
}).catch((error) => {
    console.log(error);
    process.exit(1);
});
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/message', messageRoutes);
app.use('/user', userRoutes);


io.on('connection', (socket) => {
    io.emit("new_connection", "A user joined on the server");
    socket.emit('message', 'Welcome to the chat room ')
    socket.on('disconnected', function () {
        io.emit("disconnected", "A user has disconnect");
        console.log('A client has disconnected');
    });

    socket.on("new_message", function (message) {
        console.log(message)
        io.emit("message", message)
    })
})


server.listen(3001, () => { console.log('Server Listening on port 3001'); })

module.exports = app;
