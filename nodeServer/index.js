const io = require('socket.io')(8000);
const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (UserName) => {
        console.log("New user", UserName);
        users[socket.id] = UserName;
        socket.broadcast.emit('user-joined', UserName);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, UserName: users[socket.id] }); // Change 'recieve' to 'receive'
    });

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
