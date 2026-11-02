const http = require('http');
const fs = require('fs');
const path = require('path');

const mimes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png'
};

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(file);
  const filePath = path.join(__dirname, file);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimes[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(3000, () => {
  console.log('PWA running at http://localhost:3000');
  console.log('Open Chrome DevTools > Application tab to verify manifest & service worker');
});
