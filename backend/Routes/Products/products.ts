const express = require('express');
const router = express.Router();

import { TableParams } from '../../AWS/TableParams';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../AWS/Client/docClient';
import { capitalizeFirstLetter } from '../../../webapp/src/utils/capitlise';
import { Request, Response } from 'express';
import axios from 'axios';

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    // const data = await ddbDocClient.send(new ScanCommand({ TableName: 'Products' }));
    axios
      .post('https://2dvnafoad2.execute-api.eu-west-2.amazonaws.com/Products')
      .then((r) => console.log(r));
  } catch (err) {
    console.log('Error', err);
  }
});

// Get certain products
router.get('/:collection/:productid', async (req: Request, res: Response) => {
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

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
