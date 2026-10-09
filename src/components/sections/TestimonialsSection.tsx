import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionHeading
              eyebrow="Success Stories"
              title="Real Feedback &amp;"
              highlightText="Verifiable Results"
              description="From local business owners, dental clinic managers, and gym owners in Bangalore."
              align="left"
              className="mb-0"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              className="p-3 rounded-xl bg-[#111116] border border-white/10 hover:border-[#00ff88]/40 text-white hover:text-[#00ff88] transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-3 rounded-xl bg-[#111116] border border-white/10 hover:border-[#00ff88]/40 text-white hover:text-[#00ff88] transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`rounded-2xl bg-[#0d0d12] border p-8 flex flex-col justify-between transition-all duration-300 relative ${
                index === currentIndex ? 'border-[#00ff88]/50 shadow-[0_0_30px_rgba(0,255,136,0.1)]' : 'border-white/10'
              }`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#00ff88]">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00ff88]" />
                  ))}
                </div>

                {/* Outcome Badge */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] text-[11px] font-semibold mb-4 border border-[#00ff88]/20">
                  ✓ {item.outcomeBadge}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#d1d1db] leading-relaxed mb-6 font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a24] border border-[#00ff88]/40 text-[#00ff88] font-bold text-xs flex items-center justify-center">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.clientName}
                    </h4>
                    <p className="text-[11px] text-[#8e8e9f]">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </div>

                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8e8e9f] hover:text-[#00ff88] transition-colors p-1"
                    title="View Project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
