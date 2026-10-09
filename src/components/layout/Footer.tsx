import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Lock, MapPin, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { locations } from '../../data/locations';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050706] border-t border-white/5 pt-16 pb-[96px] text-[#8e8e9f] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 no-underline group">
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
                style={{ fontFamily: "var(--font-heading, 'IBM Plex Serif', serif)", fontWeight: 600, fontSize: '16px' }}
              >
                IMAM KHAN
              </span>
            </Link>

            <p className="text-sm font-semibold text-white">
              "Websites That Grow Your Business"
            </p>

            <p className="text-xs text-[#8e8e9f] max-w-sm leading-relaxed font-normal">
              High-converting, mobile-first website design and custom WordPress development for businesses in Bangalore.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span>Available for Freelance Projects</span>
            </div>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Web Services
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-[#00ff88] transition-colors flex items-center gap-1">
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/pricing" className="text-[#00ff88] hover:underline font-semibold">
                  View Transparent Pricing Packages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Bangalore Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Bangalore Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/${loc.slug}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#00d2ff] shrink-0" />
                    <span>{loc.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/blog" className="text-[#00ff88] hover:underline font-semibold">
                  Read Web Design Blog Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#00ff88] hover:underline font-mono text-xs font-medium"
              >
                <FaWhatsapp className="w-4 h-4 shrink-0" />
                <span>+91 9632164784</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-xs truncate"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{siteConfig.email}</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00ff88] transition-colors text-xs"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                <span>@imamkhan.web</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7d7d8e]">
          <div>
            © 2026 {siteConfig.name} • Web Designer &amp; WordPress Expert • Bangalore
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-[#ff4757] fill-[#ff4757]" /> in Bangalore
            </span>
            <span>•</span>
            <Link
              to="/admin"
              className="hover:text-[#00ff88] transition-colors flex items-center gap-1 text-[#666]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
