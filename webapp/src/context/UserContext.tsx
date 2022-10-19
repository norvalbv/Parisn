import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ProductInfoValues, UserInformation } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>({
    id: null,
  });

  useEffect(() => {
    const retreviedProductInfo = localStorage.getItem('userInformation');
    const parsedData: UserInformation = JSON.parse(retreviedProductInfo || '{id: null}');
    // Checks whether all data is truthy or not.
    const truthyDataParsed = parsedData.id;

    if (truthyDataParsed) {
      return setUser(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userInformation', JSON.stringify(user));
  }, [user]);

  const memoisedValue = useMemo(
    () => ({
      id: user?.id ?? null,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={memoisedValue}>{children}</UserContext.Provider>;
};

export default UserContext;
