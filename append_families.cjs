const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const insertionPoint = `        originalRef: "Malware",
      },`;

const newTestCases = `
      {
        id: "And-GPGP-1.74",
        gl: "AGL-006",
        ref: "1.74",
        title: "Families Policy Requirements",
        steps: "1. Verify the app's content is appropriate for children.\\n2. Confirm the app is not merely an affiliate WebView.\\n3. If Augmented Reality (AR) is used, check for a mandatory safety warning upon launch explaining parental supervision and physical hazards.",
        expected: "App content is safe for children, does not use unapproved wrappers, and incorporates AR safety warnings.",
        policyText: "Designing Apps for Children and Families :\\nApps designed specifically  for Children must be safe for all the users, including Families\\n\\nFamilies Policy Requirements:\\n1. App content: App's content that is accessible to children must be appropriate for children.\\n2. App functionality: Your app must not merely provide a WebView of a website or have a primary purpose of driving affiliate traffic to a website, regardless of ownership of the website.\\n3. Augmented Reality (AR): If your app uses Augmented Reality, you must include a safety warning immediately upon launch of the AR section. The warning should contain the following:\\n• An appropriate message about the importance of parental supervision.\\n• A reminder to be aware of physical hazards in the real world (e.g., be aware of your surroundings).\\n• Your app must not require the usage of a device that is advised not to be used by children",
        originalRef: "Families",
      },
      {
        id: "And-GPGP-1.75",
        gl: "AGL-006",
        ref: "1.75",
        title: "Designed for Families Ad Formats",
        steps: "1. Check for ad walls or ads that interfere with app use (must be closeable after 5 seconds).\\n2. Verify interstitial ads are not displayed immediately upon launch.\\n3. Ensure ads are well-distinguished from app content and there are no deceptive or emotionally manipulative placements.",
        expected: "Ad formats in child-directed apps are clearly distinguishable, limit disruption, and do not encourage inadvertent clicks.",
        policyText: "Ad format requirements\\nAds in apps participating in Designed for Families must not have deceptive content or be designed in a way that will result in inadvertent clicks from child users. For example:\\n1) Use of Ad walls\\n2) Ads that interfere with normal app use that are not closeable after 5 seconds\\n3) Interstitial ads or offers for in-app purchase displayed immediately upon app launch\\n4) Multiple ad placements on a page\\n5) Ads or offers for in-app purchases that are not clearly distinguishable from your app content\\n6)Use of shocking or emotionally manipulative tactics to encourage ads viewing or in-app purchases\\n7) Not providing a distinction between the use of virtual game coins versus real-life money to make in-app purchases",
        originalRef: "Families",
      },
      {
        id: "And-GPGP-1.76",
        gl: "AGL-006",
        ref: "1.76",
        title: "Appropriate Ad Content in Families Program",
        steps: "1. Monitor the content of ads served within the app.\\n2. Verify the absence of mature media, inappropriate games, alcohol/tobacco, gambling/sweepstakes, adult content, or dating services.",
        expected: "Ad content is strictly appropriate for children and filters out all restricted categories.",
        policyText: "Apps that participate in the Designed for Families program must present ad content that is appropriate for children - \\nThe following are examples of ads not allowed in the Designed for Families program. Please note this is not an exhaustive list.\\n- Media Content: Ads for TV shows, movies, music albums, or any other media outlet not appropriate for children.\\n- Video Games & Downloadable Software: Ads for downloadable software and electronic video games that are not appropriate for children.\\n- Controlled or Uncontrolled Substances: Ads for alcohol, tobacco, controlled or uncontrolled substances.\\n- Gambling: Ads for simulated gambling, contests or sweepstakes promotions, even if free to enter.\\n- Adult and Sexually Suggestive Content: Ads with sexual and mature content.\\n- Dating or Relationships: Ads for dating sites",
        originalRef: "Families",
      },`;

const index = content.lastIndexOf(insertionPoint);
if (index !== -1) {
  content = content.substring(0, index + insertionPoint.length) + newTestCases + content.substring(index + insertionPoint.length);
  
  content = content.replace('Malware: "🦠",', 'Malware: "🦠",\\n  "Families": "👪",');

  fs.writeFileSync('src/data.ts', content);
  console.log('Appended successfully');
} else {
  console.log('Insertion point not found');
}
