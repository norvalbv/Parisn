import React from 'react';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';

const Login = () => {
  const { setUser } = useUser();
  return (
    <Button
      text="Login"
      onClick={() => setUser({ id: 'User' })}
      classes="my-96"
      navigateTo="/my-account"
    />
  );
};

export default Login;
