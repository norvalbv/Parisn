import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import useUser from '../../../hooks/useUser';
import { Auth, VerifyAccount } from '../../../types';

const SignUp = () => {
  const { signUp, error, stage, user, confirmSignUp } = useUser();

  return (
    <CardWrapper cardType="centered">
      {stage === 1 ? (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="text-4xl underline my-6">Sign Up</h2>
            <Link className="hover:underline cursor-pointer" to="/login">
              Already have an account?
            </Link>
          </div>
          <Form
            formValues={{
              username: { initialValue: '', type: 'text', label: 'Username' },
              email: { initialValue: '', type: 'text', label: 'Email' },
              password: { initialValue: '', type: 'password', label: 'Password' },
            }}
            formError={error}
            submitButton={{ label: 'Sign Up' }}
            submitFn={(values) => signUp(values as Auth)}
          />
        </>
      ) : (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="text-4xl underline my-6">Enter confirmation code</h2>
            <div>You would've received this by email.</div>
          </div>
          <Form
            formValues={{
              code: { initialValue: '', type: 'text', label: 'Code' },
              email: { initialValue: user.userInfo?.email || '', type: 'text', label: 'Email' },
            }}
            formError={error}
            submitButton={{ label: 'Sign Up' }}
            submitFn={(values) => confirmSignUp(values as VerifyAccount)}
          />
        </>
      )}
    </CardWrapper>
  );
};

export default SignUp;
