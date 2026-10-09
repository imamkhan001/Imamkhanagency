import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import { Seo } from '../components/common/Seo';
import DOMPurify from 'dompurify';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug);
  }, [slug]);

  // Generate Table of Contents from Markdown headings (## and ###)
  const headings = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split('\n');
    const items: { id: string; text: string; level: number }[] = [];

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });

    return items;
  }, [post]);

  // Related Posts (3 posts in same category excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter(p => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  // Click listener for inline images to open lightbox
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleImgClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        const figure = img.closest('figure');
        const figcaption = figure?.querySelector('figcaption');
        setLightboxImage({
          src: img.src,
          alt: img.alt || '',
          caption: figcaption?.textContent || undefined
        });
      }
    };
    el.addEventListener('click', handleImgClick);
    return () => el.removeEventListener('click', handleImgClick);
  }, [post]);

  if (!post) {
    return (
      <div className="py-24 bg-[#050505] text-white text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-[#9e9eb0] mb-6">The blog post you are looking for does not exist or has been moved.</p>
        <Link
          to="/blog"
          className="px-6 py-3 rounded-xl bg-[#00ff88] text-black font-bold text-xs uppercase"
        >
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  // Convert markdown to clean HTML string & sanitize
  const renderMarkdownToHTML = (content: string) => {
    let html = content
      .replace(/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g, (match, alt, url, caption) => {
        const capHtml = caption ? `<figcaption class="text-center text-xs text-[#9e9eb0] mt-2 italic">${caption}</figcaption>` : '';
        return `<figure class="my-8"><img src="${url}" alt="${alt}" loading="lazy" decoding="async" width="800" height="450" class="w-full rounded-xl object-cover border border-[#1a1a24] cursor-pointer hover:opacity-95 transition-opacity shadow-lg" style="aspect-ratio: 16/9; max-height: 500px;" />${capHtml}</figure>`;
      })
      .replace(/## (.*)/g, (match, p1) => {
        const id = p1.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return `<h2 id="${id}" class="text-2xl font-bold text-white mt-8 mb-4 tracking-tight" style="font-family: var(--font-heading)">${p1}</h2>`;
      })
      .replace(/### (.*)/g, (match, p1) => {
        const id = p1.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return `<h3 id="${id}" class="text-xl font-bold text-white mt-6 mb-3 tracking-tight" style="font-family: var(--font-heading)">${p1}</h3>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/- \[\s*\] (.*)/g, '<li class="flex items-start gap-2 my-1"><span class="text-[#00ff88]">☐</span><span>$1</span></li>')
      .replace(/- \[\*\] (.*)/g, '<li class="flex items-start gap-2 my-1"><span class="text-[#00ff88]">☑</span><span>$1</span></li>')
      .replace(/- (.*)/g, '<li class="ml-4 list-disc my-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="my-4 text-[#9e9eb0] leading-relaxed">');

    html = `<p class="my-4 text-[#9e9eb0] leading-relaxed">${html}</p>`;
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'h2', 'h3', 'ul', 'li', 'figure', 'img', 'figcaption', 'br', 'a'],
      ALLOWED_ATTR: ['id', 'src', 'alt', 'width', 'height', 'loading', 'decoding', 'srcset', 'sizes', 'class', 'href', 'target', 'rel']
    });
  };

  const currentUrl = `https://imamkhan.vercel.app/blog/${post.slug}`;
  const coverBase = post.cover_image || `/images/blog/${post.slug}`;
  const ogImg = post.og_image ? (post.og_image.startsWith('http') ? post.og_image : `https://imamkhan.vercel.app${post.og_image}`) : `https://imamkhan.vercel.app/images/og-default.png`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seoDescription || post.excerpt,
    "image": ogImg,
    "author": {
      "@type": "Person",
      "name": post.author || "Imam Khan",
      "jobTitle": "Web Designer & WordPress Expert",
      "worksFor": {
        "@type": "Organization",
        "name": "Imam Khan Web Design"
      }
    },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://imamkhan.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://imamkhan.vercel.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": currentUrl
      }
    ]
  };

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        canonicalUrl={currentUrl}
        jsonLd={[blogSchema, breadcrumbSchema]}
      />

      <article className="py-12 bg-[#050505] text-[#f4f4f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00ff88] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Hub</span>
          </Link>

          {/* Article Header */}
          <header className="space-y-4 mb-8 pb-8 border-b border-[#1a1a24]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-[#8e8e9f] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-xs text-[#8e8e9f] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9e9eb0] leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1a1a24]/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] font-bold text-sm">
                  IK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{post.author}</div>
                  <div className="text-[11px] text-[#8e8e9f]">Web Designer &amp; Developer • Bangalore</div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  aria-label="Share article on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-[#111116] border border-[#1a1a24] text-white hover:border-[#00ff88] transition-colors relative cursor-pointer"
                  aria-label={copied ? "Link copied to clipboard" : "Copy article link"}
                  title="Copy Article Link"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="mb-10">
            <picture className="w-full block">
              <source
                type="image/webp"
                srcSet={`${coverBase}-480w.webp 480w, ${coverBase}-800w.webp 800w, ${coverBase}-1200w.webp 1200w`}
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <img
                src={`${coverBase}-800w.webp`}
                alt={post.cover_alt || post.title}
                width={800}
                height={450}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full object-cover shadow-2xl"
                style={{
                  aspectRatio: '16 / 9',
                  borderRadius: '16px',
                  border: '1px solid #1a1a1a'
                }}
              />
            </picture>
            {post.cover_credit && (
              <div className="text-right text-[11px] text-[#8e8e9f] mt-2 italic">
                Photo: {post.cover_credit}
              </div>
            )}
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-10 p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00ff88] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Table of Contents
              </div>
              <ul className="space-y-2 text-xs text-[#9e9eb0]">
                {headings.map((h, i) => (
                  <li key={i} className={h.level === 3 ? 'ml-4' : ''}>
                    <a
                      href={`#${h.id}`}
                      className="hover:text-[#00ff88] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#00ff88]/60">•</span>
                      <span>{h.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Content */}
          <div
            ref={contentRef}
            className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-[#9e9eb0]"
            dangerouslySetInnerHTML={{ __html: renderMarkdownToHTML(post.content) }}
          />

          {/* Author Box */}
          <div className="mt-12 p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] font-bold text-xl shrink-0">
              IK
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">Written by Imam Khan</h3>
              <p className="text-xs text-[#9e9eb0] leading-relaxed">
                Imam Khan is a freelance web designer and WordPress expert in Bangalore specializing in high-converting business websites, dental clinics, gyms, and modern SEO-ready design.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/919632164784?text=Hi%20Imam,%20I%20read%20your%20article%20and%20would%20like%20to%20discuss%20a%20website%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00ff88] hover:underline"
                >
                  <span>Chat directly with Imam on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Conversion CTA Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#0d0d12] via-[#111118] to-[#0d0d12] border border-[#00ff88]/30 text-center space-y-4 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
              Ready To Grow Your Business?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Turn Your Website Into Your Best Lead Generator
            </h2>
            <p className="text-xs sm:text-sm text-[#9e9eb0] max-w-xl mx-auto">
              Get a mobile-first, high-converting business website launched in 5–7 days with transparent INR pricing and a 30-day money-back guarantee.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://wa.me/919632164784?text=Hi%20Imam,%20I%20'd%20like%20to%20get%20a%20free%20quote%20for%20my%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
              >
                <span>Get Free Quote on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/tools/website-cost-calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#111116] border border-[#1a1a24] text-white hover:border-[#00ff88] text-xs font-semibold"
              >
                Calculate Estimated Website Cost →
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#1a1a24]">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Related Articles You Might Find Helpful
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(rp => {
                  const rpCover = rp.cover_image || `/images/blog/${rp.slug}`;
                  return (
                    <Link
                      key={rp.slug}
                      to={`/blog/${rp.slug}`}
                      className="p-4 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] hover:border-[#00ff88]/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 bg-[#050505]">
                          <picture className="w-full h-full block">
                            <source
                              type="image/webp"
                              srcSet={`${rpCover}-480w.webp 480w, ${rpCover}-800w.webp 800w`}
                              sizes="(max-width: 768px) 100vw, 300px"
                            />
                            <img
                              src={`${rpCover}-800w.webp`}
                              alt={rp.cover_alt || rp.title}
                              width={300}
                              height={169}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </picture>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00ff88]">
                          {rp.category}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors mt-1 mb-2 line-clamp-2">
                          {rp.title}
                        </h4>
                      </div>
                      <span className="text-xs text-[#00ff88] font-semibold flex items-center gap-1 mt-4">
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </article>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxImage(null);
          }}
          tabIndex={-1}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#00ff88] text-sm font-bold bg-[#1a1a24] px-3 py-1.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              Close [Esc]
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
            />
            {lightboxImage.caption && (
              <p className="text-center text-sm text-[#9e9eb0] mt-3 italic">{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostPage;
