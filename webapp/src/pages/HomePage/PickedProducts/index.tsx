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
    <section className="my-40">
      <div className="flex items-center justify-between">
        <div className="mb-10">
          <p className="text-[1.75rem] font-normal leading-[2.125rem]">
            Dive into Our Handpicked Selection
          </p>
          <p className="text-sm uppercase">
            Featured Products with Unmatched Style and Exciting Bidding Opportunities
          </p>
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
      <div className="flex min-w-min items-center gap-[3.75rem] overflow-hidden">
        {images.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="relative h-[31.875rem] w-[19.625rem] rounded" key={idx}>
            <div className="absolute top-[0.6875rem] flex w-full items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <ClockIcon />
                <span className="text-xxs font-normal">1hr 14mins</span>
              </div>
              <Badge type={idx % 2 ? 'limited' : 'new'} />
            </div>
            <img src={category} alt="p" className="h-[18.5rem] w-full rounded-t" />
            <div className="h-[13.375rem] rounded-b bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10 px-3 py-4">
              <div className="flex items-center justify-between">
                <span className="inline-block text-lg font-normal uppercase">metropo chic</span>
                <section className="w-min">
                  <span className="inline-block text-xs font-normal text-primary-neutral">
                    Current&nbsp;Price
                  </span>
                  <span className="inline-block font-normal">£ 550.00</span>
                </section>
              </div>
              <p className="mt-3 mb-6 text-xs text-white/60">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, consectetur.
              </p>
              <div className="flex gap-4">
                <Button
                  text="Make A Bid"
                  theme="ghost"
                  roundedBorders="md"
                  className="h-12 w-32 text-xs"
                  size="custom"
                  fontWeight="semibold"
                />
                <Button
                  text="Buy Now"
                  theme="light"
                  roundedBorders="md"
                  className="h-12 w-44 text-xs"
                  size="custom"
                  fontWeight="semibold"
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default PickedProducts;
