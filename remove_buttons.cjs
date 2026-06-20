const fs = require('fs');
const file = 'src/pages/Services.jsx';
let code = fs.readFileSync(file, 'utf8');
const lines = code.split('\n');
const newLines = lines.filter(line => !line.includes('Learn More'));
fs.writeFileSync(file, newLines.join('\n'));
console.log('Removed ' + (lines.length - newLines.length) + ' lines.');
