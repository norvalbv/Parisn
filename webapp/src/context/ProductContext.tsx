import React, { createContext, useState, useMemo, useEffect } from 'react';
import { MockData, ProductContextData } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const ProductContext = createContext<ProductContextData | null>(null);

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [product, setProduct] = useState<MockData | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (product && price) {
      localStorage.setItem('savedProduct', JSON.stringify(product));
      localStorage.setItem('savedPrice', JSON.stringify(price));
      localStorage.setItem('savedSize', JSON.stringify(selectedSize));
    }

    if (!product && !price) {
      const retreviedProduct = localStorage.getItem('savedProduct');
      const retreviedPrice = localStorage.getItem('savedPrice');
      const retreviedSize = localStorage.getItem('savedSize');
      retreviedProduct && setProduct(JSON.parse(retreviedProduct));
      retreviedPrice && setPrice(JSON.parse(retreviedPrice));
      retreviedSize && setSelectedSize(JSON.parse(retreviedSize));
    }
  }, [product, price]);

  const memoisedValue = useMemo(
    () => ({
      product,
      price,
      selectedSize,
      setProduct,
      setPrice,
      setSelectedSize,
    }),
    [product, price]
  );

  return <ProductContext.Provider value={memoisedValue}>{children}</ProductContext.Provider>;
};

export default ProductContext;
