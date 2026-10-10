import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from '../forms/ContactForm';
import { siteConfig } from '../../data/siteConfig';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="pt-24 pb-[96px] bg-[#07070a] relative overflow-hidden border-t border-[#1a1a24] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Contact Imam Khan"
          title="Start Your"
          highlightText="Website Project"
          description="Looking for a professional web designer in Bangalore? Share your business goals below for a free website consultation and custom proposal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#00ff88]/30">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-ping" />
                <span className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
                  Available for Immediate Booking
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9e9eb0] leading-relaxed">
                Accepting new web design and WordPress projects in Bangalore. Get your free strategy call and comprehensive proposal within 24 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Direct Communication Channels
              </h3>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-3 rounded-xl bg-[#111116] border border-white/5 hover:border-[#00ff88]/40 transition-colors group"
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
                className="flex items-start gap-3.5 p-3 rounded-xl bg-[#111116] border border-white/5 hover:border-[#00ff88]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00d2ff]/10 text-[#00d2ff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#8e8e9f]">Email Address</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#00d2ff] transition-colors">
                    {siteConfig.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#111116] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-[#ffb703]/10 text-[#ffb703] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#8e8e9f]">Location &amp; Office</div>
                  <div className="text-sm font-semibold text-white">
                    {siteConfig.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
};
