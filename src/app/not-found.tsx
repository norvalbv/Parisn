import React, { ReactElement } from 'react';
import StyledLink from '../components/StyledLink';

const NotFound = (): ReactElement => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-xl">
      Page Not Found 😕
      <StyledLink href="/">Go Home</StyledLink>
    </div>
  );
};

export default NotFound;
