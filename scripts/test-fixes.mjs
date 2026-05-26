// Verify: header sticky, TOC top spacing, scroll-spy
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

// Scroll to inside Research section
const researchTop = await page.evaluate(() => document.getElementById('research').getBoundingClientRect().top + window.scrollY);
await page.evaluate((y) => window.scrollTo({ top: y - 200 }), researchTop);
await page.waitForTimeout(800);

const state = await page.evaluate(() => {
  const header = document.querySelector('.header');
  const toc = document.querySelector('.case-toc');
  const tocFirstLink = document.querySelector('.case-toc__link');
  const tocFirstLinkText = tocFirstLink.querySelector('.case-toc__label').getBoundingClientRect();
  const headerPillBottom = header.querySelector('.header__pill').getBoundingClientRect().bottom;
  const activeLink = document.querySelector('.case-toc__link--active');
  return {
    scrollY: window.scrollY,
    headerY: Math.round(header.getBoundingClientRect().y),
    headerStuck: header.getBoundingClientRect().y >= 0 && header.getBoundingClientRect().y < 50,
    headerPillBottom: Math.round(headerPillBottom),
    tocOuterTop: Math.round(toc.getBoundingClientRect().top),
    tocFirstLinkTextTop: Math.round(tocFirstLinkText.top),
    gapPillToTocText: Math.round(tocFirstLinkText.top - headerPillBottom),
    activeLinkTarget: activeLink ? activeLink.dataset.target : null,
  };
});

await page.screenshot({ path: '.tmp/site-fixes-test.png', clip: { x: 0, y: 0, width: 600, height: 300 } });

console.log(JSON.stringify(state, null, 2));
await browser.close();
