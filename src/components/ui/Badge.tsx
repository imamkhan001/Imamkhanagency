import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber' | 'cyan' | 'purple';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  dot = false,
  ...props
}) => {
  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const variants = {
    primary: "bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30",
    secondary: "bg-white/5 text-[#d1d1db] border border-white/10",
    outline: "bg-transparent text-[#9e9eb0] border border-white/20",
    amber: "bg-[#ffb703]/10 text-[#ffb703] border border-[#ffb703]/30",
    cyan: "bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30",
    purple: "bg-[#9d4edd]/10 text-[#9d4edd] border border-[#9d4edd]/30"
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />}
      {children}
    </span>
  );
};
