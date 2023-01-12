const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
import { sesClient } from '../AWS/Client';
import { createSendEmailCommand } from '../AWS/SES';
import { SendSupportEmail } from '../Types';

type Support = {
  data: SendSupportEmail;
};

router.post('/', async (req: Request<{}, {}, Support>, res: Response) => {
  const body = req.body;

  const sendEmailCommand = createSendEmailCommand(body.data);

  try {
    await sesClient.send(sendEmailCommand);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
