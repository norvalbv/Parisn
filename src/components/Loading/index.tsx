import { COMPANY_NAME } from '@/src/constants';
import React, { ReactElement } from 'react';

type Props = {
  className?: string;
  type?: 'text' | 'spinner';
};

const Loader = ({ className, type }: Props): ReactElement => {
  return (
    <div className={className}>
      {type === 'text' ? (
        <div className="tracking-side animate-spin-slow text-xl grid h-screen w-screen place-items-center">
          {COMPANY_NAME}.com
        </div>
      ) : (
        <div className="relative size-6">
          <div className="animate-spin absolute inset-0 rounded-full size-full border-l-4 border-t-4 border-gray-900" />
          <div className="animate-spin absolute inset-0 rounded-full size-full border-b-4 border-r-4 border-gray-900/25" />
        </div>
      )}
    </div>
  );
};

export default Loader;
