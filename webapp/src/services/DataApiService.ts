import { ApiResponse } from 'types/api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import useRequest from '../hooks/useRequest';
import { CollectionData, ContactForm, FullUserInformation, ProductData } from '../types';

type ProductByIDProps = {
  collection: string;
  productid: string;
};

type ProductApiResponse = ApiResponse<ProductData>;
/**
 * Get individual products
 */
export const useProductById = ({ collection, productid }: ProductByIDProps): ProductApiResponse => {
  const uri = `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}/${productid}`;

  return useRequest<ProductData>({ uri });
};

// This is temporary until API gets fixed.
type UseCollectionsReturnType = {
  $metadata: { [key: string]: string };
  Items: CollectionData[];
  Count: number;
  ScannedCount: number;
};

type CollectionsApiResponse = ApiResponse<CollectionData[]>;

/**
 * Get all collections
 */
export const useCollections = (): CollectionsApiResponse => {
  const uri = 'https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections';

  const {
    data: unprocessedData,
    error,
    isLoading,
    isValidating,
  } = useRequest<UseCollectionsReturnType>({ uri });

  // This is temporary until API gets fixed.
  const data: CollectionData[] = Object.values(unprocessedData?.Items || []);

  return { data, error, isLoading, isValidating };
};

// This is temporary until API gets fixed.
type UseProductsReturn = {
  $metadata: { [key: string]: string };
  Items: ProductData[];
  Count: number;
  ScannedCount: number;
};

type ProductsApiResponse = ApiResponse<ProductData[]>;

/**
 * Get certain collection
 */
export const useProductsByCollection = (collection: string): ProductsApiResponse => {
  const uri = `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}`;

  const {
    data: unprocessedData,
    error,
    isLoading,
    isValidating,
  } = useRequest<UseProductsReturn>({ uri });

  // This is temporary until API gets fixed.
  const data: ProductData[] = Object.values(unprocessedData?.Items || []);

  return { data, error, isLoading, isValidating };
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
      }
    });
};
