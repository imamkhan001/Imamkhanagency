import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { pricingPlans } from '../../data/pricing';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-[#08080c] relative overflow-hidden border-t border-[#1a1a24] scroll-mt-20 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Transparent Website Design Pricing"
          title="Invest In A"
          highlightText="High-Return Website"
          description="Premium quality web design packages structured to deliver maximum return on investment for small businesses and local service providers in Bangalore."
        />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#121c17] to-[#0d0d12] border-2 border-[#00ff88] shadow-[0_0_40px_rgba(0,255,136,0.15)] scale-[1.02]'
                  : 'bg-[#0d0d12] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00ff88] text-black font-bold text-[10px] uppercase tracking-widest shadow-[0_0_15px_#00ff88]">
                  {plan.badge}
                </div>
              )}

              <div>
                {!plan.popular && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8e8e9f] block mb-2">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl sm:text-4xl font-bold text-[#00ff88] font-mono tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#8e8e9f]">starts at</span>
                </div>

                <p className="text-xs text-[#9e9eb0] leading-relaxed mb-6 font-normal min-h-[36px]">
                  {plan.subtext}
                </p>

                {/* Feature List */}
                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="text-[10px] uppercase font-bold text-[#d1d1db] tracking-wider mb-3">
                    What's Included:
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#d1d1db]">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <Button
                href="#contact"
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full"
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Application Box */}
        <div className="rounded-2xl bg-[#0d0d12] border border-[#00d2ff]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-widest block mb-1">
              Custom Portals &amp; Advanced Web Apps
            </span>
            <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Need a Custom Database or Booking Portal?
            </h4>
            <p className="text-xs sm:text-sm text-[#9e9eb0] max-w-2xl font-normal">
              For SaaS MVPs, real-time database integrations (Supabase), custom client portals, and complex calculators starting from <strong className="text-white">₹75,000+</strong>.
            </p>
          </div>
          <Button
            href="https://wa.me/919632164784?text=Hi%20Imam,%20I%20need%20a%20custom%20web%20application%20portal."
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="border-[#00d2ff]/40 text-[#00d2ff] hover:bg-[#00d2ff]/10 inline-flex items-center gap-2"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Discuss Custom Build</span>
          </Button>
        </div>

      </div>
    </section>
  );
};
