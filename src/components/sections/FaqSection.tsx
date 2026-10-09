import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Accordion } from '../ui/Accordion';
import { faqs } from '../../data/faqs';

export const FaqSection: React.FC = () => {
  const accordionItems = faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: (
      <div>
        <p className="mb-2">{f.answer}</p>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#00ff88]/80 bg-[#00ff88]/5 px-2 py-0.5 rounded border border-[#00ff88]/10">
          {f.category || 'Support'}
        </span>
      </div>
    )
  }));

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 content-visibility-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Web Design FAQ"
          title="Frequently Asked"
          highlightText="Questions"
          description="Common questions about web design services, timelines, pricing, and WordPress website development in Bangalore."
        />

        {/* Accordion Component */}
        <Accordion items={accordionItems} defaultOpenIndex={0} />

      </div>
    </section>
  );
};
