import * as Yup from 'yup';

export const checkoutSchema = Yup.object().shape({
  firstName: Yup.string().max(15, 'Must be 15 characters or less.').required('required'),
  lastName: Yup.string().max(20, 'Must be 15 characters or less.').required('required'),
  email: Yup.string().email('Invalid email address').required('required'),
  firstLineOfAddress: Yup.string().required('required'),
  country: Yup.string().required('required'),
  postcode: Yup.string().required('required'),
});

export const contactSchema = Yup.object().shape({
  firstName: Yup.string().max(15, 'Must be 15 characters or less.').required('required'),
  lastName: Yup.string().max(20, 'Must be 15 characters or less.').required('required'),
  email: Yup.string().email('Invalid email address').required('required'),
  message: Yup.string().required('required'),
});

export const chatSchema = Yup.object().shape({
  userInput: Yup.string()
    .min(3, 'Message must be at least 3 characters.')
    .max(128, 'Message must be less than 128 characters.'),
});
