import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, type ReactElement, cloneElement, isValidElement } from 'react';

type StyledLinkProps = {
  children?: string;
  href: string;
  icon?: LucideIcon | ReactElement;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
};

const StyledLink = ({
  children,
  href,
  icon: Icon,
  onClick,
  className,
}: StyledLinkProps): ReactElement => {
  const renderIcon = (): ReactElement | null => {
    if (!Icon) return null;

    const iconClass = 'ml-2 size-6 transition-transform duration-200 group-hover:translate-x-0.5';

    if (isValidElement(Icon)) {
      return cloneElement(Icon as ReactElement, { className: iconClass });
    }

    const LucideIcon = Icon as LucideIcon;
    return <LucideIcon strokeWidth={1.5} className={iconClass} />;
  };

  return (
    <Link
      href={href}
      className={cn(
        'flex max-w-max items-center gap-3 text-slate-300 transition-colors duration-200 hover:text-white',
        className ?? ''
      )}
      onClick={onClick}
    >
      {children}
      {Icon && renderIcon()}
    </Link>
  );
};

export default StyledLink;
