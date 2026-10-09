import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Layout, Globe, Search, Target, MapPin, HelpCircle, PhoneCall } from 'lucide-react';
import { services } from '../../data/services';
import { locations } from '../../data/locations';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  const location = useLocation();

  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Scroll listener for sticky navbar background enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setResourcesDropdownOpen(false);
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
  }, [location.pathname]);

  // Lock scroll when mobile menu is open; remove on close, route change, or resize >= 768px
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');

      requestAnimationFrame(() => {
        if (mobileNavRef.current) {
          const firstFocusable = mobileNavRef.current.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
          );
          firstFocusable?.focus();
        }
      });
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Keyboard navigation & Focus Trap inside mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && mobileNavRef.current) {
        const focusables = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 h-[70px] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#222222] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#050505]/85 backdrop-blur-md border-b border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-[70px] flex items-center justify-between">
        
        {/* Brand Logo with 36x36 image, remove-white filter, drop-shadow, and IBM Plex Serif IMAM KHAN text */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3 no-underline group focus:outline-none"
        >
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
            className="text-base text-white font-semibold tracking-[0.05em] group-hover:text-[#00ff88] transition-colors"
            style={{ fontFamily: "var(--font-heading, 'IBM Plex Serif', serif)", fontWeight: 600, fontSize: '16px' }}
          >
            IMAM KHAN
          </span>
        </Link>

        {/* Desktop Navigation (md and up) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/about') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            About
          </Link>

          {/* Desktop Services Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className={`text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 py-1 focus:outline-none cursor-pointer ${
                isActive('/services') || servicesDropdownOpen ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#00ff88]' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-2xl bg-[#0a0a0f] border border-white/10 p-3 shadow-2xl shadow-black z-50">
                <div className="space-y-1">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                        {s.iconName === 'Layout' && <Layout className="w-4 h-4" />}
                        {s.iconName === 'Globe' && <Globe className="w-4 h-4" />}
                        {s.iconName === 'Search' && <Search className="w-4 h-4" />}
                        {s.iconName === 'Target' && <Target className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-[#00ff88] transition-colors">
                          {s.title}
                        </div>
                        <div className="text-[11px] text-[#9e9eb0] line-clamp-1">
                          {s.shortDesc}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-white/5 mt-1">
                    <Link
                      to="/services"
                      className="block text-center py-2 text-[11px] font-bold text-[#00ff88] hover:underline uppercase tracking-wider"
                    >
                      View All Services &amp; Packages →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/portfolio"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/portfolio') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            Portfolio
          </Link>

          <Link
            to="/pricing"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/pricing') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            Pricing
          </Link>

          <Link
            to="/blog"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/blog') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            Blog
          </Link>

          {/* Desktop Resources Dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              className={`text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 py-1 focus:outline-none cursor-pointer ${
                isActive('/resources') || isActive('/tools') || resourcesDropdownOpen ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
              }`}
            >
              <span>Resources</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180 text-[#00ff88]' : ''}`} />
            </button>

            {resourcesDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 rounded-2xl bg-[#0a0a0f] border border-white/10 p-3 shadow-2xl shadow-black z-50">
                <div className="space-y-1 text-xs">
                  <Link
                    to="/resources"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-white hover:text-[#00ff88] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#00ff88]" />
                    <span>Free Checklists &amp; Worksheets</span>
                  </Link>

                  <Link
                    to="/tools/website-cost-calculator"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-white hover:text-[#00ff88] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#00ff88]" />
                    <span>Website Cost Calculator</span>
                  </Link>

                  <Link
                    to="/tools/free-website-audit"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-white hover:text-[#00ff88] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#00d2ff]" />
                    <span>Free 6-Point Website Audit</span>
                  </Link>

                  <Link
                    to="/faq"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-white hover:text-[#00ff88] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#8e8e9f]" />
                    <span>Frequently Asked Questions</span>
                  </Link>

                  <Link
                    to="/book-a-call"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-white hover:text-[#00d2ff] transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#00d2ff]" />
                    <span>Book a Strategy Call</span>
                  </Link>

                  <div className="pt-2 pb-1 px-2.5 text-[10px] font-bold uppercase tracking-widest text-[#8e8e9f]">
                    Bangalore Locations:
                  </div>
                  {locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      to={`/${loc.slug}`}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-[#d1d1db] hover:text-white text-[11px] transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-[#00d2ff]" />
                      <span>{loc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isActive('/contact') ? 'text-[#00ff88]' : 'text-[#9e9eb0] hover:text-white'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action & Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:scale-105"
          >
            <span>Get Free Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#111111] border border-[#1a1a1a] text-white hover:text-[#00ff88] active:bg-[#1a1a24] focus:outline-none cursor-pointer transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU PANEL OVERLAY */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed top-[70px] inset-x-0 bottom-0 h-[calc(100dvh-70px)] z-40 bg-[#050505] overflow-y-auto p-[20px] flex flex-col gap-[12px] md:hidden animate-mobile-menu"
        >

          {/* 1. Home */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Home</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* 2. About */}
          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>About</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* 3. Services (Expandable Sub-links) */}
          <div className="w-full bg-[#111111] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full min-h-[56px] px-4 py-3 flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] cursor-pointer"
              aria-expanded={mobileServicesOpen}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 text-[#00ff88] transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="px-4 pb-3 space-y-2 border-t border-[#1a1a1a] pt-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    onClick={closeMobileMenu}
                    className="block py-2 text-xs text-[#d1d1db] hover:text-[#00ff88] transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
                <Link
                  to="/services"
                  onClick={closeMobileMenu}
                  className="block pt-2 text-xs font-bold text-[#00ff88] hover:underline"
                >
                  All Services &amp; Packages →
                </Link>
              </div>
            )}
          </div>

          {/* 4. Portfolio */}
          <Link
            to="/portfolio"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* 5. Pricing */}
          <Link
            to="/pricing"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Pricing</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* 6. Blog */}
          <Link
            to="/blog"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Blog</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* 7. Resources (Expandable) */}
          <div className="w-full bg-[#111111] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="w-full min-h-[56px] px-4 py-3 flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] cursor-pointer"
              aria-expanded={mobileResourcesOpen}
            >
              <span>Resources &amp; Tools</span>
              <ChevronDown className={`w-4 h-4 text-[#00ff88] transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileResourcesOpen && (
              <div className="px-4 pb-3 space-y-2 border-t border-[#1a1a1a] pt-2 text-xs">
                <Link
                  to="/resources"
                  onClick={closeMobileMenu}
                  className="block py-1.5 text-[#d1d1db] hover:text-[#00ff88]"
                >
                  Checklists &amp; Worksheets
                </Link>
                <Link
                  to="/tools/website-cost-calculator"
                  onClick={closeMobileMenu}
                  className="block py-1.5 text-[#d1d1db] hover:text-[#00ff88]"
                >
                  Website Cost Calculator
                </Link>
                <Link
                  to="/tools/free-website-audit"
                  onClick={closeMobileMenu}
                  className="block py-1.5 text-[#d1d1db] hover:text-[#00ff88]"
                >
                  Free 6-Point Website Audit
                </Link>
                <Link
                  to="/faq"
                  onClick={closeMobileMenu}
                  className="block py-1.5 text-[#d1d1db] hover:text-[#00ff88]"
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  to="/book-a-call"
                  onClick={closeMobileMenu}
                  className="block py-1.5 text-[#00d2ff] hover:underline font-semibold"
                >
                  Book a Strategy Call →
                </Link>
              </div>
            )}
          </div>

          {/* 8. Contact */}
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="w-full min-h-[56px] px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-xl flex items-center justify-between text-white font-semibold text-sm active:bg-[#1a1a24] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4 text-[#00ff88]" />
          </Link>

          {/* Full-width Green Get Free Quote CTA */}
          <div className="pt-2 pb-6">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="w-full min-h-[56px] py-4 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] active:bg-[#00cc66] text-black font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
