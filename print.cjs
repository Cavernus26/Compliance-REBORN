const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
const lines = content.split('\n');
console.log(lines[5374].substring(1500, 1700));
