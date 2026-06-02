const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const insertionPoint = `        originalRef: "Enforcement",
      },`;

const newTestCases = `
      {
        id: "And-FEAT-1.1",
        gl: "AGL-007",
        ref: "1.1",
        title: "Localization",
        steps: "1. Check for missing, awkward, or incorrect translations in app or metadata.\\n2. Look for line breaks, incorrect local currency, incorrect special characters.\\n3. Check if font size is too large or small.\\n4. Verify country flags are not used solely to select language.",
        expected: "No awkward translations, correct currency/chars, good text fitting, no country flags for language selection.",
        policyText: "You should not have: missing, awkward or incorrect translations (in app or metadata), line breaks, incorrect local currency, incorrect special characters, font too large or small, country flag used to select language",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.2",
        gl: "AGL-007",
        ref: "1.2",
        title: "Touch Feedback",
        steps: "1. Interact with all interactive elements within the app.\\n2. Verify that some form of touch feedback is provided.\\n3. Verify all UI elements that provide touch-feedback invoke an action.",
        expected: "Interactive elements have standard touch feedback driving an action.",
        policyText: "It is important to provide some form of touch feedback on all interactive elements within the app; All UI elements that provide touch-feedback should invoke an action",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.3",
        gl: "AGL-007",
        ref: "1.3",
        title: "Permissions",
        steps: "1. Review required app permissions.\\n2. Remove any unnecessary permissions (e.g., Read/Write/Manage_external_storage, Camera) or explain how they are being used.",
        expected: "Only necessary permissions are present, and their usage is clearly explained to users.",
        policyText: "Remove any unnecessary permissions and/or explain how the permissions are being used (Read/Write/Manage_external_storage, Camera, etc)",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.4",
        gl: "AGL-007",
        ref: "1.4",
        title: "Play Games Services",
        steps: "1. Sign out of Google Play Games Services via the 'Sign Out' option.\\n2. Ensure that any GPGS buttons and entry points become functional entry points to log back in rather than being functionless.",
        expected: "GPGS buttons act as login entry points after signing out.",
        policyText: "If the user chooses to sign out of Google Play Games Services via the 'Sign Out' option in the default UI, some GPGS buttons and entry points become functionless. If the user signs out of Play Games, these buttons must act as an entry point to log back in",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.5",
        gl: "AGL-007",
        ref: "1.5",
        title: "Back Button",
        steps: "1. Press the Android system back button at the main menu or home screen.\\n2. Verify it functions like an on-screen back or close button, allowing the user to exit or prompting them to confirm an exit.",
        expected: "Android back button naturally exits the app or prompts for exit confirmation on the root screen.",
        policyText: "Function as any on-screen back or close button, allow the user to exit or prompt the user to confirm an exit when the Android system back button is pressed at the main menu or home screen.",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.6",
        gl: "AGL-007",
        ref: "1.6",
        title: "Game Icon",
        steps: "1. Review the high-res icons used for the app launcher and Google Play listing.\\n2. Ensure they don't resemble non-Android styling (e.g., very rounded corners carried from iOS).\\n3. Ensure Android app icons are distinctly shaped.",
        expected: "App icon shape adheres to Android standards without mimicking other platforms' distinctive styles.",
        policyText: "The high-res icons used for the app launcher and/or Google Play listing resembles non-Android styling, including very rounded corners. As you build your app for Android, don't carry over elements from other platforms. Android app icons should be distinctly shaped",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.7",
        gl: "AGL-007",
        ref: "1.7",
        title: "Optional feedback",
        steps: "1. Check if the app targets the latest SDK (targetSdkVersion 33 or higher).\\n2. Review ANR rate to ensure it's low.\\n3. Check for a promo video and an option to skip the tutorial.",
        expected: "Target SDK is 33/latest (supporting Material You & hardware acceleration), ANR rate is low, and the user has options to skip tutorials. Promo video is added.",
        policyText: "Target latest SDK, keep low ANR rate, Add promo video, add option to skip tutorial\\nThe app's targetSdkVersion must be set to the latest version (33) in order to ensure that newer platform behaviors such as hardware acceleration and the correct default visual theme (Material You) are applied.",
        originalRef: "Top 7 Google Featuring issues",
      },`;

const index = content.lastIndexOf(insertionPoint);
if (index !== -1) {
  content = content.substring(0, index + insertionPoint.length) + newTestCases + content.substring(index + insertionPoint.length);
  
  content = content.replace('Families: "👪",', 'Families: "👪",\\n  Enforcement: "⚖️",\\n  "Top 7 Google Featuring issues": "🏆",');

  fs.writeFileSync('src/data.ts', content);
  console.log('Appended successfully');
} else {
  console.log('Insertion point not found');
}
