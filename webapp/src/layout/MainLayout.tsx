import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserInformationProvider } from '../context/UserContext';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => (
  <UserInformationProvider>
    <div className="relative min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  </UserInformationProvider>
);

export default MainLayout;
