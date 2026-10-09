import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  className
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border transition-all duration-200 overflow-hidden",
              isOpen ? "bg-[#0d0d12] border-[#00ff88]/40 shadow-lg shadow-black/40" : "bg-[#08080c] border-white/5 hover:border-white/15"
            )}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-xs font-mono text-[#00ff88] font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[#9e9eb0] shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180 text-[#00ff88]"
                )}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#9e9eb0] leading-relaxed border-t border-white/5">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
