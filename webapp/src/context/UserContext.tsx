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
      const { user } = await Auth.signUp({
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

      setUser({
        cognitoInfo: user,
        userInfo: {
          username: 'user',
          id: 1,
          email: 'me@gmail.com',
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

      const decoded: CognitoPayload = jwtDecode(user.signInUserSession.idToken.jwtToken);

      setUser({
        cognitoInfo: user,
        userInfo: { username: decoded['cognito:username'], email: decoded.email, id: decoded.aud },
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

  // set JWT in localstorage.
  // If

  useEffect(() => {
    const retreviedProductInfo = localStorage.getItem('userInformation');
    const parsedData: UserInformation = JSON.parse(retreviedProductInfo || 'null');

    setUser(parsedData ?? null);

    figureStage(parsedData ?? null);
  }, []);

  useEffect(() => {
    localStorage.setItem('userInformation', JSON.stringify(user));
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
