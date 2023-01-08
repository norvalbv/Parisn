import { Auth } from 'aws-amplify';
import { createContext, useState, useMemo, useEffect } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

type ProductContextProviderProps = {
  children?: JSX.Element;
};

const UserContext = createContext<UserContextInformation | null>(null);

export const UserInformationProvider = ({ children }: ProductContextProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<FullUserInformation | null>({
    cognitoInfo: null,
    userInfo: null,
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
      figureStage({
        username: decoded?.['cognito:username'] || 'demo',
        email: decoded?.email || 'demo',
        id: decoded?.aud || 'demo',
      });
    } catch (err) {
      console.log(err);
      toast.warning('An error occured');
      setError('An error occured');
    }
  };

  const confirmSignUp = async (values: VerifyAccount) => {
    const { username, code } = values;
    try {
      await Auth.confirmSignUp(username, code);
      figureStage();
      toast('Verified Account');
      navigate('/login');
    } catch (error) {
      toast.warning('An error occured');
      setError('An error occured');
    }
  };

  const resendConfirmationCode = async (username?: string) => {
    try {
      if (username) {
        await Auth.resendSignUp(username);
      } else {
        await Auth.resendSignUp(user?.userInfo?.username || '');
      }
      toast('Verification code resent successfully.');
    } catch (err) {
      toast.warning('Error');
      console.log('error resending code: ', err);
    }
  };

  const signIn = async (values: BasicAuth) => {
    const { username, password } = values;

    try {
      await Auth.signIn(username, password);
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
    } catch (err) {
      console.log(err);
      toast.warning('An error occured');
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
      localStorage.removeItem('userInformation');
      navigate('/');
      location.reload();
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

  const changePassword = async (values: ResetPassword) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    const passwordMatch = newPassword === confirmPassword;
    if (!passwordMatch) return false;
    try {
      const user = await Auth.currentAuthenticatedUser();
      Auth.changePassword(user, oldPassword, newPassword);
      toast('Password has been changed!');
    } catch (err) {
      toast.warning('Error!');
      console.error(err);
    }
  };

  // Send confirmation code to user's email
  const forgotPassword = (values: { username: string }) => {
    const { username } = values;
    Auth.forgotPassword(username)
      .then(() => {
        toast('Confirmation code sent to your email.');
        setStage(2);
      })
      .catch((err) => console.log(err));
  };

  // Collect confirmation code and new password, then
  const forgotPasswordSubmit = (values: ForgotPasswordSubmit) => {
    const { username, code, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) return;
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        toast('Password has been changed.');
        setStage(3);
      })
      .catch((err) => console.log(err));
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
      try {
        const currentUser = await Auth.currentSession();
        const token = currentUser.getIdToken().getJwtToken();

        if (currentUser) localStorage.setItem('userInformation', JSON.stringify(token));
      } catch (err) {}
    })();
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
      user,
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
