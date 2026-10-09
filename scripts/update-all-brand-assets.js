import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function updateAllBrandAssets() {
  const tmpDir = path.resolve(process.cwd(), 'tmp_drive');
  const publicDir = path.resolve(process.cwd(), 'public');
  const publicImagesDir = path.resolve(process.cwd(), 'public/images');

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  const logoFile = path.join(tmpDir, 'logo_1oWv0mKUc1RGIH1mlejbYknx1FwT9goPZ');
  const aboutFile = path.join(tmpDir, 'about_1AicpnvVBQeKZsaX_PFrP6jpFh7yYB-aR');
  const profileFile = path.join(tmpDir, 'profile_1dAzjMRaDVGqSXyI3zah6EXn1pnGYaeKU');

  console.log('--- Processing 1. LOGO ---');
  if (fs.existsSync(logoFile)) {
    const logoBuffer = fs.readFileSync(logoFile);
    await sharp(logoBuffer).png().toFile(path.join(publicImagesDir, 'imam-khan-logo.png'));
    await sharp(logoBuffer).png().toFile(path.join(publicImagesDir, 'ik-logo.png'));
    await sharp(logoBuffer).png().toFile(path.join(publicDir, 'favicon.png'));
    await sharp(logoBuffer).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(logoBuffer).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Logo updated successfully.');
  } else {
    console.error('ERROR: Logo file missing from tmp_drive');
  }

  console.log('--- Processing 2. ABOUT ME IMAGE ---');
  if (fs.existsSync(aboutFile)) {
    const aboutBuffer = fs.readFileSync(aboutFile);
    await sharp(aboutBuffer).webp({ quality: 92 }).toFile(path.join(publicImagesDir, 'imam-khan-about.webp'));
    await sharp(aboutBuffer).jpeg({ quality: 92 }).toFile(path.join(publicImagesDir, 'imam-khan-about.jpg'));
    await sharp(aboutBuffer).png().toFile(path.join(publicImagesDir, 'imam-khan-about.png'));
    console.log('About Me image updated successfully.');
  } else {
    console.error('ERROR: About file missing from tmp_drive');
  }

  console.log('--- Processing 3. PERSONAL PROFILE PHOTO ---');
  if (fs.existsSync(profileFile)) {
    const profileBuffer = fs.readFileSync(profileFile);
    await sharp(profileBuffer).webp({ quality: 92 }).toFile(path.join(publicImagesDir, 'imam-khan-professional.webp'));
    await sharp(profileBuffer).jpeg({ quality: 92 }).toFile(path.join(publicImagesDir, 'imam-khan-professional.jpg'));
    await sharp(profileBuffer).png().toFile(path.join(publicImagesDir, 'imam-khan-photo.png'));
    await sharp(profileBuffer).png().toFile(path.join(publicImagesDir, 'My-Portfolio-Photo.png'));
    console.log('Personal Profile photo updated successfully.');
  } else {
    console.error('ERROR: Profile file missing from tmp_drive');
  }

  console.log('All brand assets processed and updated successfully!');
}

updateAllBrandAssets().catch(err => {
  console.error('Failed to update brand assets:', err);
  process.exit(1);
});
