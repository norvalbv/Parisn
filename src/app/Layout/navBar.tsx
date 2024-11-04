'use client';

import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ProductData } from '@/src/types/DataAPI';
import { COMPANY_NAME } from '@/src/constants';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './navItem';
import Hamburger from 'hamburger-react';
import useOutsideClick from '@/src/hooks/useOutsideClick';

const NavBar = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const retrievedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
  const parsedData = JSON.parse(retrievedProductInfo) as ProductData;
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const pathname = usePathname();
  const router = useRouter();

  useOutsideClick({
    ref: menuRef,
    onBlur: () => setIsMenuOpen(false)
  });

  useEffect(() => {
    if (truthyDataParsed && pathname !== '/checkout') router.push('/checkout');
  }, [pathname]);

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-white/10 bg-zinc-900/50 backdrop-blur-md uppercase">
      {/* Mobile Menu Button */}
      <div className="flex h-16 items-center justify-between px-4 md:hidden">
        <div className="w-[3.25rem]" /> {/* Empty node with fixed width */}
        <span className="font-semibold tracking-[0.2rem] text-slate-200">{COMPANY_NAME}.COM</span>
        <button
          onClick={(): void => setIsMenuOpen(!isMenuOpen)}
          className="text-slate-300 hover:text-white"
        >
          <Hamburger
            toggled={isMenuOpen}
            size={16}
            rounded
            aria-expanded={isMenuOpen}
            aria-label="Menu button"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute p-6 left-0 right-0 flex items-center justify-center mx-auto mt-2 w-[95%] rounded-xl border border-white/10 bg-zinc-900/90 shadow-lg backdrop-blur-[0.5rem] md:hidden"
          >
            <div className="flex flex-col gap-6">
              <NavItem href="#pre-register" onClick={(): void => setIsMenuOpen(false)}>
                Pre Register
              </NavItem>
              <NavItem href="/contact-us" onClick={(): void => setIsMenuOpen(false)}>
                Contact Us
              </NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <div className="hidden h-16 items-center justify-between px-8 md:flex lg:px-[7.5rem]">
        <div className="flex w-full gap-8 text-slate-300 lg:gap-11"></div>
        <span className="w-full text-center font-semibold text-white tracking-[0.2rem]">
          {COMPANY_NAME}.COM
        </span>
        <div className="flex w-full items-center justify-end gap-8 lg:gap-11">
          <NavItem href="#pre-register">Pre Register</NavItem>
          <NavItem href="/contact-us">Contact Us</NavItem>
          {/*  <SearchIcon className="cursor-pointer text-slate-300 hover:text-white" />
          <BasketIcon className="cursor-pointer text-slate-300 hover:text-white" />
          {/* {!user.userInfo?.id ? (
            <UserIcon onClick={(): void => openDrawer('Account')} className="h-5 w-5 cursor-pointer text-slate-300 hover:text-white" />
          ) : (
            <UserIcon onClick={(): void => router.push('/login')} className="cursor-pointer text-slate-300 hover:text-white" />
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
