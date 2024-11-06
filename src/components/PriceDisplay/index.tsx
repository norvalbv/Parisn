import { ReactElement } from 'react';
import { motion, MotionValue } from 'framer-motion';
import Badge from '../Badge';

type PriceDisplayProps = {
  price: MotionValue<string>;
  currency?: string;
  className?: string;
};

const PriceDisplay = ({
  price,
  currency = '£',
  className = '',
}: PriceDisplayProps): ReactElement => {
  return (
    <Badge
      className={`h-[6rem] w-72 lg:w-96 md:h-[7.5rem] lg:h-[10rem] flex items-center justify-center ${className}`}
    >
      <div className="flex items-center justify-center">
        <span className="mr-4 text-5xl font-extralight tracking-tighter sm:mr-6 lg:text-[4.5rem]">
          {currency}
        </span>
        <motion.span
          className="text-5xl font-extralight tracking-tighter lg:text-[4.5rem] flex items-center"
          style={{ minWidth: '5ch' }} // Ensures the price stays in the same position
        >
          <motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
        </motion.span>
      </div>
    </Badge>
  );
};

export default PriceDisplay;
