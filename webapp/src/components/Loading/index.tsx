import React, { ReactElement } from 'react';

const Loading = (): ReactElement => {
  return (
    <div className="h-screen w-screen grid place-items-center animate-spin-slow text-xl tracking-side">
      PARISN.com
    </div>
  );
};

export default Loading;
