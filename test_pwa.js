const { chromium } = require('playwright');

(async () => {
  await new Promise(r => setTimeout(r, 1000)); // tunggu server siap
  
  const b = await chromium.launch();
  const p = await b.newPage();
  
  await p.goto('http://localhost:3000');
  await p.waitForTimeout(1500);
  
  const checks = await p.evaluate(async () => {
    const manifest = document.querySelector('link[rel="manifest"]');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    
    await new Promise(r => setTimeout(r, 1000));
    
    let swReg = 'not registered';
    try {
      const reg = await navigator.serviceWorker.ready;
      swReg = reg.scope ? 'registered at ' + reg.scope : 'ready';
    } catch (e) {
      swReg = 'error: ' + e.message;
    }
    
    return {
      manifest: manifest ? manifest.href : null,
      theme: metaTheme ? metaTheme.content : null,
      sw: swReg,
      title: document.title
    };
  });
  
  console.log('\n✓ PWA Verification Report');
  console.log('─────────────────────────');
  console.log('Manifest link:', checks.manifest || '✗ missing');
  console.log('Theme color:', checks.theme || '✗ missing');
  console.log('Service Worker:', checks.sw);
  console.log('Page title:', checks.title);
  
  if (checks.manifest && checks.theme && checks.sw !== 'not registered') {
    console.log('\n✓ PWA ready. Install on phone: Menu > "Install app"');
  }
  
  await b.close();
  process.exit(0);
})();
