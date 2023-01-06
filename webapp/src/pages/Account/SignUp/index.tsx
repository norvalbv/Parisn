import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import useUser from '../../../hooks/useUser';
import { Auth, VerifyAccount } from '../../../types';

const SignUp = () => {
  const { signUp, error, stage, user, confirmSignUp, setStage } = useUser();

  console.log(user, user.userInfo);

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
            footerButton={{
              active: true,
              label: 'Verify Account',
              onClick: () => {
                console.log('called');
                setStage(2);
              },
            }}
            submitButton={{ label: 'Sign Up' }}
            submitFn={(values) => signUp(values as Auth)}
          />
        </>
      ) : (
        <>
          <h2 className="text-4xl underline my-6">Enter confirmation code</h2>
          <Form
            formValues={{
              username: {
                initialValue: user.userInfo?.username || '',
                type: 'text',
                label: 'Username',
              },
              code: {
                initialValue: '',
                type: 'text',
                label: 'Code',
                extraInfo: 'You would have received this code via email or phone.',
              },
            }}
            formError={error}
            footerButton={{
              active: true,
              label: 'Back',
              onClick: () => {
                console.log('called');
                setStage(1);
              },
            }}
            submitButton={{ label: 'Sign Up' }}
            submitFn={(values) => confirmSignUp(values as VerifyAccount)}
          />
          <button onClick={(): void => setStage(2)}></button>
        </>
      )}
    </CardWrapper>
  );
};

export default SignUp;
