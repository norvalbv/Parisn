import React, { ReactElement, SVGAttributes } from 'react';

interface IconProps extends Omit<SVGAttributes<SVGElement>, 'color'> {
  colour?: string;
  size?: number;
}

interface ReusableSVGProps extends IconProps {
  group: JSX.Element;
}

const ReusableSVG = ({
  group,
  fill = 'none',
  colour = 'black',
  size = 15,
  viewBox = '0 0 14 16',
  className = '',
  strokeWidth = 1,
}: ReusableSVGProps): ReactElement => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      stroke={colour}
      className={className}
      strokeWidth={strokeWidth}
    >
      {group}
    </svg>
  );
};

export const Spinner = ({
  fill,
  colour,
  size,
  className = 'mr-3 -ml-1 h-5 w-5 animate-spin text-black',
}: IconProps): ReactElement => (
  <ReusableSVG
    group={
      <g>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </g>
    }
    fill={fill}
    colour={colour}
    size={size}
    viewBox="0 0 24 24"
    className={className}
  />
);

export const Basket = ({ fill, colour = 'white', size = 24 }: IconProps): ReactElement => (
  <ReusableSVG
    group={
      <g>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="7 10 12 4 17 10" />
        <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
        <circle cx="12" cy="15" r="2" />
      </g>
    }
    fill={fill}
    colour={colour}
    size={size}
    viewBox="0 0 20 24"
    strokeWidth={1.5}
  />
);
