const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const oldRegex = /\{\s*id: "And-GPGP-1\.32",.*?originalRef: "Privacy, Security, and Deception"\s*\}/s;

const newEntry = `{
        id: "And-GPGP-1.32",
        gl: "AGL-006",
        ref: "1.32",
        title: "Prominent Disclosure Requirement",
        steps: "1. Launch the app and observe if a prominent disclosure is shown before sensitive data is collected.\\n2. Check that the disclosure is in-app (not just web/settings), clearly describes what data is collected, and how it's used.\\n3. Ensure the consent dialog requires an affirmative tap/check (not an auto-dismiss or passing navigation).",
        expected: "Prominent, in-app disclosures and explicit consent dialogs correctly precede any data collection.",
        policyText: "Prominent Disclosure Requirement :\\nApps requesting users for their personal or sensitive user data provide or improve the features of the app must provide an in-app disclosure of your data collection and use as mentioned below -\\n1) Must be within the app itself, not only in the app description or on a website;\\n2) Must be displayed in the normal usage of the app and not require the user to navigate into a menu or settings;\\n3) Must describe the data being accessed or collected;\\n4) Must explain how the data will be used and/or shared;\\n5) Cannot only be placed in a privacy policy or terms of service; and\\n6) Cannot be included with other disclosures unrelated to personal or sensitive data collection.\\n\\nSecondarily, the App providing in-app disclosure must include a request for user consent and MUST contain following :\\n1) Must present the consent dialog clearly and unambiguously;\\n2) Must require affirmative user action (e.g. tap to accept, tick a check-box);\\n3) Must not interpret navigation away from the disclosure (including tapping away D361or pressing the back or home button) as consent; and\\n4) Must not use auto-dismissing or expiring messages as a means of obtaining user consent.\\n5) Must be granted by the user before  app can begin to collect or access the personal and sensitive user data.\\nTo meet policy requirements, it’s recommended that you reference the following example format for Prominent Disclosure when it’s required:\\n- “[This app] collects/transmits/syncs/stores [type of data] to enable  [\\\"feature\\\"], [in what scenario].\\"\\n- Example: “Fitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising.”\\n- Example: “Call buddy collects read and write call log data to enable contact organization even when the app is not in use.”\\n\\nApp that accesses a user's inventory of installed apps and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.\\n\\nFitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising\\n\\nAn app that accesses a user's phone or contact book data and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.",
        originalRef: "Privacy, Security, and Deception"
      }`;

content = content.replace(oldRegex, newEntry);
fs.writeFileSync('src/data.ts', content);
console.log('Replaced entry 1.32 entirely');
