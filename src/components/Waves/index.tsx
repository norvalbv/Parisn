import { cn } from '@/lib/utils/cn';
import useMediaQuery from '@/src/hooks/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  backgroundFill = 'transparent',
  blur = 7.5,
  speed = 'fast',
  waveOpacity = 0.5,
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
  [key: string]: any;
}): React.ReactElement => {
  const noise = createNoise3D();
  let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight; // Reduced height
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight; // Reduced height
    };
    render();
  };

  const waveColors = colors ?? [
    'rgba(50, 117, 248, 0.3)',
    'rgba(255, 192, 203, 0.3)', // Changed to pink
    'rgba(50, 117, 248, 0.1)',
    'rgba(255, 255, 255, 0.1)',
    'rgba(255, 255, 255, 0.05)',
  ];

  const isMobile = useMediaQuery('(max-width: 768px)');

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = isMobile ? 60 : 75;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.clearRect(0, 0, w, h);
    if (backgroundFill !== 'transparent') {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
    }
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome')
    );
  }, []);

  return (
    <div className={cn('h-20vh flex flex-col items-center justify-center', containerClassName || '')}>
      <canvas ref={canvasRef} id="canvas" style={{ background: 'transparent', width: '100%', filter: `blur(${blur}px)` }} />
      {children}
    </div>
  );
};

export default WavyBackground;
