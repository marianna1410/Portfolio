// Drive the Travelling deck: scroll into view, wait for reveal + enable,
// then perform mouse drags and capture which photo is in the front slot.
// Also saves screenshots of each shuffle state.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp', { recursive: true });
const url = 'http://localhost:4321/';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });

const photos = page.locator('.behind__travel-photos');
await photos.scrollIntoViewIfNeeded();
// Wait for fan-out reveal (720ms) + enable.
await page.waitForFunction(() => {
  const el = document.querySelector('.behind__travel-photos');
  return el && el.classList.contains('is-draggable');
}, { timeout: 5000 }).catch(() => {});

const frontPhoto = () => page.evaluate(() => {
  const front = document.querySelector('.slot-front');
  if (!front) return null;
  if (front.classList.contains('behind__photo--building')) return 'building';
  if (front.classList.contains('behind__photo--river')) return 'river';
  if (front.classList.contains('behind__photo--fontan')) return 'fontan';
  return '?';
});

const draggable = await page.evaluate(() => document.querySelector('.behind__travel-photos').classList.contains('is-draggable'));

// Center of the photos area for the drag.
const box = await photos.boundingBox();
const cx = box.x + box.width / 2;
const cy = box.y + box.height / 2;

async function dragLeft() {
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) { await page.mouse.move(cx - i * 12, cy); await page.waitForTimeout(12); }
  await page.mouse.up();
  await page.waitForTimeout(600);
}
async function dragRight() {
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) { await page.mouse.move(cx + i * 12, cy); await page.waitForTimeout(12); }
  await page.mouse.up();
  await page.waitForTimeout(600);
}

const seq = [];
seq.push({ step: 'initial', front: await frontPhoto() });
await photos.screenshot({ path: '.tmp/deck-0.png' });

await dragLeft();
seq.push({ step: 'after drag-left #1', front: await frontPhoto() });
await photos.screenshot({ path: '.tmp/deck-1.png' });

await dragLeft();
seq.push({ step: 'after drag-left #2', front: await frontPhoto() });
await photos.screenshot({ path: '.tmp/deck-2.png' });

await dragRight();
seq.push({ step: 'after drag-right #1', front: await frontPhoto() });
await photos.screenshot({ path: '.tmp/deck-3.png' });

console.log(JSON.stringify({ draggable, seq }, null, 2));
await browser.close();
