import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchOrMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchOrMobile && !showTooltip) {
      e.preventDefault();
      setShowTooltip(true);
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(siteConfig.phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div ref={containerRef} className="fixed bottom-4 right-3 z-30">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative group w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] hover:scale-105 transition-all focus:outline-none cursor-pointer"
        aria-label="Chat on WhatsApp with Imam Khan"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        <FaWhatsapp className="w-6 h-6 text-white" />

        {/* Tooltip */}
        <div
          className={`absolute right-14 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-[#0d0d12] border border-white/10 text-white text-xs font-semibold whitespace-nowrap shadow-2xl transition-all duration-200 flex items-center gap-2.5 ${
            showTooltip
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
          }`}
        >
          <span>Chat on WhatsApp</span>
          <button
            type="button"
            onClick={handleCopyPhone}
            className="inline-flex items-center gap-1 font-mono text-[#00ff88] hover:text-[#00ff88]/80 bg-[#1a1a24] hover:bg-[#242433] px-2 py-1 rounded-lg border border-[#00ff88]/30 transition-all cursor-pointer"
            title="Click to copy phone number for calling"
          >
            <span>{siteConfig.phone}</span>
            {copied ? <Check className="w-3 h-3 text-[#00ff88]" /> : <Copy className="w-3 h-3 opacity-70" />}
          </button>
          {copied && <span className="text-[10px] text-[#00ff88] font-medium">Copied!</span>}
          {showTooltip && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowTooltip(false);
              }}
              className="text-white/60 hover:text-white p-0.5 rounded ml-0.5"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </a>
    </div>
  );
};
