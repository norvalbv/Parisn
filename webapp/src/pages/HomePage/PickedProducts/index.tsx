import React, { ReactElement, useRef, useState } from 'react';
import Button from 'components/Button';
import ClockIcon from 'components/SVG/ClockIcon';
import Badge from 'components/Badge';
import NavigationArrows from 'components/NavigationArrows';
import classNames from 'utils/classNames';
import { products } from '__mocks__/dataApiMock';
import Loader from 'components/Loading';
import { timeLeft } from 'utils/timeLeft';
import { logScalePrice } from 'utils/currentPrice';
import useProduct from 'hooks/useProduct';
import useInterval from 'hooks/useInterval';
import { useNavigate } from 'react-router-dom';
// import { useCheckout } from 'services/DataApiService';

const PickedProducts = (): ReactElement => {
  const [indexedImageInCenter, setIndexedImageInCenter] = useState(0);
  const navigate = useNavigate();

  const { setProductInfo } = useProduct();
  // const { startCheckout } = useCheckout();

  const ref = useRef<HTMLDivElement>(null);
  const containerWidth = ref.current?.offsetWidth || 0;

  const data = products;
  const processedData = data.filter((product) => Object.values(product.metaData).some(Boolean));

  const [productsData, setProductsData] = useState(
    processedData.map((product) => {
      return {
        ...product,
        timeLeft: timeLeft(product.endTime),
        currentPrice: logScalePrice(product.startTime, product.endTime, product.price).toFixed(2),
      };
    })
  );

  useInterval(() => {
    if (!processedData.length) return;
    setProductsData(
      productsData.map((product) => {
        return {
          ...product,
          timeLeft: timeLeft(product.endTime),
          currentPrice: logScalePrice(product.startTime, product.endTime, product.price).toFixed(2),
        };
      })
    );
  }, 1000);

  if (!data) return <Loader />;

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
            className: indexedImageInCenter === processedData.length - 3 ? '' : 'cursor-pointer',
            fill: indexedImageInCenter === processedData.length - 3 ? '#B0B0B0' : 'white',
            onClick: (): void => {
              if (indexedImageInCenter === processedData.length - 3) return;
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
        {productsData.map((product) => {
          return (
            <section
              className="relative h-[31.875rem] w-[19.625rem] rounded"
              key={product.id}
              ref={ref}
            >
              <div className="absolute top-[0.6875rem] flex w-full items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <span className="text-xxs font-normal">{product.timeLeft}</span>
                </div>
                <Badge type={product.metaData.newDrop ? 'new' : 'limited'} />
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
                      {Number(product.currentPrice) < 0.5 ? 'FREE' : `£ ${product.currentPrice}`}
                    </span>
                  </section>
                </div>
                <p className="mb-6 mt-3 h-[2.375rem] text-xs font-thin leading-[1.1875rem] text-white/60">
                  {product.description.slice(0, 68)}&nbsp;
                  {product.description.length > 68 && '...'}
                </p>
                <div className="flex gap-4">
                  <Button
                    text="View Product"
                    theme="ghost"
                    roundedBorders="md"
                    className="h-12 w-44 text-xs"
                    size="custom"
                    fontWeight="semibold"
                    onClick={(): void =>
                      navigate(`/collections/${product.collection}/${product.id}`)
                    }
                  />
                  <Button
                    text="Buy Now"
                    theme="light"
                    roundedBorders="md"
                    className="h-12 w-32 text-xs"
                    size="custom"
                    fontWeight="semibold"
                    onClick={(): void => {
                      setProductInfo({
                        product,
                        price: Number(product.currentPrice),
                        selectedSize: 'm',
                      });
                    }}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default PickedProducts;
