'use client';

import React, { ReactElement, useEffect, useState } from 'react';
// import { useDrawer } from '@/src/hooks/useDrawer';
// import useUser from '@/src/hooks/useUser';
import { SearchIcon, BasketIcon } from '@/src/components/SVG';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductData } from '@/src/types/DataAPI';
import { COMPANY_NAME } from '@/src/constants';

const NavBar = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { openDrawer } = useDrawer();

  const retrievedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
  const parsedData = JSON.parse(retrievedProductInfo) as ProductData;
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const pathname = usePathname();
  const router = useRouter();
  // const { user } = useUser();

  useEffect(() => {
    if (truthyDataParsed && pathname !== '/checkout') router.push('/checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
        <span className="font-semibold text-slate-200">{COMPANY_NAME}.COM</span>
        <div className="flex items-center gap-4">
          <SearchIcon className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          <BasketIcon className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          {/* {!user.userInfo?.id ? (
            <UserIcon onClick={(): void => openDrawer('Account')} className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          ) : (
            <UserIcon onClick={(): void => router.push('/login')} className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          )} */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } border-b border-zinc-800 bg-zinc-900/90 px-4 py-2 md:hidden`}
      >
        <div className="flex flex-col space-y-2 text-slate-300">
          {pathname !== '/home' && <Link href="/home" className="hover:text-white">Home</Link>}
          <Link href="#pre-register" className="hover:text-white">Pre-Register</Link>
          <Link href="/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-[3.125rem] items-center justify-between px-8 md:flex lg:px-[7.5rem]">
        <div className="flex w-full gap-8 text-slate-300 lg:gap-11">
          {pathname !== '/home' && <Link href="/home" className="hover:text-white">Home</Link>}
          <Link href="#pre-register" className="hover:text-white">Pre-Register</Link>
          <Link href="/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
        <span className="w-full text-center font-semibold text-slate-200">{COMPANY_NAME}.COM</span>
       <div className="flex w-full items-center justify-end gap-8 lg:gap-11">
          {/*  <SearchIcon className="cursor-pointer text-slate-300 hover:text-white" />
          <BasketIcon className="cursor-pointer text-slate-300 hover:text-white" />
          {/* {!user.userInfo?.id ? (
            <UserIcon onClick={(): void => openDrawer('Account')} className="cursor-pointer text-slate-300 hover:text-white" />
          ) : (
            <UserIcon onClick={(): void => router.push('/login')} className="cursor-pointer text-slate-300 hover:text-white" />
          )} */}
        </div> 
      </div>
    </nav>
  );
};

export default NavBar;
