const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  p.on('pageerror', e => console.log('[PAGE ERROR]', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('[CONSOLE ERROR]', m.text()); });
  
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1000);
  await p.evaluate(() => { seed(1); });
  await p.waitForTimeout(800);
  
  await p.click('#open-map');
  await p.waitForTimeout(2000);
  
  const mapVisible = await p.evaluate(() => !!document.querySelector('#s-map.on'));
  console.log('Map screen visible:', mapVisible);
  
  const hasLeaflet = await p.evaluate(() => !!document.querySelector('.leaflet-container'));
  console.log('Leaflet container:', hasLeaflet);
  
  await b.close();
})();
