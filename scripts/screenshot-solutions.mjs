// One-shot: screenshot each .case-solution article individually.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

for (let i = 1; i <= 3; i++) {
  const sel = `#solutions .case-solution:nth-of-type(${i})`;
  const el = page.locator(sel);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await el.screenshot({ path: `.tmp/site-lucida-solution-${i}.png` });
  const box = await el.boundingBox();
  console.log(JSON.stringify({ i, height: box?.height }));
}

await browser.close();
