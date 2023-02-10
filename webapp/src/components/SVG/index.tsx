import { SVGAttributes } from 'react';

interface IconProps extends Omit<SVGAttributes<SVGElement>, 'color'> {
  colour?: string;
  size?: number;
}

interface CloseIconsProps extends IconProps {
  renderCircle?: boolean;
}

export const CloseIcon = ({ strokeWidth = 1, renderCircle = true, size = 34 }: CloseIconsProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle-x"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {renderCircle && <circle cx="12" cy="12" r="9" />}
    <path d="M10 10l4 4m0 -4l-4 4" />
  </svg>
);

export const UserIcon = ({ viewBox = '0 0 24 14' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-user"
    width="34"
    height="44"
    viewBox={viewBox}
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

export const UserLoginIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-user-check"
    width="34"
    height="44"
    viewBox="0 0 24 14"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 11l2 2l4 -4" />
  </svg>
);

export const LeftIcon = ({ className, onClick }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`icon icon-tabler icon-tabler-arrow-narrow-left ${className}`}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick && onClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="5" y1="12" x2="9" y2="16" />
    <line x1="5" y1="12" x2="9" y2="8" />
  </svg>
);

export const RightIcon = ({ className, onClick }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`icon icon-tabler icon-tabler-arrow-narrow-right ${className}`}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick && onClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="15" y1="16" x2="19" y2="12" />
    <line x1="15" y1="8" x2="19" y2="12" />
  </svg>
);
