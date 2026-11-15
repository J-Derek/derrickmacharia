// One-off: convert source images in src/assets to resized WebP.
// Usage: node scripts/optimize-images.mjs   (originals are left in place; delete them after checking)
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const assets = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets');

const jobs = [
  { dir: 'screenshots', width: 1600, quality: 80 },
  { dir: 'logos', width: 320, quality: 85 },
  { dir: '.', width: 1200, quality: 82, only: /^profile\.jpe?g$/ },
];

for (const { dir, width, quality, only } of jobs) {
  const folder = path.join(assets, dir);
  for (const file of await readdir(folder)) {
    if (!/\.(png|jpe?g)$/i.test(file) || (only && !only.test(file))) continue;
    const out = path.join(folder, file.replace(/\.(png|jpe?g)$/i, '.webp'));
    const info = await sharp(path.join(folder, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    console.log(`${path.join(dir, file)} -> ${Math.round(info.size / 1024)} kB (${info.width}x${info.height})`);
  }
}
