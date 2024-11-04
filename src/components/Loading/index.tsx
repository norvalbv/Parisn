import { cn } from '@/lib/utils/cn';
import React, { ReactElement } from 'react';

type Props = {  
  className?: string;
};

const Loader = ({ className }: Props): ReactElement => {
  return (  
    <div
      className={cn(
        'tracking-side grid h-screen w-screen animate-spin-slow place-items-center text-xl',
        className || ''
      )}
    >
      PARISN.com
    </div>
  );
};

export default Loader;
