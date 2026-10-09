import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Globe, Search, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { services } from '../data/services';
import { BusinessImpactSection } from '../components/sections/BusinessImpactSection';
import { ContactSection } from '../components/sections/ContactSection';

export const ServicesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout': return Layout;
      case 'Globe': return Globe;
      case 'Search': return Search;
      case 'Target': return Target;
      default: return Layout;
    }
  };

  return (
    <>
      <Seo
        title="Web Design & WordPress Services in Bangalore"
        description="Comprehensive web design, WordPress development, Local SEO, and lead generation funnels for businesses in Bangalore by Imam Khan."
      />

      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Services' }]} />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Services"
            title="Website Solutions That"
            highlightText="Drive Inbound Revenue"
            description="Explore our specialized web development services tailored to grow small businesses, clinics, and brands in Bangalore."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service) => {
              const Icon = getIcon(service.iconName);
              return (
                <div
                  key={service.slug}
                  className="rounded-2xl bg-[#0d0d12] border border-white/10 p-8 flex flex-col justify-between hover:border-[#00ff88]/40 hover:bg-[#121218] transition-all duration-300 group shadow-xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center border border-[#00ff88]/20 mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#9e9eb0] leading-relaxed mb-6 font-normal">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-2 mb-8">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#d1d1db]">
                        Core Deliverables:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#9e9eb0]">
                        {service.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#00ff88] hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Explore Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Button href="/contact" size="sm">
                      Get Quote
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Impact Framework */}
      <BusinessImpactSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
};
export default ServicesPage;
