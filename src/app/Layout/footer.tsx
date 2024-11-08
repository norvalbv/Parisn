import { InstagramLogo } from '@/src/components/CustomSVG';
import { COMPANY_NAME } from '@/src/constants';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import NavItem from './navItem';

const Footer = (): ReactElement => {
  const footerLinks = [
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/about-us', label: 'About Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-background px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="text-lg font-medium tracking-wider uppercase">
          {COMPANY_NAME}.com
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <NavItem href={href}>{label}</NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <hr className="my-8 h-px w-full bg-white/10" />

      <div className="flex flex-col items-center gap-6">
        <a
          href="https://www.instagram.com/parisenglobal"
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <InstagramLogo />
        </a>

        <small className="text-xs text-gray-400">
          {COMPANY_NAME}™ {new Date().getFullYear()} - All Rights Reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
