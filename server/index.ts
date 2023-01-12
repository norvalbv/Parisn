const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
const bodyParser = require('body-parser');
require('dotenv').config();
import { Message } from '../webapp/src/types';

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/**
 * environment variables
 */
const PORT = process.env.PORT || 8000;

/**
 * Routes
 */
const products = require('./Routes/Products/products');
app.use('/products', products);
const collections = require('./Routes/Products/collections');
app.use('/collections', collections);

const support = require('./Routes/SES');
app.post('/send-support-email', support);

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

  let total = 0;
  socket.on('chat user typing', async (isTyping: boolean) => {
    if (isTyping) {
      total++;
    } else {
      if (total < 1) return;
      total--;
    }
    io.emit('get chat user typing', total);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
