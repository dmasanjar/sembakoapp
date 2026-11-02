const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1000);
  
  const tests = await p.evaluate(() => {
    const r = {};
    // haversine 0km
    r.h0 = Math.abs(haversine({lat:-6.9175,lng:107.6062},{lat:-6.9175,lng:107.6062})) < 1;
    // ~10km test (rough)
    r.h10 = haversine({lat:-6.9175,lng:107.6062},{lat:-6.8175,lng:107.7062}) > 5;
    // ongkir base
    r.oBase = calcOngkir(0) === 15000;
    // ongkir 5km
    r.o5 = calcOngkir(5) === 15000 + 5*5000;
    // ongkir >15km
    r.o20 = calcOngkir(20) === 15000 + 20*5000;
    return r;
  });
  
  console.log('=== Phase 2: Peta & Ongkir Tests ===');
  for (const [k,v] of Object.entries(tests)) {
    console.log(v ? '✓' : '✗', k, v ? 'PASS' : 'FAIL');
  }
  
  await b.close();
})();
