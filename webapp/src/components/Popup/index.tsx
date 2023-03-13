import React, { ReactElement } from 'react';

type PopupProps = {
  text: string;
};

const Popup = ({ text }: PopupProps): ReactElement => {
  return (
    <div className="absolute px-3 py-2 rounded-xl shadow-lg shadow-[#777777] text-[13px] bg-secondary-darkPurple opacity-75 border border-white w-52 text-center -top-24 -right-6">
      {text}
    </div>
  );
};

export default Popup;
