import React from 'react';
import Button from '../../components/Button';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();
  console.log(productInfo);

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  if (!productInfo || !truthyDataParsed) return <></>;

  return (
    <div className="h-screen">
      <img src={productInfo.product?.image} />
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
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
