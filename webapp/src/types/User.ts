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
