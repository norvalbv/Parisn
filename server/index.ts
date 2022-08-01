const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  },
});

// environment variables
const PORT = process.env.PORT || 8000;

// socket.io functions
io.on('connect', function (socket: any) {
  socket.emit('get viewers', io.engine.clientsCount);

  console.log(socket.handshake);
  socket.join('room 237');

  socket.join(['room 237', 'room 238']);

  io.to('room 237').emit('a new user has joined the room'); // broadcast to everyone in the room
});

// start listening
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
