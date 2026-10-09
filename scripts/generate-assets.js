import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Precise SVG vector recreation of the uploaded Ik logo.png
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Soft outer neon glow -->
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur1" />
      <feGaussianBlur stdDeviation="14" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <linearGradient id="neon-color" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00ffaa" />
      <stop offset="100%" stop-color="#00f59b" />
    </linearGradient>
  </defs>

  <!-- Group with glow effect -->
  <g filter="url(#neon-glow)">
    <!-- Far Left Vertical Bar: "I" / Left Stem -->
    <path
      d="M 210 180
         L 270 180
         L 270 780
         L 210 780
         Z"
      fill="#0a0f12"
      stroke="#00ff9d"
      stroke-width="20"
      stroke-linejoin="round"
    />

    <!-- Main "K" and Connected Inner Stem Glyph -->
    <path
      d="M 350 180
         L 420 180
         L 420 460
         L 670 200
         C 690 180 720 175 750 180
         C 785 185 815 215 820 250
         C 820 270 810 295 790 315
         L 570 535
         L 790 730
         C 815 750 825 780 815 810
         C 805 845 770 870 730 870
         C 700 870 675 855 650 830
         L 495 690
         L 350 810
         Z"
      fill="#0a0f12"
      stroke="#00ff9d"
      stroke-width="20"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <!-- Inner Clean Cutout / Inner Line for K Junction -->
    <path
      d="M 420 620
         L 420 460
         L 670 215
         L 735 280
         L 510 505
         L 690 665
         L 625 730
         Z"
      fill="#0a0f12"
      stroke="#00ff9d"
      stroke-width="12"
      stroke-linejoin="round"
      opacity="0.95"
    />

    <!-- Center White Highlight Accent Line -->
    <path
      d="M 420 610
         L 680 350"
      stroke="#ffffff"
      stroke-width="6"
      stroke-linecap="round"
      opacity="0.85"
    />
  </g>
</svg>`;

async function generateAllAssets() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const imagesDir = path.resolve(publicDir, 'images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Write SVG logo
  fs.writeFileSync(path.resolve(imagesDir, 'imam-khan-logo.svg'), svgLogo);
  fs.writeFileSync(path.resolve(imagesDir, 'ik-logo.svg'), svgLogo);

  const svgBuffer = Buffer.from(svgLogo);

  // 1. High Resolution Logo PNG (1000x1000 and 512x512)
  await sharp(svgBuffer)
    .resize(1000, 1000)
    .png()
    .toFile(path.resolve(imagesDir, 'ik-logo-1000.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve(imagesDir, 'imam-khan-logo.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve(imagesDir, 'ik-logo.png'));

  // 2. Favicons
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve(publicDir, 'favicon.png'));

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve(publicDir, 'favicon-32x32.png'));

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve(publicDir, 'apple-touch-icon.png'));

  console.log('✅ Generated IK Brand assets in /public and /public/images');
}

generateAllAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
