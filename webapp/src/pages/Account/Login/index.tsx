import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Link } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper';
import Form from '../../../components/Form';
import userPool from '../../../context/AuthContext';

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
        submitFn={(values) => {
          console.log(values);
          // const user = new CognitoUser({
          //   Username: values.email,
          //   Pool: userPool,
          // });

          // const authDetails = new AuthenticationDetails({
          //   Username: values.email,
          //   Password: values.password,
          // });

          // user.authenticateUser(authDetails, {
          //   onSuccess: (data) => {
          //     console.log('on succ', data);
          //   },
          //   onFailure: (err) => {
          //     console.error('on fail', err);
          //   },
          //   newPasswordRequired: (data) => {
          //     console.log('new', data);
          //   },
          // });
        }}
      />
    </CardWrapper>
  );
};

export default Login;
