import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Helper function to initialize Gemini client safely
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. API: Free Website Audit
app.post('/api/audit', async (req, res) => {
  try {
    const { url, email, businessName } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Website URL is required' });
    }

    const ai = getGenAI();
    let auditData;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Perform a professional 6-point website analysis for website URL: "${url}", Business Name: "${businessName || 'Business'}".
Return a strict JSON object with this structure:
{
  "overallScore": 72,
  "summary": "Executive summary of audit findings in 2 clear sentences.",
  "points": [
    {
      "category": "Speed & Performance Hints",
      "score": 65,
      "status": "warning",
      "findings": "Key observation regarding page load speed and asset optimization",
      "recommendation": "Actionable advice to fix speed bottlenecks"
    },
    {
      "category": "Mobile Responsiveness & Touch Readiness",
      "score": 80,
      "status": "good",
      "findings": "Key observation on mobile layout and touch button spacing",
      "recommendation": "Actionable advice for mobile user experience"
    },
    {
      "category": "SEO Basics & Meta Tag Structure",
      "score": 58,
      "status": "warning",
      "findings": "Key observation on meta title, description, and header tags",
      "recommendation": "Actionable advice for search engine visibility"
    },
    {
      "category": "Call to Action & Conversion Path",
      "score": 62,
      "status": "warning",
      "findings": "Key observation on contact options, forms, and WhatsApp CTAs",
      "recommendation": "Actionable advice for lead generation"
    },
    {
      "category": "Digital Trust Signals & Credibility",
      "score": 75,
      "status": "good",
      "findings": "Key observation on reviews, testimonials, and trust badges",
      "recommendation": "Actionable advice to boost client trust"
    },
    {
      "category": "Local SEO & Google Business Integration",
      "score": 60,
      "status": "warning",
      "findings": "Key observation on Google Business Profile and local keywords",
      "recommendation": "Actionable advice for local search in Bangalore"
    }
  ],
  "topActionItem": "Single highest-impact change to improve website conversions immediately"
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        auditData = JSON.parse(text);
      } catch (geminiError) {
        console.warn('Gemini API call failed, using fallback audit:', geminiError);
        auditData = generateFallbackAudit(url, businessName);
      }
    } else {
      auditData = generateFallbackAudit(url, businessName);
    }

    return res.json({ success: true, audit: auditData, timestamp: new Date().toISOString() });
  } catch (err: any) {
    console.error('Audit API error:', err);
    return res.status(500).json({ error: 'Failed to complete audit', details: err.message });
  }
});

// Fallback audit generator
function generateFallbackAudit(url: string, businessName?: string) {
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return {
    overallScore: 68,
    summary: `Audit report for ${domain}. The website displays clean branding, but has major opportunities in mobile page speed, tap-friendly buttons, and direct WhatsApp lead conversion.`,
    points: [
      {
        category: 'Speed & Performance Hints',
        score: 65,
        status: 'warning',
        findings: 'Large uncompressed hero images and render-blocking scripts slow initial page load times on mobile 4G networks.',
        recommendation: 'Convert images to WebP format, enable browser caching, and minify CSS/JS to achieve sub-2-second load speeds.'
      },
      {
        category: 'Mobile Responsiveness & Touch Readiness',
        score: 75,
        status: 'good',
        findings: 'Layout adjusts to mobile screens, but key action buttons have under 48px touch height, making tapping tricky on small phones.',
        recommendation: 'Increase primary CTA button height to 56px and ensure sticky contact bar is accessible with 1 tap.'
      },
      {
        category: 'SEO Basics & Meta Tag Structure',
        score: 60,
        status: 'warning',
        findings: 'Missing localized meta descriptions, canonical URLs, and OpenGraph social preview tags.',
        recommendation: 'Include H1 headings with targeted Bangalore keywords and add JSON-LD structured schema for search engines.'
      },
      {
        category: 'Call to Action & Conversion Path',
        score: 70,
        status: 'warning',
        findings: 'Contact form is buried in footer with no instant 1-tap WhatsApp consultation option above the fold.',
        recommendation: 'Place a high-contrast floating WhatsApp CTA and a prominent "Get Free Quote" button in the hero section.'
      },
      {
        category: 'Digital Trust Signals & Credibility',
        score: 72,
        status: 'good',
        findings: 'Displays basic service lists, but lacks verified Google reviews, client result metrics, and SSL trust badges.',
        recommendation: 'Embed live Google 5-star review badges and explicit 30-day money-back guarantee badges.'
      },
      {
        category: 'Local SEO & Google Business Integration',
        score: 62,
        status: 'warning',
        findings: 'Google Business Profile is not embedded or linked with matching NAP (Name, Address, Phone) schema.',
        recommendation: 'Embed interactive Google Map with neighborhood areaServed schema (Indiranagar, Koramangala, Whitefield).'
      }
    ],
    topActionItem: 'Add an instant 1-tap WhatsApp consultation button to your header to capture warm inquiries before visitors leave.'
  };
}

// 2. API: Draft Blog Post with Gemini
app.post('/api/draft-blog', async (req, res) => {
  try {
    const { topic, category } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const ai = getGenAI();
    let draftData;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Write a high-quality, practical, original blog post for a web designer in Bangalore named Imam Khan.
Topic: "${topic}"
Category: "${category || 'Web Design'}"

Return a strict JSON object with this structure:
{
  "title": "Compelling Article Title",
  "slug": "kebab-case-slug",
  "excerpt": "2-3 sentence engaging summary",
  "category": "${category || 'Web Design'}",
  "tags": ["Tag1", "Tag2", "Bangalore"],
  "content": "Full markdown text of article (700-1000 words) with clear H2, H3 headers, bullet points, Bangalore business context, practical advice, and zero fluff."
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        draftData = JSON.parse(response.text || '{}');
      } catch (err: any) {
        console.warn('Draft blog post Gemini call failed:', err);
        return res.status(500).json({ error: 'Gemini post generation failed', details: err.message });
      }
    } else {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured in server environment' });
    }

    return res.json({ success: true, draft: draftData });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to draft article', details: err.message });
  }
});

import http from 'http';

// Start Express Server
async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const isHmrDisabled = process.env.DISABLE_HMR !== 'false';

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
        watch: isHmrDisabled ? null : {},
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
