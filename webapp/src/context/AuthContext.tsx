import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { createContext, useMemo } from 'react';

const poolData = {
  UserPoolId: 'eu-west-2_cuz8GIlYg',
  ClientId: '3gh7ll3fdvsq6nh642g06emka6',
};

const userPool = new CognitoUserPool(poolData);

const AuthContext = createContext({});

type AccountProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: AccountProps) => {
  const login = async (Username: string, Password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('on succ', data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error('on fail', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new', data);
          resolve(data);
        },
      });
    });
  };

  const value = useMemo(() => ({ login }), [login]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
