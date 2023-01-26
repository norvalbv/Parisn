import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
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

  const price = 100.12;

  try {
    const data = new UpdateItemCommand({
      TableName: 'Products',
      Key: {
        ID: event.pathParameters.productid,
        Category: capitalizeFirstLetter(event.pathParameters.collection),
      },
      UpdateExpression: `SET checkout-${event.pathParameters.checkoutid}=:val`,
      ExpressionAttributeValues: {
        ':val': {
          CheckoutId: event.pathParameters.checkoutid,
          Timestamp: Date.now(),
          Price: price,
          User: event.pathParameters.user || 'null',
        },
      },
    });

    const response = await dynamoDb.send(data);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
