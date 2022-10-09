export interface Stock {
  small: number;
  medium: number;
  large: number;
  extralarge: number;
}
export interface MockData {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: Stock;
}

export type ProductInfoValues = {
  product: MockData | null;
  price: number | null;
  selectedSize: string | null;
};

export type ProductContextData = {
  productInfo: ProductInfoValues | null;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductInfoValues | null>>;
};
