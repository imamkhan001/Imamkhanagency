import React from 'react';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Code, Heart, Sparkles } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ProcessSection } from '../components/sections/ProcessSection';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';
import { ContactSection } from '../components/sections/ContactSection';
import { siteConfig } from '../data/siteConfig';

export const AboutPage: React.FC = () => {
  const whyChooseMe = [
    {
      title: 'Direct 1-on-1 Collaboration',
      desc: 'No account managers or delayed email ticket queues. You work directly with Imam Khan via WhatsApp and call.'
    },
    {
      title: 'Conversion-Engineered Architecture',
      desc: 'Every layout is structured to turn casual traffic into qualified inquiries with clear value headlines and 1-tap CTAs.'
    },
    {
      title: 'Sub-3-Second Mobile Performance',
      desc: 'Clean HTML5, Tailwind CSS, and optimized WebP images ensure rapid page loads on mobile 4G/5G.'
    },
    {
      title: 'Local Bangalore Search Dominance',
      desc: 'Includes LocalBusiness Schema.org structured data, meta tags, and Google Search Console indexing setup.'
    }
  ];

  return (
    <>
      <Seo
        title="About Imam Khan | Web Designer & WordPress Expert in Bangalore"
        description="Learn about Imam Khan, freelance web designer and WordPress developer in Bangalore dedicated to building high-converting websites for businesses, clinics, and gyms."
        canonicalUrl="/about"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'About Imam Khan' }]} />
      </div>

      {/* Main Story & Profile Section */}
      <section className="py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            
            {/* Photo Column (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 border-[#00ff88]/40 shadow-2xl shadow-[#00ff88]/10 group">
                <img
                  src="/images/imam-khan-about.webp"
                  alt="Imam Khan - Web Designer in Bangalore"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Imam Khan
                  </div>
                  <div className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
                    Web Designer &amp; WordPress Expert • Bangalore
                  </div>
                </div>
              </div>
            </div>

            {/* Story Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff88] bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/20">
                The Story &amp; Philosophy
              </span>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Building Websites That <span className="text-[#00ff88]">Generate Real Business Growth</span>
              </h1>

              <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed font-normal">
                Hello! I am Imam Khan, a freelance web designer and WordPress developer based in Bangalore. I help local service businesses, dental clinics, fitness gyms, and local brands replace generic, slow websites with high-speed revenue engines.
              </p>

              <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed font-normal">
                I believe a website should be more than a pretty brochure—it must be a 24/7 business tool that builds trust from the first second, clearly explains your offer, and guides visitors to contact you.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/10">
                  <div className="text-2xl font-bold text-[#00ff88] font-mono">10+</div>
                  <div className="text-xs text-[#8e8e9f] mt-1">Live Client Websites</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/10">
                  <div className="text-2xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-[#8e8e9f] mt-1">Client Satisfaction</div>
                </div>
              </div>

              <div className="pt-2 flex gap-4">
                <Button href="#contact" size="lg">
                  <span>Start Your Website</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

          </div>

          {/* Why Choose Me Grid */}
          <div className="space-y-8 mb-20">
            <SectionHeading
              eyebrow="Core Advantages"
              title="Why Businesses Choose"
              highlightText="Working With Me"
              description="Four pillars that set my freelance web development service apart in Bangalore."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseMe.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-[#00ff88]/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center mb-4 font-bold font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9e9eb0] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5-Step Process Section */}
      <ProcessSection />

      {/* Guarantees */}
      <GuaranteesSection />

      {/* Lead Form */}
      <ContactSection />
    </>
  );
};
export default AboutPage;
