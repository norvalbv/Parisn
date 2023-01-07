import { useSpring, animated } from '@react-spring/web';

export type PriceDecreaseProps = {
  duration?: number;
};

const PriceDecrease = ({ duration }: PriceDecreaseProps) => {
  const { number } = useSpring({
    from: { number: 1000 },
    number: 0,
    config: { duration: 690000 },
  });

  return (
    <div>
      £<animated.span>{number.to((n) => n.toFixed(2))}</animated.span>
    </div>
  );
};

export default PriceDecrease;
