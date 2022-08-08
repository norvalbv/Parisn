const app = require('express')();
// const server = require('http').createServer(app);
const axios = require('axios');
const cors = require('cors');
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://127.0.0.1:5173',
//     credentials: true,
//   },
// });
const data = require('./mockdata.json');

// environment variables
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/products', (req: any, res: any) => {
  res.send(data);
});

app.get('/products/:productid', (req: any, res: any) => {
  res.send(data);
});

// socket.io functions
// io.on('connect', function (socket: any) {
//   socket.emit('get viewers', io.engine.clientsCount);

//   // console.log(socket.handshake);
//   socket.join('room 237');

//   socket.join(['room 237', 'room 238']);

//   io.to('room 237').emit('a new user has joined the room'); // broadcast to everyone in the room
// });

// start listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Open a socket between client and server for continuous price decrements...
// When the user goes to checkout / buy the product, the user then makes an API call to checkout for that price
// Perhaps there is a discount on the product, so price is £1k, purchase price at £200 is a 80% provided via params.
