import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5 border border-white/5",
        variant === 'circular' && "rounded-full",
        variant === 'text' && "h-4 rounded-md",
        variant === 'rectangular' && "rounded-xl",
        className
      )}
      {...props}
    />
  );
};
