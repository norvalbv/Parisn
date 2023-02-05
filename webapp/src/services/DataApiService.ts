import axios from 'axios';
import { toast } from 'react-toastify';
import { CollectionData, ContactForm, FullUserInformation, ProductData } from '../types';
import { v4 as uuidv4 } from 'uuid';

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
    .post('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/support-request', {
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

interface FullProductData extends ProductData {
  selectedSize: string;
}

type UseCheckoutProps = {
  user: FullUserInformation | null;
  product: FullProductData;
};

/**
 * Send Checkout Confirmation
 */
export const useCheckout = ({ user, product }: UseCheckoutProps) => {
  const { ID, Category, selectedSize } = product;
  const checkoutid = uuidv4()
    .substring(0, 8)
    .split(' ')
    .filter((d) => d !== '-')
    .join('')
    .toString();
  axios
    .post('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/checkout', {
      productid: ID,
      collection: Category,
      selectedsize: selectedSize,
      checkoutid,
      user: user?.userInfo?.email,
    })
    .catch((err) => {
      if (typeof err === 'string') {
        toast.warning(err);
      } else {
        toast.warning('An Error occured. Try again.');
        console.log(err.message);
      }
    });
};
