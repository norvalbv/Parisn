import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_1_IMAGE } from '../../../constants';

const arr = [1, 2, 3];

const Categories = (): ReactElement => {
  return (
    <div className="grid grid-cols-3 h-screen">
      {arr.map((__, idx) => (
        <div
          key={idx}
          className="flex flex-col flex-wrap justify-center items-center pt-10"
          data-testid="Shoes"
        >
          <Link to="/catalogue" className="flex justify-center items-center">
            <img
              src={PRODUCT_1_IMAGE}
              alt={PRODUCT_1_IMAGE}
              className="w-[24rem] h-[34rem] cursor-pointer hover:scale-110 transition-all rounded-xl"
            />
          </Link>
          <p className="underline mt-10 text-xl uppercase tracking-widest font-thin underline-offset-8">
            Shoes
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
