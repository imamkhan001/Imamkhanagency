import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Target, 
  MessageSquareShare, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { impactPillars } from '../../data/impactPillars';
import { siteConfig } from '../../data/siteConfig';

export const BusinessImpactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cards');

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Target': return Target;
      case 'MessageSquareShare': return MessageSquareShare;
      case 'Search': return Search;
      default: return Sparkles;
    }
  };

  const getPillarColor = (idx: number) => {
    switch (idx) {
      case 0: return { color: '#00ff88', border: 'border-[#00ff88]/30', bgGlow: 'from-[#00ff88]/10' };
      case 1: return { color: '#00d2ff', border: 'border-[#00d2ff]/30', bgGlow: 'from-[#00d2ff]/10' };
      case 2: return { color: '#ffb703', border: 'border-[#ffb703]/30', bgGlow: 'from-[#ffb703]/10' };
      case 3: return { color: '#9d4edd', border: 'border-[#9d4edd]/30', bgGlow: 'from-[#9d4edd]/10' };
      default: return { color: '#00ff88', border: 'border-[#00ff88]/30', bgGlow: 'from-[#00ff88]/10' };
    }
  };

  return (
    <section id="impact" className="relative py-28 bg-[#07070a] border-y border-[#1a1a24] overflow-hidden scroll-mt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#00d2ff]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="BUSINESS IMPACT"
          title="What Your Website"
          highlightText="Should Do"
          description="A website should do more than look professional. It should help visitors understand your business, trust your brand, and take the next step."
        />

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-14">
          <Tabs
            tabs={[
              { id: 'cards', label: 'The 4 Core Pillars' },
              { id: 'comparison', label: 'Ordinary vs Impact Site' }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab 1: 4 Core Pillars Grid */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {impactPillars.map((pillar, idx) => {
              const Icon = getIcon(pillar.iconName);
              const styling = getPillarColor(idx);

              return (
                <div
                  key={pillar.number}
                  className={`group relative rounded-2xl bg-[#0d0d12] border ${styling.border} p-8 hover:bg-[#121218] transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${styling.bgGlow} to-transparent rounded-tr-2xl pointer-events-none`} />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold font-mono text-white/90">
                          {pillar.number}
                        </span>
                        <span className="w-8 h-0.5 group-hover:w-12 transition-all duration-300" style={{ backgroundColor: styling.color }} />
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e9f]">
                          {pillar.tagline}
                        </span>
                      </div>

                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundColor: `${styling.color}15`,
                          borderColor: `${styling.color}40`,
                          color: styling.color
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {pillar.number} — {pillar.title}
                    </h3>

                    {/* Brief Description */}
                    <p className="text-sm sm:text-base text-[#d1d1db] mb-6 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-[#9e9eb0]">
                      {pillar.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact Insight Strip */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#8e8e9f]">Impact Insight:</span>
                    <span className="font-semibold text-white/90 text-right max-w-[260px]">
                      {pillar.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Interactive Comparison */}
        {activeTab === 'comparison' && (
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#0d0d12] border border-white/10 p-6 sm:p-10 mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              How an Impact-Driven Website Transforms Business Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ordinary Website Box */}
              <div className="rounded-xl bg-[#08080a] border border-red-500/20 p-6">
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
                  <XCircle className="w-5 h-5" />
                  <span>Ordinary Website</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#8e8e9f]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0">✕</span>
                    <span>Generic template with no distinct brand identity or trust signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0">✕</span>
                    <span>Confusing, technical copy that fails to explain the core customer offer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0">✕</span>
                    <span>Complex 10-field contact forms with 80%+ bounce rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0">✕</span>
                    <span>Slow mobile load speeds losing local Google rankings</span>
                  </li>
                </ul>
              </div>

              {/* Impact-Driven Website Box */}
              <div className="rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/30 p-6 shadow-[0_0_25px_rgba(0,255,136,0.08)]">
                <div className="flex items-center gap-2 text-[#00ff88] text-sm font-semibold uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Imam Khan Impact Website</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff88] shrink-0">✓</span>
                    <span><strong>01 Build Trust:</strong> High-authority visual design establishing credibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff88] shrink-0">✓</span>
                    <span><strong>02 Explain Offer:</strong> Crystal-clear offer messaging that hooks potential buyers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff88] shrink-0">✓</span>
                    <span><strong>03 Generate Enquiries:</strong> 1-click WhatsApp &amp; phone channels generating daily leads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff88] shrink-0">✓</span>
                    <span><strong>04 Get Found Online:</strong> Engineered for Google local search visibility &amp; sub-3s speeds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* High-Converting CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0e1612] via-[#09120e] to-[#0d1419] border border-[#00ff88]/40 p-8 sm:p-12 overflow-hidden shadow-2xl shadow-[#00ff88]/10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00ff88]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="text-[11px] font-bold text-[#00ff88] uppercase tracking-widest mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4" />
                <span>LET'S BUILD YOUR TOOL FOR GROWTH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to turn your website into a business tool?
              </h3>
              <p className="text-sm sm:text-base text-[#9e9eb0] font-normal">
                Get started today and watch your business thrive with a website tailored to convert visitors into loyal clients.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <Button href="#contact" size="lg" className="w-full sm:w-auto">
                <span>Let's Build Your Website</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>WhatsApp Instant Chat</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
