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
});

// start listening
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
