const express = require('express');
const router = express.Router();

import axios from 'axios';
import { Request, Response } from 'express';
import { SendSupportEmail } from '../Types';

type Support = {
  data: SendSupportEmail;
};

router.post('/', async (req: Request<{}, {}, Support>, res: Response) => {
  const { firstName, lastName, email, orderNumber, message } = req.body.data;

  try {
    await axios.post('https://t88kddkowj.execute-api.eu-west-2.amazonaws.com/SES', {
      firstName,
      lastName,
      email,
      orderNumber,
      message,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
