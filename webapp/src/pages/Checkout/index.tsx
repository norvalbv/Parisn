import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  const [hovered, setHovered] = useState(false);

  if (!productInfo) return <></>;

  return (
    <div className="h-screen">
      {truthyDataParsed ? (
        <>
          <img src={productInfo.product?.image} />
          <div>
            {productInfo.price}
            {productInfo.product?.title}
            {truthyDataParsed && !hovered ? (
              <Button text="Clear shopping Basket" onClick={() => setHovered(true)} />
            ) : (
              <Button
                text="Are you sure?"
                onClick={() => {
                  localStorage.clear();
                  setHovered(false);
                }}
                onMouseLeave={() => {
                  console.log('called');
                  setHovered(false);
                }}
                navigateTo="/"
              />
            )}
            <p>
              Note: If you clear your basket, you will not be able to add anything new for 60
              seconds
            </p>
          </div>
        </>
      ) : (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center text-xl">
          Basket Empty
          <Button text="Continue Shopping" navigateTo="/catalogue" />
        </div>
      )}
    </div>
  );
};

export default Checkout;
