// Close-up of the case divider for visual verification.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1600 },
  deviceScaleFactor: 1,  // 1:1 so dots show at native size
});
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const dividerBox = await page.locator('.case-divider').boundingBox();
if (!dividerBox) { console.error('No .case-divider found'); process.exit(1); }

// Capture the divider with ~30px of breathing room above and below.
await page.screenshot({
  path: '.tmp/site-divider-closeup.png',
  clip: {
    x: Math.max(0, dividerBox.x - 20),
    y: Math.max(0, dividerBox.y - 30),
    width: Math.min(1440, dividerBox.width + 40),
    height: dividerBox.height + 60,
  },
});

console.log(JSON.stringify({
  dividerBox: {
    x: Math.round(dividerBox.x),
    y: Math.round(dividerBox.y),
    w: Math.round(dividerBox.width),
    h: Math.round(dividerBox.height),
  },
  saved: '.tmp/site-divider-closeup.png',
}, null, 2));

await browser.close();
