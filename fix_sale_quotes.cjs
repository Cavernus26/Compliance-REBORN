const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace('•"Sale" means', '•\\"Sale\\" means');
fs.writeFileSync('src/data.ts', content);
console.log('Fixed Sale quotes');
