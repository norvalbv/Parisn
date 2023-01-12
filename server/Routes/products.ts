const express = require('express');
const router = express.Router();

import { ScanParams, TableParams } from '../AWS/TableParams';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../AWS/Client/docClient';
import { capitalizeFirstLetter } from '../../webapp/src/utils/capitlise';
import { Request, Response } from 'express';

// Get all products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'Products' }));
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
}); 

// Get certain products
router.get('/products/:collection/:productid', async (req: Request, res: Response) => {
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
router.get('/collections', async (req: Request, res: Response) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: 'ProductCollections' }));
    console.log(data.Items);
    res.send(data.Items);
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain collection
router.get('/collection/:collection', async (req: Request, res: Response) => {
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
