// Close-up of the User's feedback composite image
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1600 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const box = await page.locator('.research-findings__image-wrap').boundingBox();
if (!box) { console.error('not found'); process.exit(1); }

// Scroll the image into view
await page.evaluate((y) => window.scrollTo(0, y - 100), box.y);
await page.waitForTimeout(300);

// Re-measure after scroll
const box2 = await page.locator('.research-findings__image-wrap').boundingBox();
await page.screenshot({
  path: '.tmp/site-feedback-closeup.png',
  clip: { x: Math.round(box2.x), y: Math.round(box2.y), width: Math.round(box2.width), height: Math.round(box2.height) },
});

console.log(JSON.stringify({ x: box2.x, y: box2.y, w: box2.width, h: box2.height }));
await browser.close();
