import axios from 'axios';
import { ProductData } from '../types';

interface UseProductsReturn {
  data: ProductData[];
}

interface UseProductByIdReturn {
  response: ProductData;
}

export const useProducts = async (): Promise<UseProductsReturn> => {
  const response = await axios('http://localhost:8000/products')
    .then((response) => response.data)
    .catch((err) => console.log(err));
  console.log(response, 'response');
  const data: ProductData[] = Object.values(response);

  return { data };
};

export const useProductById = async (productid: string): Promise<ProductData> => {
  const response = await axios(`http://localhost:8000/products/${productid}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return response;
};
