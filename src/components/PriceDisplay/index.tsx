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
      className={`h-[120px] w-[300px] px-8 sm:h-[160px] sm:w-[380px] sm:px-12 ${className}`}
    >
      <div className="flex items-center">
        <span className="mr-4 text-[3.5rem] font-extralight tracking-tighter sm:mr-6 sm:text-[4.5rem]">
          {currency}
        </span>
        <motion.span className="text-[3.5rem] font-extralight tracking-tighter sm:text-[4.5rem]">
          <motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
        </motion.span>
      </div>
    </Badge>
  );
};

export default PriceDisplay; 