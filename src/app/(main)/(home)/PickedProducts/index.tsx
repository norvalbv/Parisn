'use client';

import React, { ReactElement, useRef, useState } from 'react';
import Button from '@/src/components/Button';
import ClockIcon from '@/src/components/SVG/ClockIcon';
import NavigationArrows from '@/src/components/NavigationArrows';
import { products } from '@/src/__mocks__/dataApiMock';
import Loader from '@/src/components/Loading';
import { timeLeft } from '@/lib/utils/timeLeft';
import { logScalePrice } from '@/lib/utils/currentPrice';
import useProduct from '@/src/hooks/useProduct';
import useInterval from '@/src/hooks/useInterval';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const PickedProducts = (): ReactElement => {
  const [indexedImageInCenter, setIndexedImageInCenter] = useState(0);
  const router = useRouter();
  const { setProductInfo } = useProduct();
  const ref = useRef<HTMLDivElement>(null);
  const containerWidth = ref.current?.offsetWidth || 0;

  const data = products;
  const processedData = data.filter((product) => Object.values(product.metaData).some(Boolean));

  const [productsData, setProductsData] = useState(
    processedData.map((product) => ({
      ...product,
      timeLeft: timeLeft(product.endTime),
      currentPrice: logScalePrice(product.startTime, product.endTime, product.price).toFixed(2),
    }))
  );

  useInterval(() => {
    if (!processedData.length) return;
    setProductsData(
      productsData.map((product) => ({
        ...product,
        timeLeft: timeLeft(product.endTime),
        currentPrice: logScalePrice(product.startTime, product.endTime, product.price).toFixed(2),
      }))
    );
  }, 1000);

  if (!data) return <Loader />;

  return (
    <section className="my-10 overflow-hidden px-4 sm:my-20 md:my-40 md:px-8">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center justify-between sm:mb-12 md:mb-16 md:flex-row">
        <div className="mb-6 text-center md:mb-0 md:text-left">
          <h3 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Handpicked Selection
          </h3>
          <p className="text-[10px] font-medium uppercase tracking-wider text-primary-neutral/80 sm:text-xs">
            Curated Luxury Pieces
          </p>
        </div>
        <NavigationArrows
          leftArrow={{
            className: !indexedImageInCenter
              ? 'opacity-30'
              : 'cursor-pointer hover:scale-105 transition-transform',
            fill: !indexedImageInCenter ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (!indexedImageInCenter) return;
              setIndexedImageInCenter((prev) => prev - 1);
            },
          }}
          rightArrow={{
            className:
              indexedImageInCenter === processedData.length - 1
                ? 'opacity-30'
                : 'cursor-pointer hover:scale-105 transition-transform',
            fill: indexedImageInCenter === processedData.length - 1 ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (indexedImageInCenter === processedData.length - 1) return;
              setIndexedImageInCenter((prev) => prev + 1);
            },
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <div
          className={clsx(
            'flex min-w-min items-center gap-4 transition-all duration-500 sm:gap-6 md:gap-8'
          )}
          style={{
            transform: `translateX(-${indexedImageInCenter * (containerWidth + 16)}px)`,
          }}
        >
          {productsData.map((product) => (
            <section
              className="group relative h-[24rem] w-[100vw] rounded-2xl border border-white/10 bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10 backdrop-blur-sm transition-all hover:border-white/20 sm:h-[28rem] sm:w-[18rem] md:h-[32rem] md:w-[20rem]"
              key={product.id}
              ref={ref}
            >
              <div className="absolute top-2 z-10 flex w-full items-center justify-between px-3 sm:top-4 sm:px-4">
                <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur-md sm:gap-2 sm:px-3 sm:py-1.5">
                  <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] font-semibold sm:text-xs">{product.timeLeft}</span>
                </div>
              </div>
              <div className="relative h-[14rem] overflow-hidden rounded-t-2xl sm:h-[16rem] md:h-[18rem]">
                <img
                  src={product.image}
                  alt={product.id}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-wide sm:text-base">
                    {product.title}
                  </h4>
                  <div className="text-right">
                    <span className="mb-0.5 block text-[10px] font-medium text-primary-neutral/80 sm:mb-1 sm:text-xs">
                      Current price
                    </span>
                    <span className="text-lg font-semibold tracking-wide sm:text-xl">
                      {Number(product.currentPrice) < 0.5 ? 'FREE' : `£${product.currentPrice}`}
                    </span>
                  </div>
                </div>
                <p className="line-clamp-2 text-xs font-normal text-primary-neutral/70 sm:text-sm">
                  {product.description}
                </p>
                <div className="flex gap-2 pt-1 sm:gap-3 sm:pt-2">
                  <Button
                    className="h-8 w-full text-[10px] font-medium hover:bg-white/5 sm:h-10 sm:text-xs"
                    onClick={(): void =>
                      router.push(`/collections/${product.collection}/${product.id}`)
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    className="h-8 w-full text-[10px] font-medium sm:h-10 sm:text-xs"
                    onClick={(): void => {
                      setProductInfo({
                        product,
                        price: Number(product.currentPrice),
                        selectedSize: 'm',
                      });
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PickedProducts;
