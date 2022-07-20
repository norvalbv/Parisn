import React, { HTMLAttributes, MouseEventHandler, ReactElement } from "react";

interface CardWrapperProps {
  attr?: HTMLAttributes<HTMLDivElement>;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  role?: string;
  /**
   * Overwrite background color
   */
  backgroundColor?: keyof typeof backgroundColorMap;
}
const CardWrapper = ({
  attr,
  children,
  onClick,
  role,
  className,
  backgroundColor = "white",
}: CardWrapperProps): ReactElement => {
  return (
    <div
      onClick={onClick}
      {...attr}
      className={`flex h-screen w-full ${backgroundColorMap[backgroundColor]}`}
      role={role}
    >
      <div className={className}>{children}</div>
    </div>
  );
};

const backgroundColorMap = {
  white: "bg-white text-black",
  black: "bg-black text-white",
};

export default CardWrapper;
