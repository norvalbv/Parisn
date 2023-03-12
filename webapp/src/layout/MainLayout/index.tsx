import { ReactElement, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from '../../context/UserContext';
import MyAccount from '../../pages/Account/MyAccount';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => {
  const [accountOpen, setAccountOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <>
        <div className="relative min-h-screen">
          <NavBar setAccountOpen={setAccountOpen} />
          <Outlet />
          <MyAccount isOpened={{ accountOpen, setAccountOpen }} />
        </div>
        <Footer />
      </>
    </UserInformationProvider>
  );
};

export default MainLayout;
