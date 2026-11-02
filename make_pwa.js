const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const data = fs.readFileSync('D:\\Ecommerce\\_logobase64.txt', 'utf8');
  const b = await chromium.launch();
  const p = await b.newPage();

  for (const size of [192, 512]) {
    await p.setContent(`
      <!DOCTYPE html><html><body style="margin:0">
      <canvas id="c" width="${size}" height="${size}"></canvas>
      <script>
        const img=new Image();
        img.onload=()=>{
          const cv=document.getElementById('c');
          const ctx=cv.getContext('2d');
          ctx.fillStyle='#eef0e8';
          ctx.fillRect(0,0,${size},${size});
          const pad=${size}*0.08;
          const d=${size}-2*pad;
          ctx.drawImage(img,pad,pad,d,d);
        };
        img.src="${data}";
      </script>
    `);
    await p.waitForTimeout(500);
    const canvas = await p.$('#c');
    await canvas.screenshot({ path: 'D:\\Ecommerce\\pwa\\icon-' + size + '.png' });
    console.log(size + 'px screenshot done');
  }

  await b.close();
})();