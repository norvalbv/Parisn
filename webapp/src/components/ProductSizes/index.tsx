import React, { ReactElement, useState } from 'react';
import { Stock } from '../../types';
import Button from '../Button';

export interface ProductSizesProps {
  sizes: Stock;
  classes?: string;
  onClick?: (arg: string) => void;
  selectedSize?: string;
}

const ProductSizes = ({
  sizes,
  classes,
  onClick,
  selectedSize,
}: ProductSizesProps): ReactElement => {
  const [selected, setSelected] = useState<null | string>(null);

  const handleClick = (size: string): ((arg: string) => void) | void => {
    if (onClick) return onClick(size);
    setSelected(size);
  };

  const priority = ['Small', 'Medium', 'Large', 'ExtraLarge'];

  const sortedList = Object.entries(sizes).sort(
    (a, b) => priority.indexOf(a[0]) - priority.indexOf(b[0])
  );

  return (
    <div className={`flex gap-4 ${classes || ''}`}>
      {sortedList.map((size) => {
        const productSize =
          size[0].slice(0, 1).toLowerCase() === 'e' ? 'xl' : size[0].slice(0, 1).toLowerCase();
        const stockCount = Number(size[1]);
        return (
          <Button
            key={size[0]}
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
            onClick={(): void | ((arg: string) => void) => handleClick(productSize)}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ProductSizes);
