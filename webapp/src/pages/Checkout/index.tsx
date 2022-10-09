import React from 'react';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { product, price } = useProduct();
  if (!product) return <></>;
  return (
    <div>
      {price}
      {product.title}
    </div>
  );
};

export default Checkout;
