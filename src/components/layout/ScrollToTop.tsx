import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setShowScrollTop(winScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00ff88] via-[#00d2ff] to-[#00ff88] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll-To-Top Button (48px = w-12 h-12, bottom 16px + 48px + 10px gap = bottom-[74px], right 12px = right-3) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[74px] right-3 z-30 w-12 h-12 rounded-full bg-[#111116]/90 backdrop-blur-md border border-white/20 text-[#00ff88] flex items-center justify-center shadow-2xl hover:scale-110 hover:border-[#00ff88] transition-all cursor-pointer"
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
