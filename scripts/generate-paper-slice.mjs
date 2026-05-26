/**
 * Generate a new paper-slice.png by re-mapping the alpha mask (notched
 * pill-cap shape) from the existing paper-slice.png onto a region cropped
 * from the new paper-texture.png — so caps and body share the same texture.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.resolve(here, '../src/assets/icons');

const slicePath   = path.join(iconsDir, 'paper-slice.png');
const texturePath = path.join(iconsDir, 'paper-texture.png');
const outPath     = path.join(iconsDir, 'paper-slice.png');

const sliceMeta   = await sharp(slicePath).metadata();
const textureMeta = await sharp(texturePath).metadata();

console.log(`slice:   ${sliceMeta.width}×${sliceMeta.height}`);
console.log(`texture: ${textureMeta.width}×${textureMeta.height}`);

// 1. Extract alpha channel from the original paper-slice (the pill-cap shape mask).
const alphaBuf = await sharp(slicePath)
  .extractChannel('alpha')
  .raw()
  .toBuffer();

// 2. Crop a slice-sized region from the new paper-texture (left side of texture).
//    Texture is 1648×480; we'll take the leftmost 80×176 region.
//    Vertical center: ((480 - 176) / 2) = 152.
const cropTop  = Math.max(0, Math.floor((textureMeta.height - sliceMeta.height) / 2));
const cropLeft = 40; // small offset to avoid extreme edge if any artifacts

const textureRgb = await sharp(texturePath)
  .extract({
    left:   cropLeft,
    top:    cropTop,
    width:  sliceMeta.width,
    height: sliceMeta.height,
  })
  .removeAlpha()
  .raw()
  .toBuffer();

// 3. Join texture RGB + cap-shape alpha → new PNG with same shape but new texture.
const output = await sharp(textureRgb, {
    raw: { width: sliceMeta.width, height: sliceMeta.height, channels: 3 },
  })
  .joinChannel(alphaBuf, { raw: { width: sliceMeta.width, height: sliceMeta.height, channels: 1 } })
  .png({ compressionLevel: 9 })
  .toBuffer();

const fs = await import('node:fs/promises');
await fs.writeFile(outPath, output);

console.log(`Wrote ${outPath} (${output.length} bytes)`);
