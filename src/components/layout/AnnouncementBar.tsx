import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(siteConfig.announcement.enabled);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#00ff88]/20 via-[#00d2ff]/20 to-[#00ff88]/20 border-b border-[#00ff88]/30 py-2 px-4 text-xs font-medium text-white flex items-center justify-between relative z-50">
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
        <span>{siteConfig.announcement.text}</span>
        {siteConfig.announcement.link && (
          <a
            href={siteConfig.announcement.link}
            className="underline text-[#00ff88] font-bold hover:text-white transition-colors ml-1 inline-flex items-center gap-0.5"
          >
            <span>{siteConfig.announcement.linkText || 'Learn More'}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-[#9e9eb0] hover:text-white p-1 rounded transition-colors shrink-0 ml-2"
        aria-label="Dismiss Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
