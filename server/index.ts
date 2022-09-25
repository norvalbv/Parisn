const app = require('express')();
const server = require('http').createServer(app);
const axios = require('axios');
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  },
});

export interface Stock {
  small: number;
  medium: number;
  large: number;
  extralarge: number;
}
export interface MockData {
  [key: string]: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    stock: Stock;
  };
}

const data: MockData = require('./mockdata.json');

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
io.on('connect', function (socket: any) {
  socket.on('join room', async (param: string, callback: any) => {
    console.log(param);
    socket.join(param);

    callback(io.engine.clientsCount);
  });

  socket.on('get room', async (param: string, callback: any) => {
    console.log(param);

    console.log(
      io
        .in(param)
        .fetchSockets()
        .then((room: any) => {
          console.log('clients in this room:' + param, room.length);
        })
    );

    callback(io.engine.clientsCount);

    // io.to(param).emit('get viewers', io.engine.clientsCount); // broadcast to everyone in the room
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Open a socket between client and server for continuous price decrements...
// When the user goes to checkout / buy the product, the user then makes an API call to checkout for that price
// Perhaps there is a discount on the product, so price is £1k, purchase price at £200 is a 80% provided via params.
