import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const [src = './public/images', out = './public/images'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

// widths = 1x and 2x of the size each image is actually displayed at
const rules = [
  [/^imam-khan-professional/, [400, 800]],
  [/^imam-khan-about/,        [380, 760]],
  [/-preview\./,              [480, 800]],
  [/-mobile\./,               [160, 320]],
  [/^imam-khan-logo/,         [72, 144]],
];

if (existsSync(src)) {
  for (const file of readdirSync(src)) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    // skip already processed widths e.g. -400w, -800w
    if (/-\d+w\.(webp|png|jpe?g)$/i.test(file)) continue;

    const base = file.replace(/\.[^.]+$/, '');
    const rule = rules.find(([re]) => re.test(file));
    const widths = rule ? rule[1] : [800];
    const isLogo = /^imam-khan-logo/.test(file);

    for (const w of widths) {
      try {
        const img = sharp(path.join(src, file)).resize({ width: w, withoutEnlargement: true });
        if (isLogo) await img.clone().png({ palette: true, quality: 85 }).toFile(`${out}/${base}-${w}w.png`);
        await img.clone().webp({ quality: 78, effort: 5 }).toFile(`${out}/${base}-${w}w.webp`);
      } catch (err) {
        console.error(`Error processing ${file} at ${w}w:`, err);
      }
    }
    const max = Math.max(...widths);
    try {
      const main = sharp(path.join(src, file)).resize({ width: max, withoutEnlargement: true });
      await main.clone().webp({ quality: 78, effort: 5 }).toFile(`${out}/${base}.webp`); // keeps old filenames working
      if (!isLogo) await main.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(`${out}/${base}.jpg`); // fallback
      if (isLogo) await main.clone().png({ palette: true, quality: 85 }).toFile(`${out}/${base}.png`);
      console.log('done', file);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}
