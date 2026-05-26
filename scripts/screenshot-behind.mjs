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
await dPage.locator('.behind').scrollIntoViewIfNeeded();
await dPage.waitForTimeout(500);
await dPage.locator('.behind').screenshot({ path: '.tmp/behind-desktop.png' });

const mobile = await browser.newContext({
  viewport: { width: 375, height: 1200 },
  deviceScaleFactor: 2,
});
const mPage = await mobile.newPage();
await mPage.goto(url, { waitUntil: 'networkidle' });
await mPage.locator('.behind').scrollIntoViewIfNeeded();
await mPage.waitForTimeout(500);
await mPage.locator('.behind').screenshot({ path: '.tmp/behind-mobile.png' });

await browser.close();
console.log('Saved: .tmp/behind-desktop.png + .tmp/behind-mobile.png');
