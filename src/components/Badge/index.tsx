import { cn } from '@/lib/utils/cn';
import { ReactElement } from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({ children, className }: BadgeProps): ReactElement => {
  return (
    <div className={cn(
      "group relative flex items-center justify-start overflow-hidden rounded-3xl border border-white/10",
      "bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/80", 
      "shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl",
      "transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_100px_rgba(0,0,0,0.5)]",
      className || ''
    )}>
      <div className="absolute inset-0 bg-gradient-to-bl from-action/40 via-action-tertiary/10 to-action-secondary/40 opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Badge;
