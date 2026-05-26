// Measure CSS metrics on a case page at desktop viewport.
import { chromium } from 'playwright';

const slug = process.argv[2] || 'lucida';
const url = `http://localhost:4321/cases/${slug}`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1600 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const data = await page.evaluate(() => {
  const m = (sel, attrs = ['fontSize', 'fontWeight', 'fontFamily', 'color', 'lineHeight', 'letterSpacing']) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const out = { sel, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
    for (const a of attrs) out[a] = cs[a];
    return out;
  };

  return {
    viewport: { w: window.innerWidth, h: window.innerHeight },
    section: m('.case-overview', ['gap', 'width']),
    caption: m('.case-overview__caption'),
    paragraph: m('.case-overview__paragraph'),
    details: m('.case-overview__details', ['gap']),
    roleCol: m('.case-overview__details-col--role', ['width', 'gap']),
    methodsCol: m('.case-overview__details-col--methods', ['width']),
    roleLabel: m('.case-overview__details-col--role .case-overview__details-label'),
    bullets: m('.case-overview__bullets', ['gap']),
    bullet: m('.case-overview__bullet'),
    bulletText: m('.case-overview__bullet-text'),
    methodsText: m('.case-overview__methods-text'),
    divider: m('.case-divider', ['height', 'backgroundColor']),
    contentGap: m('.case__content', ['gap']),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
