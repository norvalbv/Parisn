import axios from 'axios';
import { MockData } from '../types';

interface UseProductByIdReturn {
  data: MockData[];
}

export const useProducts = async (): Promise<UseProductByIdReturn> => {
  const response = await axios('http://localhost:8000/products')
    .then((response) => response.data)
    .catch((err) => console.log(err));

  const data: MockData[] = Object.values(response);

  return { data };
};

export const useProductById = async (productid: string): Promise<UseProductByIdReturn> => {
  const response = await axios(`http://localhost:8000/products/${productid}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  const data: MockData[] = Object.values(response);

  // const temp = t.findIndex((x) => x.id === productid);

  return { data };
};
