import { ReactElement, useEffect } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from '../context/UserContext';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <div className="relative min-h-screen">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </UserInformationProvider>
  );
};

export default MainLayout;
