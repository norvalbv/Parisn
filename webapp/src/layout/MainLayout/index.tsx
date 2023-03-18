import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from 'context/UserContext';
import MyAccount from 'pages/Account/MyAccount';
import { useDrawer } from 'hooks/useDrawer';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => {
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
      <>
        <div className="relative min-h-screen text-gray-300">
          <NavBar />
          <Outlet />
          <MyAccount />
        </div>
        <Footer />
      </>
    </UserInformationProvider>
  );
};

export default MainLayout;
