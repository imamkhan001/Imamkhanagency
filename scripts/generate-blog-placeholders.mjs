import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const posts = [
  {
    slug: 'how-much-does-a-website-cost-in-bangalore',
    title: 'How Much Does a Website Cost in Bangalore? (2026 Price Breakdown)',
    category: 'Web Design'
  },
  {
    slug: 'what-should-a-small-business-website-include',
    title: 'What Should a Small Business Website Include to Daily Inquiries?',
    category: 'Lead Generation'
  },
  {
    slug: 'is-wordpress-good-for-small-businesses',
    title: 'Is WordPress Still Good for Small Businesses in 2026?',
    category: 'WordPress'
  },
  {
    slug: 'how-google-business-profile-helps-local-businesses',
    title: 'How Google Business Profile Drives Local Calls in Bangalore',
    category: 'Local SEO'
  },
  {
    slug: 'local-seo-checklist-bangalore-businesses',
    title: 'The Ultimate Local SEO Checklist for Bangalore Service Providers',
    category: 'Local SEO'
  },
  {
    slug: 'how-to-build-a-website-that-generates-leads',
    title: 'How to Build a High-Converting Lead Generation Website',
    category: 'Lead Generation'
  },
  {
    slug: 'website-design-vs-website-development',
    title: 'Website Design vs. Website Development: What is the Difference?',
    category: 'Web Design'
  },
  {
    slug: 'common-website-mistakes-that-cost-businesses-leads',
    title: '7 Common Website Mistakes That Cost Bangalore Businesses Leads',
    category: 'Web Design'
  },
  {
    slug: 'what-should-a-dental-clinic-website-include',
    title: 'What Should a Dental Clinic Website Include to Get Patients?',
    category: 'Dental & Medical'
  },
  {
    slug: 'what-should-a-gym-website-include',
    title: 'What Should a Fitness Gym Website Include for Memberships?',
    category: 'Fitness & Gym'
  }
];

const blogDir = path.resolve('public/images/blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

function wrapText(text, maxCharsPerLine = 38) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function generateImages() {
  for (const post of posts) {
    const escapedTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedCat = post.category.toUpperCase().replace(/&/g, '&amp;');
    const lines = wrapText(escapedTitle, 38);
    const titleTspan = lines.map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 64}">${l}</tspan>`).join('');

    const coverSvg = `
    <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d0d16"/>
          <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#bg)"/>
      <rect x="0" y="0" width="1200" height="8" fill="#00ff88"/>
      <rect x="80" y="80" width="180" height="36" rx="8" fill="rgba(0,255,136,0.15)"/>
      <text x="170" y="104" fill="#00ff88" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${escapedCat}</text>
      <text x="80" y="220" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
        ${titleTspan}
      </text>
      <text x="80" y="580" fill="#9e9eb0" font-family="Arial, sans-serif" font-size="20">By Imam Khan &#8226; Bangalore Web Developer</text>
    </svg>
    `;

    const svgBuffer = Buffer.from(coverSvg);

    await sharp(svgBuffer)
      .resize(1200, 675)
      .webp({ quality: 78 })
      .toFile(path.join(blogDir, `${post.slug}-1200w.webp`));

    await sharp(svgBuffer)
      .resize(800, 450)
      .webp({ quality: 78 })
      .toFile(path.join(blogDir, `${post.slug}-800w.webp`));

    await sharp(svgBuffer)
      .resize(480, 270)
      .webp({ quality: 78 })
      .toFile(path.join(blogDir, `${post.slug}-480w.webp`));

    const ogBlogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d0d16"/>
          <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="0" y="0" width="1200" height="8" fill="#00ff88"/>
      <rect x="80" y="60" width="180" height="32" rx="8" fill="rgba(0,255,136,0.15)"/>
      <text x="170" y="81" fill="#00ff88" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${escapedCat}</text>
      <text x="80" y="180" fill="#ffffff" font-family="Arial, sans-serif" font-size="44" font-weight="bold">
        ${titleTspan}
      </text>
      <text x="80" y="550" fill="#9e9eb0" font-family="Arial, sans-serif" font-size="20">By Imam Khan &#8226; Bangalore</text>
    </svg>
    `;
    await sharp(Buffer.from(ogBlogSvg))
      .resize(1200, 630)
      .webp({ quality: 78 })
      .toFile(path.join(blogDir, `${post.slug}-og.webp`));

    console.log(`Generated covers for ${post.slug}`);
  }
}

generateImages().catch(err => {
  console.error(err);
  process.exit(1);
});
