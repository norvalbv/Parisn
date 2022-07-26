require('dotenv').config();
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
export const REGION = 'eu-west-2';
// Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
