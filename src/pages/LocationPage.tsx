import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ContactForm } from '../components/forms/ContactForm';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { PricingSection } from '../components/sections/PricingSection';
import { locations } from '../data/locations';
import { siteConfig } from '../data/siteConfig';

export const LocationPage: React.FC = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace('/', '');
  const locationItem = locations.find((l) => l.slug === slug);

  if (!locationItem) {
    return <Navigate to="/" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Imam Khan Web Design - ${locationItem.name}`,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "url": `${siteConfig.url}/${locationItem.slug}`,
    "areaServed": locationItem.area,
    "priceRange": "INR 15000 - 75000"
  };

  return (
    <>
      <Seo
        title={locationItem.title}
        description={locationItem.description}
        canonicalUrl={`/${locationItem.slug}`}
        jsonLd={jsonLd}
      />

      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Bangalore Locations', href: '/' },
            { label: locationItem.name }
          ]}
        />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 text-xs font-semibold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{locationItem.area}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Web Design &amp; Development in <span className="text-[#00ff88]">{locationItem.name}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9e9eb0] leading-relaxed font-normal mb-8">
              {locationItem.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#contact">
                <span>Get Free Quote for {locationItem.name}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                <span>WhatsApp Chat</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Services for this location */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Specialized Solutions for {locationItem.name} Businesses
                </h3>
                <p className="text-xs sm:text-sm text-[#9e9eb0] leading-relaxed">
                  Every business in {locationItem.name} faces fierce local competition. A slow, generic site means lost leads. We build conversion-engineered web presences that stand out and capture high-intent buyers in your neighborhood.
                </p>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#d1d1db] mb-3">
                    Popular Services in {locationItem.name}:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#d1d1db]">
                    {locationItem.popularServices.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Proposal Form */}
            <div className="lg:col-span-5" id="contact">
              <ContactForm initialService={`Website Project - ${locationItem.name}`} />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Projects */}
      <ProjectsSection />

      {/* Pricing */}
      <PricingSection />
    </>
  );
};
export default LocationPage;
