import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';

const SignUp = () => {
  // UserPool.signUp(email, password, [], null, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   console.log(data);
  // });

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
          userName: { initialValue: '', type: 'text', label: 'Username' },
          firstName: { initialValue: '', type: 'text', label: 'First Name' },
          lastName: { initialValue: '', type: 'text', label: 'Last Name' },
          email: { initialValue: '', type: 'text', label: 'Email' },
          password: { initialValue: '', type: 'password', label: 'Password' },
        }}
        submitButtonText="Sign Up"
        submitFn={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      />
    </CardWrapper>
  );
};

export default SignUp;
