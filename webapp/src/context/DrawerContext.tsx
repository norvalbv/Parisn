import React, { createContext, ReactElement, useMemo, useState } from 'react';

export type DrawerContextProps = {
  openedId: string;
  closeDrawer: () => void;
  openDrawer: (arg: string) => void;
};

export const DrawerContext = createContext<null | DrawerContextProps>(null);

type DrawerProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const DrawerProvider = ({ children }: DrawerProviderProps): ReactElement => {
  const [openedId, setOpenedId] = useState('');

  const openDrawer = (id: string): void => {
    setOpenedId(id);
  };

  const closeDrawer = (): void => {
    setOpenedId('');
  };

  const memoisedValue = useMemo(() => {
    return {
      openedId,
      openDrawer,
      closeDrawer,
    };
  }, [openedId]);

  return <DrawerContext.Provider value={memoisedValue}>{children}</DrawerContext.Provider>;
};
