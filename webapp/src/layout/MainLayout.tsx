import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import CardWrapper from "../components/CardWrapper";
import NavBar from "./NavBar";
import Footer from "./Footer";

// ==============================|| MAIN LAYOUT ||============================== //

/**
 * Outside login screen layout
 * Header and Sidebar
 */
const MainLayout = (): ReactElement => (
  <div className="flex max-h-screen">
    <div className="overflow-auto w-full">
      <CardWrapper className="mx-8 my-8 w-full flex flex-col relative">
        <NavBar />
        <Outlet />
        <Footer />
      </CardWrapper>
    </div>
  </div>
);

export default MainLayout;
