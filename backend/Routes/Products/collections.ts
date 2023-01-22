const express = require('express');
const router = express.Router();
import { ScanParams } from '../../AWS/TableParams';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from 'express';
import { ddbDocClient } from '../../AWS/Client/docClient';

// Get All collection
router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'ProductCollections' }));
    res.send(data.Items);
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
