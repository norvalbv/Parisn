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

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const ItemView = () => {
  const [product, setproduct] = useState<ProductData>();
  const [selectedSize, setselectedSize] = useState('M');
  const [localPrice, setLocalPrice] = useState(0);

  const { user } = useUser();

  const [chatOpen, setChatOpen] = useState(false);

  const { setProductInfo } = useProduct();

  const decayRate = (N0: number, N1: number, t1: number, t0: number) => {
    // Should return a positive number.
    return Math.log(N0 / N1) / (t1 - t0);
  };

  const logScalePrice = (startTime: number, endTime: number, price: number): number => {
    /**
     *  N(t) = N0 * e^(-λ*(t-t0))
     *
     *  Where:
     *  N(t) = price at current time
     *  N0 = initial price
     *  N1 = end price
     *  t = current time
     *  t0 = start time
     *  t1 = end time
     *  λ = ln(N0/N1) / (t1 - t0)
     *  ln = natural log, (Math.log)
     */
    const currentTime = Date.now();
    const endPrice = 0.5;
    const decrease = 100;

    // The bigger the decrease, the smaller both the time elapsed AND lambda is.

    /**
     * If you have a decreased value, i.e., you have current time as 1675079435056
     * You should NOT round the value as this will input the same values to the lambda after X period
     * basically preventing the need to actually call the function every 225 MS (from useEffect)
     * leading to wasted calls etc.
     */
    const processedCurrent = currentTime / decrease;
    const processedStart = startTime / decrease;
    const processedEnd = endTime / decrease;
    /**
     *  Lambda = decay constant.
     *  The smaller the decay constant, the slower the decay rate,
     *  and the larger the decay constant, the faster the decay rate.
     */
    const lambda = decayRate(price, endPrice, processedEnd, processedStart); // λ
    const timeElapsed = processedCurrent - processedStart; // t-t0
    // the Math.exp should have an input between -7 and 0.
    const p = -lambda * timeElapsed; // -λ*(t-t0)
    const value = price * Math.exp(p);

    console.log(processedCurrent);
    return value;
  };

  useEffect(() => {
    if (!product) return;
    const timer = setInterval(() => {
      const price = logScalePrice(1675080000000, 1675100000000, product.Price);
      setLocalPrice(price <= 1 ? 0 : price);
    }, 225);
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

  if (!product) return <div>No data</div>;

  const compareSelectedVals = Object.entries(product.Stock)[
    Object.entries(product.Stock).findIndex((x) =>
      selectedSize.toLowerCase() === 'xl'
        ? x[0].slice(0, 1).toLowerCase() === 'e'
        : x[0].slice(0, 1).toLowerCase() === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <div className="relative overflow-auto scroll-smooth">
      <img src={product.Image} alt={product.Image} className="h-screen w-[40%] sticky top-0" />
      <div className="absolute right-0 top-0 w-[60%]">
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
            {Number(localPrice.toFixed(1)) <= 0 ? (
              'FREE'
            ) : (
              <>
                <p>Price: £{localPrice.toFixed(2)}</p>
                <progress
                  className="progress progress-accent w-56 rounded-full bg-secondary-blueGreen my-6 outline outline-offset-4 outline-1"
                  value={localPrice / 10}
                  max="100"
                />
              </>
            )}
            <div className="italic underline underline-offset-8 text-sm mb-6">
              End Date: {convertToDate(product.EndTime)}
            </div>
            <Button
              text="Buy Now"
              hoveredText={`Buy at £${localPrice.toFixed(2)}`}
              rounded="lg"
              navigateTo="/checkout"
              onClick={() => {
                setProductInfo({
                  product,
                  price: Number(localPrice.toFixed(2)),
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
    </div>
  );
};

export default React.memo(ItemView);
