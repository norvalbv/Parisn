import React, { ReactElement } from 'react';
import SVGIcon, { SVGIconProps } from './SVGIcon';

const LeftIcon = (props: SVGIconProps): ReactElement => {
  return (
    <SVGIcon width={22} height={22} viewBox="0 0 22 18" fill="#B0B0B0" {...props}>
      <path d="M0.96172 8.33672C0.874554 8.42379 0.805407 8.52718 0.758228 8.641C0.71105 8.75481 0.686768 8.8768 0.686768 9C0.686768 9.1232 0.71105 9.2452 0.758228 9.35901C0.805407 9.47282 0.874554 9.57622 0.96172 9.66328L8.46172 17.1633C8.63763 17.3392 8.87622 17.438 9.125 17.438C9.37378 17.438 9.61237 17.3392 9.78828 17.1633C9.9642 16.9874 10.063 16.7488 10.063 16.5C10.063 16.2512 9.9642 16.0126 9.78828 15.8367L3.88906 9.9375H20.375C20.6236 9.9375 20.8621 9.83873 21.0379 9.66292C21.2137 9.4871 21.3125 9.24864 21.3125 9C21.3125 8.75136 21.2137 8.51291 21.0379 8.33709C20.8621 8.16127 20.6236 8.0625 20.375 8.0625H3.88906L9.78828 2.16328C9.9642 1.98737 10.063 1.74878 10.063 1.5C10.063 1.25122 9.9642 1.01263 9.78828 0.836721C9.61237 0.660808 9.37378 0.561981 9.125 0.561981C8.87622 0.561981 8.63763 0.660808 8.46172 0.836721L0.96172 8.33672Z" />
    </SVGIcon>
  );
};

export default LeftIcon;
