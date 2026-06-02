const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace('to enable  ["feature"], [in what scenario]."', 'to enable  [\\"feature\\"], [in what scenario].\\"');
fs.writeFileSync('src/data.ts', content);
console.log('Fixed quotes in data.ts');
