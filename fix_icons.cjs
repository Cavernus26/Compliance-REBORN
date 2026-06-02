const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

content = content.replace('"GPG Policies": "🛡️",', '"GPG Policies": "🛡️",\n  "Store Listing and Promotion": "📢",\n  "Monetization and Ads": "💸",');
fs.writeFileSync('src/data.ts', content);
console.log('Icons added');
