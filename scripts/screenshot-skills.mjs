// One-off: screenshot just the experience__skills block on desktop + mobile.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp', { recursive: true });
const url = 'http://localhost:4321/';

const browser = await chromium.launch();

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const dPage = await desktop.newPage();
await dPage.goto(url, { waitUntil: 'networkidle' });
await dPage.waitForTimeout(800);
await dPage.locator('.experience__skills').scrollIntoViewIfNeeded();
await dPage.waitForTimeout(300);
await dPage.locator('.experience__skills').screenshot({ path: '.tmp/skills-desktop.png' });

const mobile = await browser.newContext({
  viewport: { width: 375, height: 1200 },
  deviceScaleFactor: 2,
});
const mPage = await mobile.newPage();
await mPage.goto(url, { waitUntil: 'networkidle' });
await mPage.waitForTimeout(800);
await mPage.locator('.experience__skills').scrollIntoViewIfNeeded();
await mPage.waitForTimeout(300);
await mPage.locator('.experience__skills').screenshot({ path: '.tmp/skills-mobile.png' });

await browser.close();
console.log('Saved: .tmp/skills-desktop.png + .tmp/skills-mobile.png');
