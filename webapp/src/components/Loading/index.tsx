import React, { ReactElement } from 'react';

const Loading = (): ReactElement => {
  return (
    <div className="tracking-side grid h-screen w-screen animate-spin-slow place-items-center text-xl">
      PARISN.com
    </div>
  );
};

export default Loading;
