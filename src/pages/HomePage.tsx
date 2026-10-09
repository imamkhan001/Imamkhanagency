import React from 'react';
import { Seo } from '../components/common/Seo';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesMarqueeSection } from '../components/sections/ServicesMarqueeSection';
import { BusinessImpactSection } from '../components/sections/BusinessImpactSection';
import { FeatureStripSection } from '../components/sections/FeatureStripSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { PricingSection } from '../components/sections/PricingSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';
import { FaqSection } from '../components/sections/FaqSection';
import { ContactSection } from '../components/sections/ContactSection';
import { siteConfig } from '../data/siteConfig';

export const HomePage: React.FC = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Imam Khan Web Design",
      "url": siteConfig.url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Imam Khan",
      "jobTitle": "Freelance Web Designer & WordPress Developer",
      "url": siteConfig.url,
      "sameAs": [
        siteConfig.instagram,
        siteConfig.linkedin
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Imam Khan - Web Designer & WordPress Expert",
      "image": `${siteConfig.url}/favicon.png`,
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "url": siteConfig.url,
      "priceRange": "INR 15000 - 75000",
      "openingHours": "Mo-Sa 09:00-21:00",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "areaServed": [
        "Bangalore",
        "Indiranagar",
        "Koramangala",
        "Whitefield",
        "HSR Layout",
        "Jayanagar",
        "Electronic City"
      ]
    }
  ];

  return (
    <>
      <Seo
        title="Web Designer, Developer & WordPress Expert in Bangalore"
        description="Imam Khan builds modern, mobile-first, and high-converting websites for businesses, dental clinics, gyms, and service companies in Bangalore."
        jsonLd={jsonLd}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Ticker */}
      <ServicesMarqueeSection />

      {/* 3. Business Impact: What Your Website Should Do */}
      <BusinessImpactSection />

      {/* 4. Trust Feature Strip */}
      <FeatureStripSection />

      {/* 5. About Section */}
      <AboutSection />

      {/* 6. Process Section */}
      <ProcessSection />

      {/* 7. Featured Projects */}
      <ProjectsSection />

      {/* 8. Pricing Packages */}
      <PricingSection />

      {/* 9. Testimonials & Outcomes */}
      <TestimonialsSection />

      {/* 10. Risk-Free Guarantees */}
      <GuaranteesSection />

      {/* 11. FAQ Accordion */}
      <FaqSection />

      {/* 12. Contact Form & Direct Channels */}
      <ContactSection />
    </>
  );
};
export default HomePage;
