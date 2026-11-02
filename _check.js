const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message + '\n' + (e.stack||'').split('\n').slice(0,4).join('\n')));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  const url = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'load', timeout: 20000 });
  await page.waitForTimeout(1200);

  const screens = ['home','allp','cats','cart','orders','profile','coffee','tea','nonc','snack','merch','item','detail','admin','wallets','chat','notif','favs','addr','help','search','signin','signup','verify','welcome','cities','map','track','tu','tud','chats','od','ep','cpw'];
  const results = {};
  for (const s of screens) {
    const before = errors.length;
    try {
      await page.evaluate(id => { if (typeof show === 'function') show(id); }, s);
      await page.waitForTimeout(120);
      const on = await page.evaluate(() => {
        const el = document.querySelector('.s.on');
        if (!el) return 'NO_SCREEN';
        // count visible text
        const txt = (el.innerText||'').trim();
        return el.id + ' len=' + txt.length;
      });
      results[s] = on + (errors.length > before ? ' [ERR]' : '');
    } catch (e) {
      results[s] = 'EXCEPTION: ' + e.message;
    }
  }
  console.log(JSON.stringify(results, null, 1));
  console.log('\n=== ERRORS (' + errors.length + ') ===');
  console.log([...new Set(errors)].join('\n---\n'));
  await browser.close();
})();
