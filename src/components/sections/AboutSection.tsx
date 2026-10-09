import React from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const skills = [
    { label: 'WordPress Custom Development', percent: 95 },
    { label: 'Modern Web Design (HTML5 / Tailwind / React)', percent: 92 },
    { label: 'Conversion Rate Optimization (CRO) & Lead Gen', percent: 90 },
    { label: 'Fast Delivery & Turnaround Time (5–7 Days)', percent: 88 },
  ];

  return (
    <section id="about" className="py-12 md:py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="About Me"
          title="Dedicated to Helping Local Businesses"
          highlightText="Drive Inquiries"
          description="Combining modern clean UI/UX with technical WordPress development to turn site visitors into paying clients."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Box with Floating Badges (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] lg:w-[380px] lg:h-[380px]" style={{ aspectRatio: '1 / 1' }}>
              
              {/* Photo: Responsive Picture */}
              <picture className="w-full h-full block">
                <source
                  type="image/webp"
                  srcSet="/images/imam-khan-about-380w.webp 380w, /images/imam-khan-about-760w.webp 760w"
                  sizes="(max-width: 768px) 280px, 380px"
                />
                <img
                  src="/images/imam-khan-about.jpg"
                  alt="Imam Khan — Freelance Web Designer & WordPress Developer"
                  width={380}
                  height={380}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    borderRadius: '24px',
                    border: '2px solid #1a1a1a',
                    aspectRatio: '1 / 1',
                  }}
                />
              </picture>

              {/* Floating Badge 1: 100% Satisfaction */}
              <div className="absolute -top-4 -left-4 sm:-left-6 px-4 py-2.5 rounded-xl bg-[#0d0d12]/90 border border-[#00ff88]/30 backdrop-blur-md shadow-xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center font-bold text-xs">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100%</div>
                  <div className="text-[10px] text-[#8e8e9f] uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>

              {/* Floating Badge 2: 10+ Live Sites */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 px-4 py-2.5 rounded-xl bg-[#0d0d12]/90 border border-white/15 backdrop-blur-md shadow-xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00d2ff]/10 text-[#00d2ff] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">10+</div>
                  <div className="text-[10px] text-[#8e8e9f] uppercase tracking-wider">Live Sites</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Skills & Values (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Professional Web Designer &amp; WordPress Expert in Bangalore
            </h3>

            <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed mb-8 font-normal" style={{ fontFamily: 'var(--font-serif)' }}>
              I build custom, high-speed, and conversion-optimized websites for local service businesses, clinics, gyms, automotive brands, and e-commerce stores in Bangalore. Combining clean modern UI/UX design with technical WordPress development and conversion-rate optimization (CRO), I turn ordinary site visitors into paying customers.
            </p>

            {/* Skill Progress Bars */}
            <div className="space-y-4 mb-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-white">{skill.label}</span>
                    <span className="text-[#00ff88] font-mono font-bold">{skill.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#15151c] overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d2ff] rounded-full transition-all duration-1000"
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Real Results Box */}
            <div className="p-5 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/20 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Real Results My Clients Get:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d1d1db]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                  <span>Average 35% increase in customer inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                  <span>Average 40% mobile conversion boost</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                  <span>Top Google Search visibility for local business</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                  <span>30-Day Money-Back Guarantee included</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="#contact">
                <span>Let's Talk Business</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="#projects" variant="outline">
                <span>View My Work</span>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
