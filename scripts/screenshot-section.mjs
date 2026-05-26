// Screenshot a specific section by ID at desktop 1440.
// Usage: node scripts/screenshot-section.mjs <slug> <section-id>
//   e.g. node scripts/screenshot-section.mjs lucida problems
import { chromium } from 'playwright';

const slug = process.argv[2] || 'lucida';
const id = process.argv[3] || 'problems';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 2000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`http://localhost:4321/cases/${slug}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const target = page.locator(`#${id}`);
const box = await target.boundingBox();
if (!box) { console.error(`No #${id}`); process.exit(1); }

// Scroll into view
await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 120)), box.y);
await page.waitForTimeout(300);

const newBox = await target.boundingBox();
await page.screenshot({
  path: `.tmp/site-${slug}-${id}.png`,
  clip: {
    x: 0,
    y: Math.max(0, Math.floor(newBox.y - 20)),
    width: 1440,
    height: Math.min(2000, Math.ceil(newBox.height + 80)),
  },
});

console.log(JSON.stringify({ id, height: newBox.height }));
await browser.close();
