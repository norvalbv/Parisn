import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { translateConfig } from './dynamo-options.mjs';

const ddbClient = new DynamoDBClient({ region: 'eu-west-2' });

// Create the DynamoDB document client.
const dynamoDb = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export const handler = async (event) => {
  try {
    // Retrieve the item from DynamoDB
    return await dynamoDb.send(new ScanCommand({ TableName: 'ProductCollections' }));
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error while decreasing price',
      }),
    };
  }
};
