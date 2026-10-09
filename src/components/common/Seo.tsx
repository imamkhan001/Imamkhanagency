import React, { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

export interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any> | Record<string, any>[];
  noIndex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = siteConfig.description,
  canonicalUrl,
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  jsonLd,
  noIndex = false
}) => {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const fullCanonical = canonicalUrl
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteConfig.url}${canonicalUrl}`)
    : siteConfig.url;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    // Robots Tag
    const robotsContent = noIndex ? 'noindex, nofollow, noarchive' : 'index, follow, max-snippet:-1, max-image-preview:large';
    setMetaTag('name', 'robots', robotsContent);

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonical);

    // 4. JSON-LD Structured Data
    let script = document.getElementById('json-ld-data') as HTMLScriptElement;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      // Clean up previous JSON-LD if current route does not supply one
      script.remove();
    }

    return () => {
      // Optional unmount cleanup
    };
  }, [fullTitle, description, fullCanonical, ogImage, ogType, jsonLd, noIndex]);

  return null;
};
