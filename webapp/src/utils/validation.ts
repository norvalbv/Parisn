import { FormikErrors } from 'formik';
import { FormValidation } from '../types';

export const validate = (values: FormValidation) => {
  const errors: FormikErrors<FormValidation> = {};

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
