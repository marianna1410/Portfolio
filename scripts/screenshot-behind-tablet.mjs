import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp', { recursive: true });
const browser = await chromium.launch();

for (const w of [900, 1024, 1280]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 1200 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.locator('.behind').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('.behind').screenshot({ path: `.tmp/behind-${w}.png` });
}

await browser.close();
console.log('Saved screenshots for 900, 1024, 1280');
