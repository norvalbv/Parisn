const express = require('express');
const router = express.Router();
import { ScanParams } from '../../AWS/TableParams';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from 'express';
import { ddbDocClient } from '../../AWS/Client/docClient';
import axios from 'axios';

// Temporarily stored in backend until app is refactored.

// ! Refactor app.

// !TODO: Put the all collection endpoints in the same lambda?
// !TODO: Put all endpoints frontend.
// !TODO: Put all lambda code on backend to simply store. 

// Get All collection
router.get('/', async (req: Request, res: Response) => {
  try {
    axios('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/Collections').then((r) => {
      res.send(r.data.Items);
    });
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
router.get('/:collection', async (req: Request, res: Response) => {
  const { collection } = req.params;
  try {
    const data = await ddbDocClient.send(new ScanCommand(ScanParams(collection)));

    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
