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

/**
 * Socket io functions
 */
io.on('connect', (socket: any) => {
  socket.on('join room', (pageParams: string) => {
    socket.join(pageParams);
  });

  socket.on('get room count', async (pageParams: string, callback: any) => {
    const sockets = await io.in(pageParams).allSockets();
    callback(sockets.size);
  });

  socket.on('get all room counts', async (pageParams: string, callback: any) => {
    const sockets = await io.in(pageParams).allSockets();
    callback(sockets.size);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat to room', async (page: string, msg: string) => {
    const sockets = await io.in(page).allSockets();
    console.log(sockets);
    io.emit('get chat message from room', msg);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
