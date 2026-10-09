import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-[#00ff88] hover:bg-[#00dd77] text-black shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] active:scale-[0.98]",
    secondary: "bg-[#161622] hover:bg-[#1f1f2e] text-white border border-white/10 hover:border-white/20 active:scale-[0.98]",
    outline: "bg-transparent hover:bg-[#00ff88]/10 text-white hover:text-[#00ff88] border border-[#00ff88]/30 hover:border-[#00ff88] active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-white/5 text-[#9e9eb0] hover:text-white",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs uppercase tracking-wider",
    md: "px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider font-semibold",
    lg: "px-7 py-3.5 text-sm sm:text-base uppercase tracking-wider font-bold"
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
