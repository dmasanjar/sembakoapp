const fs = require('fs');
const src = fs.readFileSync('D:/Ecommerce/index.html', 'utf8');
const lines = src.split('\n');

const terms = ['voucher','Apply','ongkir','berat','tax','subtotal','checkout','addr'];
lines.forEach((l,i) => {
  for (const t of terms) {
    if (l.toLowerCase().includes(t.toLowerCase())) {
      console.log(`L${i+1}: ${l.trim().slice(0,100)}`);
      break;
    }
  }
});
