import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { UserInformation } from '../types';

const useProduct = (): UserInformation => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Context must be use inside provider');
  }

  return context;
};

export default useProduct;
