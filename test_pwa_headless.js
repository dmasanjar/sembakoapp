const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();

  p.on('console', msg => {
    const txt = msg.text();
    if (/service|manifest|error|failed/i.test(txt)) {
      console.log('[CONSOLE]', msg.type(), txt);
    }
  });
  p.on('pageerror', err => console.log('[PAGE ERROR]', err.message));

  await p.goto('http://localhost:3000');
  await p.waitForTimeout(3000);

  const manifest = await p.evaluate(() => {
    const link = document.querySelector('link[rel="manifest"]');
    return link ? link.href : null;
  });

  const theme = await p.evaluate(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    return meta ? meta.content : null;
  });

  const sw = await p.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    return reg ? 'registered: ' + reg.scope : 'not registered';
  });

  console.log('\nManifest:', manifest);
  console.log('Theme:', theme);
  console.log('Service Worker:', sw);
  console.log('PWA READY:', !!(manifest && theme && sw.includes('registered')));

  await b.close();
})();
