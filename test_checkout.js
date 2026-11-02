const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  p.on('pageerror', e => console.log('[PAGE ERROR]', e.message));
  
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1000);
  await p.evaluate(() => { seed(1); });
  await p.waitForTimeout(800);

  const read = async () => p.evaluate(() => {
    const get = (label) => {
      const el = [...document.querySelectorAll('#kr .rw')].find(x => x.textContent.includes(label));
      return el ? el.querySelector('b').textContent : 'MISSING';
    };
    return {
      weight: get('Total Weight'),
      subtotal: get('Subtotal'),
      discount: get('Discount'),
      total: (document.querySelector('#kr .rw.tt b')||{textContent:'MISSING'}).textContent,
      voucher: document.getElementById('vcode') ? document.getElementById('vcode').value : '?',
      walletOk: !!document.querySelector('#kr .ws')
    };
  });

  console.log('=== BASELINE (no voucher) ===');
  console.log(JSON.stringify(await read()));

  console.log('\n=== APPLY SEMBABOX (10K off) ===');
  await p.fill('#vcode', 'SEMBABOX');
  await p.click('#apply-v');
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await read()));

  console.log('\n=== APPLY HEMAT (5% of subtotal) ===');
  await p.fill('#vcode', 'HEMAT');
  await p.click('#apply-v');
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await read()));

  console.log('\n=== APPLY INVALID ===');
  await p.fill('#vcode', 'BOGUS123');
  await p.click('#apply-v');
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await read()));

  console.log('\n=== LOWERCASE input (should work) ===');
  await p.fill('#vcode', 'sembabox');
  await p.click('#apply-v');
  await p.waitForTimeout(400);
  console.log(JSON.stringify(await read()));

  await b.close();
})();
