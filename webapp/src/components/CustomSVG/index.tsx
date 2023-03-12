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

export const InstagramLogo = ({ fill = '#aaaaaa', colour = 'none', size = 16 }: IconProps) => (
  <ReusableSVG
    group={
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
    }
    fill={fill}
    colour={colour}
    size={size}
    viewBox="0 0 16 16"
  />
);
