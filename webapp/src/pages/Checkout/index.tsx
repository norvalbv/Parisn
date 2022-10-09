import React from 'react';
import Button from '../../components/Button';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();
  if (!productInfo) return <></>;
  return (
    <div className="h-screen">
      <img src={productInfo.product?.image} />
      {productInfo.price}
      {productInfo.product?.title}
      <div>
        <Button
          text="Clear shopping Basket"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default Checkout;
