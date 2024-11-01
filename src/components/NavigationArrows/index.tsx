import React, { ReactElement } from 'react';
import { LeftIcon, RightIcon } from '@/src/components/SVG';

type NavigationArrowsProps = {
  leftArrow: { onClick: () => void; fill: string; className?: string };
  rightArrow: { onClick: () => void; fill: string; className?: string };
};

const NavigationArrows = ({ leftArrow, rightArrow }: NavigationArrowsProps): ReactElement => {
  return (
    <section className="flex gap-10">
      <LeftIcon
        className={leftArrow.className || 'cursor-pointer'}
        fill={leftArrow.fill}
        onClick={leftArrow.onClick}
      />
      <RightIcon
        className={rightArrow.className || 'cursor-pointer'}
        fill={rightArrow.fill}
        onClick={rightArrow.onClick}
      />
    </section>
  );
};

export default NavigationArrows;
