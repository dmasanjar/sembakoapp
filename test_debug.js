const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  p.on('pageerror', e => console.log('[PAGE ERROR]', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('[CONSOLE ERROR]', m.text()); });
  
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1000);
  
  const state = await p.evaluate(() => {
    return { cartLen: typeof cart !== 'undefined' ? cart.length : 'undef', cartNames: typeof cart !== 'undefined' ? cart.map(c => c.n) : [] };
  });
  console.log('After load:', JSON.stringify(state));
  
  await p.evaluate(() => { seed(0); });
  await p.waitForTimeout(1500);
  
  const state2 = await p.evaluate(() => {
    return { cartLen: cart.length, cartNames: cart.map(c => c.n), screen: document.querySelector('.s.on') ? document.querySelector('.s.on').id : 'none' };
  });
  console.log('After seed(0):', JSON.stringify(state2));
  
  const kr = await p.evaluate(() => document.getElementById('kr').innerHTML.slice(0, 300));
  console.log('kr content:', kr);
  
  await b.close();
})();
