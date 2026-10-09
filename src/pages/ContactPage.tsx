import React from 'react';
import { Mail, MapPin, Clock, ShieldCheck, PhoneCall } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactForm } from '../components/forms/ContactForm';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';
import { siteConfig } from '../data/siteConfig';

export const ContactPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Contact Imam Khan | Free Web Design Consultation in Bangalore"
        description="Get in touch with Imam Khan for website design and WordPress development in Bangalore. Request a free quote or message directly on WhatsApp (+91 9632164784)."
        canonicalUrl="/contact"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Contact & Free Quote' }]} />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="Get In Touch"
            title="Start Your Business"
            highlightText="Website Project"
            description="Looking for a professional web designer in Bangalore? Request a free proposal below or message directly on WhatsApp for an instant response."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Direct Channels Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Working Hours Card */}
              <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#00ff88]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Working Hours &amp; Availability</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-[#d1d1db]">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span>Monday – Saturday:</span>
                    <span className="font-mono text-white font-medium">9:00 AM – 9:00 PM IST</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Sunday:</span>
                    <span className="font-mono text-white font-medium">9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Direct Contact Information
                </h3>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#111116] border border-white/5 hover:border-[#00ff88]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8e9f]">WhatsApp (Fastest Response)</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors font-mono">
                      {siteConfig.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#111116] border border-white/5 hover:border-[#00ff88]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00d2ff]/10 text-[#00d2ff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8e9f]">Primary Email Address</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#00d2ff] transition-colors">
                      {siteConfig.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#111116] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#ffb703]/10 text-[#ffb703] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8e9f]">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {siteConfig.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder Box */}
              <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#00d2ff]" />
                  <span>Bangalore Service Coverage Map</span>
                </div>
                <div className="h-36 rounded-xl bg-[#08080a] border border-white/5 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="w-8 h-8 text-[#00ff88] mb-1 animate-bounce" />
                  <div className="text-xs font-bold text-white">Serving All Bangalore Neighborhoods</div>
                  <div className="text-[10px] text-[#8e8e9f]">Indiranagar • Koramangala • Whitefield • HSR • Jayanagar</div>
                </div>
              </div>

            </div>

            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>

        </div>
      </section>

      {/* Guarantees */}
      <GuaranteesSection />
    </>
  );
};
export default ContactPage;
