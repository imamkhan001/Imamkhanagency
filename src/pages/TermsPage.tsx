import React from 'react';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { siteConfig } from '../data/siteConfig';

export const TermsPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Terms of Service | Imam Khan"
        description="Terms of service, payment schedules, project timelines, and warranty terms for website design services."
        canonicalUrl="/terms"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      </div>

      <article className="py-12 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#d1d1db] leading-relaxed">
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Terms of Service
          </h1>

          <p className="text-xs text-[#8e8e9f]">Last Updated: March 2026</p>

          <p>
            Welcome to {siteConfig.name}. By engaging our freelance website design, WordPress development, or Local SEO services, you agree to the following transparent terms.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            1. Payment Terms &amp; Schedules
          </h2>
          <p>
            All website design projects operate on a transparent 50/50 split schedule: a 50% upfront deposit is required to initiate design and strategy, and the final 50% balance is payable upon project review and approval before live domain deployment.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            2. Project Timelines &amp; Deliverables
          </h2>
          <p>
            Project delivery estimates (3-5 days for landing pages, 7-12 days for custom WordPress sites) depend on prompt client feedback and asset provision (logos, photos, text).
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            3. 30-Day Money-Back Guarantee
          </h2>
          <p>
            If you are not satisfied with the initial design direction within 30 days of starting, you receive a full 100% refund of your deposit.
          </p>

          <h2 className="text-xl font-bold text-white pt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            4. 12-Month Bug-Fix Guarantee
          </h2>
          <p>
            12-Month Bug-Fix Guarantee: bugs in my code are fixed free for 12 months after launch.
          </p>
        </div>
      </article>
    </>
  );
};
export default TermsPage;
