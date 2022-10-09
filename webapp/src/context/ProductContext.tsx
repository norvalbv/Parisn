import React, { createContext, FC, ReactElement, useState, useMemo } from 'react';
import { MockData, ProductContextData } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const ProductContext = createContext<ProductContextData | null>(null);

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [product, setProduct] = useState<MockData | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const memoisedValue = useMemo(
    () => ({
      product,
      price,
      setProduct,
      setPrice,
    }),
    [product, price]
  );

  return <ProductContext.Provider value={memoisedValue}>{children}</ProductContext.Provider>;
};

export default ProductContext;
