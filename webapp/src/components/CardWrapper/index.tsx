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
      className={`${cardTypeMap[cardType].outer} ${backgroundColorMap[backgroundColor]}`}
      role={role}
    >
      <div className={`${cardTypeMap[cardType].inner} ${className}`}>{children}</div>
    </div>
  );
};

const backgroundColorMap = {
  white: 'bg-white text-black',
  black: 'bg-black text-primrary-light',
};

const cardTypeMap = {
  default: { outer: 'max-w-screen-2xl', inner: '' },
  centered: { outer: 'h-screen w-full grid place-items-center', inner: '' },
};

export default CardWrapper;
