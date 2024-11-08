//@ts-nocheck

import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse, CollectionData, FullUserInformation, ProductData } from '../types';
import { collections, products } from '@/src/__mocks__/dataApiMock';
import { useRouter } from 'next/navigation';

type ProductByIDProps = {
  collection: string;
  productid: string;
};

type UseProductReturn = {
  $metadata: { [key: string]: string };
  Item: ProductData;
  Count: number;
  ScannedCount: number;
};

type ProductApiResponse = ApiResponse<ProductData>;
/**
 * Get individual products
 */
export const useProductById = ({ collection, productid }: ProductByIDProps): ProductApiResponse => {
  const uri = `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}/${productid}`;

  // const {
  //   data,
  //   error,
  //   isLoading,
  //   isValidating,
  // } = useRequest<UseProductReturn>({ uri });

  // const processedData = data?.Item;

  const isValidating = false;
  const isLoading = false;
  const error = undefined;
  const processedData = products.filter((product) => product.id === productid)[0];

  return { data: processedData, error, isLoading, isValidating };
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

  // const {
  //   data: unprocessedData,
  //   error,
  //   isLoading,
  //   isValidating,
  // } = useRequest<UseCollectionsReturnType>({ uri });

  // // This is temporary until API gets fixed.
  // // TODO: Fix.
  // const data: CollectionData[] = Object.values(unprocessedData?.Items || []);

  // const processedData = data.length === 0 ? undefined : data;

  const isValidating = false;
  const isLoading = false;
  const error = undefined;
  const processedData = collections;

  return { data: processedData, error, isLoading, isValidating };
};

// This is temporary until API gets fixed.
type UseCollectionReturn = {
  $metadata: { [key: string]: string };
  Items: ProductData[];
  Count: number;
  ScannedCount: number;
};

type CollectionApiReturn = ApiResponse<ProductData[]>;

/**
 * Get certain collection
 */
export const useCollection = (collection: string): CollectionApiReturn => {
  const uri = `https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/collections/${collection}`;

  // const {
  //   data: unprocessedData,
  //   error,
  //   isLoading,
  //   isValidating,
  // } = useRequest<UseCollectionReturn>({ uri });

  // // This is temporary until API gets fixed.
  // // TODO: Fix
  // const data: ProductData[] = Object.values(unprocessedData?.Items || []);

  // const processedData = data.length === 0 ? undefined : data;

  const isValidating = false;
  const isLoading = false;
  const error = undefined;
  const processedData = products.filter((product) => product.collection === collection);

  return { data: processedData, error, isLoading, isValidating };
};

interface FullProductData extends ProductData {
  selectedSize: string;
}

type StartCheckoutProps = {
  user: FullUserInformation | null;
  product: FullProductData;
};

type UseCheckoutResponse = {
  startCheckout: (props: StartCheckoutProps) => void;
};

type StartCheckoutApiResponse = {
  payment_intent_id: string;
  client_secret: string;
};

/**
 * Send Checkout Confirmation
 */
export const useCheckout = (): UseCheckoutResponse => {
  const router = useRouter();
  const startCheckout = ({ user, product }: StartCheckoutProps): void => {
    const { id, collection, selectedSize } = product;
    const checkoutid = uuidv4()
      .substring(0, 8)
      .split(' ')
      .filter((d) => d !== '-')
      .join('')
      .toString();

    console.log({
      productid: id,
      collection,
      selectedsize: selectedSize,
      checkoutid,
      user: user?.userInfo?.email,
    });
    axios
      .post('https://dlnkbdtmp6.execute-api.eu-west-2.amazonaws.com/initiate-checkout', {
        productid: id,
        collection,
        selectedsize: selectedSize,
        checkoutid,
        user: user?.userInfo?.email,
      })
      .then((res: AxiosResponse) => {
        if (typeof res.data === 'object' && 'client_secret' in res.data) {
          router.push('/checkout');
        } else if ('no price') {
          router.push('/checkout');
        } else {
          throw new Error('Client secret nor no price found in res.data');
        }
      })
      .catch((err) => {
        console.log(err);
        if (typeof err === 'string') {
          toast.warning(err);
        } else {
          toast.warning('An Error occured. Try again.');
        }
      });
  };

  return { startCheckout };
};
