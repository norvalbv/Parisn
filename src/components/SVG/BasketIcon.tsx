import React, { ReactElement } from 'react';
import SVGIcon, { SVGIconProps } from './SVGIcon';

const BasketIcon = (props: SVGIconProps): ReactElement => {
  return (
    <SVGIcon width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M5.72727 5.23077C5.72727 5.23077 5.72727 2 9 2C12.2727 2 12.2727 5.23077 12.2727 5.23077M3 5.23077V16H15V5.23077H3Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
};

export default BasketIcon;
