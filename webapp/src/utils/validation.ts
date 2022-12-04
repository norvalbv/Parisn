import { FormikErrors } from 'formik';
import { CheckoutFormValidation, ContactFormValidation } from '../types';
import * as Yup from 'yup';

export const validateCheckout = (values: CheckoutFormValidation) => {
  const errors: FormikErrors<CheckoutFormValidation> = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstLineOfAddress) {
    errors.firstLineOfAddress = 'Required';
  }

  if (!values.country) {
    errors.country = 'Required';
  }

  if (!values.postcode) {
    errors.postcode = 'Required';
  }

  return errors;
};

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
