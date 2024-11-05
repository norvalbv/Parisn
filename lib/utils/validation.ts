import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().max(15, 'Must be 15 characters or less.').nonempty('required'),
  lastName: z.string().max(20, 'Must be 20 characters or less.').nonempty('required'),
  email: z.string().email('Invalid email address').nonempty('required'),
  firstLineOfAddress: z.string().nonempty('required'),
  country: z.string().nonempty('required'),
  postcode: z.string().nonempty('required'),
});

export const contactSchema = z.object({
  firstName: z.string().max(15, 'Must be 15 characters or less.').nonempty('required'),
  lastName: z.string().max(20, 'Must be 20 characters or less.').nonempty('required'),
  email: z.string().email('Invalid email address').nonempty('required'),
  message: z.string()
    .min(4, 'Must be at least 4 characters.')
    .max(2048, 'Must be less than 2048 characters.')
    .nonempty('required'),
});

export const chatSchema = z.object({
  userInput: z.string()
    .min(3, 'Must be at least 3 characters.')
    .max(128, 'Must be less than 128 characters.'),
});
