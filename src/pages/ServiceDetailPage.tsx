import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ContactForm } from '../components/forms/ContactForm';
import { services } from '../data/services';
import { siteConfig } from '../data/siteConfig';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <Seo
        title={`${service.title} | Imam Khan`}
        description={service.fullDesc}
        canonicalUrl={`/services/${service.slug}`}
      />

      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: service.title }
          ]}
        />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/30 inline-block mb-3">
              Specialized Service
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-[#9e9eb0] leading-relaxed font-normal">
              {service.fullDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Benefits & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Why Choose This Service?
                </h3>
                <ul className="space-y-3 text-sm text-[#d1d1db]">
                  {service.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  What You Receive (Deliverables)
                </h3>
                <ul className="space-y-3 text-sm text-[#d1d1db]">
                  {service.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00d2ff] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 text-xs sm:text-sm text-[#9e9eb0]">
                <strong className="text-white">Target Audience:</strong> {service.targetAudience}
              </div>

            </div>

            {/* Quick Proposal Form (5 cols) */}
            <div className="lg:col-span-5">
              <ContactForm initialService={service.title} />
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
export default ServiceDetailPage;
