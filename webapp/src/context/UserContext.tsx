import React, { createContext, useState, useMemo, useEffect } from 'react';
import { UserContextInformation, UserInformation } from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(null);

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
      user: { id: user?.id ?? null },
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={memoisedValue}>{children}</UserContext.Provider>;
};

export default UserContext;
