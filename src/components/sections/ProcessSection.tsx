import React from 'react';
import { ArrowUpRight, Compass, Code2, CheckSquare, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-12 md:py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 content-visibility-auto">
      
      {/* Ambient Background Glows */}
      <div
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00ff88]">
              HOW IT WORKS
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight"
            style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
          >
            Web Design <span className="text-[#00ff88]">Process</span>
          </h2>

          <p
            className="text-base sm:text-lg text-[#9ea4b2] leading-[1.6] font-normal"
            style={{ fontFamily: "'PT Serif', Georgia, serif" }}
          >
            A transparent 5-step website design process delivering high-converting websites for small businesses.
          </p>
        </div>

        {/* 14-Column Bento Grid on Desktop, 2-col on tablet, 1-col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:repeat(14,minmax(0,1fr))] gap-5 sm:gap-6">

          {/* CARD 01: Spans 6 of 14 columns on desktop */}
          <article
            className="lg:col-span-6 md:col-span-2 rounded-[24px] p-[22px] sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[rgba(0,255,136,0.45)]"
            style={{
              background: 'linear-gradient(145deg, #080d12 0%, #040608 100%)',
              border: '1px solid rgba(0,255,136,0.22)',
              boxShadow: '0 0 28px rgba(0,255,136,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Subtle Halftone Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 -z-0" aria-hidden="true">
              <defs>
                <pattern id="card-dots-01" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#00ff88" fillOpacity="0.18" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#card-dots-01)" />
            </svg>

            {/* Glowing Accent Ambient Halo */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 70%)',
                filter: 'blur(35px)',
              }}
              aria-hidden="true"
            />

            {/* Top row: Number and Inline SVG Lightbulb Graphic */}
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[17px] font-mono text-white/90 font-medium">01</span>
                <span className="w-8 h-[2px] bg-[#00ff88]" />
              </div>

              {/* Glowing SVG Lightbulb Container */}
              <div className="relative flex items-center justify-center w-14 h-14 rounded-[16px] bg-[#00ff88]/5 border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.15)] group-hover:border-[#00ff88]/60 transition-colors">
                <svg
                  viewBox="0 0 32 32"
                  className="w-7 h-7 text-[#00ff88]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="16" cy="13" r="8" fill="url(#bulbGlow)" stroke="none" />
                  <path d="M12 19h8" />
                  <path d="M13 22h6" />
                  <path d="M14 25h4" />
                  <path d="M16 5a8 8 0 0 0-5.8 13.5c.8.9 1.8 2.2 1.8 3.5h8c0-1.3 1-2.6 1.8-3.5A8 8 0 0 0 16 5z" />
                  <path d="M14 13l2-3 2 3" stroke="#00ff88" strokeWidth="1.5" />
                  <line x1="16" y1="13" x2="16" y2="16" stroke="#00ff88" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Content Text */}
            <div className="relative z-10 mb-8">
              <h3
                className="text-2xl sm:text-[26px] font-bold text-white mb-3 tracking-tight leading-snug"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
              >
                Discovery &amp; <span className="text-[#00ff88]">Strategy</span>
              </h3>

              <p
                className="text-[14px] sm:text-[15px] text-[#9ea4b2] leading-[1.6] font-normal"
                style={{ fontFamily: "'PT Serif', Georgia, serif" }}
              >
                We discuss your business goals, target audience, brand identity, and key lead-generation objectives.
              </p>
            </div>

            {/* Bottom: "Let's Plan" CTA Button */}
            <div className="relative z-10 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 group/btn text-white transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#00ff88] group-hover/btn:bg-[#00ff88] group-hover/btn:text-black transition-all duration-300 shadow-sm shrink-0"
                  style={{
                    border: '1.5px solid #00ff88',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
                <span
                  className="text-sm font-semibold tracking-wide text-white group-hover/btn:text-[#00ff88] transition-colors"
                  style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
                >
                  Let's Plan
                </span>
              </a>
            </div>
          </article>


          {/* CARD 02: Spans 4 of 14 columns on desktop */}
          <article
            className="lg:col-span-4 md:col-span-1 rounded-[24px] p-[22px] sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[rgba(0,255,136,0.45)]"
            style={{
              background: 'linear-gradient(145deg, #080d12 0%, #040608 100%)',
              border: '1px solid rgba(0,255,136,0.18)',
              boxShadow: '0 0 20px rgba(0,255,136,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Halftone Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-0" aria-hidden="true">
              <rect width="100%" height="100%" fill="url(#card-dots-01)" />
            </svg>

            {/* Top row */}
            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[17px] font-mono text-white/90 font-medium">02</span>
                <span className="w-8 h-[2px] bg-[#00ff88]" />
              </div>

              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#00ff88] shadow-inner transition-transform group-hover:scale-105"
                style={{
                  background: 'rgba(0,255,136,0.05)',
                  border: '1.2px solid rgba(0,255,136,0.35)',
                }}
              >
                <Compass className="w-5 h-5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight leading-snug"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
              >
                Design &amp; <span className="text-[#00ff88]">Planning</span>
              </h3>

              <p
                className="text-[14px] text-[#9ea4b2] leading-[1.6] font-normal"
                style={{ fontFamily: "'PT Serif', Georgia, serif" }}
              >
                I design a bespoke, high-converting UI/UX layout tailored specifically to convert visitors into clients.
              </p>
            </div>
          </article>


          {/* CARD 03: Spans 4 of 14 columns on desktop */}
          <article
            className="lg:col-span-4 md:col-span-1 rounded-[24px] p-[22px] sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[rgba(0,255,136,0.45)]"
            style={{
              background: 'linear-gradient(145deg, #080d12 0%, #040608 100%)',
              border: '1px solid rgba(0,255,136,0.18)',
              boxShadow: '0 0 20px rgba(0,255,136,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Halftone Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-0" aria-hidden="true">
              <rect width="100%" height="100%" fill="url(#card-dots-01)" />
            </svg>

            {/* Top row */}
            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[17px] font-mono text-white/90 font-medium">03</span>
                <span className="w-8 h-[2px] bg-[#00ff88]" />
              </div>

              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#00ff88] shadow-inner transition-transform group-hover:scale-105"
                style={{
                  background: 'rgba(0,255,136,0.05)',
                  border: '1.2px solid rgba(0,255,136,0.35)',
                }}
              >
                <Code2 className="w-5 h-5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight leading-snug"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
              >
                Development
              </h3>

              <p
                className="text-[14px] text-[#9ea4b2] leading-[1.6] font-normal"
                style={{ fontFamily: "'PT Serif', Georgia, serif" }}
              >
                I build a lightning-fast, mobile-responsive, and SEO-friendly website with clean, secure code.
              </p>
            </div>
          </article>


          {/* CARD 04: Spans 7 of 14 columns on desktop */}
          <article
            className="lg:col-span-7 md:col-span-1 rounded-[24px] p-[22px] sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[rgba(0,255,136,0.45)]"
            style={{
              background: 'linear-gradient(145deg, #080d12 0%, #040608 100%)',
              border: '1px solid rgba(0,255,136,0.18)',
              boxShadow: '0 0 20px rgba(0,255,136,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Halftone Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-0" aria-hidden="true">
              <rect width="100%" height="100%" fill="url(#card-dots-01)" />
            </svg>

            {/* Decorative bottom-right circuit / wave graphic */}
            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none -z-0"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              aria-hidden="true"
            />

            {/* Top row */}
            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[17px] font-mono text-white/90 font-medium">04</span>
                <span className="w-8 h-[2px] bg-[#00ff88]" />
              </div>

              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#00ff88] shadow-inner transition-transform group-hover:scale-105"
                style={{
                  background: 'rgba(0,255,136,0.05)',
                  border: '1.2px solid rgba(0,255,136,0.35)',
                }}
              >
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-full lg:max-w-[85%] mt-auto">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight leading-snug"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
              >
                Testing &amp; <span className="text-[#00ff88]">Optimization</span>
              </h3>

              <p
                className="text-[14px] text-[#9ea4b2] leading-[1.6] font-normal"
                style={{ fontFamily: "'PT Serif', Georgia, serif" }}
              >
                Complete cross-browser, mobile responsiveness, speed, and SEO audits before going live.
              </p>
            </div>
          </article>


          {/* CARD 05: Spans 7 of 14 columns on desktop */}
          <article
            className="lg:col-span-7 md:col-span-1 rounded-[24px] p-[22px] sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[rgba(0,255,136,0.45)]"
            style={{
              background: 'linear-gradient(145deg, #080d12 0%, #040608 100%)',
              border: '1px solid rgba(0,255,136,0.22)',
              boxShadow: '0 0 25px rgba(0,255,136,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Halftone Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-0" aria-hidden="true">
              <rect width="100%" height="100%" fill="url(#card-dots-01)" />
            </svg>

            {/* Glowing Accent Halo */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none -z-0"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 70%)',
                filter: 'blur(35px)',
              }}
              aria-hidden="true"
            />

            {/* Top row */}
            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[17px] font-mono text-white/90 font-medium">05</span>
                <span className="w-8 h-[2px] bg-[#00ff88]" />
              </div>

              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#00ff88] shadow-inner transition-transform group-hover:scale-105"
                style={{
                  background: 'rgba(0,255,136,0.05)',
                  border: '1.2px solid rgba(0,255,136,0.35)',
                }}
              >
                <Rocket className="w-5 h-5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-full lg:max-w-[85%] mt-auto">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight leading-snug"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
              >
                Launch &amp; <span className="text-[#00ff88]">Support</span>
              </h3>

              <p
                className="text-[14px] text-[#9ea4b2] leading-[1.6] font-normal"
                style={{ fontFamily: "'PT Serif', Georgia, serif" }}
              >
                We deploy live to production, test across all devices, and provide ongoing maintenance support.
              </p>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
};
export default ProcessSection;
