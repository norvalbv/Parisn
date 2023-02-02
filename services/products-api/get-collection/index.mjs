import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CloudWatch } from './cloudwatch.mjs';
import { translateConfig } from './dynamo-options.mjs';

const ddbClient = new DynamoDBClient({ region: 'eu-west-2' });

// Create the DynamoDB document client.
const dynamoDb = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export const handler = async (event) => {
  await CloudWatch(event);

  // Get collection
  const scanParams = (collection) => {
    const capitalisedFirstLetter = collection.charAt(0).toUpperCase() + collection.slice(1);
    return {
      TableName: 'Products',
      FilterExpression: 'Category = :Collection',
      ExpressionAttributeValues: {
        ':Collection': capitalisedFirstLetter,
      },
    };
  };

  try {
    const collection = event.pathParameters.collection;

    const data = await dynamoDb.send(new ScanCommand(scanParams(collection)));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return JSON.stringify(error);
  }
};
