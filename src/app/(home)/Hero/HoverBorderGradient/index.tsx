'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

type HoverBorderGradientProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
}

export const HoverBorderGradient: React.FC<HoverBorderGradientProps> = ({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(25% 60% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(20% 50% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM:
      'radial-gradient(25% 60% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT: 'radial-gradient(20% 50% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  };

  const highlight =
    'radial-gradient(80% 180% at 50% 50%, #004B6E 0%, rgba(0, 75, 110, 0.5) 50%, rgba(255, 255, 255, 0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/20 decoration-clone p-px transition duration-500 hover:bg-black/10 dark:bg-white/20',
        containerClassName || ''
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white',
          className || ''
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn('absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]')}
        style={{
          filter: 'blur(6px)',
          position: 'absolute',
          width: '110%',
          height: '110%',
          top: '-5%',
          left: '-5%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration }}
      />
      <div className="z-1 absolute inset-[2px] flex-none rounded-[100px] bg-black" />
    </Tag>
  );
};

export default HoverBorderGradient;
