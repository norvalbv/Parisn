import Stripe from 'stripe';

export const handler = async (event) => {
  await CloudWatch(event);

  const stripe = new Stripe('sk_test_...');

  const customer = await stripe.customers.create({
    email: 'customer@example.com',
  });
};
