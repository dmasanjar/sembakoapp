const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1000);
  await p.evaluate(() => { seed(1); });
  await p.waitForTimeout(800);
  
  // Open map from cart
  await p.click('#open-map');
  await p.waitForTimeout(1500);
  
  // Click map to trigger pick & show confirm button
  await p.click('#map');
  await p.waitForTimeout(500);
  
  // Confirm location
  await p.click('#confirm-loc');
  await p.waitForTimeout(1000);
  
  const inCart = await p.evaluate(() => !!document.querySelector('#s-cart.on'));
  const shippingRow = await p.evaluate(() => {
    const el = [...document.querySelectorAll('#kr .rw')].find(x => x.textContent.includes('Shipping'));
    return el ? el.querySelector('b').textContent : 'MISSING';
  });
  
  console.log('Returned to cart:', inCart);
  console.log('Shipping fee shown:', shippingRow);
  
  await b.close();
})();
