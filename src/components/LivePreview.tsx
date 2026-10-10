import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  url: string;
  title: string;
  width?: number;
  height?: number;
  enabled?: boolean;
  children: ReactNode;
};

const warmed = new Set<string>();
function warm(url: string) {
  try {
    const origin = new URL(url).origin;
    if (warmed.has(origin)) return;
    warmed.add(origin);
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = origin;
    document.head.appendChild(l);
  } catch {}
}

// keep at most 2 live iframes at once
const live: Array<() => void> = [];
function register(off: () => void) {
  live.push(off);
  while (live.length > 2) live.shift()!();
}

export default function LivePreview({
  url,
  title,
  width = 1280,
  height = 720,
  enabled = true,
  children,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  const conn = typeof navigator !== 'undefined'
    ? (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    : undefined;
  const canLoad = enabled && !conn?.saveData && !/2g|3g/.test(conn?.effectiveType || '');

  const start = () => {
    if (!canLoad || active) return;
    warm(url);
    setActive(true);
    register(() => {
      setActive(false);
      setReady(false);
    });
  };

  // scale the iframe to the card width
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  // warm the connection when near the screen; start loading after 600ms
  useEffect(() => {
    const el = box.current;
    if (!el || !canLoad) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          warm(url);
          timer = setTimeout(start, 600);
        } else {
          if (timer) clearTimeout(timer);
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [url, canLoad]);

  return (
    <div
      ref={box}
      onMouseEnter={start}
      className="relative w-full h-full overflow-hidden"
    >
      {children}
      {active && (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 z-10 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <iframe
            src={url}
            title={title}
            loading="lazy"
            onLoad={() => setReady(true)}
            tabIndex={-1}
            aria-hidden="true"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="border-0 pointer-events-none absolute top-0 left-0"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      )}
      {active && ready && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-[#00ff88]/40 text-[#00ff88] text-[9px] font-mono font-bold tracking-wider backdrop-blur-xs pointer-events-none shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          <span>LIVE</span>
        </div>
      )}
    </div>
  );
}

export { LivePreview };
