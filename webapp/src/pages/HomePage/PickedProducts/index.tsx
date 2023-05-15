import React, { ReactElement, useState } from 'react';
import Button from 'components/Button';
import ClockIcon from 'components/SVG/ClockIcon';
import Badge from 'components/Badge';
import NavigationArrows from 'components/NavigationArrows';

const PickedProducts = (): ReactElement => {
  const images = [
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
  ];

  const [indexedImageInCenter, setIndexedImageInCenter] = useState(1);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <div>
          <span className="block">Dive into Our Handpicked Selection</span>
          <span>Featured Products with Unmatched Style and Exciting Bidding Opportunities</span>
        </div>
        <NavigationArrows
          leftArrow={{
            className: indexedImageInCenter === 1 ? '' : 'cursor-pointer',
            fill: indexedImageInCenter === 1 ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (indexedImageInCenter === 1) return;
              setIndexedImageInCenter((indexedImageInCenter) => indexedImageInCenter - 1);
            },
          }}
          rightArrow={{
            className: indexedImageInCenter === images.length - 2 ? '' : 'cursor-pointer',
            fill: indexedImageInCenter === images.length - 2 ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (indexedImageInCenter === images.length - 2) return;
              setIndexedImageInCenter((indexedImageInCenter) => indexedImageInCenter + 1);
            },
          }}
        />
      </div>
      <div className="flex items-center gap-[3.75rem]">
        {images.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="relative h-[31.875rem] w-[19.625rem] rounded-lg" key={idx}>
            <div className="absolute top-[0.6875rem] left-3 flex items-center gap-2.5">
              <ClockIcon />
              <span>1hr 14mins</span>
            </div>
            <div className="absolute top-[0.6875rem] right-3">
              <Badge type={idx % 2 ? 'limited' : 'new'} />
            </div>
            <img src={category} alt="p" className="h-[23.625rem] w-full" />
            <div className="absolute bottom-0 z-10 flex h-[8.25rem] w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10">
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
