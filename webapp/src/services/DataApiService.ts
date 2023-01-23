import axios from 'axios';
import { toast } from 'react-toastify';
import { CollectionData, ContactForm, ProductData } from '../types';

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
  const response = await axios(
    `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}/${productid}`
  )
    .then((response) => response.data.Item)
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
  const response = await axios('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections')
    .then((r) => r.data.Items)
    .catch((err) => console.log(err));

  const data: CollectionData[] = Object.values(response);

  return { data };
};

type UseProductsReturn = {
  data: ProductData[];
};

/**
 * Get certain collection
 */
export const useProductsByCollection = async (collection: string): Promise<UseProductsReturn> => {
  const response = await axios(
    `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}`
  )
    .then((r) => r.data.Items)
    .catch((err) => console.log(err));
  const data: ProductData[] = Object.values(response);

  return { data };
};

/**
 * Customer Support Emails
 */
export const useCustomerSupport = (values: ContactForm) => {
  const { firstName, lastName, email, orderNumber, message } = values;
  axios
    .post('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/customer-support', {
      firstName,
      lastName,
      email,
      orderNumber,
      message,
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
