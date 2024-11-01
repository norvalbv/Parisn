import { useContext } from 'react';
import { DrawerContext, DrawerContextProps } from '@/src/context/DrawerContext';

export const useDrawer = (): DrawerContextProps => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
