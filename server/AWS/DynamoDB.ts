import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './Client/docClient';

export const params = {
  TableName: 'Products',
  Key: {
    primaryKey: { s: '1' },
    sortKey: { s: 'Shoes' },
  },
};

export const getItem = async () => {
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log('Success :', data.Item);
  } catch (err) {
    console.log('Error', err);
  }
};

getItem();
