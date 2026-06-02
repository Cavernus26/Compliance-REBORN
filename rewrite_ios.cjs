const fs = require('fs');
let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// We need to parse all ios test cases from src/data.ts
// It's defined as ios: { guidelines: [...], testCases: [ ... ] },
const iosStart = dataTs.indexOf('ios: {');
const androidStart = dataTs.indexOf('android: {');

let iosSegment = dataTs.substring(iosStart, androidStart);

// We'll use regex to match each test case's steps
// steps: "1. whatever\n2. whatever",
const stepsRegex = /steps:\s*([\s\S]*?)(?:,\s*expected:)/g;

iosSegment = iosSegment.replace(stepsRegex, (match, stepsString) => {
    // evaluate the string safely to unescape \n
    let stepsText = '';
    try {
        stepsText = eval(stepsString);
    } catch (e) {
        // fallback if eval fails (e.g. if it uses backticks or something strange, but it's pure string)
        stepsText = stepsString.replace(/^"|"$/g, '').replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }

    let lines = stepsText.split('\n').filter(l => l.trim().length > 0);
    lines = lines.map(l => l.replace(/^\d+\.\s*/, '').trim());

    if (lines.length > 0 && !lines[0].toLowerCase().includes('open the app') && 
        !lines.some(l => l.toLowerCase().includes('launch the app')) &&
        !lines.some(l => l.toLowerCase().includes('download the app'))) {
        lines.unshift('Open the app as a first-time user.');
    }

    lines = lines.map(line => {
        let l = line;
        
        // Verbs
        l = l.replace(/^Verify /i, 'Check that ');
        l = l.replace(/^Confirm /i, 'Check that ');
        l = l.replace(/^Ensure /i, 'Make sure that ');
        l = l.replace(/^Validate /i, 'Check that ');
        l = l.replace(/^Review /i, 'Look at ');
        l = l.replace(/^Inspect /i, 'Visually look at ');
        l = l.replace(/^Scan /i, 'Look through ');
        l = l.replace(/^Examine /i, 'Carefully look at ');
        l = l.replace(/^Test /i, 'Try using ');
        l = l.replace(/^Perform /i, 'Do ');
        l = l.replace(/^Check if /i, 'Check whether ');
        
        // Remove assumptions / jargon
        l = l.replace(/UI element/gi, 'button or link');
        l = l.replace(/the developer/gi, 'you');
        l = l.replace(/the tester/gi, 'you');
        
        return l;
    });

    let newStepsText = lines.map((l, idx) => (idx + 1) + '. ' + l).join('\\n');
    return 'steps: "' + newStepsText.replace(/"/g, '\\"') + '",\n        expected:';
});

const newDataTs = dataTs.substring(0, iosStart) + iosSegment + dataTs.substring(androidStart);

fs.writeFileSync('src/data.ts', newDataTs);
console.log('Successfully updated iOS test cases steps.');
