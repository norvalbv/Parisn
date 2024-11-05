//@ts-nocheck

import React, { ReactElement, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Button from 'components/Button';
import LiveViewers from 'components/LiveViewers';
import ProductSizes from 'components/ProductSizes';
import { useCheckout, useProductById } from '../../../services/DataApiService';
import useProduct from '../../../hooks/useProduct';
import Chat from 'components/Chat';
import convertToDate from 'utils/convertToDate';
import useUser from '../../../hooks/useUser';
import Loader from 'components/Loading';
import { logScalePrice } from 'utils/currentPrice';
import Carousel from 'components/Carousel';
import { useDrawer } from '../../../hooks/useDrawer';
import { DASHBOARD_IMAGE, PRODUCT_1_IMAGE } from 'constants/index';
import useInterval from '../../../hooks/useInterval';
import { ProductSizes as ProductSizesType } from '../../../types';

const socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const Product = (): ReactElement => {
  const { openDrawer } = useDrawer();
  const [selectedSize, setSelectedSize] = useState<ProductSizesType>('m');
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

  useInterval(() => {
    if (!data) return;
    const price = logScalePrice(data.startTime, data.endTime, data.price);
    setLocalPrice(price <= 1 ? 0 : price);
  }, 1000);

  socket.emit('join room', currentProduct);

  if (!data) return <Loader />;

  return (
    <div className="flex h-[calc(100vh-3.125rem)] bg-[#0D0D0E]">
      {/* Image Section */}
      <section className="w-1/2 border-r border-white/10">
        <Carousel
          images={[DASHBOARD_IMAGE, PRODUCT_1_IMAGE, data.image, DASHBOARD_IMAGE, DASHBOARD_IMAGE]}
        />
      </section>

      {/* Product Details */}
      <section className="w-1/2">
        <div className="h-full overflow-auto px-16 py-20">
          {/* Header */}
          <div className="mb-16">
            <h1>{data.title}</h1>
            <div className="mt-4 flex items-center gap-8 text-white/60">
              <LiveViewers pageParams={currentProduct} />
              <p>Ends {convertToDate(data.endTime, false, { type: 'short' })}</p>
              <button
                onClick={(): void => openDrawer('Chat')}
                className="text-white/60 hover:text-white"
              >
                Open Chat
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="mb-16">
            <p className="h2">
              {!localPrice && localPrice !== 0
                ? `£${data.price}`
                : localPrice <= 1
                ? 'FREE'
                : `£${localPrice.toFixed(2)}`}
            </p>
            <div className="mt-4 h-[2px] w-full bg-white/5">
              <div
                className="h-full bg-white/20 transition-all duration-300"
                style={{
                  width: `${((localPrice || data.price) / data.price) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-16">
            <h4 className="mb-6">Select Size</h4>
            <ProductSizes
              selectedSize={selectedSize}
              sizes={data.stock}
              onClick={(size: ProductSizesType): void => setSelectedSize(size)}
            />
          </div>

          {/* Purchase Button */}
          <Button
            text="Purchase Now"
            hoveredText={`Secure for £${(localPrice || data.price).toFixed(2)}`}
            className="mb-16 w-full bg-white text-black hover:bg-white/90"
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

          {/* Description */}
          <div>
            <h4 className="mb-6">About the Product</h4>
            <p className="cta-medium-hairline text-white/70">{data.description}</p>
          </div>
        </div>

        <Chat pageParams={currentProduct} />
      </section>
    </div>
  );
};

export default Product;
