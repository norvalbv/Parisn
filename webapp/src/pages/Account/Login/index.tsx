import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';

const Login = () => {
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
          firstName: { initialValue: '', type: 'text', label: 'First Name' },
          lastName: { initialValue: '', type: 'text', label: 'Last Name' },
          password: { initialValue: '', type: 'password', label: 'Password' },
        }}
        footerLink={{ active: true, label: 'Forgot your password?', to: '/' }}
        submitButtonText="Sign In"
        submitFn={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      />
    </CardWrapper>
  );
};

export default Login;
