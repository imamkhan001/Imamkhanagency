import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function updateExactPhoto() {
  const assetsDir = path.resolve(process.cwd(), 'src/assets/images');
  const publicImagesDir = path.resolve(process.cwd(), 'public/images');

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // The exact original portrait uploaded by the user
  const sourceImage = path.join(assetsDir, 'imam_photo_update_1791401226891.jpg');

  if (!fs.existsSync(sourceImage)) {
    console.error('Source image not found:', sourceImage);
    process.exit(1);
  }

  console.log('Generating exact photo assets from source:', sourceImage);

  // 1. High-fidelity WebP for Hero (1200x1200, 98% quality lossless color)
  await sharp(sourceImage)
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 98, effort: 6 })
    .toFile(path.join(publicImagesDir, 'imam-khan-professional.webp'));

  // 2. High-fidelity WebP for About Section & About Page (1200x1200, 98% quality)
  await sharp(sourceImage)
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 98, effort: 6 })
    .toFile(path.join(publicImagesDir, 'imam-khan-about.webp'));

  // 3. High-fidelity PNG for Direct Native Fallback (1200x1200)
  await sharp(sourceImage)
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicImagesDir, 'imam-khan-photo.png'));

  // 4. Exact copy as My-Portfolio-Photo.png
  await sharp(sourceImage)
    .png()
    .toFile(path.join(publicImagesDir, 'My-Portfolio-Photo.png'));

  // 5. High-fidelity JPEG (1200x1200, 98% quality)
  await sharp(sourceImage)
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 98 })
    .toFile(path.join(publicImagesDir, 'imam-khan-professional.jpg'));

  console.log('All photo assets successfully generated and synced to public/images!');
}

updateExactPhoto().catch(err => {
  console.error('Error updating exact photo:', err);
  process.exit(1);
});
