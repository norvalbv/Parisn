import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Form from 'components/Form';
import useUser from 'hooks/useUser';
import { VerifyAccount as VerifyAccountType } from 'types';

const VerifyAccount = (): ReactElement => {
  const { user, confirmSignUp, resendConfirmationCode } = useUser();

  return (
    <div className="w-full">
      <h4 className="underline">Verify Account</h4>
      <div className="mt-4">
        <Form
          formValues={{
            code: { initialValue: '', label: 'Code', type: 'text' },
            username: {
              initialValue: user.userInfo?.username || '',
              label: 'Username',
              type: 'text',
            },
          }}
          submitButton={{
            label: 'Verify Account',
            className: undefined,
          }}
          submitFn={(values): void => confirmSignUp(values as VerifyAccountType)}
        />
      </div>
      <Button onClick={(): void => resendConfirmationCode()} text="Resend Confirmation Code" />
    </div>
  );
};

export default VerifyAccount;
