import React from 'react';
import Button from '../../components/Button';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  if (!productInfo) return <></>;

  return (
    <div className="h-screen">
      {truthyDataParsed ? (
        <>
          <img src={productInfo.product?.image} />
          <div>
            {productInfo.price}
            {productInfo.product?.title}
            {truthyDataParsed && (
              <div>
                <Button
                  text="Clear shopping Basket"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  navigateTo="/"
                />
              </div>
            )}
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
