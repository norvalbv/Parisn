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

app.use(bodyParser.urlencoded({ extended: true }));
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

const createSendEmailCommand = (fromAddress: string, message: string) => {
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
          Data: message,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Hello, Sir!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Customer Support Query',
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
  const sendEmailCommand = createSendEmailCommand(
    `${req.body.message} || benjinorval@gmail.com`,
    `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; } body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; } table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; } img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; } p { display:block;margin:13px 0; }</style><!--[if mso]> <noscript> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]--><!--[if lte mso 11]> <style type="text/css"> .mj-outlook-group-fix { width:100% !important; } </style> <![endif]--><style type="text/css">@media only screen and (min-width:480px) { .mj-column-per-100 { width:100% !important; max-width: 100%; } }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#F45E43;">${
      req.body.message || 'Unable to retrieve message!'
    }</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`
  );

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
