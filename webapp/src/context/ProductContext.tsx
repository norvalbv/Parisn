import React, { createContext, useState, useMemo, useEffect } from 'react';
import { MockData, ProductContextData, ProductInfoValues } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const ProductContext = createContext<ProductContextData | null>(null);

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [productInfo, setProductInfo] = useState<ProductInfoValues | null>({
    product: null,
    price: null,
    selectedSize: null,
  });

  useEffect(() => {
    if (productInfo) {
      localStorage.setItem('savedProductInfo', JSON.stringify(productInfo));
    }

    if (!productInfo) {
      const retreviedProductInfo = localStorage.getItem('savedProductInfo');
      retreviedProductInfo && setProductInfo(JSON.parse(retreviedProductInfo));
    }
  }, [productInfo]);

  const memoisedValue = useMemo(
    () => ({
      productInfo,
      setProductInfo,
    }),
    [productInfo]
  );

  return <ProductContext.Provider value={memoisedValue}>{children}</ProductContext.Provider>;
};

export default ProductContext;
