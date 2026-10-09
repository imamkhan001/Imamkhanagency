import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnnouncementBar } from './AnnouncementBar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { ScrollToTop } from './ScrollToTop';
import { useScrollToTop } from '../../hooks/useScrollTop';
import { getSiteSettings } from '../../lib/settings';
import { initDeferredAnalytics } from '../../lib/analytics';
import { ShieldAlert, Lock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useScrollToTop();
  const location = useLocation();
  const [maintenance, setMaintenance] = useState(false);
  const [settings, setSettings] = useState(getSiteSettings());

  useEffect(() => {
    initDeferredAnalytics();
  }, []);

  useEffect(() => {
    const currentSettings = getSiteSettings();
    setSettings(currentSettings);
    if (currentSettings.maintenanceMode && !location.pathname.startsWith('/admin')) {
      setMaintenance(true);
    } else {
      setMaintenance(false);
    }
  }, [location.pathname]);

  if (maintenance) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f4f4f6] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] mx-auto shadow-[0_0_30px_rgba(0,255,136,0.3)]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="max-w-md space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            System Maintenance
          </span>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            We'll Be Back Shortly
          </h1>
          <p className="text-xs text-[#9e9eb0] leading-relaxed">
            {settings.maintenanceNotice}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Imam,%20I'm%20reaching%20out%20during%20maintenance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          >
            <FaWhatsapp className="w-4 h-4 text-black" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            to="/admin"
            className="text-xs text-[#8e8e9f] hover:text-white underline flex items-center gap-1"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#f4f4f6] selection:bg-[#00ff88]/30 selection:text-[#00ff88]">
      {/* Global SVG ColorMatrix Filter for Logo White Background Removal */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="remove-white" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -10 -10 -10 30 -1.5" />
        </filter>
      </svg>

      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1001] focus:px-4 focus:py-2 focus:bg-[#00ff88] focus:text-black focus:font-bold focus:text-xs focus:rounded-xl focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
};
