//@ts-nocheck

import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from 'components/CardWrapper';
import Form from 'components/Form';
import useUser from '../../../../hooks/useUser';
import { ResetPassword as ResetPasswordType } from '../../../../types';

const ResetPassword = (): ReactElement => {
  const { changePassword } = useUser();
  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="my-6 text-4xl underline">Reset Password</h2>
        <Link className="cursor-pointer hover:underline" to="/sign-up">
          Back
        </Link>
      </div>
      <Form
        formValues={{
          username: { initialValue: '', type: 'text', label: 'Username' },
          oldPassword: {
            id: 'password',
            initialValue: '',
            label: 'Old Password',
            type: 'password',
          },
          newPassword: {
            id: 'password',
            initialValue: '',
            label: 'New Password',
            type: 'password',
          },
          confirmPassword: {
            id: 'password',
            initialValue: '',
            label: 'Confirm Password',
            type: 'password',
          },
        }}
        submitButton={{ label: 'Sign In' }}
        submitFn={(values): void => changePassword(values as ResetPasswordType)}
      />
    </CardWrapper>
  );
};

export default ResetPassword;
