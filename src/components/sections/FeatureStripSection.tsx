import React from 'react';
import { Zap, Smartphone, Search } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const FeatureStripSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      desc: 'Get your professional website live in as little as 5–7 days, complete with premium features.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      desc: 'Flawless and optimized user experience across smartphones, tablets, and desktops.'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      desc: 'Proper semantic tags, fast loading speeds, and structural setup to rank high on Google.'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp Support',
      desc: 'Direct communication during development and ongoing post-launch maintenance support.'
    }
  ];

  return (
    <section className="py-16 bg-[#08080c] border-b border-[#1a1a24] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-[#00ff88]/30 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center shrink-0 border border-[#00ff88]/20 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#9e9eb0] leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
