import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import LiveViewers from '../../../components/LiveViewers';
import ProductSizes from '../../../components/ProductSizes';
import { useCheckout, useProductById } from '../../../services/DataApiService';
import { ProductData } from '../../../types';
import useProduct from '../../../hooks/useProduct';
import Chat from '../../../components/Chat';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import convertToDate from '../../../utils/convertToDate';
import useUser from '../../../hooks/useUser';
import Loading from '../../../components/Loading';
import { logScalePrice } from '../../../utils/currentPrice';
import Gallery from '../../../components/Gallery';
import { DASHBOARD_IMAGE, PRODUCT_1_IMAGE } from '../../../constants';
import { Progress } from 'flowbite-react';
import ProgressBar from '../../../components/Progressbar';
import Carousel from '../../../components/Carousel';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const ItemView = () => {
  const [product, setproduct] = useState<ProductData>();
  const [selectedSize, setselectedSize] = useState('M');
  const [localPrice, setLocalPrice] = useState<number>(200);

  const { user } = useUser();

  const [chatOpen, setChatOpen] = useState(false);

  const { setProductInfo } = useProduct();

  useEffect(() => {
    if (!product) return;
    const timer = setInterval(() => {
      const price = logScalePrice(product.StartTime, product.EndTime, product.Price);
      // setLocalPrice(price <= 1 ? 0 : price);
    }, 1000);
    return () => clearInterval(timer);
  }, [product]);

  const location = useLocation();
  const currentProduct = location.pathname;

  // join room
  socket.emit('join room', currentProduct);

  useEffect(() => {
    (async () => {
      const data = await useProductById({
        collection: currentProduct.split('/').slice(2)[0],
        productid: currentProduct.split('/').slice(-1)[0],
      });

      setproduct(data);
    })();
  }, []);

  if (!product) return <Loading />;

  const compareSelectedVals = Object.entries(product.Stock)[
    Object.entries(product.Stock).findIndex((x) =>
      selectedSize.toLowerCase() === 'xl'
        ? x[0].slice(0, 1).toLowerCase() === 'e'
        : x[0].slice(0, 1).toLowerCase() === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <>
      <div className="w-[40%] h-screen float-left">
        {/* <Gallery
          images={[
            DASHBOARD_IMAGE,
            PRODUCT_1_IMAGE,
            product.Image,
            DASHBOARD_IMAGE,
            DASHBOARD_IMAGE,
          ]}
        /> */}
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
      <div className="w-[60%] h-screen float-right overflow-auto scroll-smooth">
        <div className="flex relative">
          <div
            id="product-overview"
            className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider"
          >
            <span className="text-xl drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
              {product.Title}
            </span>
            <a className="hover:underline hover:text-secondary-neutral" href="#description">
              View Description
            </a>
            {!localPrice && localPrice !== 0 ? (
              <>
                <p>Price: £{product.Price}</p>
                <ProgressBar value={100} />
              </>
            ) : localPrice <= 1 ? (
              'FREE'
            ) : (
              <>
                <p>Price: £{localPrice.toFixed(2)}</p>
                <ProgressBar value={localPrice / 10} />
              </>
            )}
            <div className="italic underline underline-offset-8 text-sm mb-6">
              End Date: {convertToDate(product.EndTime)}
            </div>
            <Button
              text="Buy Now"
              hoveredText={`Buy at £${(localPrice || product.Price).toFixed(2)}`}
              rounded="lg"
              navigateTo="/checkout"
              onClick={() => {
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
              onClick={(size) => setselectedSize(size)}
            />
            <p className={`text-sm ${compareSelectedVals ? '-mt-2 -mb-1' : 'my-1'}`}>
              {compareSelectedVals ? `${compareSelectedVals}: left in stock` : null}
            </p>
            <LiveViewers pageParams={currentProduct} />
          </div>

          {chatOpen ? (
            <Chat
              onclick={() => setChatOpen(!chatOpen)}
              pageParams={currentProduct}
              isOpen={chatOpen}
            />
          ) : (
            <Button
              text="Open Chat"
              width="8rem"
              size="xs"
              borderRequired="none"
              hoverColorRequired={false}
              onClick={() => setChatOpen(!chatOpen)}
              classes="hover:scale-105 transition-all -rotate-90 right-0 top-1/2 z-40 underline underline-offset-8"
              positioning="absolute"
            />
          )}
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
