import clsx from 'clsx';
import React, { ReactElement } from 'react';

export type CardWrapperProps = {
  backgroundColor?: keyof typeof backgroundColorMap;
  cardType?: keyof typeof cardTypeMap;
  children: JSX.Element | JSX.Element[];
  className?: string;
  role?: string;
};
const CardWrapper = ({
  backgroundColor = 'black',
  cardType = 'default',
  children,
  className,
  role,
}: CardWrapperProps): ReactElement => {
  return (
    <div
      className={clsx(cardTypeMap[cardType].outer, backgroundColorMap[backgroundColor])}
      role={role}
    >
      <div className={clsx(cardTypeMap[cardType].inner, className)}>{children}</div>
    </div>
  );
};

const backgroundColorMap = {
  white: 'bg-white text-black',
  black: 'bg-primary-dark text-primary-light',
};

const cardTypeMap = {
  default: { outer: 'relative z-10', inner: 'max-w-[2000px] mx-auto' },
  centered: { outer: 'h-screen w-full grid place-items-center relative', inner: '' },
};

export default CardWrapper;
