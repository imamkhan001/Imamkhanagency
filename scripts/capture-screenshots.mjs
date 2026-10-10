import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SITES = [
  ['royalfitness', 'https://royalfitnesssgym.netlify.app/'],
  ['pearldental', 'https://dev-dentalcareindia.pantheonsite.io/'],
  ['motivgym', 'https://motivgym.netlify.app/'], // alternative https://dev-motiv-gym.netlify.app/
  ['dentacare', 'https://dentalcare.netlify.app/'],
  ['skdental', 'https://skdental.netlify.app/'],
  ['newcardecor', 'https://newcardecor.netlify.app/'],
];

async function main() {
  const targetSlug = process.argv[2];
  const sitesToCapture = targetSlug
    ? SITES.filter(([slug]) => slug === targetSlug)
    : SITES;

  if (sitesToCapture.length === 0) {
    console.error(`Unknown slug: ${targetSlug}`);
    process.exit(1);
  }

  const outputDir = path.resolve('public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  for (const [slug, url] of sitesToCapture) {
    try {
      console.log(`Capturing ${slug} (${url})...`);

      // 1. Desktop Context
      const desktopContext = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
      });
      const desktopPage = await desktopContext.newPage();
      
      try {
        await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await desktopPage.goto(url, { waitUntil: 'load', timeout: 30000 });
      }
      await desktopPage.waitForTimeout(2500);

      const desktopBuffer = await desktopPage.screenshot({
        clip: { x: 0, y: 0, width: 1280, height: 720 },
      });
      await desktopContext.close();

      const desktopPath = path.join(outputDir, `${slug}-preview.jpg`);
      await sharp(desktopBuffer)
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(desktopPath);

      // 2. Mobile Context
      const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });
      const mobilePage = await mobileContext.newPage();

      try {
        await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await mobilePage.goto(url, { waitUntil: 'load', timeout: 30000 });
      }
      await mobilePage.waitForTimeout(2500);

      const mobileBuffer = await mobilePage.screenshot({
        clip: { x: 0, y: 0, width: 390, height: 844 },
      });
      await mobileContext.close();

      const mobilePath = path.join(outputDir, `${slug}-mobile.jpg`);
      await sharp(mobileBuffer)
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(mobilePath);

      console.log(`Successfully captured ${slug}`);
    } catch (err) {
      console.error(`FAILED ${slug}:`, err.message);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
