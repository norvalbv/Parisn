import React, { ReactElement, useRef, useState } from 'react';
import Button from 'components/Button';
import ClockIcon from 'components/SVG/ClockIcon';
import Badge from 'components/Badge';
import NavigationArrows from 'components/NavigationArrows';
import classNames from 'utils/classNames';
import { products } from '__mocks__/dataApiMock';
import Loading from 'components/Loading';
import { timeLeft } from 'utils/timeLeft';

const PickedProducts = (): ReactElement => {
  const data = products;

  if (!data) return <Loading />;

  const ref = useRef<HTMLDivElement>(null);
  const containerWidth = ref.current?.offsetWidth || 0;

  const [indexedImageInCenter, setIndexedImageInCenter] = useState(0);
  return (
    <section className="my-40">
      <div className="flex items-center justify-between">
        <div className="mb-10">
          <h3>Dive into Our Handpicked Selection</h3>
          <p className="uppercase">
            Featured Products with Unmatched Style and Exciting Bidding Opportunities
          </p>
        </div>
        <NavigationArrows
          leftArrow={{
            className: !indexedImageInCenter ? '' : 'cursor-pointer',
            fill: !indexedImageInCenter ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (!indexedImageInCenter) return;
              setIndexedImageInCenter((indexedImageInCenter) => indexedImageInCenter - 1);
            },
          }}
          rightArrow={{
            className: indexedImageInCenter === data.length - 3 ? '' : 'cursor-pointer',
            fill: indexedImageInCenter === data.length - 3 ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (indexedImageInCenter === data.length - 3) return;
              setIndexedImageInCenter((indexedImageInCenter) => indexedImageInCenter + 1);
            },
          }}
        />
      </div>
      <div
        className={classNames(
          'relative flex min-w-min items-center gap-[3.75rem] overflow-hidden transition-all duration-500'
        )}
        style={{
          left: `-${!indexedImageInCenter ? 0 : containerWidth * indexedImageInCenter + 60}px`,
        }}
      >
        {data.map((product, idx) => (
          <section
            className={classNames('relative h-[31.875rem] w-[19.625rem] rounded')}
            key={product.id}
            ref={ref}
          >
            <div className="absolute top-[0.6875rem] flex w-full items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <ClockIcon />
                {/* <span className="text-xxs font-normal">1hr 14mins</span> */}
                <span className="text-xxs font-normal">
                  {timeLeft({ start: product.startTime, end: product.endTime })}
                </span>
              </div>
              <Badge type={idx % 2 ? 'limited' : 'new'} />
            </div>
            <img
              src={product.image}
              alt={product.id}
              className="h-[18.5rem] w-full rounded-t object-cover"
            />
            <div className="h-[13.375rem] rounded-b bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10 px-3 py-4">
              <div className="flex items-center justify-between">
                <h4 className="uppercase">{product.title}</h4>
                <section className="w-min">
                  <span className="text-xs text-primary-neutral">Current&nbsp;price</span>
                  <span className="inline-block font-medium uppercase leading-[1.1875rem] tracking-[0.08rem]">
                    £&nbsp;{product.price}
                  </span>
                </section>
              </div>
              <p className="mb-6 mt-3 text-xs font-thin leading-[1.1875rem] text-white/60">
                {product.description.slice(0, 68)}&nbsp;
                {product.description.length > 68 && '...'}
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
