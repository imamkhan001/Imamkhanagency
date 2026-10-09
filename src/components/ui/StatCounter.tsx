import React, { useEffect, useState, useRef } from 'react';

export interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  label: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  target,
  suffix = '+',
  prefix = '',
  durationMs = 1500,
  label
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = 16;
          const totalSteps = durationMs / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, durationMs, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-[#00ff88] tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-[#8e8e9f] font-medium mt-1">
        {label}
      </div>
    </div>
  );
};
