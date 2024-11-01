import React, { ReactElement } from 'react';
import { RightIcon } from '@/src/components/SVG';
import { useRouter } from 'next/navigation';

type StyledLinkProps = {
  text?: string;
  to: string;
};

const StyledLink = ({ text = 'LEARN MORE', to }: StyledLinkProps): ReactElement => {
  const router = useRouter();
  return (
    <div
      className="group flex max-w-max cursor-pointer items-center gap-3 font-semibold"
      onClick={(): void => router.push(to)}
    >
      {text}
      <div className="duration-300 group-hover:translate-x-2">
        <RightIcon />
      </div>
    </div>
  );
};

export default StyledLink;
