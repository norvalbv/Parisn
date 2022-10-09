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

export type ProductContextData = {
  product: MockData | null;
  price: number | null;
  selectedSize: string | null;
  setProduct: React.Dispatch<React.SetStateAction<MockData | null>>;
  setPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedSize: React.Dispatch<React.SetStateAction<string | null>>;
};
