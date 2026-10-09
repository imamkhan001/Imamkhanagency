# Imam Khan — Freelance Web Designer & Developer Portfolio

A production-grade, full-stack web designer portfolio and business platform built for **Imam Khan** (Bangalore, India). Designed for maximum trust, high conversion rates, direct WhatsApp lead capture, local SEO dominance, and fast performance.

---

## 🚀 Key Features

1. **Conversion-Engine Architecture**:
   - Above-the-fold value headline and direct 1-tap WhatsApp consultation.
   - Interactive **Business Impact Framework** (01 Build Trust, 02 Explain Offer, 03 Generate Inquiries, 04 Get Found Online).
   - Floating WhatsApp widget (`z-30`) with pulse animation and prefilled chat prompts.

2. **Full Portfolio & Case Studies (`/portfolio`)**:
   - Filter tabs (*Healthcare, Fitness, WordPress, Automotive*).
   - Detailed Case Study template (`/portfolio/:slug`) with Challenge → Solution → Outcome Metrics.
   - `CreativeWork` and `BreadcrumbList` JSON-LD schema.

3. **Service & Local Landing Pages**:
   - Individual service guides (`/services/web-design-bangalore`, `/services/wordpress-development-bangalore`, `/services/local-seo-bangalore`, `/services/lead-generation-websites`).
   - Hyper-local neighborhood pages (`/web-designer-bangalore`, `/website-design-indiranagar`, `/web-design-whitefield`, `/wordpress-developer-koramangala`) with `LocalBusiness` areaServed schema.

4. **Interactive Growth Tools**:
   - **`/tools/website-cost-calculator`**: Choose business type, pages, features, and timeline to calculate indicative INR pricing.
   - **`/tools/free-website-audit`**: Server-side AI analysis using `@google/genai` (Gemini 3.8 Flash model) returning a 6-point website teardown.
   - **`/resources`**: Interactive Website Launch Checklist, Local SEO Checklist, Dental Clinic & Gym checklists, and Pre-Hiring Preparation Worksheet.

5. **Knowledge Hub & Blog (`/blog`)**:
   - Search bar, category filters, tag cloud, pagination, and 10 full 700+ word original articles tailored to Bangalore businesses.
   - Auto-generated Table of Contents, author bio, social share buttons, and `BlogPosting` schema.

6. **Full-Featured Admin Control Center (`/admin`)**:
   - **Role-Based Access Control**: `admin` (full permissions) vs `editor` (cannot delete or view leads).
   - **Analytics Dashboard**: Conversion tracking for WhatsApp clicks, phone call clicks, form submits, top blog posts, and tool usage.
   - **Blog & Resources Manager**: Markdown editor with **"Draft Article with Gemini AI"** integration and DOMPurify HTML sanitization.
   - **Site Settings & Maintenance Mode**: Override phone numbers, hero text, stats, announcement bar, GA4 ID, and toggle maintenance mode.
   - **Audit Activity Log**: Chronological trail tracking user actions.
   - **Data Backups**: 1-click JSON full data export and CSV leads export.
   - **Account Security**: Password updates, active sessions, and multi-device logout.

---

## 🔒 Security Checklist & Pass

- [x] **Strict Row Level Security (RLS)**: Enforced on all Supabase tables (`leads`, `projects`, `blog_posts`, `site_settings`).
- [x] **Zero Service Keys in Client**: Client bundle only uses anonymous public keys (`VITE_SUPABASE_ANON_KEY`); all admin operations run via JWT auth or authenticated backend API.
- [x] **HTML Sanitization**: All user-generated or editor-rendered HTML is sanitized via `DOMPurify` before rendering to prevent XSS attacks.
- [x] **Noindex Admin Protection**: `/admin` route includes `<meta name="robots" content="noindex, nofollow">` via `Seo` component.
- [x] **Input Length Validation**: All lead form fields, URL inputs, and search bars enforce length restrictions.
- [x] **CSP-Friendly Headers**: Defined in `_headers` with strict `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.

---

## 📧 Supabase Edge Function: New Lead Email Notification

To receive instant email notifications whenever a new lead, calculator inquiry, or website audit request is submitted, deploy the following Supabase Edge Function:

### Edge Function Code (`supabase/functions/send-lead-email/index.ts`)

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = 'imamkhanik001@gmail.com'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { record } = await req.json()
    const { name, email, phone, service, type, message } = record

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Imam Khan Portfolio <leads@imamkhan.vercel.app>',
        to: [ADMIN_EMAIL],
        subject: `⚡ New ${type ? type.toUpperCase() : 'LEAD'} Submission: ${name}`,
        html: `
          <h2>New Lead Captured on Imam Khan Web Design</h2>
          <p><strong>Type:</strong> ${type || 'contact'}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp / Phone:</strong> ${phone}</p>
          <p><strong>Service / Detail:</strong> ${service || 'N/A'}</p>
          <p><strong>Message / Details:</strong> ${message || 'N/A'}</p>
          <hr />
          <p><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">Click here to reply on WhatsApp</a></p>
        `
      })
    })

    const data = await emailResponse.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
```

### Deployment Steps
1. Install Supabase CLI: `npm i -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref your-project-id`
4. Set secret: `supabase secrets set RESEND_API_KEY=your_resend_api_key`
5. Deploy function: `supabase functions deploy send-lead-email`
6. In Supabase Dashboard, go to **Database -> Webhooks**, create a trigger on `INSERT` to table `leads` targeting `https://<ref>.functions.supabase.co/send-lead-email`.

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
bun install

# Run dev server on port 3000
bun run dev

# Lint codebase
bun run lint

# Build production bundle
bun run build
```

---

## ☁️ Cloudflare Pages Deployment & Domain Setup

### 1. Cloudflare Pages Deployment Commands
```bash
# 1. Install project dependencies
bun install

# 2. Build optimized production bundle
bun run build

# 3. Deploy to Cloudflare Pages via Wrangler CLI
bun run deploy
# or using npx:
npx wrangler pages deploy dist --project-name=imamkhan-portfolio
```

### 2. Environment Variables & Secrets Setup
In Cloudflare Dashboard (**Pages -> Settings -> Environment variables**), configure:
- `GEMINI_API_KEY`: Your Google Gemini API Key for the live AI website auditor and blog generator.
- `VITE_SUPABASE_URL`: (Optional) Your Supabase project URL (`https://<project-id>.supabase.co`).
- `VITE_SUPABASE_ANON_KEY`: (Optional) Your Supabase anon public key.
- `VITE_GA_MEASUREMENT_ID`: (Optional) Your Google Analytics 4 ID (`G-XXXXXXXXXX`).

### 3. Pointing Your Custom Domain (e.g. imamkhan.dev / imamkhan.in)
1. Go to **Cloudflare Dashboard -> Pages -> imamkhan-portfolio -> Custom Domains**.
2. Click **Set up a custom domain** and enter your domain (e.g., `imamkhan.in` or `www.imamkhan.in`).
3. If your domain is on Cloudflare DNS, the CNAME record is provisioned automatically with SSL certificate generation within 60 seconds.
4. If your domain registrar is external (GoDaddy, Namecheap, Hostinger):
   - Add a CNAME record: Host `@` (or `www`), Target `<your-project>.pages.dev`.

### 4. Submitting Sitemap to Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your custom domain property or URL prefix.
3. In `index.html`, replace `GSC_VERIFICATION_PLACEHOLDER` with your verification code or verify via Cloudflare DNS TXT record.
4. Go to **Sitemaps** on the left menu.
5. Enter `sitemap.xml` in the "Add a new sitemap" input and click **Submit**.
6. Google will automatically crawl all core routes, 4 local Bangalore pages, 6 case studies, 10 blog articles, and resource hubs.

---

## ✅ Quality Assurance (QA) Checklist

- [x] **Route Code-Splitting**: Every page is lazily loaded via `React.lazy()` and wrapped in `<Suspense>` to ensure fast First Contentful Paint.
- [x] **Schema.org Structured Data**: Complete JSON-LD entities (`Person`, `WebSite`, `ProfessionalService`, `LocalBusiness`, `Service`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, `CreativeWork`).
- [x] **Accessibility**:
  - Skip-to-content focus target for keyboard users.
  - ARIA expanded, modal focus traps, and screen reader announcements.
  - High-contrast text palettes (`#00ff88` on dark backgrounds).
- [x] **Lead Capture Verification**:
  - Quote forms, Strategy Call requests, Website Audit submissions, Cost Calculator inquiries, and Resource gated downloads.
- [x] **Mobile Responsive Matrix**: Tested across 360px (mobile compact), 768px (tablet), and 1280px+ (desktop).
- [x] **Audio Notification**: Subtle optional chime effect for new incoming leads in Admin with toggle settings.

---

© 2026 Imam Khan. All Rights Reserved.
