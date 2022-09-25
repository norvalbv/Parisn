import axios from 'axios';
import { MockData } from '../../../server/index';

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
  console.log(data);

  // const temp = t.findIndex((x) => x.id === productid);

  return { data };
};
