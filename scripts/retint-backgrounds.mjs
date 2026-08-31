// Retints the homepage's decorative watercolour washes to the brand hue.
//
// These four (five, counting sec5) backgrounds are raster theme artwork with
// the template's warm peach baked in, referenced via `data-background` in
// src/components/home1/Sec*.js. They are the one thing a palette swap does
// NOT reach through _colors.scss, so a cool brand leaves the homepage
// rendering peach while a grep for the old hexes finds nothing.
//
// Usage:  node scripts/retint-backgrounds.mjs [targetHueDegrees]
//
// The pristine template files are kept alongside as *.orig.webp on the first
// run, so re-running with a different hue re-derives from the original
// rather than compounding earlier rotations.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Hue of the template's peach wash, measured off bg-home1-sec1.webp.
const SOURCE_HUE = 20;
const targetHue = Number(process.argv[2] ?? 185);
const rotate = ((targetHue - SOURCE_HUE) % 360 + 360) % 360;

const DIR = path.join(process.cwd(), 'public', 'assets', 'imgs', 'page');
const FILES = ['bg-home1-sec1', 'bg-home1-sec3', 'bg-home1-sec4', 'bg-home1-sec5', 'bg-home1-sec7'];

for (const name of FILES) {
  const file = path.join(DIR, `${name}.webp`);
  const orig = path.join(DIR, `${name}.orig.webp`);
  if (!fs.existsSync(file)) continue;
  if (!fs.existsSync(orig)) fs.copyFileSync(file, orig);
  const out = await sharp(orig).modulate({ hue: rotate }).webp({ quality: 90 }).toBuffer();
  fs.writeFileSync(file, out);
  console.log(`  Retinted ${name}.webp (+${rotate}deg)`);
}
console.log(`Done. Originals kept as *.orig.webp in ${path.relative(process.cwd(), DIR)}`);
