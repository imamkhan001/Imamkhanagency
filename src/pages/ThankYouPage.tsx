import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../data/siteConfig';

export const ThankYouPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Thank You! Inquiry Received | Imam Khan"
        description="Thank you for submitting your project request. Imam Khan will review your requirements and respond within 24 hours."
        canonicalUrl="/thank-you"
        noIndex={true}
      />

      <section className="min-h-[75vh] flex items-center justify-center py-24 bg-[#050505] px-4 text-center">
        <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0d0d12] border border-[#00ff88]/30 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center mx-auto border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Thank You for Reaching Out!
          </h1>

          <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed font-normal">
            Your inquiry has been successfully received. I will review your business requirements and contact you within <strong className="text-white">24 hours</strong> with a customized project proposal.
          </p>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-[#d1d1db] text-left space-y-2">
            <div className="font-bold text-[#00ff88] uppercase tracking-wider">What Happens Next:</div>
            <div className="flex items-center gap-2">
              <span>1. Initial review of your business industry &amp; competitors in Bangalore</span>
            </div>
            <div className="flex items-center gap-2">
              <span>2. Preparation of custom site architecture &amp; pricing breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span>3. Direct WhatsApp/Phone consultation to confirm project start</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              <span>Instant Chat on WhatsApp</span>
            </Button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#121218] border border-white/10 hover:border-white/30 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default ThankYouPage;
