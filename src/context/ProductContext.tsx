import React, { createContext, useState, useMemo, useEffect, ReactElement } from 'react';
import { ProductContextData, ProductInfoValues } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const ProductContext = createContext<ProductContextData | null>(null);

export const ProductContextProvider = ({ children }: ProductContextProviderProps): ReactElement => {
  const [productInfo, setProductInfo] = useState<ProductInfoValues | null>({
    product: null,
    price: null,
    selectedSize: null,
  });

  useEffect(() => {
    const retreviedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
    const parsedData = JSON.parse(retreviedProductInfo) as ProductInfoValues;
    // Checks whether all data is truthy or not.
    const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

    if (truthyDataParsed) {
      return setProductInfo(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedProductInfo', JSON.stringify(productInfo));
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
