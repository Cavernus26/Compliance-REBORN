const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

const additionalCSS = `
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
`;
content += additionalCSS;
fs.writeFileSync('src/index.css', content);
console.log('Scrollbar css added');
