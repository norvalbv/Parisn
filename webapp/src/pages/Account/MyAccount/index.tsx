import React from 'react';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';

const MyAccount = () => {
  const { setUser } = useUser();
  return (
    <Button text="Log Out" onClick={() => setUser(null)} classes="my-96 mx-10" navigateTo="/" />
  );
};

export default MyAccount;
