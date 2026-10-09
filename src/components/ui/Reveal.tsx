import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delayMs?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delayMs = 0,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directionTransforms = {
    up: 'translate-y-6',
    down: '-translate-y-6',
    left: 'translate-x-6',
    right: '-translate-x-6',
    none: ''
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-[opacity,transform]",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : cn("opacity-0", directionTransforms[direction]),
        className
      )}
    >
      {children}
    </div>
  );
};
