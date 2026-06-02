const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const insertionPoint = `        originalRef: "Store Listing and Promotion",
      },`;

const newTestCases = `      {
        id: "And-GPGP-1.69",
        gl: "AGL-006",
        ref: "1.69",
        title: "Spam & Affiliate Webviews",
        steps: "1. Check if the app's primary purpose is to drive affiliate traffic.\\n2. Verify if it's merely providing a WebView of an existing website without documented permission.",
        expected: "App possesses standalone value and does not act purely as an unauthorized wrapper or referral farm.",
        policyText: "SPAM : Apps are not allowed that spam users or Google Play with apps that send users unsolicited messages or that are repetitive or low-quality.\\n\\nWebviews and Affiliate Spam :\\nApps are not allowed whose primary purpose is to drive affiliate traffic to a website or provide a WebView of a website without permission from the website owner or administrator.\\nExamples of common violations\\n1) An app whose primary purpose is to drive referral traffic to a website to receive credit for user sign-ups or purchases on that website.\\n2) Apps whose primary purpose is to provide a WebView of a website without permission:\\n\\nImage of Right >> This app is called “Ted’s Shopping Deals” and it simply provides a WebView of Google Shopping",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.70",
        gl: "AGL-006",
        ref: "1.70",
        title: "Repetitive Content",
        steps: "1. Search for highly similar apps developed by the same account.\\n2. Ensure the app adds original content or value compared to existing market offerings, rather than purely copying and pasting content.",
        expected: "App provides a distinct, unique experience and aggregates content sensibly instead of publishing multiple identical thin apps.",
        policyText: "Repetitive Content :\\nApps are not allowed that merely provide the same experience as other apps already on Google Play. Apps should provide value to users through creation of unique content or services.\\nHere are some examples of common violations:\\n - Copying content from other apps without adding any original content or value.\\n - Creating multiple apps with highly similar content and user experience. If these apps are each small in content volume, developers should consider creating a single app that aggregates all the content.\\nApps that are created by an automated tool, wizard service, or based on templates and submitted to Google Play by the operator of that service on behalf of other persons are not allowed. Such apps are only permissible if they are published by an individually registered developer account belonging to the user of the automated tool, not the operator of the service.",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.71",
        gl: "AGL-006",
        ref: "1.71",
        title: "Limited Functionality and Content",
        steps: "1. Review the app for interactivity and purpose.\\n2. Ascertain if it's purely static text/PDF or a single wallpaper lacking engaging UI.",
        expected: "App provides an engaging base level of utility exceeding a simple text document or a single image.",
        policyText: "Functionality, Content, and User Experience: \\nApps should provide a stable, responsive, and engaging user experience. Apps that crash, do not have the basic degree of adequate utility as mobile apps, lack engaging content, or exhibit other behavior that is not consistent with a functional and engaging user experience are not allowed on Google Play.\\n\\nLimited Functionality and Content\\nApps are not allowed that only have limited functionality and content.\\nExamples of common violations\\n1) Apps that are static without app-specific functionalities, for example, text only or PDF file apps\\n2) Apps with very little content and that do not provide an engaging user experience, for example, single wallpaper apps\\n3) Apps that are designed to do nothing or have no function",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.72",
        gl: "AGL-006",
        ref: "1.72",
        title: "Broken Functionality",
        steps: "1. Attempt to install and run the app on supported target devices.\\n2. Identify crashes, force closes, freezes, or missing basic load sequences.",
        expected: "App installs, loads, and responds gracefully to user interaction without crashing.",
        policyText: "Broken Functionality\\nApps are not allowed that crash, force close, freeze, or otherwise function abnormally.\\nExample of common violations: Apps that don’t install; Apps that install, but don’t load; Apps that load, but are not responsive",
        originalRef: "Spam and Minimum Functionality",
      },\n`;

const index = content.lastIndexOf(insertionPoint);
if (index !== -1) {
  content = content.substring(0, index + insertionPoint.length) + "\\n" + newTestCases + content.substring(index + insertionPoint.length);
  
  content = content.replace('"Monetization and Ads": "💸",', '"Monetization and Ads": "💸",\\n  "Spam and Minimum Functionality": "🚫",');

  fs.writeFileSync('src/data.ts', content);
  console.log('Appended successfully');
} else {
  console.log('Insertion point not found');
}
