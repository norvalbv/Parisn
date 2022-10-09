import React from 'react';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();
  if (!productInfo) return <></>;
  return (
    <div>
      {productInfo.price}
      {productInfo.product?.title}
    </div>
  );
};

export default Checkout;
