import React from 'react';
import { Check, X, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { PricingSection } from '../components/sections/PricingSection';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';
import { ContactSection } from '../components/sections/ContactSection';
import { faqs } from '../data/faqs';

export const PricingPage: React.FC = () => {
  const comparisonMatrix = [
    { feature: 'Number of Custom Pages', starter: '1 Page', pro: '5–7 Pages', ecommerce: '10+ Pages', enterprise: 'Unlimited' },
    { feature: 'Mobile-First Responsive Layout', starter: true, pro: true, ecommerce: true, enterprise: true },
    { feature: 'WordPress Easy CMS Editor', starter: false, pro: true, ecommerce: true, enterprise: true },
    { feature: 'Direct WhatsApp & Call Lead Triggers', starter: true, pro: true, ecommerce: true, enterprise: true },
    { feature: 'Payment Gateway (Razorpay/UPI)', starter: false, pro: false, ecommerce: true, enterprise: true },
    { feature: 'Local SEO & Schema.org JSON-LD', starter: 'Basic', pro: 'Full Local SEO', ecommerce: 'E-Com SEO', enterprise: 'Custom Architecture' },
    { feature: 'Page Speed Optimization', starter: 'Sub-3s', pro: 'Sub-2.5s', ecommerce: 'Sub-2.5s', enterprise: 'Sub-1.8s' },
    { feature: 'Delivery Timeline', starter: '3–5 Days', pro: '7–12 Days', ecommerce: '14–20 Days', enterprise: 'Custom' },
    { feature: 'Post-Launch Support', starter: '14 Days', pro: '30 Days', ecommerce: '60 Days', enterprise: '90 Days' },
    { feature: '30-Day Money Back Guarantee', starter: true, pro: true, ecommerce: true, enterprise: true },
  ];

  const pricingFaqs = faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer
  }));

  return (
    <>
      <Seo
        title="Transparent Website Design Pricing in Bangalore | Imam Khan"
        description="Clear website design packages: Starter Landing Page ₹15,000, Professional Site ₹25,000, E-Commerce ₹40,000, Custom Web App ₹75,000+. 30-Day Money-Back Guarantee."
        canonicalUrl="/pricing"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Pricing Packages & Comparison' }]} />
      </div>

      {/* Main Pricing Cards */}
      <PricingSection />

      {/* Feature Comparison Matrix */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Detailed Package Matrix"
            title="Compare Package"
            highlightText="Features &amp; Specs"
            description="Side-by-side feature comparison across all 4 website design tiers."
          />

          <div className="rounded-2xl border border-white/10 overflow-x-auto bg-[#0d0d12] shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm text-[#d1d1db]">
              <thead className="bg-[#111116] border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#8e8e9f]">
                <tr>
                  <th className="p-4 sm:p-6 min-w-[180px]">Package Feature</th>
                  <th className="p-4 sm:p-6 text-center text-[#d1d1db]">Starter (₹15k)</th>
                  <th className="p-4 sm:p-6 text-center text-[#00ff88]">Pro (₹25k)</th>
                  <th className="p-4 sm:p-6 text-center text-[#00d2ff]">E-Com (₹40k)</th>
                  <th className="p-4 sm:p-6 text-center text-[#ffb703]">Custom (₹75k+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-6 font-semibold text-white">{row.feature}</td>
                    
                    <td className="p-4 sm:p-6 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="w-4 h-4 text-[#00ff88] mx-auto" /> : <X className="w-4 h-4 text-red-500/40 mx-auto" />
                      ) : (
                        <span className="font-mono text-xs">{row.starter}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-6 text-center font-bold text-white bg-[#00ff88]/5">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-4 h-4 text-[#00ff88] mx-auto" /> : <X className="w-4 h-4 text-red-500/40 mx-auto" />
                      ) : (
                        <span className="font-mono text-xs text-[#00ff88]">{row.pro}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-6 text-center">
                      {typeof row.ecommerce === 'boolean' ? (
                        row.ecommerce ? <Check className="w-4 h-4 text-[#00d2ff] mx-auto" /> : <X className="w-4 h-4 text-red-500/40 mx-auto" />
                      ) : (
                        <span className="font-mono text-xs text-[#00d2ff]">{row.ecommerce}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-6 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="w-4 h-4 text-[#ffb703] mx-auto" /> : <X className="w-4 h-4 text-red-500/40 mx-auto" />
                      ) : (
                        <span className="font-mono text-xs text-[#ffb703]">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <GuaranteesSection />

      {/* 12-Question Pricing FAQ Accordion */}
      <section className="py-20 bg-[#08080c] border-t border-[#1a1a24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing FAQ"
            title="12 Pricing Questions"
            highlightText="Answered"
            description="Clear answers regarding deposit schedules, domain costs, revisions, and money-back guarantees."
          />

          <Accordion items={pricingFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* Lead Form */}
      <ContactSection />
    </>
  );
};
export default PricingPage;
