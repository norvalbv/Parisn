import React, { ReactElement } from 'react';
import SVGIcon, { SVGIconProps } from './SVGIcon';

const ClockIcon = (props: SVGIconProps): ReactElement => {
  return (
    <SVGIcon width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M8.00004 14.6666C11.682 14.6666 14.6667 11.6819 14.6667 7.99992C14.6667 4.31792 11.682 1.33325 8.00004 1.33325C4.31804 1.33325 1.33337 4.31792 1.33337 7.99992C1.33337 11.6819 4.31804 14.6666 8.00004 14.6666Z"
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M8.00269 4V8.00333L10.829 10.83"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
};

export default ClockIcon;
