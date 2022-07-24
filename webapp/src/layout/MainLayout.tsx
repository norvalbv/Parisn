import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (): ReactElement => (
  <>
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
