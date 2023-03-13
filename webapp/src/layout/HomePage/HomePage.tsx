import React, { ReactElement, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserInformationProvider } from '../../context/UserContext';
import MyAccount from '../../pages/Account/MyAccount';
import NavBar from './NavBar';

// ==============================|| MAIN LAYOUT ||============================== //

const HomePage = (): ReactElement => {
  const [accountOpen, setAccountOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <UserInformationProvider>
      <div className="relative min-h-screen">
        <NavBar setAccountOpen={setAccountOpen} />
        <Outlet />
        <MyAccount isOpened={{ accountOpen, setAccountOpen }} />
      </div>
    </UserInformationProvider>
  );
};

export default HomePage;
