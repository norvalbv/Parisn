const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import axios from 'axios';

// Temporarily stored in backend until app is refactored.

// ! Refactor app.

// !TODO: Put the all collection endpoints in the same lambda?
// !TODO: Put all endpoints frontend.
// !TODO: Put all lambda code on backend to simply store.

// Get All collection
router.get('/', async (req: Request, res: Response) => {
  console.log('called');
  try {
    axios('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections').then((r) => {
      res.send(r.data.Items);
    });
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
router.get('/:collection', async (req: Request, res: Response) => {
  const { collection } = req.params;
  console.log(collection);
  try {
    // const data = await ddbDocClient.send(new ScanCommand(ScanParams(collection)));

    axios('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/Tshirts').then(
      (r) => {
        console.log(r.data.Items);
      }
    );
  } catch (err) {
    console.log('Error', err);
  }
});

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
