import clsx from 'clsx';
import React, { ReactElement, forwardRef } from 'react';

type Props = {
  children: ReactElement | ReactElement[];
  className?: string;
  maxWidth?: boolean;
  id?: string;
};

const CardWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, maxWidth = true, id }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative z-10 px-4 sm:px-10',
          className,
          maxWidth && 'mx-auto max-w-screen-xl 2xl:max-w-screen-2xl'
        )}
        id={id}
      >
        {children}
      </div>
    );
  }
);

CardWrapper.displayName = 'CardWrapper';

export default CardWrapper;
