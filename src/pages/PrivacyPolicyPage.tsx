import React from 'react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { siteConfig } from '../data/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Privacy Policy | Imam Khan"
        description="Privacy policy regarding user data collection, form submissions, and analytics for Imam Khan Web Design."
        canonicalUrl="/privacy-policy"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      </div>

      <article className="py-12 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#d1d1db] leading-relaxed">
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Privacy Policy
          </h1>

          <p className="text-xs text-[#8e8e9f]">Last Updated: March 2026</p>

          <p>
            At {siteConfig.name} (accessible at {siteConfig.url}), we respect your privacy and are committed to protecting any personal information you share with us through our contact forms, consultation booking requests, or direct WhatsApp inquiries.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            1. Information We Collect
          </h2>
          <p>
            When you submit an inquiry form or request a quote on our website, we collect your name, email address, phone/WhatsApp number, business type, estimated budget range, and project requirements.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            2. How We Use Your Information
          </h2>
          <p>
            We use your submitted details exclusively to evaluate your website project requirements, prepare custom proposals, communicate milestone updates, and respond to your direct inquiries via phone or WhatsApp.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            3. Data Security &amp; Confidentiality
          </h2>
          <p>
            Your information is handled strictly between you and Imam Khan. We do NOT sell, trade, or share your contact information with third-party telemarketers or external advertisers.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            4. Contact Us
          </h2>
          <p>
            If you have questions regarding this privacy policy or your stored data, feel free to contact us at <strong>{siteConfig.email}</strong> or via WhatsApp at <strong>{siteConfig.phone}</strong>.
          </p>
        </div>
      </article>
    </>
  );
};
export default PrivacyPolicyPage;
