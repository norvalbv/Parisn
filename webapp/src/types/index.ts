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
  id: string | number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
};

export type FullUserInformation = {
  session?: null | string;
  user?: null | string;
} & UserInformation;

export type UserContextInformation = {
  error: null | string;
  signIn: (values: BasicAuth) => void;
  signOut: () => void;
  signUp: (values: Auth) => void;
  confirmSignUp: (values: VerifyAccount) => void;
  user: UserInformation;
  stage: number;
};

export type Message = {
  message: string;
  user: string;
  id: string;
  time: number;
};

export type BasicAuth = {
  username: string;
  password: string;
};

export type VerifyAccount = {
  username: string;
  code: string;
};

export type Auth = {
  email: string;
} & BasicAuth;
