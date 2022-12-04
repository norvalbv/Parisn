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
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {renderCircle && <circle cx="12" cy="12" r="9" />}
    <path d="M10 10l4 4m0 -4l-4 4" />
  </svg>
);
