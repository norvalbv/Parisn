import { ParentSize } from '@visx/responsive';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../../components/Button';
import Chart from '../../components/Chart';
import { PRODUCT_1_IMAGE } from '../../constants';
import LiveViewers from '../../Utils/LiveViewers';
import { scaleLinear, scaleLog } from '@visx/scale';

const ItemView = () => {
  const [price, setPrice] = useState(1000);

  const priceScale = useMemo(
    () =>
      scaleLog({
        domain: [1, 1000],
        range: [0, 80000],
      }),
    []
  );

  useEffect(() => {
    let num = 80000;
    const timer = setInterval(() => {
      setPrice(priceScale.invert(num));
      num--;
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-auto scroll-smooth">
      <img src={PRODUCT_1_IMAGE} alt={PRODUCT_1_IMAGE} className="h-screen w-[40%] sticky top-0" />
      <div className="absolute right-0 top-0 w-[60%]">
        <div
          id="product-overview"
          className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider"
        >
          <div className="w-[70%] h-[30vh]">
            <ParentSize>
              {(parent) => <Chart width={parent.width} height={parent.height} data={price} />}
            </ParentSize>
          </div>

          <span className="text-xl drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
            PARISN official White Trainers
          </span>

          <a className="hover:underline hover:text-secondary-neutral" href="#description">
            View Description
          </a>
          <p>£{price.toFixed(2)}</p>
          <Button
            text="Buy Now"
            hoveredText={`Buy at £${price.toFixed(2)}`}
            classes="mt-10 mb-4"
            rounded="lg"
          />
          <LiveViewers />
        </div>
        <div
          id="description"
          className="flex flex-col justify-center items-center mx-auto gap-4 tracking-wider text-center w-3/5 leading-10 h-screen"
        >
          <p className="underline">Product Description</p>
          <p className="my-6 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quo, debitis, magni
            distinctio ullam minima culpa modi animi excepturi minus quasi in maxime nobis vitae!
            Amet ea et harum quam.
          </p>
          <a className="hover:text-secondary-neutral hover:underline" href="#product-overview">
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
