import { FC, ReactElement } from 'react';

interface LineProps {
  thickness?: keyof typeof thicknessMap;
  colour?: string;
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
      className={`absolute w-screen h-${
        thicknessMap[thickness]
      } bg-primary-${colour} opacity-50 z-0 ${classes} ${
        rotate === 'antiClockWise' ? '-rotate-90' : `rotate-${rotateMap[rotate]}`
      }`}
    />
  );
};

export default Line;

const thicknessMap = {
  sm: 'px',
  md: '0.5',
  lg: '1',
  xl: '1.5',
  '2xl': '2',
};

const rotateMap = {
  none: 0,
  clockWise: 45,
  antiClockWise: 45,
  verticle: 90,
};
