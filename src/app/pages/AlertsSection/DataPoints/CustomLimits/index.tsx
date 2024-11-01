import addNewLimit from '@/public/images/addNewLimit.png';
import limitList from '@/public/images/limitList.png';
import Image from 'next/image';
import React, { ReactElement } from 'react';

const CustomLimits = (): ReactElement => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={addNewLimit}
          alt="Add New Limit"
          className="w-2/3 max-w-md rounded-lg shadow-lg sm:w-full"
        />
      </div>
      <div className="w-full">
        <Image src={limitList} alt="Limit List" className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default CustomLimits;
