import React from 'react';
import { cn } from '../../lib/utils';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className
}) => {
  return (
    <div className={cn("inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#111116] border border-white/10", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
            activeTab === tab.id
              ? "bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.25)]"
              : "text-[#9e9eb0] hover:text-white hover:bg-white/5"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              "ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono",
              activeTab === tab.id ? "bg-black/20 text-black" : "bg-white/10 text-[#d1d1db]"
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
