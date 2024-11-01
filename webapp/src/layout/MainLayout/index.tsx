import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserInformationProvider } from 'context/UserContext';
import MyAccount from 'pages/Account/MyAccount';
import { useDrawer } from 'hooks/useDrawer';
import Footer from './Footer';
import NavBar from './NavBar';
import useScrollToTop from 'hooks/useScrollToTop';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();

  const { closeDrawer } = useDrawer();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <>
        <div className="min-h-screen text-primary-light bg-[#0D0D0E]">
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
