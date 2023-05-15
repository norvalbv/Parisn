import React, { ReactElement } from 'react';
import Button from 'components/Button';

const PickedProducts = (): ReactElement => {
  const t = [
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
  ];
  return (
    <div className="my-10">
      <div>
        <div>
          <span>Dive into Our Handpicked Selection</span>
          <span>Featured Products with Unmatched Style and Exciting Bidding Opportunities</span>
        </div>
      </div>
      <div className="flex items-center gap-10">
        {t.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="h-[31.875rem] w-[19.625rem] relative" key={idx}>
            <img src={category} alt="p" className="h-full" />
            <div className="h-[8.25rem] bg-primary-dark/40 absolute z-10 bottom-0 w-full flex flex-col items-center justify-center gap-6">
              <span>Limited Size Sneakers</span>
              <Button text="Make A Bid" />
              <Button text="Buy Now" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PickedProducts;
