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

let amount = 0;

// socket.io functions
io.on('connect', function (socket: any) {
  console.log('Somebody connected via socket.io');
  socket.emit('get viewers', amount);
});

io.on('increase views', function (t: any) {
  t + amount;
});

io.on('disconnect', function () {
  console.log('somebody disconnected');
});

// start listening
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
