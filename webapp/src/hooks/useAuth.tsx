import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { UserContextInformation } from '../types';

const useAuth = (): UserContextInformation => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Context must be use inside provider');
  }

  return context;
};

export default useAuth;
