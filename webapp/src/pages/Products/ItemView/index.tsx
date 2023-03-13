import React, { ReactElement, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
import LiveViewers from '../../../components/LiveViewers';
import ProductSizes from '../../../components/ProductSizes';
import { useCheckout, useProductById } from '../../../services/DataApiService';
import { ProductData } from '../../../types';
import useProduct from '../../../hooks/useProduct';
import Chat from '../../../components/Chat';
import convertToDate from '../../../utils/convertToDate';
import useUser from '../../../hooks/useUser';
import Loading from '../../../components/Loading';
import { logScalePrice } from '../../../utils/currentPrice';
import { DASHBOARD_IMAGE, PRODUCT_1_IMAGE } from '../../../constants';
import ProgressBar from '../../../components/Progressbar';
import Carousel from '../../../components/Carousel';

const socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const ItemView = (): ReactElement => {
  const [product, setproduct] = useState<ProductData>();
  const [selectedSize, setselectedSize] = useState('M');
  const [localPrice, setLocalPrice] = useState<number>();

  const { user } = useUser();

  const [chatOpen, setChatOpen] = useState(false);

  const { setProductInfo } = useProduct();

  useEffect(() => {
    if (!product) return;
    const timer = setInterval(() => {
      const price = logScalePrice(product.StartTime, product.EndTime, product.Price);
      setLocalPrice(price <= 1 ? 0 : price);
    }, 1000);
    return () => clearInterval(timer);
  }, [product]);

  const location = useLocation();
  const currentProduct = location.pathname;

  // join room
  socket.emit('join room', currentProduct);

  useEffect(() => {
    (async (): Promise<void> => {
      const data = await useProductById({
        collection: currentProduct.split('/').slice(2)[0],
        productid: currentProduct.split('/').slice(-1)[0],
      });

      setproduct(data);
    })().catch(() => {});
  }, [currentProduct]);

  if (!product) return <Loading />;

  const compareSelectedVals: number = Object.entries(product.Stock)[
    Object.entries(product.Stock).findIndex((x) =>
      selectedSize.toLowerCase() === 'xl'
        ? x[0].slice(0, 1).toLowerCase() === 'e'
        : x[0].slice(0, 1).toLowerCase() === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <>
      <div className="w-[40%] h-screen float-left">
        <Carousel
          images={[
            DASHBOARD_IMAGE,
            PRODUCT_1_IMAGE,
            product.Image,
            DASHBOARD_IMAGE,
            DASHBOARD_IMAGE,
          ]}
        />
      </div>
      <div className="w-[60%] h-screen float-right overflow-auto scroll-smooth scrollbar-none">
        <div className="flex relative">
          <div
            id="product-overview"
            className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider"
          >
            <h2 className="text-3xl underline-offset-8 underline">{product.Title}</h2>
            {!localPrice && localPrice !== 0 ? (
              <div className="my-4">
                <p>Price: £{product.Price}</p>
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
              hoveredText={`Buy at £${(localPrice || product.Price).toFixed(2)}`}
              rounded="lg"
              navigateTo="/checkout"
              navigationState={product.ID}
              onClick={(): void => {
                setProductInfo({
                  product,
                  price: Number((localPrice || product.Price).toFixed(2)),
                  selectedSize,
                });

                const processedProduct = { ...product, selectedSize };
                useCheckout({ user, product: processedProduct });
              }}
            />
            <ProductSizes
              classes="mb-4"
              selectedSize={selectedSize}
              sizes={product.Stock}
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
                End: {convertToDate(product.EndTime, false, { type: 'short' })}
              </button>
              <button
                className="px-5 py-1.5 font-medium hover:bg-gray-500 rounded-lg"
                type="button"
                onClick={(): void => setChatOpen(!chatOpen)}
              >
                Open chat
              </button>
            </div>
          </div>

          <Chat
            onclick={(): void => setChatOpen(!chatOpen)}
            pageParams={currentProduct}
            isOpen={chatOpen}
          />
        </div>
        <div
          id="description"
          className="flex flex-col justify-center items-center mx-auto gap-4 tracking-wider text-center w-3/5 leading-10 h-screen"
        >
          <p className="underline">Product Description</p>
          <p className="my-6 font-light">{product.Description}</p>
          <a className="hover:text-secondary-neutral hover:underline" href="#product-overview">
            Back
          </a>
        </div>
      </div>
    </>
  );
};

export default React.memo(ItemView);
