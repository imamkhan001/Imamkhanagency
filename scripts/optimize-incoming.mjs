import sharp from 'sharp';
import { readdir, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const IN = 'incoming';
const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

let files = [];
try { files = await readdir(IN); } catch { console.log('No incoming folder.'); process.exit(0); }

for (const f of files) {
  if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
  const base = f.replace(/\.[^.]+$/, '').toLowerCase().replace(/\s+/g, '');
  const mobile = /-mobile$/.test(base);
  const preview = /-preview$/.test(base);
  if (!mobile && !preview) { console.warn('SKIPPED (name must end with -preview or -mobile):', f); continue; }
  try {
    const [w, h] = mobile ? [390, 844] : [1280, 720];
    let img = sharp(path.join(IN, f)).rotate();
    const meta = await img.metadata();
    if (mobile && meta.height / meta.width > 2.0) {
      const top = Math.round(meta.height * 0.04);
      const bottom = Math.round(meta.height * 0.02);
      img = sharp(await img.extract({ left: 0, top, width: meta.width, height: meta.height - top - bottom }).toBuffer());
    }
    await img.resize(w, h, { fit: 'cover', position: 'top' }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${base}.jpg`);
    await unlink(path.join(IN, f));
    console.log('saved', `${OUT}/${base}.jpg`);
  } catch (e) {
    console.warn('FAILED', f, '-', e.message);
  }
}