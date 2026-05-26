// Verify TOC sticks on scroll.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);

// TOC position before scroll
const before = await page.evaluate(() => {
  const r = document.querySelector('.case-toc').getBoundingClientRect();
  return { x: Math.round(r.x), y: Math.round(r.y) };
});

// Scroll 1000px down
await page.evaluate(() => window.scrollBy(0, 1000));
await page.waitForTimeout(200);

const afterScroll = await page.evaluate(() => {
  const tocRect = document.querySelector('.case-toc').getBoundingClientRect();
  const sidebarRect = document.querySelector('.case__sidebar').getBoundingClientRect();
  return {
    toc: { x: Math.round(tocRect.x), y: Math.round(tocRect.y) },
    sidebar: { y: Math.round(sidebarRect.y), h: Math.round(sidebarRect.height) },
    scrollY: window.scrollY,
  };
});

// Screenshot of sticky state
await page.screenshot({
  path: '.tmp/site-toc-sticky.png',
  clip: { x: 0, y: 0, width: 400, height: 600 },
});

console.log(JSON.stringify({ before, afterScroll, stickyWorking: afterScroll.toc.y < before.y + 50 ? 'YES (TOC moved up vs scroll, meaning it sticks)' : 'NO (TOC scrolled with page)' }, null, 2));

await browser.close();
