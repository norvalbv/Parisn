import axios from 'axios';
import { toast } from 'react-toastify';
import { CollectionData, ContactForm, ProductData } from '../types';

interface UseProductsReturn {
  data: ProductData[];
}

/**
 * Get all products
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
  const response = await axios('http://localhost:8000/collections')
    .then((response) => response.data)
    .catch((err) => console.log(err));
  const data: CollectionData[] = Object.values(response);

  return { data };
};

/**
 * Get certain collection
 */
export const useProductsByCollection = async (collection: string): Promise<UseProductsReturn> => {
  const response = await axios(`http://localhost:8000/collections/${collection}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  const data: ProductData[] = Object.values(response);

  return { data };
};

/**
 * Customer Support Emails
 */

export const useCustomerSupport = async (values: ContactForm) => {
  const { firstName, lastName, email, orderNumber, message } = values;
  await axios
    .post(`http://localhost:8000/send-support-email`, {
      data: {
        firstName,
        lastName,
        email,
        orderNumber,
        message,
      },
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      toast.success('Message sent!');
    })
    .catch((err) => {
      if (typeof err === 'string') {
        toast.warning(err);
      } else {
        toast.warning('An Error occured. Try again.');
      }
    });
};
