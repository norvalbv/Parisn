import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserInformationProvider } from 'context/UserContext';
import { useDrawer } from 'hooks/useDrawer';
import MyAccount from 'pages/Account/MyAccount';
import NavBar from './NavBar';

// ==============================|| MAIN LAYOUT ||============================== //

const HomePage = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const { closeDrawer } = useDrawer();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <div className="relative min-h-screen">
        <NavBar />
        <Outlet />
        <MyAccount />
      </div>
    </UserInformationProvider>
  );
};

export default HomePage;
