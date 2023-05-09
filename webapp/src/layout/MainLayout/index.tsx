import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserInformationProvider } from 'context/UserContext';
import MyAccount from 'pages/Account/MyAccount';
import { useDrawer } from 'hooks/useDrawer';
import Footer from './Footer';
import NavBar from './NavBar';
import Nav from './NavBarHomePage';

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
          {location.pathname !== '/home' ? <NavBar /> : <Nav />}
          <Outlet />
          <MyAccount />
        </div>
        <Footer />
      </>
    </UserInformationProvider>
  );
};

export default MainLayout;
