import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ArrowUpRight, ArrowUp, Calendar } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../data/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const techStack = [
    'Figma',
    'React',
    'TypeScript',
    'Node.js',
    'Supabase',
    'Tailwind',
    'WordPress',
    'Cloudflare'
  ];

  return (
    <footer className="bg-[#050505] text-[#9e9eb0] text-xs pt-16 pb-[96px] relative overflow-hidden border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. CTA BAND: Deep black and emerald-green gradient with rich dark-green glow and neon wave lines */}
        <div className="relative rounded-[28px] bg-[#050907] p-8 sm:p-12 md:p-14 mb-16 overflow-hidden shadow-2xl border border-emerald-500/30 before:absolute before:inset-0 before:rounded-[28px] before:p-[1px] before:bg-gradient-to-b before:from-[#00ff88]/60 before:via-[#059669]/20 before:to-transparent before:pointer-events-none before:z-0">
          
          {/* Deep Emerald Base Gradient */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(120% 80% at 50% 0%, #062b1a 0%, #041b11 35%, #03110b 65%, #020704 100%)',
            }}
            aria-hidden="true"
          />

          {/* Rich Dark-Green & Emerald Glow Concentrated in Upper & Center Area */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[360px] pointer-events-none z-0 blur-[90px] opacity-70"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(5,150,105,0.25) 45%, rgba(0,255,136,0.1) 70%, transparent 85%)',
            }}
            aria-hidden="true"
          />

          {/* Secondary Central Ambient Core Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] h-[260px] pointer-events-none z-0 blur-[60px] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.28) 0%, rgba(4,120,87,0.18) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Subtle Neon-Green Curved Wave Lines flowing diagonally along left & right edges */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1000 400"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="wave-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="85%" stopColor="#047857" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wave-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#059669" stopOpacity="0.35" />
                <stop offset="85%" stopColor="#065f46" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Left flowing curved wave lines */}
            <path
              d="M -60,40 C 120,80 180,240 240,420"
              fill="none"
              stroke="url(#wave-grad-left)"
              strokeWidth="1.75"
              strokeDasharray="4 2"
              className="opacity-75"
            />
            <path
              d="M -40,110 C 140,140 220,280 290,420"
              fill="none"
              stroke="url(#wave-grad-left)"
              strokeWidth="1.25"
            />
            <path
              d="M -20,190 C 150,210 240,320 330,420"
              fill="none"
              stroke="url(#wave-grad-left)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <path
              d="M 10,270 C 160,280 250,350 360,420"
              fill="none"
              stroke="url(#wave-grad-left)"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />

            {/* Right flowing curved wave lines */}
            <path
              d="M 1060,30 C 880,90 820,240 760,420"
              fill="none"
              stroke="url(#wave-grad-right)"
              strokeWidth="1.75"
              strokeDasharray="5 3"
              className="opacity-75"
            />
            <path
              d="M 1040,100 C 860,150 780,280 710,420"
              fill="none"
              stroke="url(#wave-grad-right)"
              strokeWidth="1.25"
            />
            <path
              d="M 1020,180 C 850,220 760,320 670,420"
              fill="none"
              stroke="url(#wave-grad-right)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <path
              d="M 990,260 C 840,290 750,350 640,420"
              fill="none"
              stroke="url(#wave-grad-right)"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Smooth gradient transitions to near-black at bottom and corners */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 90% 80% at 50% 115%, #020704 55%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Corner vignette darkening for clean contrast */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 0% 100%, rgba(2,7,4,0.85) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(2,7,4,0.85) 0%, transparent 45%)',
            }}
            aria-hidden="true"
          />

          {/* Very Subtle Texture & Micro-Grid for Depth */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.45) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#00ff88] mb-3 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20">
              Start A Project
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'IBM Plex Serif', serif" }}
            >
              Have an idea? Let's design it,{' '}
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00f0a0] to-[#00d2ff] bg-clip-text text-transparent">
                build it, ship it.
              </span>
            </h2>
            <p
              className="text-sm sm:text-base text-[#9e9eb0] mb-8 max-w-xl leading-relaxed"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Design that converts. Code that scales. From initial wireframes to production web apps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
              <a
                href="https://wa.me/919632164784?text=Hi%20Imam,%20I%20have%20an%20idea%20for%20a%20website/web%20app%20and%20would%20like%20to%20discuss%20designing%20and%20building%20it."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] active:bg-[#00cc66] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.35)] flex items-center gap-2 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 shrink-0 text-black" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="px-6 py-3.5 rounded-xl bg-[#111116] hover:bg-[#1a1a24] border border-[#1a1a1a] hover:border-white/20 text-white font-medium text-xs tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#00ff88]" />
                <span>Send an Email</span>
              </a>

              <Link
                to="/book-call"
                className="px-6 py-3.5 rounded-xl bg-[#111116] hover:bg-[#1a1a24] border border-[#1a1a1a] hover:border-[#00ff88]/40 text-white font-medium text-xs tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0 text-[#00d2ff]" />
                <span>Book a Call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION & BRAND GRID */}
        {/* Desktop 5 cols: Brand double width (2 cols) + 3 link columns (1 col each). Tablet: 2 cols. Mobile: 1 col with 2-col link lists */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#1a1a1a]"
        >
          {/* Brand Info (Double width on desktop: lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-flex items-center gap-3 no-underline group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded-lg">
              <picture className="shrink-0 w-9 h-9 block">
                <source
                  type="image/webp"
                  srcSet="/images/imam-khan-logo-72w.webp 72w, /images/imam-khan-logo-144w.webp 144w"
                  sizes="36px"
                />
                <img
                  src="/images/imam-khan-logo-72w.png"
                  alt="Imam Khan Logo"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: 'contain',
                    filter: 'url(#remove-white) drop-shadow(0 0 5px rgba(0,255,136,0.65))'
                  }}
                />
              </picture>
              <span
                className="font-semibold text-base text-white tracking-[0.05em] group-hover:text-[#00ff88] transition-colors"
                style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: '16px' }}
              >
                IMAM KHAN
              </span>
            </Link>

            <p
              className="text-xs text-[#d1d1db] max-w-md leading-relaxed font-normal"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              UI/UX designer &amp; full-stack developer building fast, conversion-focused websites and web apps.
            </p>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span>Available for new projects</span>
            </div>

            {/* Round Social Icon Buttons with Hover Glow */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Imam Khan on Instagram"
                className="w-9 h-9 rounded-full bg-[#0d0d12] border border-[#1a1a1a] hover:border-[#00ff88]/60 text-[#d1d1db] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88]"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Message"
                className="w-9 h-9 rounded-full bg-[#0d0d12] border border-[#1a1a1a] hover:border-[#00ff88]/60 text-[#d1d1db] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88]"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send email to Imam Khan"
                className="w-9 h-9 rounded-full bg-[#0d0d12] border border-[#1a1a1a] hover:border-[#00ff88]/60 text-[#d1d1db] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Column: verified routes only */}
          <div className="space-y-3.5">
            <h3
              className="text-[13px] font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: "'IBM Plex Serif', serif" }}
            >
              Explore
            </h3>
            <ul className="space-y-2 text-xs grid grid-cols-2 sm:grid-cols-1 gap-x-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Projects', href: '/portfolio' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
                { label: 'Resources', href: '/resources' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
                { label: 'Book a Call', href: '/book-call' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group/link inline-flex items-center text-[#d1d1db] hover:text-[#00ff88] transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="block max-w-0 group-hover/link:max-w-full transition-all duration-200 h-[1px] bg-[#00ff88]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column: 6 requested services matching existing routes with no city names */}
          <div className="space-y-3.5">
            <h3
              className="text-[13px] font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: "'IBM Plex Serif', serif" }}
            >
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'UI/UX Design', href: '/services/web-design-bangalore' },
                { label: 'Full-Stack Web Apps', href: '/services/web-design-bangalore' },
                { label: 'WordPress & CMS', href: '/services/wordpress-development-bangalore' },
                { label: 'Landing Pages & Lead Gen', href: '/services/lead-generation-websites' },
                { label: 'Google Business & SEO', href: '/services/local-seo-bangalore' },
                { label: 'Speed & Performance', href: '/services/web-design-bangalore' },
              ].map((svc, sIdx) => (
                <li key={sIdx}>
                  <Link
                    to={svc.href}
                    className="group/link inline-flex items-center text-[#d1d1db] hover:text-[#00ff88] transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
                  >
                    <span className="relative">
                      {svc.label}
                      <span className="block max-w-0 group-hover/link:max-w-full transition-all duration-200 h-[1px] bg-[#00ff88]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column: WhatsApp, Email (no truncation, overflow-wrap:anywhere), Instagram */}
          <div className="space-y-3.5">
            <h3
              className="text-[13px] font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: "'IBM Plex Serif', serif" }}
            >
              Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7d7d8e] block mb-0.5">
                  WhatsApp Direct
                </span>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-[#00ff88] hover:text-[#00dd77] font-mono text-xs font-semibold transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7d7d8e] block mb-0.5">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group/link inline-flex items-start gap-1.5 text-[#d1d1db] hover:text-[#00ff88] text-xs transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
                  style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#00ff88]" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7d7d8e] block mb-0.5">
                  Instagram
                </span>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-[#d1d1db] hover:text-[#00ff88] text-xs transition-all duration-200 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0 text-[#00d2ff]" />
                  <span>@imamkhan.web</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* 3. TECH STRIP: slow CSS marquee of chips with pause on hover */}
        <div className="py-6 border-b border-[#1a1a1a] overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-3">
              {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d0d12] border border-[#1a1a1a] hover:border-[#00ff88]/40 text-[#d1d1db] text-[11px] font-mono shrink-0 select-none transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8e8e9f]">
          <div className="text-center sm:text-left">
            © 2026 Imam Khan · UI/UX Designer &amp; Full-Stack Developer
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy-policy"
              className="text-[#8e8e9f] hover:text-[#00ff88] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
            >
              Privacy Policy
            </Link>
            <span className="text-[#1a1a1a]">·</span>
            <Link
              to="/terms"
              className="text-[#8e8e9f] hover:text-[#00ff88] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
            >
              Terms
            </Link>
            <span className="text-[#1a1a1a]">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#8e8e9f] hover:text-[#00ff88] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] rounded"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5. Decorative giant outlined "IMAM KHAN" wordmark at the very bottom: low opacity gradient stroke */}
        <div
          className="relative w-full overflow-hidden select-none pointer-events-none mt-2 text-center"
          aria-hidden="true"
        >
          <span
            className="block font-bold tracking-tighter leading-none whitespace-nowrap opacity-[0.07] uppercase"
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontSize: 'clamp(3rem, 14vw, 12rem)',
              WebkitTextStroke: '1.5px rgba(0, 255, 136, 0.4)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            IMAM KHAN
          </span>
        </div>

      </div>
    </footer>
  );
};
