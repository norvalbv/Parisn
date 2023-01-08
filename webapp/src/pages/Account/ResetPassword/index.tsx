import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import useUser from '../../../hooks/useUser';
import { ResetPassword as ResetPasswordType } from '../../../types';

const ResetPassword = () => {
  const { changePassword } = useUser();
  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl underline my-6">Reset Password</h2>
        <Link className="hover:underline cursor-pointer" to="/sign-up">
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
        submitFn={(values) => changePassword(values as ResetPasswordType)}
      />
    </CardWrapper>
  );
};

export default ResetPassword;
