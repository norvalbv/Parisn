import React, { useState } from 'react';
import Button from './Button';

interface ProductSizesProps {
  sizes: { size: string; stock: number }[];
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
          text={size.size}
          size="xs"
          width={30}
          borderRequired="bottom"
          hoverColorRequired={false}
          disabled={size.stock === 0}
          classes={`${size.stock !== 0 ? 'hover:border-b-pink-500 hover:scale-125' : ''} ${
            (selectedSize === size.size && size.stock > 0) ||
            (selected === size.size && size.stock > 0)
              ? 'scale-125 border-b-pink-500'
              : ''
          }`}
          onClick={() => handleClick(size.size)}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductSizes);
