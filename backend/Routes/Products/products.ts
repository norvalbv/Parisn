const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
import axios from 'axios';

// Get certain products
router.get('/:collection/:productid', async (req: Request, res: Response) => {
  const { collection, productid } = req.params;
  // const data = await ddbDocClient.send(
  //   new GetCommand(
  //     TableParams({ Key: { ID: productid, Category: capitalizeFirstLetter(collection) } })
  //   )
  // );

  console.log(collection, productid);

  axios(
    `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}/${productid}`
  )
    .then((r) => console.log(r))
    .catch((e) => console.error(e));
  // res.send(data.Item);
});

module.exports = router;

// Removed isolated modules error whilst still keeping isolated modules to true.
export {};
