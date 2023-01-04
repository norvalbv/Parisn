import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import useUser from '../../../hooks/useUser';

const SignUp = () => {
  const { signUp } = useUser();
  return (
    <CardWrapper cardType="centered">
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
        submitButton={{ label: 'Sign Up' }}
        submitFn={(values) => signUp(values)}
      />
    </CardWrapper>
  );
};

export default SignUp;
