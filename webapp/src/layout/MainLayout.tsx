import { ReactElement, useEffect, useState } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from '../context/UserContext';
import MyAccount from '../pages/Account/MyAccount';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => {
  const [accountOpen, setAccountOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <div className="relative min-h-screen">
        <NavBar setAccountOpen={setAccountOpen} />
        <Outlet />
        <Footer /> <MyAccount isOpened={{ accountOpen, setAccountOpen }} />
      </div>
    </UserInformationProvider>
  );
};

export default MainLayout;
