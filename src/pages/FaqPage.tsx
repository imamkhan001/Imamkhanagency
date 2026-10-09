import React, { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tabs } from '../components/ui/Tabs';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { faqs } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';
import { ContactSection } from '../components/sections/ContactSection';

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions', count: faqs.length },
    { id: 'Process & Timeline', label: 'Process & Timeline' },
    { id: 'Pricing & Cost', label: 'Pricing & Cost' },
    { id: 'Technical & Performance', label: 'Technical & Speed' },
    { id: 'Post-Launch & Warranty', label: 'Post-Launch' }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const accordionItems = filteredFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: (
      <div className="space-y-2">
        <p>{f.answer}</p>
        <div className="pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-2.5 py-1 rounded border border-[#00ff88]/20">
            {f.category}
          </span>
        </div>
      </div>
    )
  }));

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <>
      <Seo
        title="12 Web Design & WordPress FAQs | Imam Khan Bangalore"
        description="Comprehensive answers regarding website costs in Bangalore, delivery timelines, mobile optimization, WordPress CMS editing, and 30-day guarantees."
        canonicalUrl="/faq"
        jsonLd={faqPageSchema}
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="Help &amp; Knowledge Base"
            title="Web Design &amp; Development"
            highlightText="FAQ Hub"
            description="Clear, honest answers regarding pricing, project timelines, mobile speed performance, and post-launch support."
          />

          {/* Search Input */}
          <div className="relative mb-10">
            <Search className="w-5 h-5 text-[#8e8e9f] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by keyword (e.g. pricing, speed, hosting, domain, timeline)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0d0d12] border border-white/10 text-white placeholder-[#666] text-sm focus:border-[#00ff88] focus:outline-none shadow-xl"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-10">
            <Tabs
              tabs={categories}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {/* Accordion Component */}
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0d0d12] border border-white/10 space-y-3">
              <HelpCircle className="w-10 h-10 text-[#8e8e9f] mx-auto" />
              <div className="text-base font-bold text-white">No matching questions found</div>
              <p className="text-xs text-[#8e8e9f]">
                Try searching for broader keywords or contact Imam Khan directly on WhatsApp.
              </p>
              <Button href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" size="sm" className="mt-2">
                <FaWhatsapp className="w-4 h-4 mr-1.5" />
                <span>Ask on WhatsApp</span>
              </Button>
            </div>
          ) : (
            <Accordion items={accordionItems} defaultOpenIndex={0} />
          )}

        </div>
      </section>

      {/* Guarantees */}
      <GuaranteesSection />

      {/* Contact Form */}
      <ContactSection />
    </>
  );
};
export default FaqPage;
