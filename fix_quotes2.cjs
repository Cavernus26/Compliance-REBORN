const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Prominent Disclosure Requirement :') && lines[i].includes('[\"feature\"]')) {
    // Escape the quote after [in what scenario].
    lines[i] = lines[i].replace('[in what scenario]."', '[in what scenario].\\"');
  }
}

fs.writeFileSync('src/data.ts', lines.join('\n'));
console.log('Fixed quotes correctly');
