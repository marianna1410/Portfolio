// Screenshot a specific section by ID — full height (no clamp).
// Usage: node scripts/screenshot-section-full.mjs <slug> <section-id>
import { chromium } from 'playwright';

const slug = process.argv[2] || 'lucida';
const id = process.argv[3] || 'solutions';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`http://localhost:4321/cases/${slug}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Resize viewport to full section height for one-shot capture.
const target = page.locator(`#${id}`);
const box = await target.boundingBox();
if (!box) { console.error(`No #${id}`); process.exit(1); }

// Full-page screenshot, then we cropped externally is overkill — let
// playwright handle it via fullPage.
const fullPath = `.tmp/site-${slug}-fullpage.png`;
await page.screenshot({ path: fullPath, fullPage: true });

// Now also take a target-only crop using element.screenshot().
const fresh = await target.boundingBox();
await target.screenshot({ path: `.tmp/site-${slug}-${id}-full.png` });

console.log(JSON.stringify({ id, height: fresh.height }));
await browser.close();
