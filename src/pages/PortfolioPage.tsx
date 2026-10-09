import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Monitor, Users, ShieldCheck, Zap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { ProjectCard } from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  return (
    <>
      <Seo
        title="Selected Projects | Imam Khan Bangalore"
        description="Real Designs. Real Results. Explore live client websites and work built by Imam Khan for fitness clubs, dental clinics, and local businesses."
        canonicalUrl="/portfolio"
      />

      <div className="pt-28 pb-16 bg-[#050505] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* A1. HEADER BLOCK */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              {/* Left Title Block */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#1a1a24] text-xs font-semibold text-[#00ff88] mb-3">
                  <span>PROJECTS</span>
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                  style={{ fontFamily: "'IBM Plex Serif', serif" }}
                >
                  Selected <span className="text-[#00ff88]">Projects</span>.
                </h1>
                <p className="text-2xl sm:text-3xl text-[#00ff88] mt-1 font-['Caveat',cursive]">
                  Real Designs. Real Results.
                </p>
              </div>

              {/* Right Profile Card */}
              <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-[0_0_20px_rgba(0,255,136,0.06)] shrink-0 max-w-md">
                <picture className="w-14 h-14 shrink-0 block">
                  <source srcSet="/images/imam-khan-about-380w.webp" type="image/webp" />
                  <img
                    src="/images/imam-khan-about.jpg"
                    alt="Imam Khan"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#00ff88] shrink-0"
                  />
                </picture>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-base truncate">Imam Khan</div>
                  <div className="text-xs text-[#9e9eb0] truncate">Web Designer &amp; WordPress Developer</div>
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-7 h-7 rounded-full bg-[#16161f] hover:bg-[#00ff88] text-[#9e9eb0] hover:text-black flex items-center justify-center transition-all border border-white/5"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-7 h-7 rounded-full bg-[#16161f] hover:bg-[#00ff88] text-[#00ff88] hover:text-black flex items-center justify-center transition-all border border-white/5"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* A2. STATS STRIP */}
          <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-5 sm:p-6 mb-12 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              <div className="flex items-center gap-3.5 pt-3 md:pt-0">
                <div className="w-11 h-11 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center shrink-0 text-[#00ff88]">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">10+</div>
                  <div className="text-xs text-[#9e9eb0] font-medium">Websites Delivered</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center shrink-0 text-[#00ff88]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">&lt;3</div>
                  <div className="text-xs text-[#9e9eb0] font-medium">Secondload</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center shrink-0 text-[#00ff88]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-xs text-[#9e9eb0] font-medium">Satisfaction Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center shrink-0 text-[#00ff88]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">5–7 Days</div>
                  <div className="text-xs text-[#9e9eb0] font-medium">Average Delivery</div>
                </div>
              </div>

            </div>
          </div>

          {/* A3. FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'healthcare', label: 'Healthcare' },
              { id: 'fitness', label: 'Fitness' },
              { id: 'wordpress', label: 'WordPress' },
              { id: 'automotive', label: 'Automotive' }
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                      : 'bg-[#111116] border border-[#1a1a24] text-[#9e9eb0] hover:text-white hover:border-[#00ff88]/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* A4. PROJECT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* A6. CLOSING CTA BAND */}
          <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto relative z-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'IBM Plex Serif', serif" }}
              >
                Have a project in mind? Let's build something that brings you customers.
              </h2>
              <p className="text-sm text-[#9e9eb0] mb-8" style={{ fontFamily: "'PT Serif', serif" }}>
                Fast 5–7 day delivery, custom mobile-first design, and direct lead generation setup for your business.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                >
                  Get Free Quote
                </Link>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#111116] hover:bg-[#1a1a24] border border-[#1a1a24] hover:border-[#00ff88]/40 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#00ff88]" />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
