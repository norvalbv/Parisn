import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import useRequest from 'hooks/useRequest';
import { ApiResponse, CollectionData, ContactForm, FullUserInformation, ProductData } from 'types';

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

  const {
    data: unprocessedData,
    error,
    isLoading,
    isValidating,
  } = useRequest<UseProductReturn>({ uri });

  const processedData = unprocessedData?.Item;

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

  const {
    data: unprocessedData,
    error,
    isLoading,
    isValidating,
  } = useRequest<UseCollectionsReturnType>({ uri });

  // This is temporary until API gets fixed.
  // TODO: Fix.
  const data: CollectionData[] = Object.values(unprocessedData?.Items || []);

  const processedData = data.length === 0 ? undefined : data;

  return { data: processedData, error, isLoading, isValidating };
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
  // TODO: Fix
  const data: ProductData[] = Object.values(unprocessedData?.Items || []);

  const processedData = data.length === 0 ? undefined : data;

  return { data: processedData, error, isLoading, isValidating };
};

type CustomerSupportResponse = {
  sendSupportEmail: (arg: ContactForm) => void;
};

/**
 * Customer Support Emails
 */
export const useCustomerSupport = (): CustomerSupportResponse => {
  const sendSupportEmail = (values: ContactForm): void => {
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

  return { sendSupportEmail };
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
  const navigate = useNavigate();
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
          navigate('/checkout', {
            state: res.data as StartCheckoutApiResponse,
            replace: true,
          });
        } else if ('no price') {
          navigate('/checkout', {
            replace: true,
          });
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
