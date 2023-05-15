import React, { ReactElement } from 'react';
import { LeftIcon, RightIcon } from 'components/SVG';

type NavigationArrowsProps = {
  leftArrow: { onClick: () => void; fill: string; className?: string };
  rightArrow: { onClick: () => void; fill: string; className?: string };
};

const NavigationArrows = ({ leftArrow, rightArrow }: NavigationArrowsProps): ReactElement => {
  return (
    <section className="flex gap-10">
      <LeftIcon className={leftArrow.className} fill={leftArrow.fill} onClick={leftArrow.onClick} />
      <RightIcon
        className={rightArrow.className}
        fill={rightArrow.fill}
        onClick={rightArrow.onClick}
      />
    </section>
  );
};

export default NavigationArrows;
