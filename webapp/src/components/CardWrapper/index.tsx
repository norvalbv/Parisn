import { ReactElement } from 'react';

export interface CardWrapperProps {
  backgroundColor?: keyof typeof backgroundColorMap;
  cardType?: keyof typeof cardTypeMap;
  children: JSX.Element | JSX.Element[];
  className?: string;
  role?: string;
}
const CardWrapper = ({
  backgroundColor = 'black',
  cardType = 'default',
  children,
  className,
  role,
}: CardWrapperProps): ReactElement => {
  return (
    <div
      className={`${cardTypeMap[cardType]} ${backgroundColorMap[backgroundColor]} ${className}`}
      role={role}
    >
      {children}
    </div>
  );
};

const backgroundColorMap = {
  white: 'bg-white text-black',
  black: 'bg-black text-primary-light',
};

const cardTypeMap = {
  default: 'max-w-screen-2xl',
  centered: 'h-screen w-full grid place-items-center',
};

export default CardWrapper;
