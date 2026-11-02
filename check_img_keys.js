const fs = require('fs');
const html = fs.readFileSync('D:\\Ecommerce\\index.html', 'utf8');
const s = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Defined keys in IMG
const imgObjMatch = s.match(/const IMG=\{([\s\S]*?)\};/);
const definedKeys = new Set();
if (imgObjMatch) {
  const keyRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*"data:image/g;
  let km;
  while ((km = keyRegex.exec(imgObjMatch[1])) !== null) definedKeys.add(km[1]);
}

// Find all product arrays and their img keys (3rd element in arrays like ["name", price, "imgkey", desc])
// Pattern: ["...", number, "imgkey", ...]
const literalImgKeys = new Set();
const litRegex = /\["[^"]*",\s*\d+,\s*"([a-zA-Z_][a-zA-Z0-9_]*)"/g;
let lm;
while ((lm = litRegex.exec(s)) !== null) literalImgKeys.add(lm[1]);

// img: "key" patterns (CF2, CT etc)
const imgPropRegex = /(?:img|ph|hero):"([a-zA-Z_][a-zA-Z0-9_]*)"/g;
let pm;
while ((pm = imgPropRegex.exec(s)) !== null) literalImgKeys.add(pm[1]);

// IMG[c[0].toLowerCase()] style -> bandung, jakarta, makassar
const dynamicKeys = ['bandung', 'jakarta', 'makassar'];

console.log('=== DEFINED IN IMG ===');
console.log([...definedKeys].sort().join(', '));

console.log('\n=== USED (literal keys in data) ===');
console.log([...literalImgKeys].sort().join(', '));

const allUsed = new Set([...literalImgKeys, ...dynamicKeys]);
const missing = [...allUsed].filter(k => !definedKeys.has(k));
console.log('\n*** MISSING (blank images): ' + missing.join(', ') + ' ***');
