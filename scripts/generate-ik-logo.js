import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ikLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00ff88" />
      <stop offset="50%" stop-color="#00ffa3" />
      <stop offset="100%" stop-color="#00e575" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background is transparent -->

  <g filter="url(#glow)" stroke="url(#neonGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="#080c0e">
    <!-- Letter "I" -->
    <rect x="70" y="86" width="60" height="340" rx="10" ry="10" />

    <!-- Letter "K" Vertical Stem -->
    <rect x="170" y="86" width="60" height="340" rx="10" ry="10" />

    <!-- Letter "K" Upper Diagonal Arm -->
    <polygon points="230,230 350,96 426,96 280,260" />

    <!-- Letter "K" Lower Diagonal Arm -->
    <polygon points="268,246 430,416 350,416 230,288" />
  </g>
</svg>`;

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const imagesDir = path.resolve(process.cwd(), 'public/images');

  fs.writeFileSync(path.join(imagesDir, 'imam-khan-logo.svg'), ikLogoSvg);
  fs.writeFileSync(path.join(imagesDir, 'ik-logo.svg'), ikLogoSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), ikLogoSvg);

  const svgBuffer = Buffer.from(ikLogoSvg);

  // 512x512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(imagesDir, 'imam-khan-logo.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(imagesDir, 'ik-logo.png'));

  // 192x192 Favicon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // 32x32 Favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // 180x180 Apple Touch Icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Successfully generated crisp IK logo assets in SVG and PNG formats!');
}

main().catch(console.error);
