const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace('font-medium max-h-96 overflow-y-auto', 'font-medium max-h-[300px] overflow-y-auto pr-4 custom-scrollbar');
fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx classes replaced');
