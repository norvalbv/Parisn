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

export const UserIcon = ({}: CloseIconsProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-user"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#ffffff"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);
