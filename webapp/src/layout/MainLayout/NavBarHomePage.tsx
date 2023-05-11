import React, { ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrawer } from 'hooks/useDrawer';
import useUser from 'hooks/useUser';
import { ProductData } from 'types';
import SearchIcon from 'components/SVG/SearchIcon';
import BasketIcon from 'components/SVG/BasketIcon';
import UserIcon from 'components/SVG/UserIcon';

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
    <div className="flex items-center justify-between h-[3.125rem] px-[7.5rem] fixed w-full bg-primary-dark/60">
      <span className="w-full">MENU</span>
      <span className="w-full text-center">PARISN.COM</span>
      <div className="flex w-full items-center gap-11 justify-end">
        <SearchIcon className="cursor-pointer" />
        <BasketIcon className="cursor-pointer" />
        {!user.userInfo?.id ? (
          <UserIcon onClick={(): void => openDrawer('Account')} className="cursor-pointer" />
        ) : (
          <UserIcon onClick={(): void => navigate('/login')} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
