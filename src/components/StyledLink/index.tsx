import React, { ReactElement } from 'react';
import { RightIcon } from 'components/SVG';
import { useNavigate } from 'react-router-dom';

type StyledLinkProps = {
  text?: string;
  to: string;
};

const StyledLink = ({ text = 'LEARN MORE', to }: StyledLinkProps): ReactElement => {
  const navigate = useNavigate();
  return (
    <div
      className="group flex max-w-max cursor-pointer items-center gap-3 font-semibold"
      onClick={(): void => navigate(to)}
    >
      {text}
      <div className="duration-300 group-hover:translate-x-2">
        <RightIcon />
      </div>
    </div>
  );
};

export default StyledLink;
