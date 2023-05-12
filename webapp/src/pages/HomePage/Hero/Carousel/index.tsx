import React, { Fragment, ReactElement, useState } from 'react';
import { LeftIcon, RightIcon } from 'components/SVG';
import Radial from 'components/Design/Radial';
import classNames from 'utils/classNames';
import Shoes from '../shoes';

const indexFromSelected: { [key: number]: string } = {
  0: 'bg-primary-light',
  1: 'bg-primary-light/40',
  2: 'bg-primary-light/30',
  3: 'bg-primary-light/20',
  4: 'bg-primary-light/10',
};

const Carousel = (): ReactElement => {
  const images = [
    <Shoes key="1" />,
    <Shoes key="2" />,
    <Shoes key="3" />,
    <Shoes key="4" />,
    <Shoes key="5" />,
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div className="flex relative w-7/12 justify-between">
      <Radial />
      <div className="top-10 relative">{images[selected]}</div>
      <div className="flex flex-col gap-3 items-end">
        {images.map((image, idx) => (
          <Fragment key={image.toString()}>
            <div className="flex gap-[0.6875rem] items-center font-thin tracking-wider">
              {selected === idx ? <span className="text-end">Limited Sneakers</span> : null}
              <div
                className={classNames(
                  'h-[3.5rem] w-px',
                  indexFromSelected[Math.abs(selected - idx)] || indexFromSelected[4]
                )}
              />
            </div>
          </Fragment>
        ))}
      </div>
      <div className="absolute bottom-40 right-[3.25rem] flex gap-10">
        <LeftIcon
          className={selected === 0 ? '' : 'cursor-pointer'}
          fill={selected === 0 ? '#B0B0B0' : 'white'}
          onClick={(): void => {
            if (selected === 0) return;
            setSelected((selected) => selected - 1);
          }}
        />
        <RightIcon
          className={selected === images.length - 1 ? '' : 'cursor-pointer'}
          fill={selected === images.length - 1 ? '#B0B0B0' : 'white'}
          onClick={(): void => {
            if (selected === images.length - 1) return;
            setSelected((selected) => selected + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
