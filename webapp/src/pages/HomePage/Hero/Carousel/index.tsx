import React, { ReactElement } from 'react';
import { LeftIcon, RightIcon } from 'components/SVG';
import Shoes from '../shoes';

const Carousel = (): ReactElement => {
  return (
    <div className="flex relative w-7/12 justify-between">
      <div className="top-10 relative">
        <Shoes />
      </div>
      <div className="flex flex-col gap-3 items-end">
        <div className="flex gap-[0.6875rem] items-center font-thin tracking-wider">
          <span className="text-end">Limited Sneakers</span>
          <div className="h-[3.5rem] w-px bg-primary-light" />
        </div>
        <div className="h-[3.5rem] w-px bg-primary-light/40" />
        <div className="h-[3.5rem] w-px bg-primary-light/30" />
        <div className="h-[3.5rem] w-px bg-primary-light/20" />
        <div className="h-[3.5rem] w-px bg-primary-light/10" />
      </div>
      <div className="absolute bottom-40 right-8 flex gap-10">
        <LeftIcon />
        <RightIcon />
      </div>
    </div>
  );
};

export default Carousel;
