import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from 'components/CardWrapper';
import Form from 'components/Form';
import useUser from 'hooks/useUser';
import { ForgotPasswordSubmit } from 'types';

const ForgotPassword = (): ReactElement => {
  const { forgotPassword, forgotPasswordSubmit, stage, resendConfirmationCode, setStage } =
    useUser();

  const [username, setUsername] = useState<string | null>(null);

  return (
    <CardWrapper cardType="centered">
      {stage === 1 ? (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="my-6 text-4xl underline">Reset Password</h2>
            <Link className="cursor-pointer hover:underline" to="/login">
              Back
            </Link>
          </div>
          <Form
            formValues={{
              username: {
                initialValue: '',
                type: 'text',
                label: 'Username',
                placeholder: 'Confirm your username',
              },
            }}
            submitButton={{ label: 'Send Confirmation Code' }}
            submitFn={(values): void => {
              setUsername(values.username);
              forgotPassword(values as { username: string });
            }}
          />
        </>
      ) : stage === 2 ? (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="my-6 text-4xl underline">Reset Password</h2>
            <button
              type="button"
              className="cursor-pointer hover:underline"
              onClick={(): void => setStage(1)}
            >
              Back
            </button>
          </div>
          <Form
            formValues={{
              username: { initialValue: '', type: 'text', label: 'Username' },
              code: {
                initialValue: '',
                type: 'text',
                label: 'Code',
                extraInfo: 'A 6 digit code you would have received this code via email.',
              },
              newPassword: { initialValue: '', type: 'password', label: 'New Password' },
              confirmPassword: { initialValue: '', type: 'password', label: 'Confirm Password' },
            }}
            submitButton={{ label: 'Change Password' }}
            footerButton={{
              active: true,
              label: 'Resend Confirmation Code',
              onClick: () => resendConfirmationCode(username || 'benjithegreat'),
            }}
            submitFn={(values): void => forgotPasswordSubmit(values as ForgotPasswordSubmit)}
          />
        </>
      ) : (
        <>
          <h2 className="my-6 text-4xl underline">Your password has been reset.</h2>
          <Link
            className="cursor-pointer hover:underline"
            to="/login"
            onClick={(): void => setStage(1)}
          >
            Login
          </Link>
        </>
      )}
    </CardWrapper>
  );
};

export default ForgotPassword;
