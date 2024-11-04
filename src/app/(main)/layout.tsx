'use client';

import { ProductContextProvider } from '@/src/context/ProductContext';
import ReactLenis from 'lenis/react';
import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Layout/footer';
import NavBar from '../Layout/navBar';

type Props = {
  children: ReactElement;
};

const MainLayout = ({ children }: Props): ReactElement => {
  return (
    <ReactLenis root>
      <ProductContextProvider>
        <div>
          <ToastContainer />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </div>
      </ProductContextProvider>
    </ReactLenis>
  );
};

export default MainLayout;
