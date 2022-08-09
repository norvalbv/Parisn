import React, { useState } from 'react';
import Button from './Button';

interface ProductSizesProps {
  sizes: { small: string; medium: string; large: string; extralarge: string };
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

  return (
    <div className={`flex gap-4 ${classes}`}>
      {Object.entries(sizes).map((size, i) => {
        const productSize =
          size[0].slice(0, 1).toLowerCase() === 'e' ? 'xl' : size[0].slice(0, 1).toLowerCase();
        const stockCount = Number(size[1]);
        return (
          <Button
            key={i}
            text={productSize}
            size="xs"
            width={30}
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
