// Verify TOC hover state shows grey triangle + grey text
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

// Hover on the second (Research, inactive at scroll=0) link
const link = page.locator('.case-toc__link').nth(1);
await link.hover();
await page.waitForTimeout(200);

const state = await page.evaluate(() => {
  const link = document.querySelectorAll('.case-toc__link')[1];
  const cs = getComputedStyle(link);
  const blackImg = link.querySelector('.case-toc__icon-img--active');
  const greyImg = link.querySelector('.case-toc__icon-img--hover');
  return {
    linkColor: cs.color,
    blackDisplay: getComputedStyle(blackImg).display,
    greyDisplay: getComputedStyle(greyImg).display,
  };
});

await page.screenshot({ path: '.tmp/site-toc-hover.png', clip: { x: 100, y: 50, width: 280, height: 280 } });
console.log(JSON.stringify(state, null, 2));
await browser.close();
