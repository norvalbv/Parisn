require('dotenv').config();
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { SESClient } from '@aws-sdk/client-ses';

export const REGION = 'eu-west-2';

const user = {
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const ddbClient = new DynamoDBClient(user);
export const sesClient = new SESClient(user);
