import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
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

  const params = {
    TableName: 'Products',
    Key: {
      ID: event.pathParameters.productid,
      Category: capitalizeFirstLetter(event.pathParameters.collection),
    },
    UpdateExpression: `set checkout_${event.pathParameters.checkoutid}=:val`,
    ExpressionAttributeValues: {
      ':val': {
        CheckoutId: event.pathParameters.checkoutid,
        Timestamp: Date.now(),
        Price: price,
        UserId: event.pathParameters.user || 'null',
      },
    },
  };

  try {
    const data = await dynamoDb.send(new UpdateCommand(params));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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
