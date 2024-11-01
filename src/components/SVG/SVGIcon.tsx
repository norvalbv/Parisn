import React, { ReactElement, SVGProps } from 'react';

export interface SVGIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const SVGIcon = ({ size = 16, children, ...svgProps }: SVGIconProps): ReactElement => {
  const calculatedProps =
    typeof size === 'number' || typeof size === 'string'
      ? {
          width: size,
          height: size,
        }
      : {};

  return (
    <svg {...svgProps} {...calculatedProps} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
};

export default SVGIcon;
