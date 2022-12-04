export interface Stock {
  Small: number;
  Medium: number;
  Large: number;
  ExtraLarge: number;
}
export interface ProductData {
  ID: string;
  Category: String;
  Title: string;
  Description: string;
  Image: string;
  Price: number;
  Stock: Stock;
}

export interface CollectionData {
  collections: string;
  image: string;
}

export type ProductInfoValues = {
  product: ProductData | null;
  price: number | null;
  selectedSize: string | null;
};

export type ProductContextData = {
  productInfo: ProductInfoValues | null;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductInfoValues | null>>;
};

export type UserInformation = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export type UserContextInformation = {
  user: UserInformation;
  setUser: React.Dispatch<React.SetStateAction<UserInformation | null>>;
};

export type Message = {
  message: string;
  user: string;
  id: string;
  time: number;
};
