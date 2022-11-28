import axios from 'axios';
import { CollectionData, ProductData } from '../types';

interface UseProductsReturn {
  data: ProductData[];
}

/**
 * Get individual products
 */
export const useProducts = async (): Promise<UseProductsReturn> => {
  const response = await axios('http://localhost:8000/products')
    .then((response) => response.data)
    .catch((err) => console.log(err));
  console.log(response, 'response');
  const data: ProductData[] = Object.values(response);

  return { data };
};

type ProductByIDProps = {
  collection: string;
  productid: string;
};

/**
 * Get individual products
 */
export const useProductById = async ({
  collection,
  productid,
}: ProductByIDProps): Promise<ProductData> => {
  console.log(collection, productid);
  const response = await axios(`http://localhost:8000/products/${collection}/${productid}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return response;
};

type UseCollectionsReturnType = {
  data: CollectionData[];
};

/**
 * Get all collections
 */
export const useCollections = async (): Promise<UseCollectionsReturnType> => {
  const response = await axios('http://localhost:8000/products/collections')
    .then((response) => response.data)
    .catch((err) => console.log(err));
  const data: CollectionData[] = Object.values(response);

  return { data };
};

/**
 * Get certain collection
 */
export const useProductsByCollection = async (collection: string): Promise<UseProductsReturn> => {
  const response = await axios(`http://localhost:8000/collection/${collection}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  const data: ProductData[] = Object.values(response);

  return { data };
};
