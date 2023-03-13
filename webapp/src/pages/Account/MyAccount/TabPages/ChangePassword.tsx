import React, { ReactElement } from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import useUser from '../../../../hooks/useUser';
import { ResetPassword } from '../../../../types';

const ChangePassword = (): ReactElement => {
  const { changePassword, resendConfirmationCode } = useUser();

  return (
    <div className="w-full">
      <h4 className="underline">Change Password</h4>
      <div className="mt-4">
        <Form
          formValues={{
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
          submitButton={{
            label: 'Change Password',
          }}
          submitFn={(values): void => changePassword(values as ResetPassword)}
        />
      </div>
      <Button
        onClick={(): void => resendConfirmationCode()}
        text="Resend Confirmation Code"
        classes="mt-10"
      />
    </div>
  );
};

export default ChangePassword;
