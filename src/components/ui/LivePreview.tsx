import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { activePreviewManager } from '../../lib/activePreviewManager';

interface LivePreviewProps {
  project: Project;
}

const checkDataSaverOrSlow = (): boolean => {
  if (typeof navigator !== 'undefined') {
    const nav = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } };
    const conn = nav.connection;
    if (conn?.saveData) return true;
    if (conn?.effectiveType === '2g' || conn?.effectiveType === '3g' || conn?.effectiveType === 'slow-2g') return true;
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return true;
  }
  return false;
};

export const LivePreview: React.FC<LivePreviewProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopFrameRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);

  const [desktopWidth, setDesktopWidth] = useState<number>(640);
  const [phoneWidth, setPhoneWidth] = useState<number>(76);

  // Active status managed globally: max 1 iframe site-wide
  const [isActive, setIsActive] = useState<boolean>(() => activePreviewManager.getActiveId() === project.id);
  const [desktopLoaded, setDesktopLoaded] = useState<boolean>(false);
  const [phoneLoaded, setPhoneLoaded] = useState<boolean>(false);
  const [hasTimedOutOrError, setHasTimedOutOrError] = useState<boolean>(false);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const centerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLivePreviewEnabled = project.live_preview !== false && project.livePreview !== false;

  const domainName = project.liveUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');

  // 1. Subscribe to single global active preview manager
  useEffect(() => {
    const unsubscribe = activePreviewManager.subscribe((activeId) => {
      const active = activeId === project.id;
      setIsActive(active);
      if (!active) {
        setDesktopLoaded(false);
        setPhoneLoaded(false);
        setHasTimedOutOrError(false);
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
          loadTimeoutRef.current = null;
        }
      }
    });
    return unsubscribe;
  }, [project.id]);

  // 2. Measure dimensions with ResizeObserver for scaling math
  useEffect(() => {
    const desktopEl = desktopFrameRef.current;
    const phoneEl = phoneFrameRef.current;
    if (!desktopEl) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === desktopEl) {
          const w = entry.contentRect.width;
          if (w > 0) setDesktopWidth(w);
        } else if (entry.target === phoneEl) {
          const w = entry.contentRect.width;
          if (w > 0) setPhoneWidth(w);
        }
      }
    });

    ro.observe(desktopEl);
    if (phoneEl) ro.observe(phoneEl);

    if (desktopEl.clientWidth > 0) setDesktopWidth(desktopEl.clientWidth);
    if (phoneEl && phoneEl.clientWidth > 0) setPhoneWidth(phoneEl.clientWidth);

    return () => ro.disconnect();
  }, []);

  // 3. Desktop Hover / Focus trigger with 200ms debounce
  const handleMouseEnter = useCallback(() => {
    if (!isLivePreviewEnabled || checkDataSaverOrSlow()) return;
    if (!activePreviewManager.isReady()) return;

    hoverTimerRef.current = setTimeout(() => {
      activePreviewManager.setActive(project.id);
    }, 200);
  }, [project.id, isLivePreviewEnabled]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  // 4. Mobile Centering trigger: center in viewport for 800ms
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isLivePreviewEnabled) return;

    const checkMobileCenter = () => {
      if (window.innerWidth > 768) return;
      if (checkDataSaverOrSlow() || !activePreviewManager.isReady()) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardCenterY = rect.top + rect.height / 2;
      const viewportCenterY = viewportHeight / 2;
      const distFromCenter = Math.abs(cardCenterY - viewportCenterY);

      // Card is within center 35% of the screen
      const isCentered = distFromCenter < viewportHeight * 0.25;

      if (isCentered) {
        if (!centerTimerRef.current && activePreviewManager.getActiveId() !== project.id) {
          centerTimerRef.current = setTimeout(() => {
            activePreviewManager.setActive(project.id);
            centerTimerRef.current = null;
          }, 800);
        }
      } else {
        if (centerTimerRef.current) {
          clearTimeout(centerTimerRef.current);
          centerTimerRef.current = null;
        }
      }
    };

    window.addEventListener('scroll', checkMobileCenter, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkMobileCenter);
      if (centerTimerRef.current) clearTimeout(centerTimerRef.current);
    };
  }, [project.id, isLivePreviewEnabled]);

  // 5. 6-second timeout fallback
  useEffect(() => {
    if (isActive && !desktopLoaded && !hasTimedOutOrError) {
      loadTimeoutRef.current = setTimeout(() => {
        if (!desktopLoaded) {
          setHasTimedOutOrError(true);
        }
      }, 6000);
    }
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [isActive, desktopLoaded, hasTimedOutOrError]);

  const desktopScale = desktopWidth / 1280;
  const phoneScale = phoneWidth / 390;

  const showLiveIframe = isActive && !hasTimedOutOrError && isLivePreviewEnabled;
  const isDesktopIframeReady = showLiveIframe && desktopLoaded;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="rounded-xl overflow-hidden bg-[#15151c] mb-3 border border-white/10 shadow-lg group/preview relative"
    >
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
        ref={desktopFrameRef}
        className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0f]"
        style={{ aspectRatio: '16 / 9' }}
      >
        {/* BASE LAYER: Responsive <picture> Screenshot */}
        <picture className="absolute inset-0 w-full h-full block z-0">
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

        {/* LIVE LAYER: Desktop Frame (1280x720, transform scaled) */}
        {showLiveIframe && (
          <div
            className={`absolute inset-0 overflow-hidden pointer-events-none z-10 transition-opacity duration-300 ${
              desktopLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <iframe
              src={project.liveUrl}
              width="1280"
              height="720"
              loading="lazy"
              title={`${project.title} live website preview`}
              tabIndex={-1}
              aria-hidden="true"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setDesktopLoaded(true)}
              onError={() => setHasTimedOutOrError(true)}
              className="border-0 pointer-events-none"
              style={{
                width: '1280px',
                height: '720px',
                transform: `scale(${desktopScale})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
        )}

        {/* LIVE Pill (top-right of desktop screen when iframe is visible) */}
        {isDesktopIframeReady && (
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-[#00ff88]/40 text-[#00ff88] text-[9px] font-mono font-bold tracking-wider backdrop-blur-xs pointer-events-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span>LIVE</span>
          </div>
        )}

        {/* OVERLAPPING MOBILE PHONE FRAME (bottom-right) */}
        <div
          ref={phoneFrameRef}
          className="absolute right-2.5 bottom-2.5 w-[68px] sm:w-[82px] aspect-[390/844] rounded-lg overflow-hidden bg-[#0a0a0f] border-2 border-[#222233] shadow-[0_10px_25px_rgba(0,0,0,0.85)] z-20 group-hover/preview:translate-y-[-4px] transition-transform duration-300 pointer-events-none"
          style={{ aspectRatio: '390 / 844' }}
        >
          {/* Notch */}
          <div className="w-full h-2 bg-[#1a1a24] flex items-center justify-center shrink-0">
            <div className="w-3 h-1 rounded-full bg-white/20" />
          </div>

          <div className="relative w-full h-[calc(100%-8px)] overflow-hidden bg-[#0a0a0f]">
            {/* Phone Base Layer: Responsive <picture> */}
            <picture className="absolute inset-0 w-full h-full block z-0">
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

            {/* Phone Live Layer: Scaled 390x844 Iframe */}
            {showLiveIframe && (
              <div
                className={`absolute inset-0 overflow-hidden pointer-events-none z-10 transition-opacity duration-300 ${
                  phoneLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <iframe
                  src={project.liveUrl}
                  width="390"
                  height="844"
                  loading="lazy"
                  title={`${project.title} mobile live preview`}
                  tabIndex={-1}
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setPhoneLoaded(true)}
                  onError={() => {}}
                  className="border-0 pointer-events-none"
                  style={{
                    width: '390px',
                    height: '844px',
                    transform: `scale(${phoneScale})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
            )}
          </div>
        </div>

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
