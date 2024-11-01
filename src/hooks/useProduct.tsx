import { useContext } from 'react';
import ProductsContext from '@/src/context/ProductContext';
import { ProductContextData } from '@/src/types';

const useProduct = (): ProductContextData => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('Context must be use inside provider');
  }

  return context;
};

export default useProduct;
