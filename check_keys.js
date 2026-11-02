const fs = require('fs');
const html = fs.readFileSync('D:\\Ecommerce\\index.html', 'utf8');
const s = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const imgMatch = s.match(/const IMG=\{([^}]+)\}/);
const imgKeys = imgMatch ? imgMatch[1].match(/\b[a-zA-Z_][a-zA-Z0-9_]*\s*:/g).map(k => k.replace(':','').trim()) : [];
const allKeys = new Set();
const regex = /IMG\[(['"])([^'"]+)\1\]/g;
let m;
while ((m = regex.exec(s)) !== null) {
  allKeys.add(m[2]);
}
const missing = [...allKeys].filter(k => !imgKeys.includes(k)).sort();
console.log('Defined:', imgKeys.length);
console.log('Used:', allKeys.size);
console.log('Missing keys:', missing.join(', '));
