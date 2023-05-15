import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from 'components/CardWrapper';
import Form from 'components/Form';
import useUser from 'hooks/useUser';
import { BasicAuth } from 'types';

const Login = (): ReactElement => {
  const { signIn } = useUser();
  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl my-6 underline">Login</h2>
        <Link className="cursor-pointer hover:underline" to="/sign-up">
          Need an account?
        </Link>
      </div>
      <Form
        formValues={{
          username: { initialValue: '', label: 'Username', type: 'text' },
          password: { id: 'password', initialValue: '', label: 'Password', type: 'password' },
        }}
        footerLink={{ active: true, label: 'Forgot your password?', to: '/forgot-password' }}
        submitButton={{ label: 'Sign In' }}
        submitFn={(values): void => signIn(values as BasicAuth)}
      />
    </CardWrapper>
  );
};

export default Login;
