import React from 'react';
import { Shield, Zap, Smartphone, Gauge, Search, PhoneCall, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { guarantees } from '../../data/guarantees';

export const GuaranteesSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return Shield;
      case 'Zap': return Zap;
      case 'Smartphone': return Smartphone;
      case 'Gauge': return Gauge;
      case 'Search': return Search;
      case 'PhoneCall': return PhoneCall;
      default: return Sparkles;
    }
  };

  return (
    <section id="guarantee" className="py-24 bg-[#08080c] relative overflow-hidden border-t border-[#1a1a24] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Why Clients Trust Imam Khan"
          title="Rock-Solid Guarantees &amp;"
          highlightText="Zero Risk"
          description="Ironclad professional commitments and money-back guarantees backing every single website build."
        />

        {/* Guarantee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-[#00ff88]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9e9eb0] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
