import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://imamkhan.vercel.app';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const fallbackPosts = [
  {
    slug: 'how-much-does-a-website-cost-in-bangalore',
    title: 'How Much Does a Website Cost in Bangalore? (2026 Price Breakdown)',
    excerpt: 'Planning to launch a business website in Bangalore? Here is an honest breakdown of realistic costs for domain, hosting, custom design, WordPress development, and maintenance.',
    category: 'Web Design',
    date: 'April 2, 2026',
    cover_image: '/images/blog/how-much-does-a-website-cost-in-bangalore',
    og_image: '/images/blog/how-much-does-a-website-cost-in-bangalore-og.webp',
    seoTitle: 'How Much Does a Website Cost in Bangalore? (2026 Price Guide)',
    seoDescription: 'An honest guide to business website design and development costs in Bangalore, covering freelancer rates, agency quotes, domain hosting fees, and ongoing maintenance.',
    author: 'Imam Khan'
  },
  {
    slug: 'what-should-a-small-business-website-include',
    title: 'What Should a Small Business Website Include to Generate Daily Leads?',
    excerpt: 'Most business websites act like digital business cards that nobody reads. Discover the 7 non-negotiable sections that turn casual visitors into paying customers.',
    category: 'Lead Generation',
    date: 'March 28, 2026',
    cover_image: '/images/blog/what-should-a-small-business-website-include',
    og_image: '/images/blog/what-should-a-small-business-website-include-og.webp',
    seoTitle: 'What Should a Small Business Website Include? Essential Features Checklist',
    seoDescription: 'Learn the 7 critical website components every small business in Bangalore needs to build trust, explain their service, and generate consistent WhatsApp inquiries.',
    author: 'Imam Khan'
  },
  {
    slug: 'is-wordpress-good-for-small-businesses',
    title: 'Is WordPress Still Good for Small Businesses in 2026?',
    excerpt: 'An objective analysis of WordPress vs custom React builds for small business websites in Bangalore.',
    category: 'WordPress',
    date: 'March 20, 2026',
    cover_image: '/images/blog/is-wordpress-good-for-small-businesses',
    og_image: '/images/blog/is-wordpress-good-for-small-businesses-og.webp',
    seoTitle: 'Is WordPress Still Good for Small Businesses in 2026?',
    seoDescription: 'An objective analysis of WordPress vs custom React builds for small business websites in Bangalore.',
    author: 'Imam Khan'
  },
  {
    slug: 'how-google-business-profile-helps-local-businesses',
    title: 'How Google Business Profile Drives Local Calls in Bangalore',
    excerpt: 'Dominate local search results in Indiranagar, Koramangala, and Whitefield with an optimized Google Business Profile.',
    category: 'Local SEO',
    date: 'March 15, 2026',
    cover_image: '/images/blog/how-google-business-profile-helps-local-businesses',
    og_image: '/images/blog/how-google-business-profile-helps-local-businesses-og.webp',
    seoTitle: 'How Google Business Profile Drives Local Calls in Bangalore',
    seoDescription: 'Dominate local search results in Indiranagar, Koramangala, and Whitefield with an optimized Google Business Profile.',
    author: 'Imam Khan'
  },
  {
    slug: 'local-seo-checklist-bangalore-businesses',
    title: 'The Ultimate Local SEO Checklist for Bangalore Service Providers',
    excerpt: 'Step-by-step local search optimization guide to rank #1 on Google Maps in Bangalore.',
    category: 'Local SEO',
    date: 'March 10, 2026',
    cover_image: '/images/blog/local-seo-checklist-bangalore-businesses',
    og_image: '/images/blog/local-seo-checklist-bangalore-businesses-og.webp',
    seoTitle: 'The Ultimate Local SEO Checklist for Bangalore Service Providers',
    seoDescription: 'Step-by-step local search optimization guide to rank #1 on Google Maps in Bangalore.',
    author: 'Imam Khan'
  },
  {
    slug: 'how-to-build-a-website-that-generates-leads',
    title: 'How to Build a High-Converting Lead Generation Website',
    excerpt: 'Conversion rate optimization strategies that turn website traffic into phone calls and WhatsApp chats.',
    category: 'Lead Generation',
    date: 'March 5, 2026',
    cover_image: '/images/blog/how-to-build-a-website-that-generates-leads',
    og_image: '/images/blog/how-to-build-a-website-that-generates-leads-og.webp',
    seoTitle: 'How to Build a High-Converting Lead Generation Website',
    seoDescription: 'Conversion rate optimization strategies that turn website traffic into phone calls and WhatsApp chats.',
    author: 'Imam Khan'
  },
  {
    slug: 'website-design-vs-website-development',
    title: 'Website Design vs. Website Development: What is the Difference?',
    excerpt: 'Understanding the distinct roles of UI/UX design and technical coding in building modern web apps.',
    category: 'Web Design',
    date: 'February 28, 2026',
    cover_image: '/images/blog/website-design-vs-website-development',
    og_image: '/images/blog/website-design-vs-website-development-og.webp',
    seoTitle: 'Website Design vs. Website Development: What is the Difference?',
    seoDescription: 'Understanding the distinct roles of UI/UX design and technical coding in building modern web apps.',
    author: 'Imam Khan'
  },
  {
    slug: 'common-website-mistakes-that-cost-businesses-leads',
    title: '7 Common Website Mistakes That Cost Bangalore Businesses Leads',
    excerpt: 'Avoid slow load times, missing CTAs, and broken mobile menus that drive potential customers away.',
    category: 'Web Design',
    date: 'February 20, 2026',
    cover_image: '/images/blog/common-website-mistakes-that-cost-businesses-leads',
    og_image: '/images/blog/common-website-mistakes-that-cost-businesses-leads-og.webp',
    seoTitle: '7 Common Website Mistakes That Cost Bangalore Businesses Leads',
    seoDescription: 'Avoid slow load times, missing CTAs, and broken mobile menus that drive potential customers away.',
    author: 'Imam Khan'
  },
  {
    slug: 'what-should-a-dental-clinic-website-include',
    title: 'What Should a Dental Clinic Website Include to Get Patients?',
    excerpt: 'Essential patient booking features, before-and-after galleries, and trust signals for dental practices.',
    category: 'Dental & Medical',
    date: 'February 15, 2026',
    cover_image: '/images/blog/what-should-a-dental-clinic-website-include',
    og_image: '/images/blog/what-should-a-dental-clinic-website-include-og.webp',
    seoTitle: 'What Should a Dental Clinic Website Include to Get Patients?',
    seoDescription: 'Essential patient booking features, before-and-after galleries, and trust signals for dental practices.',
    author: 'Imam Khan'
  },
  {
    slug: 'what-should-a-gym-website-include',
    title: 'What Should a Fitness Gym Website Include for Memberships?',
    excerpt: 'High-energy landing pages, class schedules, and trial pass signups for fitness centers in Bangalore.',
    category: 'Fitness & Gym',
    date: 'February 10, 2026',
    cover_image: '/images/blog/what-should-a-gym-website-include',
    og_image: '/images/blog/what-should-a-gym-website-include-og.webp',
    seoTitle: 'What Should a Fitness Gym Website Include for Memberships?',
    seoDescription: 'High-energy landing pages, class schedules, and trial pass signups for fitness centers in Bangalore.',
    author: 'Imam Khan'
  }
];

async function prerender() {
  if (!fs.existsSync(indexPath)) {
    console.warn('dist/index.html not found, skipping prerender.');
    return;
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  let posts = fallbackPosts;

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=*&status=eq.published`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          posts = data;
        }
      }
    }
  } catch (err) {
    console.warn('Supabase unreachable at build time, using fallback blog posts:', err.message);
  }

  // Prerender /blog hub
  const blogHubDir = path.join(distDir, 'blog');
  if (!fs.existsSync(blogHubDir)) {
    fs.mkdirSync(blogHubDir, { recursive: true });
  }

  let hubHtml = baseHtml
    .replace(/<title>.*?<\/title>/, '<title>Web Design & SEO Knowledge Hub for Bangalore Businesses | Imam Khan</title>')
    .replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Practical guides, local SEO strategies, and web development insights for business owners in Bangalore by Imam Khan."')
    .replace(/<meta property="og:title" content=".*?"/, '<meta property="og:title" content="Web Design & SEO Knowledge Hub for Bangalore Businesses" />')
    .replace(/<meta property="og:description" content=".*?"/, '<meta property="og:description" content="Practical guides, local SEO strategies, and web development insights for business owners in Bangalore." />')
    .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${SITE_URL}/blog" />`)
    .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${SITE_URL}/images/og-default.png" />`);

  fs.writeFileSync(path.join(blogHubDir, 'index.html'), hubHtml, 'utf8');
  console.log('Prerendered /blog/index.html');

  // Prerender each blog post
  for (const post of posts) {
    const postDir = path.join(blogHubDir, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const ogImg = post.og_image ? (post.og_image.startsWith('http') ? post.og_image : `${SITE_URL}${post.og_image}`) : `${SITE_URL}/images/og-default.png`;
    const seoTitle = post.seoTitle || post.title;
    const seoDesc = post.seoDescription || post.excerpt;
    const canonical = `${SITE_URL}/blog/${post.slug}`;

    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": seoDesc,
      "image": ogImg,
      "datePublished": post.date || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author || "Imam Khan"
      }
    });

    let postHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${seoTitle} | Imam Khan</title>`)
      .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${seoDesc}" />`)
      .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${seoTitle}" />`)
      .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${seoDesc}" />`)
      .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${canonical}" />`)
      .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${ogImg}" />`)
      .replace(/<meta property="og:type" content=".*?"/, '<meta property="og:type" content="article" />')
      .replace(/<meta name="twitter:card" content=".*?"/, '<meta name="twitter:card" content="summary_large_image" />')
      .replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${ogImg}" />`);

    // Inject jsonLd before closing head if not present
    if (!postHtml.includes('BlogPosting')) {
      postHtml = postHtml.replace('</head>', `<script type="application/ld+json">${jsonLd}</script></head>`);
    }

    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf8');
    console.log(`Prerendered /blog/${post.slug}/index.html`);
  }
}

prerender().catch(err => {
  console.error('Prerender error:', err);
});
