import { createContext, useState, useMemo, useEffect } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { UserContextInformation, UserInformation } from '../types';

const poolData = {
  UserPoolId: 'eu-west-2_cuz8GIlYg',
  ClientId: '3gh7ll3fdvsq6nh642g06emka6',
};

// const userPool = new CognitoUserPool(poolData);

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>({
    id: '1231287312',
    firstName: 'Benji',
    lastName: 'Norval',
    username: 'BenjiTheGreat',
    email: 'benjinorval@gmail.com',
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.henley.ac.uk%2Fnews%2F2021%2Fapplied-entrepreneurship-students-seek-support-for-start-ups&psig=AOvVaw1RhLQWkTshWUg_ndVOhtN5&ust=1670189129240000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCd3L-x3vsCFQAAAAAdAAAAABAl',
  });

  // const login = async (Username: string, Password: string) => {
  //   return await new Promise((resolve, reject) => {
  //     const user = new CognitoUser({
  //       Username,
  //       Pool: userPool,
  //     });

  //     const authDetails = new AuthenticationDetails({
  //       Username,
  //       Password,
  //     });

  //     user.authenticateUser(authDetails, {
  //       onSuccess: (data) => {
  //         console.log('on succ', data);
  //         resolve(data);
  //       },
  //       onFailure: (err) => {
  //         console.error('on fail', err);
  //         reject(err);
  //       },
  //       newPasswordRequired: (data) => {
  //         console.log('new', data);
  //         resolve(data);
  //       },
  //     });
  //   });
  // };

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
