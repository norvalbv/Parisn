import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import useUser from '../../../../hooks/useUser';
import { ResetPassword } from '../../../../types';

const ChangePassword = () => {
  const { changePassword, resendConfirmationCode } = useUser();

  return (
    <div className="w-full">
      <h4 className="underline">Verify Account</h4>
      <div className="mt-4">
        <Form
          formValues={{
            oldPassword: { initialValue: '', label: 'Old Password', type: 'password' },
            newPassword: {
              initialValue: '',
              label: 'New Password',
              type: 'password',
            },
            confirmPassword: {
              initialValue: '',
              label: 'Confirm Password',
              type: 'password',
            },
          }}
          submitButton={{
            label: 'Verify Account',
            className: undefined,
          }}
          submitFn={(values): void => changePassword(values as ResetPassword)}
        />
      </div>
      <Button onClick={resendConfirmationCode} text="Resend Confirmation Code" />
    </div>
  );
};

export default ChangePassword;
