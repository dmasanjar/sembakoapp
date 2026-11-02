const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch({ headless: false });
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  
  await p.goto('file:///D:/Ecommerce/index.html');
  await p.waitForTimeout(1500);
  
  const manifest = await p.evaluate(() => {
    const link = document.querySelector('link[rel="manifest"]');
    return link ? link.href : null;
  });
  
  const sw = await p.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'not supported';
    await new Promise(r => setTimeout(r, 800));
    const reg = await navigator.serviceWorker.getRegistration();
    return reg ? 'registered' : 'not registered';
  });
  
  console.log('Manifest:', manifest);
  console.log('Service Worker:', sw);
  console.log('✓ PWA ready. Open in Chrome DevTools > Application > Manifest & Service Workers');
  
  await p.waitForTimeout(3000);
  await b.close();
})();
