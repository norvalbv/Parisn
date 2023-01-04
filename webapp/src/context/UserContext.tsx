import { createContext, useState, useMemo, useEffect } from 'react';
import { UserContextInformation, UserInformation } from '../types';

import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const pool = new CognitoUserPool({
  UserPoolId: 'eu-west-2_tIGq5GCE6',
  ClientId: '3gh7ll3fdvsq6nh642g06emka6',
});

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(null);

  // const signUp = async (values) => {
  //   const { username, password, email } = values;
  //   try {
  //     const { user } = await Auth.signUp({
  //       username,
  //       password,
  //       attributes: {
  //         email,
  //       },
  //       autoSignIn: {
  //         // optional - enables auto sign in after user is confirmed
  //         enabled: true,
  //       },
  //     });
  //     console.log(user);
  //   } catch (error) {
  //     console.log('error signing up:', error);
  //   }
  // };

  // async function signIn() {
  //   try {
  //     const user = await Auth.signIn(username, password);
  //   } catch (error) {
  //     console.log('error signing in', error);
  //   }
  // }

  const login = async (Username: string, Password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: pool,
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

  useEffect(() => {
    const retreviedProductInfo = localStorage.getItem('userInformation');
    const parsedData: UserInformation = JSON.parse(retreviedProductInfo || 'null');

    setUser(parsedData ?? null);
  }, []);

  useEffect(() => {
    localStorage.setItem('userInformation', JSON.stringify(user));
  }, [user]);

  const memoisedValue = useMemo(
    () => ({
      user: {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        email: user?.email,
        image: user?.image,
      },
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={memoisedValue}>{children}</UserContext.Provider>;
};

export default UserContext;
