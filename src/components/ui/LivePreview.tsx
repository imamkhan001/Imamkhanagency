import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import LivePreviewCore from '../LivePreview';

interface LivePreviewProps {
  project: Project;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ project }) => {
  const isLivePreviewEnabled = project.live_preview !== false && project.livePreview !== false;

  const domainName = project.liveUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');

  return (
    <div className="rounded-xl overflow-hidden bg-[#15151c] mb-3 border border-white/10 shadow-lg group/preview relative">
      {/* Browser Top Bar */}
      <div className="bg-[#1a1a24] px-3 py-1.5 flex items-center gap-2 border-b border-white/5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <div className="flex-1 mx-2 min-w-0">
          <div className="bg-[#111116] rounded-md px-2 py-0.5 text-[10px] font-mono text-[#8e8e9f] truncate text-center select-none">
            {domainName}
          </div>
        </div>
      </div>

      {/* Screen Area (16:9 ratio) */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0f]"
        style={{ aspectRatio: '16 / 9' }}
      >
        <LivePreviewCore
          url={project.liveUrl}
          title={`${project.title} live website preview`}
          width={1280}
          height={720}
          enabled={isLivePreviewEnabled}
        >
          {/* BASE LAYER: Responsive <picture> Screenshot with static gradient fallback */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#15151c] to-[#0a0a0f] flex items-center justify-center p-4 text-center z-0">
            <span className="text-xs font-semibold text-[#8e8e9f] tracking-wide uppercase select-none">
              {project.title}
            </span>
          </div>
          <picture className="absolute inset-0 w-full h-full block z-[1]">
            <source
              type="image/webp"
              srcSet={`/images/${project.slug}-preview-480w.webp 480w, /images/${project.slug}-preview-800w.webp 800w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            />
            <img
              src={project.desktopImage || `/images/${project.slug}-preview.jpg`}
              alt={`${project.title} Preview`}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </picture>

          {/* OVERLAPPING MOBILE PHONE FRAME (bottom-right) */}
          <div
            className="absolute right-2.5 bottom-2.5 w-[68px] sm:w-[82px] aspect-[390/844] rounded-lg overflow-hidden bg-[#0a0a0f] border-2 border-[#222233] shadow-[0_10px_25px_rgba(0,0,0,0.85)] z-20 group-hover/preview:translate-y-[-4px] transition-transform duration-300 pointer-events-none"
            style={{ aspectRatio: '390 / 844' }}
          >
            {/* Notch */}
            <div className="w-full h-2 bg-[#1a1a24] flex items-center justify-center shrink-0">
              <div className="w-3 h-1 rounded-full bg-white/20" />
            </div>

            <div className="relative w-full h-[calc(100%-8px)] overflow-hidden bg-[#0a0a0f]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] z-0" />
              <picture className="absolute inset-0 w-full h-full block z-[1]">
                <source
                  type="image/webp"
                  srcSet={`/images/${project.slug}-mobile-160w.webp 160w, /images/${project.slug}-mobile-320w.webp 320w`}
                  sizes="82px"
                />
                <img
                  src={project.mobileImage || `/images/${project.slug}-mobile.jpg`}
                  alt={`${project.title} Mobile Preview`}
                  width={320}
                  height={693}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </picture>
            </div>
          </div>
        </LivePreviewCore>

        {/* Hover / Focus Overlay with "View Live Website →" button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 group-focus-within/preview:opacity-100 transition-opacity duration-300 backdrop-blur-xs flex items-center justify-center z-30 pointer-events-none group-hover/preview:pointer-events-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#00ff88] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.5)] flex items-center gap-1.5 transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300 cursor-pointer pointer-events-auto"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
