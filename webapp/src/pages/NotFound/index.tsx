import React, { ReactElement } from 'react';
import Button from '../../components/Button';

const NotFound = (): ReactElement => {
  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center text-xl">
      Page Not Found :(
      <Button text="Go Home" navigateTo="/" />
    </div>
  );
};

export default NotFound;
