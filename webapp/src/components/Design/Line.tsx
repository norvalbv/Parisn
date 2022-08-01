import { FC, ReactElement } from 'react';

interface LineProps {
  thickness?: keyof typeof thicknessMap;
  colour?: keyof typeof coloursMap;
  classes?: string;
  rotate?: keyof typeof rotateMap;
}

const Line: FC<LineProps> = ({
  thickness = 'md',
  colour = 'neutral',
  classes = '',
  rotate = 'none',
}): ReactElement => {
  return (
    <svg
      className={`absolute w-screen opacity-75 z-0 ${classes} ${
        rotate === 'antiClockWise' ? '-rotate-90' : `rotate-${rotateMap[rotate]}`
      }`}
      style={{ backgroundColor: coloursMap[colour], height: thicknessMap[thickness] }}
    />
  );
};

export default Line;

const thicknessMap = {
  sm: '1px',
  md: '2px',
  lg: '3px',
  xl: '4px',
  '2xl': '5px',
};

const rotateMap = {
  none: 0,
  clockWise: 45,
  antiClockWise: 45,
  verticle: 90,
};

const coloursMap = {
  blueGreen: '#004B6E',
  darkPurple: '#120E44',
  purple: '#8948DC',
  green: '#00BA92',
  blue: '#1BC5DC',
  neutral: '#C0D1D9',
};
