// Focused screenshot of the 3 research callouts to verify dotted border
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 2000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/cases/lucida', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const first = await page.locator('.case-callout').first().boundingBox();
const all = await page.locator('.case-callout').all();
const last = await all[all.length - 1].boundingBox();

const x = Math.floor(first.x - 10);
const y = Math.floor(first.y - 10);
const w = Math.ceil(first.width + 20);
const h = Math.ceil((last.y + last.height) - first.y + 20);

await page.evaluate((scrollY) => window.scrollTo(0, scrollY - 50), y);
await page.waitForTimeout(300);

const first2 = await page.locator('.case-callout').first().boundingBox();
await page.screenshot({
  path: '.tmp/site-callouts-closeup.png',
  clip: { x: Math.floor(first2.x - 10), y: Math.floor(first2.y - 10), width: w, height: h },
});

console.log(JSON.stringify({ saved: '.tmp/site-callouts-closeup.png', w, h }));
await browser.close();
