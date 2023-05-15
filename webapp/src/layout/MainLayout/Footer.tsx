import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo } from 'components/CustomSVG';

const Footer = (): ReactElement => {
  return (
    <footer className="p-4 rounded-lg shadow md:px-6 md:py-8 text-[14px]">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://parisn.com/" className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">PARISN.COM</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm sm:mb-0">
          <li>
            <Link to="/how-it-works" className="mr-2 hover:underline md:mr-4">
              How It Works
            </Link>
          </li>
          <li>
            <Link to="/terms-and-conditions" className="mr-2 hover:underline md:mr-4">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="mr-2 hover:underline md:mr-4">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
      <div className="text-sm flex items-center justify-center my-6">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer"
        >
          <InstagramLogo />
        </a>
      </div>
      <span className="block text-[11px] sm:text-center">Parisn™ 2023 - All Rights Reserved.</span>
    </footer>
  );
};

export default Footer;
