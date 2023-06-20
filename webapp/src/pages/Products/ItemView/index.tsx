import React, { ReactElement, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Button from 'components/Button';
import LiveViewers from 'components/LiveViewers';
import ProductSizes from 'components/ProductSizes';
import { useCheckout, useProductById } from 'services/DataApiService';
import useProduct from 'hooks/useProduct';
import Chat from 'components/Chat';
import convertToDate from 'utils/convertToDate';
import useUser from 'hooks/useUser';
import Loading from 'components/Loading';
import { logScalePrice } from 'utils/currentPrice';
import ProgressBar from 'components/Progressbar';
import Carousel from 'components/Carousel';
import { useDrawer } from 'hooks/useDrawer';
import { DASHBOARD_IMAGE, PRODUCT_1_IMAGE } from 'constants/index';

const socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const ItemView = (): ReactElement => {
  const { openDrawer } = useDrawer();
  const [selectedSize, setselectedSize] = useState('M');
  const [localPrice, setLocalPrice] = useState<number>();

  const { user } = useUser();

  const { setProductInfo } = useProduct();

  const { startCheckout } = useCheckout();

  const location = useLocation();
  const currentProduct = location.pathname;

  const { data } = useProductById({
    collection: currentProduct.split('/').slice(2)[0],
    productid: currentProduct.split('/').slice(-1)[0],
  });

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      const price = logScalePrice(data.startTime, data.endTime, data.price);
      setLocalPrice(price <= 1 ? 0 : price);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  // join room
  socket.emit('join room', currentProduct);

  if (!data) return <Loading />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const compareSelectedVals: number = Object.entries(data.stock)[
    Object.entries(data.stock).findIndex((x: [string, number]) =>
      selectedSize.toLowerCase() === 'xl'
        ? x[0].slice(0, 1).toLowerCase() === 'e'
        : x[0].slice(0, 1).toLowerCase() === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <>
      <div className="float-left h-screen w-[40%]">
        <Carousel
          images={[DASHBOARD_IMAGE, PRODUCT_1_IMAGE, data.image, DASHBOARD_IMAGE, DASHBOARD_IMAGE]}
        />
      </div>
      <div className="float-right h-screen w-[60%] overflow-auto scroll-smooth scrollbar-none">
        <div className="relative flex">
          <div
            id="product-overview"
            className="mx-auto flex h-screen flex-col items-center justify-center gap-4 tracking-wider"
          >
            <h2 className="text-3xl underline underline-offset-8">{data.title}</h2>
            <div className="my-4 w-full text-center">
              {!localPrice && localPrice !== 0 ? (
                <>
                  <p>price: £{data.price}</p>
                  <ProgressBar value={100} />
                </>
              ) : localPrice <= 1 ? (
                'FREE'
              ) : (
                <>
                  <p>price: £{localPrice.toFixed(2)}</p>
                  <ProgressBar value={localPrice / 10} />
                </>
              )}
            </div>
            <Button
              text="Buy Now"
              hoveredText={`Buy at £${(localPrice || data.price).toFixed(2)}`}
              roundedBorders="lg"
              onClick={(): void => {
                setProductInfo({
                  product: data,
                  price: Number((localPrice || data.price).toFixed(2)),
                  selectedSize,
                });

                const processedProduct = { ...data, selectedSize };
                startCheckout({ user, product: processedProduct });
              }}
            />
            <ProductSizes
              classes="mb-4"
              selectedSize={selectedSize}
              sizes={data.stock}
              onClick={(size): void => setselectedSize(size)}
            />
            <p className={`text-sm ${compareSelectedVals ? '-mb-1 -mt-2' : 'my-1'}`}>
              {compareSelectedVals ? `${compareSelectedVals}: left in stock` : null}
            </p>
            <a className="text-xs hover:text-secondary-neutral hover:underline" href="#description">
              View Description
            </a>
            <div
              className="absolute bottom-0 mx-auto my-2 grid w-full max-w-xs grid-cols-3 gap-1 rounded bg-gray-700 p-1 text-xxs"
              role="group"
            >
              <button
                type="button"
                className="rounded-lg px-5 py-1.5 font-medium hover:bg-gray-500"
              >
                <LiveViewers pageParams={currentProduct} />
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-1.5 font-medium hover:bg-gray-500"
              >
                End: {convertToDate(data.endTime, false, { type: 'short' })}
              </button>
              <button
                className="rounded-lg px-5 py-1.5 font-medium hover:bg-gray-500"
                type="button"
                onClick={(): void => openDrawer('Chat')}
              >
                Open chat
              </button>
            </div>
          </div>

          <Chat pageParams={currentProduct} />
        </div>
        <div
          id="description"
          className="mx-auto flex h-screen w-3/5 flex-col items-center justify-center gap-4 text-center leading-10 tracking-wider"
        >
          <p className="underline">Product Description</p>
          <p className="my-6 font-light">{data.description}</p>
          <a className="hover:text-secondary-neutral hover:underline" href="#product-overview">
            Back
          </a>
        </div>
      </div>
    </>
  );
};

export default React.memo(ItemView);
