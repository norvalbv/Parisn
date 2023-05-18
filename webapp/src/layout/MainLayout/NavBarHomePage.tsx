import React, { ReactElement, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDrawer } from 'hooks/useDrawer';
import useUser from 'hooks/useUser';
import { ProductData } from 'types';
import { SearchIcon, BasketIcon, UserIcon } from 'components/SVG';

const NavBar = (): ReactElement => {
  const { openDrawer } = useDrawer();

  const retreviedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
  const parsedData = JSON.parse(retreviedProductInfo) as ProductData;
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const location = useLocation();

  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (truthyDataParsed && location.pathname !== '/checkout') navigate('/checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <nav className="fixed z-50 flex h-[3.125rem] w-full items-center justify-between bg-primary-dark/60 px-[7.5rem]">
      <div className="flex w-full gap-11">
        <Link to="/collections">Collections</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <span className="w-full text-center font-semibold">PARISN.COM</span>
      <div className="flex w-full items-center justify-end gap-11">
        <SearchIcon className="cursor-pointer" />
        <BasketIcon className="cursor-pointer" />
        {!user.userInfo?.id ? (
          <UserIcon onClick={(): void => openDrawer('Account')} className="cursor-pointer" />
        ) : (
          <UserIcon onClick={(): void => navigate('/login')} className="cursor-pointer" />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
