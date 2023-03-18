import React, { ReactElement } from 'react';
import { CloseIcon } from 'components/SVG';
import { useDrawer } from 'hooks/useDrawer';

type DrawerProps = {
  children: JSX.Element | JSX.Element[];
  size?: keyof typeof sizeMap;
  title: string;
  id: string;
};

const Drawer = ({ children, size = 'base', title, id }: DrawerProps): ReactElement => {
  const { openedId, closeDrawer } = useDrawer();

  return (
    <div
      id="item-chat"
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto duration-500 transition-transform ${
        openedId === id ? '' : 'translate-x-full'
      } ${sizeMap[size]} bg-gray-900`}
      tabIndex={-1}
    >
      <h5 className="text-base font-semibold text-gray-500 uppercase">{title}</h5>
      <button
        type="button"
        onClick={(): void => closeDrawer()}
        className="text-gray-400 bg-transparent border border-gray-400 hover:rotate-90 transform-all duration-300 p-1.5 rounded-full text-xxs absolute top-2.5 right-2.5 inline-flex items-center"
      >
        <CloseIcon />
        <span className="sr-only">Close</span>
      </button>
      <div className="border-t mt-4 pt-4">{children}</div>
    </div>
  );
};

const sizeMap = {
  base: 'w-96',
  lg: 'w-[50rem]',
};

export default Drawer;
