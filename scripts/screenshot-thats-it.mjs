import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp', { recursive: true });
const browser = await chromium.launch();

for (const w of [375, 768, 1280]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 1400 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.locator('.behind__card--end').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('.behind__card--end').screenshot({ path: `.tmp/thats-it-${w}.png` });
}

await browser.close();
console.log("Saved That's it screenshots");
