import Link from '@/src/components/StyledLink';
import { MouseEvent, ReactElement } from 'react';

type NavItemProps = {
  href?: string;
  children: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: 'button' | 'link';
};

const NavItem = ({ href, children, onClick, type = 'link' }: NavItemProps): ReactElement => {
  const baseStyles =
    'w-full relative text-slate-300 hover:text-white transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full';

  return type === 'button' ? (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  ) : (
    <Link href={href ?? ''} onClick={onClick} className={baseStyles}>
      {children}
    </Link>
  );
};

export default NavItem;
