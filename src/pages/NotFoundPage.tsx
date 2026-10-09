import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../data/siteConfig';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="404 Page Not Found | Imam Khan"
        description="The page you are looking for does not exist or has been moved."
        noIndex={true}
      />

      <section className="min-h-[75vh] flex items-center justify-center py-24 bg-[#050505] px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-7xl font-bold font-mono text-[#00ff88]">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-[#9e9eb0] leading-relaxed font-normal">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button href="/" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Button>

            <Button
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              <span>Contact Support</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotFoundPage;
