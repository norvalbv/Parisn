import { ParentSize } from '@visx/responsive';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../../components/Button';
import Chart from '../../components/Chart';
import { PRODUCT_1_IMAGE } from '../../constants';
import LiveViewers from '../../Utils/LiveViewers';
import { scaleLinear, scaleLog } from '@visx/scale';

const ItemView = () => {
  const [clicked, setClicked] = useState(false);
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
    <div className="flex">
      <img src={PRODUCT_1_IMAGE} alt={PRODUCT_1_IMAGE} className="h-screen w-[40%]" />
      <div className="absolute right-0 top-0 h-screen w-1/2 flex flex-col justify-center items-center mx-auto gap-4 tracking-wider">
        {!clicked ? (
          <>
            <div className="w-[70%] h-[35%]">
              <ParentSize>
                {(parent) => <Chart width={parent.width} height={parent.height} data={price} />}
              </ParentSize>
            </div>

            <span className="text-xl drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              PARISN official White Trainers
            </span>

            <button
              onClick={() => setClicked(!clicked)}
              className="hover:underline hover:text-secondary-neutral"
            >
              Description
            </button>
            <p>£{price.toFixed(2)}</p>
            <Button
              text="Buy Now"
              hoveredText={`Buy at £${price.toFixed(2)}`}
              classes="mt-10 mb-4"
              rounded="lg"
            />
            <LiveViewers />
          </>
        ) : (
          <div className="text-center w-3/5 leading-10">
            <p className="underline">Description</p>
            <p className="my-6 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quo, debitis, magni
              distinctio ullam minima culpa modi animi excepturi minus quasi in maxime nobis vitae!
              Amet ea et harum quam.
            </p>
            <button
              onClick={() => setClicked(!clicked)}
              className="hover:text-secondary-neutral hover:underline"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemView;
