import React, { ReactElement } from 'react';
import Button from 'components/Button';

const NotFound = (): ReactElement => {
  return (
    <div className="text-xl flex h-screen w-full flex-col items-center justify-center gap-4">
      Page Not Found :(
      <Button text="Go Home" navigateTo="/" />
    </div>
  );
};

export default NotFound;
