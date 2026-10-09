import React from 'react';
import { cn } from '../../lib/utils';

export interface MarqueeProps {
  items: string[];
  separator?: string;
  speedSec?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  separator = '•',
  className
}) => {
  return (
    <div className={cn("w-full overflow-hidden relative user-select-none", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d1d1db] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              {item}
            </span>
            <span className="mx-6 sm:mx-8 text-[#00ff88] text-xs opacity-80 select-none">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
