import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import UserPool from '../../../context/AuthContext';

const SignUp = () => {
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
          firstName: { initialValue: '', type: 'text', label: 'First Name' },
          lastName: { initialValue: '', type: 'text', label: 'Last Name' },
          email: { initialValue: '', type: 'text', label: 'Email' },
          password: { initialValue: '', type: 'password', label: 'Password' },
        }}
        submitButton={{ label: 'Sign Up' }}
        submitFn={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          // UserPool.signUp(values.email, values.password, [], [], (err, data) => {
          //   if (err) {
          //     console.error(err);
          //   }
          //   console.log(data);
          // });
        }}
      />
    </CardWrapper>
  );
};

export default SignUp;
