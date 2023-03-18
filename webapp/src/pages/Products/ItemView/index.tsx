import React, { ReactElement, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
import LiveViewers from '../../../components/LiveViewers';
import ProductSizes from '../../../components/ProductSizes';
import { useCheckout, useProductById } from '../../../services/DataApiService';
import useProduct from '../../../hooks/useProduct';
import Chat from '../../../components/Chat';
import convertToDate from '../../../utils/convertToDate';
import useUser from '../../../hooks/useUser';
import Loading from '../../../components/Loading';
import { logScalePrice } from '../../../utils/currentPrice';
import { DASHBOARD_IMAGE, PRODUCT_1_IMAGE } from '../../../constants';
import ProgressBar from '../../../components/Progressbar';
import Carousel from '../../../components/Carousel';
import { useDrawer } from '../../../hooks/useDrawer';

const socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const ItemView = (): ReactElement => {
  const { openDrawer } = useDrawer();
  const [selectedSize, setselectedSize] = useState('M');
  const [localPrice, setLocalPrice] = useState<number>();

  const { user } = useUser();

  const { setProductInfo } = useProduct();

  const { sendCheckout } = useCheckout();

  const location = useLocation();
  const currentProduct = location.pathname;

  const { data } = useProductById({
    collection: currentProduct.split('/').slice(2)[0],
    productid: currentProduct.split('/').slice(-1)[0],
  });

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      const price = logScalePrice(data.StartTime, data.EndTime, data.Price);
      setLocalPrice(price <= 1 ? 0 : price);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  // join room
  socket.emit('join room', currentProduct);

  if (!data) return <Loading />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const compareSelectedVals: number = Object.entries(data.Stock)[
    Object.entries(data.Stock).findIndex((x: [string, number]) =>
      selectedSize.toLowerCase() === 'xl'
        ? x[0].slice(0, 1).toLowerCase() === 'e'
        : x[0].slice(0, 1).toLowerCase() === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <>
      <div className="w-[40%] h-screen float-left">
        <Carousel
          images={[DASHBOARD_IMAGE, PRODUCT_1_IMAGE, data.Image, DASHBOARD_IMAGE, DASHBOARD_IMAGE]}
        />
      </div>
      <div className="w-[60%] h-screen float-right overflow-auto scroll-smooth scrollbar-none">
        <div className="flex relative">
          <div
            id="product-overview"
            className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider"
          >
            <h2 className="text-3xl underline-offset-8 underline">{data.Title}</h2>
            {!localPrice && localPrice !== 0 ? (
              <div className="my-4">
                <p>Price: £{data.Price}</p>
                <ProgressBar value={100} />
              </div>
            ) : localPrice <= 1 ? (
              'FREE'
            ) : (
              <div className="my-4">
                <p>Price: £{localPrice.toFixed(2)}</p>
                <ProgressBar value={localPrice / 10} />
              </div>
            )}
            <Button
              text="Buy Now"
              hoveredText={`Buy at £${(localPrice || data.Price).toFixed(2)}`}
              rounded="lg"
              navigateTo="/checkout"
              navigationState={data.ID}
              onClick={(): void => {
                setProductInfo({
                  data,
                  price: Number((localPrice || data.Price).toFixed(2)),
                  selectedSize,
                });

                const processedProduct = { ...data, selectedSize };
                sendCheckout({ user, product: processedProduct });
              }}
            />
            <ProductSizes
              classes="mb-4"
              selectedSize={selectedSize}
              sizes={data.Stock}
              onClick={(size): void => setselectedSize(size)}
            />
            <p className={`text-sm ${compareSelectedVals ? '-mt-2 -mb-1' : 'my-1'}`}>
              {compareSelectedVals ? `${compareSelectedVals}: left in stock` : null}
            </p>
            <a className="hover:underline text-xs hover:text-secondary-neutral" href="#description">
              View Description
            </a>
            <div
              className="absolute bottom-0 w-full grid max-w-xs grid-cols-3 text-xxs gap-1 p-1 mx-auto my-2 rounded bg-gray-700"
              role="group"
            >
              <button
                type="button"
                className="px-5 py-1.5 font-medium hover:bg-gray-500 rounded-lg"
              >
                <LiveViewers pageParams={currentProduct} />
              </button>
              <button
                type="button"
                className="px-5 py-1.5 font-medium hover:bg-gray-500 rounded-lg"
              >
                End: {convertToDate(data.EndTime, false, { type: 'short' })}
              </button>
              <button
                className="px-5 py-1.5 font-medium hover:bg-gray-500 rounded-lg"
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
          className="flex flex-col justify-center items-center mx-auto gap-4 tracking-wider text-center w-3/5 leading-10 h-screen"
        >
          <p className="underline">Product Description</p>
          <p className="my-6 font-light">{data.Description}</p>
          <a className="hover:text-secondary-neutral hover:underline" href="#product-overview">
            Back
          </a>
        </div>
      </div>
    </>
  );
};

export default React.memo(ItemView);
