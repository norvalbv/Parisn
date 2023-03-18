export interface Stock {
  Small: number;
  Medium: number;
  Large: number;
  ExtraLarge: number;
}
export interface ProductData {
  Category: string;
  Description: string;
  EndTime: number;
  ID: string;
  Image: string;
  Price: number;
  StartTime: number;
  Stock: Stock;
  Title: string;
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

export type CognitoPayload = {
  aud: string;
  auth_time: number;
  'cognito:username': string;
  email: string;
  email_verified: boolean;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  sub: string;
  token_use: string;
} | null;

export type FullUserInformation = {
  cognitoInfo?: CognitoPayload | null;
  userInfo: UserInformation | null;
};

export type UserContextInformation = {
  changePassword: (values: ResetPassword) => void;
  confirmSignUp: (values: VerifyAccount) => void;
  error: null | string;
  resendConfirmationCode: (arg1?: string) => void;
  forgotPassword: (arg1: { username: string }) => void;
  forgotPasswordSubmit: (values: ForgotPasswordSubmit) => void;
  signIn: (values: BasicAuth) => void;
  signOut: () => void;
  signUp: (values: Auth) => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  user: FullUserInformation;
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

export type ResetPassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ForgotPasswordSubmit = {
  username: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export type Auth = {
  email: string;
} & BasicAuth;

export type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  orderNumber?: string;
  message: string;
};

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
