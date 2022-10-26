import React, { useState } from 'react';
import { Stock } from '../../types';
import Button from '../Button';

export interface ProductSizesProps {
  sizes: Stock;
  classes?: string;
  onClick?: (arg: string) => void;
  selectedSize?: string;
}

const ProductSizes = ({ sizes, classes, onClick, selectedSize }: ProductSizesProps) => {
  const [selected, setSelected] = useState<null | string>(null);

  const handleClick = (size: string) => {
    if (onClick) return onClick(size);
    setSelected(size);
  };

  const sortedList = Object.entries(sizes).sort((a, b) => a[1] - b[1]);

  return (
    <div className={`flex gap-4 ${classes}`}>
      {sortedList.map((size, i) => {
        const productSize =
          size[0].slice(0, 1).toLowerCase() === 'e' ? 'xl' : size[0].slice(0, 1).toLowerCase();
        const stockCount = Number(size[1]);
        return (
          <Button
            key={i}
            text={productSize}
            size="xs"
            width="1.5rem"
            borderRequired="bottom"
            hoverColorRequired={false}
            disabled={Boolean(!size[1])}
            classes={`${size[1] ? 'hover:border-b-pink-500 hover:scale-125' : ''} ${
              (selectedSize?.toLowerCase() === productSize && stockCount > 0) ||
              (selected === productSize && stockCount > 0)
                ? 'scale-125 border-b-pink-500'
                : ''
            }`}
            onClick={() => handleClick(productSize)}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ProductSizes);
