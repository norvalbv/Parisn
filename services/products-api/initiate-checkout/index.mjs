import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand, DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { CloudWatch } from './cloudwatch.mjs';
import { translateConfig } from './dynamo-options.mjs';
import Stripe from 'stripe';

const ddbClient = new DynamoDBClient({ region: 'eu-west-2' });

// Create the DynamoDB document client.
const dynamoDb = DynamoDBDocumentClient.from(ddbClient, translateConfig);

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const handler = async (event) => {
  await CloudWatch(event);
  const body = JSON.parse(event.body);

  /*
   * Calcualte current price
   */
  const decayRate = (N0, N1, t1, t0) => {
    return Math.log(N0 / N1) / (t1 - t0);
  };
  const logScalePrice = (startTime, endTime, price) => {
    /**
     *  N(t) = N0 * e^(-λ*(t-t0))
     *
     *  Where:
     *  N(t) = price at current time
     *  N0 = initial price
     *  N1 = end price
     *  t = current time
     *  t0 = start time
     *  t1 = end time
     *  λ = ln(N0/N1) / (t1 - t0)
     *  ln = natural log, (Math.log)
     */
    const currentTime = Date.now();
    const endPrice = 0.5;
    const lambda = decayRate(price, endPrice, endTime, startTime);
    const timeElapsed = currentTime - startTime;
    const value = price * Math.exp(-lambda * timeElapsed);
    return Number(value.toFixed(2).replace('.', ''));
  };

  /**
   * Get DB details
   */
  const data = await dynamoDb.send(
    new GetCommand({
      TableName: 'Products',
      Key: {
        ID: body.productid,
        Category: capitalizeFirstLetter(body.collection),
      },
    })
  );

  const price = logScalePrice(data.Item.StartTime, data.Item.EndTime, data.Item.Price);

  await CloudWatch(price);

  /**
   * Stripe
   */

  const stripe = new Stripe(process.env.stripe_sk);

  /**
   * Update DB with checkout details
   */
  const params = {
    TableName: 'Products',
    Key: {
      ID: body.productid,
      Category: capitalizeFirstLetter(body.collection),
    },
    UpdateExpression: `set checkout_${body.checkoutid}=:val`,
    ExpressionAttributeValues: {
      ':val': {
        CheckoutId: body.checkoutid,
        Timestamp: Date.now(),
        Price: price,
        SelectedSize: body.selectedsize,
        UserId: body.user || 'guest',
      },
    },
  };

  try {
    await dynamoDb.send(new UpdateCommand(params));

    // If price is below minimum, no payment is required and therefore, don't launch a payment intent.
    const paymentIntent = price
      ? await stripe.paymentIntents.create({
          amount: price, // price is in pence, so 1000 is £10.00
          currency: 'gbp',
          automatic_payment_methods: { enabled: true },
        })
      : 'no price';

    await CloudWatch(paymentIntent);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentIntent),
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
