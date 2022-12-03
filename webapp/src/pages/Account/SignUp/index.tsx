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

  const values = ['Username', 'First Name', 'Last Name', 'Email'];

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
        submitButtonText="Sign In"
      />
    </CardWrapper>
  );
};

export default SignUp;
