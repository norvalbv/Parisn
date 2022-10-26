const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  },
});
require('dotenv').config();

import { TableParams } from './AWS/TableParams';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './AWS/Client/docClient';

// environment variables
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/products', async (req: any, res: any) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'Products' }));
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

app.get('/products/:productid', async (req: any, res: any) => {
  try {
    const data = await ddbDocClient.send(
      new GetCommand(TableParams({ Key: { ID: req.params.productid, Category: 'Shoes' } }))
    );
    res.send(data.Item);
  } catch (err) {
    console.log('Error', err);
  }
});

// socket.io functions
io.on('connect', function (socket: any) {
  socket.on('join room', async (param: string, callback: any) => {
    // console.log(param);
    socket.join(param);

    callback(io.engine.clientsCount);
  });

  socket.on('get room', async (param: string, callback: any) => {
    // console.log(param);

    // console.log(
    //   io
    //     .in(param)
    //     .fetchSockets()
    //     .then((room: any) => {
    //       console.log('clients in this room:' + param, room.length);
    //     })
    // );

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
