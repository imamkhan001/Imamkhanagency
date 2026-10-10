import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, Play, Pause, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse Drag to Scroll states for desktop swipe
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const categories = ['All', 'Healthcare', 'Fitness', 'Automotive', 'Food & Retail', 'Design & Architecture'];

  const filteredTestimonials = testimonials.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  // Track if section is in viewport so auto-scroll never fires when user is elsewhere
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Scroll to index (horizontally within the container ONLY; never touches window vertical scroll)
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-testimonial-card]');
    const targetCard = cards[index];
    if (targetCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const targetScrollLeft = container.scrollLeft + (cardRect.left - containerRect.left);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  }, []);

  // Next and Prev handlers
  const handlePrev = () => {
    const nextIndex = activeIndex <= 0 ? filteredTestimonials.length - 1 : activeIndex - 1;
    scrollToIndex(nextIndex);
  };

  const handleNext = useCallback(() => {
    const nextIndex = activeIndex >= filteredTestimonials.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  }, [activeIndex, filteredTestimonials.length, scrollToIndex]);

  // Update active index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll<HTMLElement>('[data-testimonial-card]');
      if (!cards.length) return;

      const containerLeft = container.getBoundingClientRect().left;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardLeft = card.getBoundingClientRect().left;
        const distance = Math.abs(cardLeft - containerLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [filteredTestimonials.length]);

  // Auto-scrolling timer (pauses on hover, drag, user disable, or when section is offscreen)
  useEffect(() => {
    if (!isAutoScrolling || !isInViewport || isHovered || isDragging || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isInViewport, isHovered, isDragging, handleNext, filteredTestimonials.length]);

  // Mouse Drag Handlers for Desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag speed multiplier
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="pt-12 pb-24 sm:py-20 lg:py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 w-full">
      {/* Background glow ambiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[100px] max-w-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Centered Heading Block */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-6 sm:mb-8 w-full min-w-0">
          <SectionHeading
            eyebrow="Social Proof & Client Results"
            title={
              <span>
                Real Feedback &amp;{' '}
                <span className="text-[#00ff88] inline-block sm:whitespace-nowrap">
                  Verifiable Outcomes
                </span>
              </span>
            }
            description="Read candid reviews from Bangalore clinic directors, gym owners, founders, and local service providers."
            align="center"
            className="mb-0 w-full max-w-full text-center items-center mx-auto"
          />

          {/* Credibility trust metrics bar */}
          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-[#9e9eb0] w-full min-w-0">
            <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
              <div className="flex text-[#00ff88] shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#00ff88]" />
                ))}
              </div>
              <span className="font-bold text-white text-xs sm:text-sm">5.0 / 5.0</span>
              <span className="text-[#9e9eb0] text-[11px] sm:text-xs">(All Verified Clients)</span>
            </div>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center justify-center gap-1.5 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
              <span className="text-white font-medium text-[11px] sm:text-xs">100% 12-Month Bug-Free Guarantee</span>
            </div>
          </div>
        </div>

        {/* Filter Pills & Interactive Navigation Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 mb-6 sm:mb-8 w-full min-w-0">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto min-w-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)] font-bold'
                    : 'bg-[#111116] border border-white/10 text-[#9e9eb0] hover:text-white hover:border-[#00ff88]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0 self-end sm:self-auto">
            {/* Auto-scroll toggle button */}
            <button
              onClick={() => setIsAutoScrolling((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-[#111116] border border-white/10 hover:border-[#00ff88]/40 text-xs text-[#9e9eb0] hover:text-white transition-colors cursor-pointer min-h-[40px]"
              title={isAutoScrolling ? 'Pause auto-scrolling' : 'Resume auto-scrolling'}
              aria-label={isAutoScrolling ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                  <span className="font-medium">Auto: On</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#8e8e9f] shrink-0" />
                  <span className="font-medium">Auto: Off</span>
                </>
              )}
            </button>

            {/* Left and Right Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2.5 sm:p-3 rounded-xl bg-[#111116] border border-white/10 hover:border-[#00ff88]/50 text-white hover:text-[#00ff88] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 sm:p-3 rounded-xl bg-[#111116] border border-white/10 hover:border-[#00ff88]/50 text-white hover:text-[#00ff88] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Swipeable & Auto-scrolling Reviews Container */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUpOrLeave();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className={`flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-3 pb-6 px-1 scrollbar-none select-none w-full max-w-full ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredTestimonials.map((item, index) => {
            const isCardActive = index === activeIndex;

            return (
              <div
                key={item.id}
                data-testimonial-card
                className={`w-[86vw] max-w-[340px] sm:max-w-none sm:w-[380px] lg:w-[410px] shrink-0 snap-start rounded-2xl bg-[#0d0d12] border p-5 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  isCardActive
                    ? 'border-[#00ff88]/60 shadow-[0_0_35px_rgba(0,255,136,0.15)] bg-gradient-to-b from-[#101713] to-[#0d0d12]'
                    : 'border-white/10 hover:border-[#00ff88]/40 hover:shadow-[0_0_25px_rgba(0,255,136,0.08)]'
                }`}
              >
                {/* Subtle Quote Icon Watermark */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-[#00ff88]/10 transition-colors pointer-events-none" />

                <div>
                  {/* Star Rating & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#00ff88]">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#00ff88]" />
                      ))}
                    </div>
                    {item.category && (
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#8e8e9f]">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Outcome Highlight Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] text-xs font-semibold mb-5 border border-[#00ff88]/25 shadow-sm max-w-full">
                    <span className="text-xs shrink-0">✓</span>
                    <span className="truncate sm:whitespace-normal">{item.outcomeBadge}</span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-[#d1d1db] leading-relaxed mb-6 font-normal italic break-words">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Initials Avatar */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#1a1a24] to-[#0d0d12] border border-[#00ff88]/40 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
                      {item.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.clientName}
                      </h4>
                      <p className="text-[11px] text-[#9e9eb0] leading-tight truncate">
                        {item.role} • {item.company}
                      </p>
                      {item.location && (
                        <p className="text-[10px] text-[#8e8e9f] mt-0.5 truncate">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* External Project Link */}
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#111116] border border-white/10 text-[#8e8e9f] hover:text-[#00ff88] hover:border-[#00ff88]/40 transition-all shrink-0"
                      title="View Live Client Website"
                      aria-label={`View live website for ${item.company}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Progress Indicators / Navigation Dots */}
        <div className="flex items-center justify-center gap-2 pt-2 px-4">
          {filteredTestimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? 'w-8 bg-[#00ff88] shadow-[0_0_10px_#00ff88]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Swipe cue for mobile */}
        <div className="sm:hidden text-center text-[11px] text-[#8e8e9f] mt-3 px-4">
          ← Swipe horizontally to see more reviews →
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
