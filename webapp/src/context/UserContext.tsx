import { Auth } from 'aws-amplify';
import { createContext, useState, useMemo, useEffect } from 'react';
import {
  Auth as AuthType,
  BasicAuth,
  CognitoPayload,
  FullUserInformation,
  UserContextInformation,
  UserInformation,
  VerifyAccount,
} from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const [user, setUser] = useState<FullUserInformation | null>({
    cognitoInfo: null,
    userInfo: null,
  });
  const [error, setError] = useState<string | null>(null);
  /** Stage
  / 1 = not logged in OR confirmed
  / 2 = unconfirmed
  */
  const [stage, setStage] = useState(1);

  const figureStage = (vals?: UserInformation) => {
    if (vals) {
      setStage(2);
    } else {
      setStage(1);
    }
  };

  const signUp = async (values: AuthType) => {
    const { username, password, email } = values;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      toast('🦄 Signed Up!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const decoded: CognitoPayload = jwtDecode(token);

      setUser({
        cognitoInfo: decoded,
        userInfo: {
          username: decoded?.['cognito:username'] || 'demo',
          email: decoded?.email || 'demo',
          id: decoded?.aud || 'demo',
        },
      });
      figureStage();
    } catch (err) {
      toast('An error occured');
      setError('An error occured');
    }
  };

  const confirmSignUp = async (values: VerifyAccount) => {
    const { username, code } = values;
    try {
      await Auth.confirmSignUp(username, code);
      figureStage();
    } catch (error) {
      toast('An error occured');
      setError('An error occured');
    }
  };

  const signIn = async (values: BasicAuth) => {
    const { username, password } = values;

    try {
      const user = await Auth.signIn(username, password);
      toast('🦄 Signed In!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      const token = user.getIdToken().getJwtToken();

      const decoded: CognitoPayload = jwtDecode(token);

      setUser({
        cognitoInfo: decoded,
        userInfo: {
          username: decoded?.['cognito:username'] || 'demo',
          email: decoded?.email || 'demo',
          id: decoded?.aud || 'demo',
        },
      });
    } catch (err) {
      console.log(err);
      toast('An error occured');
      setError('An error occured');
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
      toast('🦄 Signed Out!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      console.log(err);
      toast('An error occured! Try again', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    const customer = localStorage.getItem('userInformation');
    if (customer) {
      const decoded: CognitoPayload = jwtDecode(customer);

      setUser({
        cognitoInfo: decoded,
        userInfo: {
          username: decoded?.['cognito:username'] || 'demo',
          email: decoded?.email || 'demo',

          id: decoded?.aud || 'demo',
        },
      });
      figureStage({
        username: decoded?.['cognito:username'] || 'demo',
        email: decoded?.email || 'demo',
        id: decoded?.aud || 'demo',
      });
    } else {
      figureStage();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const currentUser = await Auth.currentSession();
      const token = currentUser.getIdToken().getJwtToken();

      if (currentUser) localStorage.setItem('userInformation', JSON.stringify(token));
    })();
  }, [user]);

  const memoisedValue = useMemo(
    () => ({
      user: {
        userInfo: {
          id: user?.userInfo?.id || '',
          firstName: user?.userInfo?.firstName || '',
          lastName: user?.userInfo?.lastName || '',
          username: user?.userInfo?.username || '',
          email: user?.userInfo?.email || '',
          image: user?.userInfo?.image || '',
        },
      },
      signUp,
      signIn,
      signOut,
      confirmSignUp,
      error,
      stage,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={memoisedValue}>
      <ToastContainer />
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
