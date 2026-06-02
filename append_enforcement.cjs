const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const insertionPoint = `        originalRef: "Families",
      },`;

const newTestCases = `
      {
        id: "And-GPGP-1.77",
        gl: "AGL-006",
        ref: "1.77",
        title: "Policy Coverage & App Installation",
        steps: "1. Verify if the app allows users to install other apps to their devices.\\n2. If the app provides access to other apps, games, or software without installation, ensure all accessed content is strictly compliant with Google Play policies.",
        expected: "App does not facilitate unapproved app installations and ensures any hosted third-party content complies with all Play policies.",
        policyText: "Policy Coverage\\nApps that let users install other apps to their devices are not allowed. Apps that provide access to other apps, games, or software without installation, including features and experiences provided by third parties, must ensure that all the content they provide access to adheres to all Google Play policies and may also be subject to additional policy reviews.",
        originalRef: "Enforcement",
      },
      {
        id: "And-GPGP-1.78",
        gl: "AGL-006",
        ref: "1.78",
        title: "Enforcement Actions & Resubmission",
        steps: "1. Address all underlying policy issues across the entire app before attempting to resubmit a rejected or removed app.\\n2. Avoid republishing a suspended app unless explicitly permitted.\\n3. Acknowledge that repeated or egregious violations may lead to developer account termination.",
        expected: "Developer fully rectifies all flagged and unflagged policy issues prior to resubmission, respecting Google Play's enforcement standing.",
        policyText: "Enforcement Process\\nA) If our app violates any of Google policies, it will be removed from Google Play, and you will receive an email notification...\\nB) Please note that removal or administrative notices may not indicate each and every policy violation present in your app or broader app catalog.\\n\\nRejection\\nNote: Do not attempt to resubmit a rejected app until you’ve fixed all the policy violations.\\n\\nRemoval\\nNote: Don't attempt to republish a removed app until you’ve fixed all policy violation.\\n\\nSuspension\\nMultiple strikes can result in the termination of individual and related Google Play Developer accounts.\\nNote: Don't attempt to republish a suspended app unless Google Play has explained that you may do so.",
        originalRef: "Enforcement",
      },`;

const index = content.lastIndexOf(insertionPoint);
if (index !== -1) {
  content = content.substring(0, index + insertionPoint.length) + newTestCases + content.substring(index + insertionPoint.length);
  
  content = content.replace('"Families": "👪",', '"Families": "👪",\n  "Enforcement": "⚖️",');

  fs.writeFileSync('src/data.ts', content);
  console.log('Appended successfully');
} else {
  console.log('Insertion point not found');
}
