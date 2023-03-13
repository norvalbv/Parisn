import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  ReactElement,
  useCallback,
} from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import {
  Auth as AuthType,
  BasicAuth,
  CognitoPayload,
  ForgotPasswordSubmit,
  FullUserInformation,
  ResetPassword,
  UserContextInformation,
  UserInformation,
  VerifyAccount,
} from '../types';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({
  children,
}: ProductContextProviderProps): ReactElement => {
  const navigate = useNavigate();
  const [user, setUser] = useState<FullUserInformation | null>({
    cognitoInfo: null,
    userInfo: {
      id: '100',
      username: 'benjithegreat',
      firstName: 'Benji',
      lastName: '',
      email: 'benjithegreat@gmail.com',
    },
  });
  const [error, setError] = useState<string | null>(null);
  /** Stage is used both for reset password flow and forgot password flow.
   
  / RESET PASSWORD FLOW
  
  / 1 = not logged in OR confirmed
  / 2 = unconfirmed

  / FORGOT PASSWORD FLOW

  / 1 = username input
  / 2 = reset password
  / 3 = confirmation of password reset */
  const [stage, setStage] = useState(1);

  const figureStage = useCallback((vals?: UserInformation): void => {
    if (vals) {
      setStage(2);
    } else {
      setStage(1);
    }
  }, []);

  const signUp = useCallback(
    async (values: AuthType): Promise<void> => {
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
        figureStage({
          username: decoded?.['cognito:username'] || 'demo',
          email: decoded?.email || 'demo',
          id: decoded?.aud || 'demo',
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
      } catch (error) {
        toast.warning((error as { message: string }).message);
        setError((error as { message: string }).message);
      }
    },
    [figureStage]
  );

  const confirmSignUp = useCallback(
    async (values: VerifyAccount): Promise<void> => {
      const { username, code } = values;
      try {
        await Auth.confirmSignUp(username, code);
        figureStage();
        toast('Verified Account');
        navigate('/login');
      } catch (error) {
        toast.warning((error as { message: string }).message);
        setError((error as { message: string }).message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [figureStage]
  );

  const resendConfirmationCode = useCallback(
    async (username?: string): Promise<void> => {
      try {
        if (username) {
          await Auth.resendSignUp(username);
        } else {
          await Auth.resendSignUp(user?.userInfo?.username || '');
        }
        toast('Verification code resent successfully.');
      } catch (error) {
        toast.warning((error as { message: string }).message);
        setError((error as { message: string }).message);
      }
    },
    [user?.userInfo?.username]
  );

  const signIn = useCallback(async (values: BasicAuth): Promise<void> => {
    const { username, password } = values;

    try {
      await Auth.signIn(username, password);

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

      navigate('/');
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
    } catch (error) {
      toast.warning(
        (
          error as {
            message: string;
          }
        ).message
      );
      setError((error as { message: string }).message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await Auth.signOut({ global: true });
      localStorage.removeItem('userInformation');
      navigate('/');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePassword = useCallback(async (values: ResetPassword): Promise<void | boolean> => {
    const { oldPassword, newPassword, confirmPassword } = values;
    const passwordMatch = newPassword === confirmPassword;
    if (!passwordMatch) return false;
    try {
      const user = await Auth.currentAuthenticatedUser();
      Auth.changePassword(user, oldPassword, newPassword);
      toast('Password has been changed!');
    } catch (error) {
      toast.warning((error as { message: string }).message);
      setError((error as { message: string }).message);
    }
  }, []);

  // Send confirmation code to user's email
  const forgotPassword = useCallback((values: { username: string }): void => {
    const { username } = values;
    Auth.forgotPassword(username)
      .then(() => {
        toast('Confirmation code sent to your email.');
        setStage(2);
      })
      .catch((err) => console.log(err));
  }, []);

  // Collect confirmation code and new password, then
  const forgotPasswordSubmit = useCallback((values: ForgotPasswordSubmit): void => {
    const { username, code, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) return;
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        toast('Password has been changed.');
        setStage(3);
      })
      .catch((err) => console.log(err));
  }, []);

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
  }, [figureStage]);

  useEffect(() => {
    (async (): Promise<void> => {
      const currentUser = await Auth.currentSession();
      const token = currentUser.getIdToken().getJwtToken();

      if (currentUser) localStorage.setItem('userInformation', JSON.stringify(token));
    })().catch(() => {});
  }, [user]);

  const memoisedValue = useMemo(
    () => ({
      user: {
        cognitoInfo: user?.cognitoInfo,
        userInfo: {
          id: user?.userInfo?.id || '',
          firstName: user?.userInfo?.firstName || '',
          lastName: user?.userInfo?.lastName || '',
          username: user?.userInfo?.username || '',
          email: user?.userInfo?.email || '',
          image: user?.userInfo?.image || '',
        },
      },
      changePassword,
      confirmSignUp,
      resendConfirmationCode,
      signIn,
      signOut,
      signUp,
      setStage,
      forgotPassword,
      forgotPasswordSubmit,
      error,
      stage,
    }),
    [
      changePassword,
      confirmSignUp,
      error,
      forgotPassword,
      forgotPasswordSubmit,
      resendConfirmationCode,
      setStage,
      signIn,
      signOut,
      signUp,
      stage,
      user,
    ]
  );

  return (
    <UserContext.Provider value={memoisedValue}>
      <ToastContainer />
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
