import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// Set the AWS Region.
export const REGION = 'eu-west-2';
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: REGION });
