import React, { ReactElement, useState } from 'react';
import { ProductSizes as ProductSizesType, Stock } from 'types';
import Button from 'components/Button';

export type ProductSizesProps = {
  sizes: Stock;
  classes?: string;
  onClick?: (arg: ProductSizesType) => void;
  selectedSize?: ProductSizesType;
};

const ProductSizes = ({
  sizes,
  classes,
  onClick,
  selectedSize,
}: ProductSizesProps): ReactElement => {
  const [selected, setSelected] = useState<null | ProductSizesType>(null);

  const handleClick = (size: ProductSizesType): ((arg: ProductSizesType) => void) | void => {
    if (onClick) return onClick(size);
    setSelected(size);
  };

  const priority = ['small', 'medium', 'large', 'extraLarge'];

  const sortedList = Object.entries(sizes).sort(
    (a, b) => priority.indexOf(a[0]) - priority.indexOf(b[0])
  );

  return (
    <div className={`flex gap-4 ${classes || ''}`}>
      {sortedList.map((size) => {
        const productSize =
          size[0].slice(0, 1).toLowerCase() === 'e'
            ? 'xl'
            : (size[0].slice(0, 1).toLowerCase() as ProductSizesType);
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
            className={`${size[1] ? 'hover:scale-125 hover:border-b-pink-500' : ''} ${
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
