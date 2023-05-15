import React, { ReactElement } from 'react';
import Button from 'components/Button';
import ClockIcon from 'components/SVG/ClockIcon';
import Badge from 'components/Badge';

const PickedProducts = (): ReactElement => {
  const t = [
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
  ];
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <span className="block">Dive into Our Handpicked Selection</span>
          <span>Featured Products with Unmatched Style and Exciting Bidding Opportunities</span>
        </div>
      </div>
      <div className="flex items-center gap-[3.75rem]">
        {t.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="h-[31.875rem] w-[19.625rem] relative rounded-lg" key={idx}>
            <div className="flex items-center gap-2.5 absolute top-[0.6875rem] left-3">
              <ClockIcon />
              <span>1hr 14mins</span>
            </div>
            <div className="absolute top-[0.6875rem] right-3">
              <Badge type={idx % 2 ? 'limited' : 'new'} />
            </div>
            <img src={category} alt="p" className="h-[23.625rem] w-full" />
            <div className="h-[8.25rem] bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10 absolute z-10 bottom-0 w-full flex flex-col items-center justify-center gap-6">
              <div className="flex">
                <span>Limited Size Sneakers</span>
                <section>
                  <span className="block">Current Price</span>
                  <span>£ 550.00</span>
                </section>
              </div>
              <p className="text-[10px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates omnis recusandae
                et, veritatis possimus, error modi qui quaerat pariatur esse ipsum. Error neque
                consequatur magnam.
              </p>
              <div className="flex">
                <Button text="Make A Bid" />
                <Button text="Buy Now" theme="light" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PickedProducts;
