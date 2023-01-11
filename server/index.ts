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
// parse application/json
app.use(bodyParser.json());

import { ScanParams, TableParams } from './AWS/TableParams';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './AWS/Client/docClient';
import { Message } from '../webapp/src/types';
import { capitalizeFirstLetter } from '../webapp/src/utils/capitlise';
import { Request, Response } from 'express';

// environment variables
const PORT = process.env.PORT || 8000;

app.use(cors());

// Get all products
app.get('/products', async (req: Request, res: Response) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'Products' }));
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain products
app.get('/products/:collection/:productid', async (req: Request, res: Response) => {
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

// Get All collection
app.get('/collections', async (req: Request, res: Response) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'ProductCollections' }));
    console.log(data.Items);
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
app.get('/collection/:collection', async (req: Request, res: Response) => {
  const { collection } = req.params;
  try {
    const data = await ddbDocClient.send(new ScanCommand(ScanParams(collection)));

    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from './AWS/Client';

const createSendEmailCommand = (fromAddress: string) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [process.env.EMAIL],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: 'HTML_FORMAT_BODY',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FORMAT_BODY',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'EMAIL_SUBJECT',
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

type SendSupportEmail = {
  firstName: string;
  lastName: string;
  email: string;
  orderNumber?: string;
  message: string;
};

app.post('/send-support-email', async (req: Request<{}, {}, SendSupportEmail>, res: Response) => {
  const body = req.body;
  const sendEmailCommand = createSendEmailCommand(body.email);

  try {
    const data = await sesClient.send(sendEmailCommand);
    console.log(data);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
