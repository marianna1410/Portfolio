// Focused close-up of About me card so the shadow is clearly visible.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp', { recursive: true });
const browser = await chromium.launch();

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.locator('.behind__card--about').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

// Capture a box around the card with ~30px padding on each side so the
// surrounding light-grey area (where the shadow lands) is included.
const box = await page.locator('.behind__card--about').boundingBox();
await page.screenshot({
  path: '.tmp/about-shadow-zoom.png',
  clip: {
    x: Math.max(0, box.x - 30),
    y: Math.max(0, box.y - 10),
    width: box.width + 60,
    height: box.height + 60,
  },
});

await browser.close();
console.log('Saved: .tmp/about-shadow-zoom.png');
