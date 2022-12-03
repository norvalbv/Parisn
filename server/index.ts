const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5050',
    credentials: true,
  },
});
require('dotenv').config();

import { ScanParams, TableParams } from './AWS/TableParams';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './AWS/Client/docClient';
import { Message } from '../webapp/src/types';
import { capitalizeFirstLetter } from '../webapp/src/utils/capitlise';

// environment variables
const PORT = process.env.PORT || 8000;

app.use(cors());

// Get all products
app.get('/products', async (req: any, res: any) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'Products' }));
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain products
app.get('/products/:collection/:productid', async (req: any, res: any) => {
  const { collection, productid } = req.params;
  try {
    const data = await ddbDocClient.send(
      new GetCommand(
        TableParams({ Key: { ID: productid, Category: capitalizeFirstLetter(collection) } })
      )
    );
    res.send(data.Item);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
app.get('/products/collections', async (req: any, res: any) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'ProductCollections' }));

    console.log(data);

    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
app.get('/collection/:collection', async (req: any, res: any) => {
  const { collection } = req.params;

  console.log(collection);

  try {
    const data = await ddbDocClient.send(new ScanCommand(ScanParams(collection)));

    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

let total = 0;
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

  socket.on('chat to room', async (page: string, messageDetails: Message) => {
    const sockets = await io.in(page).allSockets();
    io.emit('get chat message from room', messageDetails);
  });

  socket.on('chat user typing', async (isTyping: boolean) => {
    console.log(isTyping);
    io.emit('get chat user typing', isTyping);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
