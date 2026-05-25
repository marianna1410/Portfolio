// Reusable section-screenshot helper.
// Usage: node scripts/screenshot-section.mjs <section-id>
//   e.g. node scripts/screenshot-section.mjs works
// Output: .tmp/site-<section>-desktop.png + .tmp/site-<section>-mobile.png
//
// Requires the dev server running on http://localhost:4321
// and a CSS class `.<section>` (e.g. `.works`, `.hero`, `.experience`) on the
// section's root element so we can boundingBox-clip to just that section.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const section = process.argv[2] || 'hero';
const url = `http://localhost:4321/#${section}`;
const selector = `.${section}`;

mkdirSync('.tmp', { recursive: true });

const browser = await chromium.launch();

// === Desktop 1440 ===
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const dPage = await desktop.newPage();
await dPage.goto(url, { waitUntil: 'networkidle' });
await dPage.waitForTimeout(500);
const dBox = await dPage.locator(selector).boundingBox();
if (dBox) {
  await dPage.screenshot({ path: `.tmp/site-${section}-desktop.png`, clip: dBox });
}

// === Mobile 375 @ 2x retina ===
const mobile = await browser.newContext({
  viewport: { width: 375, height: 1200 },
  deviceScaleFactor: 2,
});
const mPage = await mobile.newPage();
await mPage.goto(url, { waitUntil: 'networkidle' });
await mPage.waitForTimeout(500);
const mBox = await mPage.locator(selector).boundingBox();
if (mBox) {
  await mPage.screenshot({ path: `.tmp/site-${section}-mobile.png`, clip: mBox });
}

await browser.close();
console.log(`Saved: .tmp/site-${section}-desktop.png + .tmp/site-${section}-mobile.png`);
