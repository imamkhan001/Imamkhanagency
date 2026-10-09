import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glow' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const base = "rounded-2xl p-6 sm:p-8 transition-all duration-300 relative";
  
  const variants = {
    default: "bg-[#0d0d12] border border-white/10",
    elevated: "bg-gradient-to-b from-[#121218] to-[#08080a] border border-white/10 shadow-2xl shadow-black/80",
    glow: "bg-[#0d0d12] border border-[#00ff88]/30 shadow-[0_0_30px_rgba(0,255,136,0.08)]",
    interactive: "bg-[#0d0d12] border border-white/10 hover:border-[#00ff88]/40 hover:bg-[#121218] hover:shadow-2xl hover:shadow-black/60"
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
