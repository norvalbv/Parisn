import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CloudWatch } from './cloudwatch.mjs';
import { translateConfig } from './dynamo-options.mjs';

const ddbClient = new DynamoDBClient({ region: 'eu-west-2' });

// Create the DynamoDB document client.
const dynamoDb = DynamoDBDocumentClient.from(ddbClient, translateConfig);

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const handler = async (event) => {
  await CloudWatch(event);

  try {
    const data = await dynamoDb.send(
      new PutCommand({
        TableName: 'Products',
        Key: {
          ID: event.pathParameters.productid,
          Category: capitalizeFirstLetter(event.pathParameters.collection),
        },
        item: {
          checkout: {
            checkoutId: event.pathParameters.checkoutId,
            timestamp: Date.now(),
            price: 840, // Math function
            user: event.pathParameters.user,
          },
        },
      })
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: JSON.stringify(error.message),
      }),
    };
  }
};
