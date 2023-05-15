import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo } from 'components/CustomSVG';

const Footer = (): ReactElement => {
  return (
    <footer className="rounded-lg p-4 text-[14px] shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://parisn.com/" className="mb-4 flex items-center sm:mb-0">
          <span className="text-2xl self-center whitespace-nowrap font-semibold">PARISN.COM</span>
        </a>
        <ul className="text-sm mb-6 flex flex-wrap items-center sm:mb-0">
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
      <div className="text-sm my-6 flex items-center justify-center">
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
