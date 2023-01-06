import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import useUser from '../../../hooks/useUser';
import { BasicAuth } from '../../../types';

const Login = () => {
  const { signIn } = useUser();
  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl underline my-6">Login</h2>
        <Link className="hover:underline cursor-pointer" to="/sign-up">
          Need an account?
        </Link>
      </div>
      <Form
        formValues={{
          username: { initialValue: '', type: 'text', label: 'Username' },
          password: { initialValue: '', type: 'password', label: 'Password' },
        }}
        footerLink={{ active: true, label: 'Forgot your password?', to: '/reset-password' }}
        submitButton={{ label: 'Sign In' }}
        submitFn={(values) => signIn(values as BasicAuth)}
      />
    </CardWrapper>
  );
};

export default Login;
