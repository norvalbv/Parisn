import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDrawer } from 'hooks/useDrawer';
import useUser from 'hooks/useUser';
import { ProductData } from 'types';
import { SearchIcon, BasketIcon, UserIcon } from 'components/SVG';

const NavBar = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="fixed top-0 z-10 w-full bg-zinc-900/50 backdrop-blur-sm">
      {/* Mobile Menu Button */}
      <div className="flex h-[3.125rem] items-center justify-between px-4 md:hidden">
        <button
          onClick={(): void => setIsMenuOpen(!isMenuOpen)}
          className="text-slate-300 hover:text-white"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <span className="font-semibold text-slate-200">PARISN.COM</span>
        <div className="flex items-center gap-4">
          <SearchIcon className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          <BasketIcon className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          {!user.userInfo?.id ? (
            <UserIcon onClick={(): void => openDrawer('Account')} className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          ) : (
            <UserIcon onClick={(): void => navigate('/login')} className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } border-b border-zinc-800 bg-zinc-900/90 px-4 py-2 md:hidden`}
      >
        <div className="flex flex-col space-y-2 text-slate-300">
          {location.pathname !== '/home' && <Link to="/home" className="hover:text-white">Home</Link>}
          <Link to="/collections" className="hover:text-white">Collections</Link>
          <Link to="/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-[3.125rem] items-center justify-between px-8 md:flex lg:px-[7.5rem]">
        <div className="flex w-full gap-8 text-slate-300 lg:gap-11">
          {location.pathname !== '/home' && <Link to="/home" className="hover:text-white">Home</Link>}
          <Link to="/collections" className="hover:text-white">Collections</Link>
          <Link to="/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
        <span className="w-full text-center font-semibold text-slate-200">PARISN.COM</span>
        <div className="flex w-full items-center justify-end gap-8 lg:gap-11">
          <SearchIcon className="cursor-pointer text-slate-300 hover:text-white" />
          <BasketIcon className="cursor-pointer text-slate-300 hover:text-white" />
          {!user.userInfo?.id ? (
            <UserIcon onClick={(): void => openDrawer('Account')} className="cursor-pointer text-slate-300 hover:text-white" />
          ) : (
            <UserIcon onClick={(): void => navigate('/login')} className="cursor-pointer text-slate-300 hover:text-white" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
