const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    console.log(`[${type.toUpperCase()}] ${text}`);
  });
  
  page.on('pageerror', error => {
    console.error('[PAGE ERROR]', error.message);
  });
  
  await page.goto('file:///D:/Ecommerce/index.html');
  await page.waitForTimeout(2000);
  
  const content = await page.content();
  console.log('Page loaded, checking content...');
})();
