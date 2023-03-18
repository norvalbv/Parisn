import { useContext } from 'react';
import UserContext from 'context/UserContext';
import { UserContextInformation } from 'types';

const useUser = (): UserContextInformation => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Context must be use inside provider');
  }

  return context;
};

export default useUser;
