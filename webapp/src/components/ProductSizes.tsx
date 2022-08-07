import React, { useState } from 'react';
import Button from './Button';

interface ProductSizesProps {
  sizes: string[];
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
      {sizes.map((size) => (
        <Button
          text={size}
          size="xs"
          width={30}
          borderRequired="bottom"
          hoverColorRequired={false}
          classes={`hover:border-b-pink-500 hover:scale-125 ${
            selectedSize === size || selected === size ? 'scale-125 border-b-pink-500' : ''
          }`}
          onClick={() => handleClick(size)}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductSizes);
