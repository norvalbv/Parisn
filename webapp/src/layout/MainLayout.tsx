import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from '../context/UserContext';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => (
  <UserInformationProvider>
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  </UserInformationProvider>
);

export default MainLayout;
