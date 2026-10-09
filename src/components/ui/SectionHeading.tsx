import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlightText,
  description,
  align = 'center',
  className
}) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={cn("max-w-3xl mb-14 sm:mb-16 flex flex-col", alignments[align], className)}>
      {eyebrow && (
        <Badge variant="primary" dot className="mb-3.5">
          {eyebrow}
        </Badge>
      )}

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
        {highlightText && (
          <>
            {' '}
            <span className="text-[#00ff88]">{highlightText}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base lg:text-lg text-[#9e9eb0] leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
