export interface ApiError {
  status: number;
  message: { detail: string };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  /**
   * If there's a request or revalidation loading.
   */
  isValidating: boolean;
  /**
   * If there's a request loading.
   */
  isLoading: boolean;
}

export interface Stock {
  small: number;
  medium: number;
  large: number;
  extraLarge: number;
}
export interface ProductData {
  collection: string;
  description: string;
  endTime: number;
  id: string;
  image: string;
  price: number;
  startTime: number;
  stock: Stock;
  title: string;
  metaData: {
    limited: boolean;
    newDrop: boolean;
  };
}

export interface CollectionData {
  collections: string;
  image: string;
}

export type ProductInfoValues = {
  product: ProductData | null;
  price: number | null;
  selectedSize: 's' | 'm' | 'l' | 'xl' | null;
};

export type ProductContextData = {
  productInfo: ProductInfoValues | null;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductInfoValues | null>>;
};
