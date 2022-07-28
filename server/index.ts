const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

//app.use(cors());
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  }
});

const dotENV = require('dotenv');
dotENV.config();

// environment variables
const PORT = process.env.PORT || 8000;

let amount = 0;

// socket.io 
// https://socket.io/docs/v4/server-api/#engineclientscount
io.on('connect', function (socket: any) {
  console.log('Somebody connected via socket.io, views: ' + io.engine.clientsCount);
  //amount++;
  socket.emit('get viewers', io.engine.clientsCount);
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
