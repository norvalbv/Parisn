import React, { useState } from 'react';
import Button from '../components/Button';
import { PRODUCT_1_IMAGE } from '../constants';

const ItemView = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex">
      <img src={PRODUCT_1_IMAGE} alt={PRODUCT_1_IMAGE} className="h-screen w-[40%]" />
      <div className="absolute right-0 top-0 h-screen w-1/2 flex flex-col justify-center items-center mx-auto gap-4 tracking-wider">
        {!clicked ? (
          <>
            <span className="text-xl drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              PARISN official White Trainers
            </span>

            <button
              onClick={() => setClicked(!clicked)}
              className="hover:underline hover:text-secondary-neutral"
            >
              Description
            </button>
            <p>£1250</p>
            <Button text="Buy Now" classes="mt-10 mb-4" rounded="lg" />
            <p className="text-xs">Live Viewers: 1,000</p>
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
