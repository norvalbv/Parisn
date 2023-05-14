import { RightIcon } from 'components/SVG';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type StyledLinkProps = {
  text?: string;
  to: string;
};

const StyledLink = ({ text = 'LEARN MORE', to }: StyledLinkProps): ReactElement => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 font-semibold cursor-pointer"
      onClick={(): void => navigate(to)}
    >
      {text}
      <RightIcon />
    </div>
  );
};

export default StyledLink;
