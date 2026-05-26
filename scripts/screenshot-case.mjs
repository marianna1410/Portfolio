// Screenshot a case-study page vs Figma.
// Usage: node scripts/screenshot-case.mjs <slug> [crop]
//   slug: 'lucida' | 'vaia'
//   crop: 'top' (default — first viewport) | 'overview' | 'full'
// Output: .tmp/site-case-<slug>-<crop>.png
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const slug = process.argv[2] || 'lucida';
const crop = process.argv[3] || 'top';
const url = `http://localhost:4321/cases/${slug}`;

mkdirSync('.tmp', { recursive: true });

const browser = await chromium.launch();
// Tall viewport so we can clip more than 900px without needing fullPage scroll
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1600 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

if (crop === 'full') {
  await page.screenshot({
    path: `.tmp/site-case-${slug}-fullpage.png`,
    fullPage: true,
  });
  console.log(`Saved: .tmp/site-case-${slug}-fullpage.png`);
} else if (crop === 'overview') {
  // Screenshot from top through the Project Overview section and divider
  await page.screenshot({
    path: `.tmp/site-case-${slug}-overview.png`,
    clip: { x: 0, y: 0, width: 1440, height: 1320 },
  });
  console.log(`Saved: .tmp/site-case-${slug}-overview.png`);
} else {
  await page.screenshot({
    path: `.tmp/site-case-${slug}-top.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log(`Saved: .tmp/site-case-${slug}-top.png`);
}

await browser.close();
