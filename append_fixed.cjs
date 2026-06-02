const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const newTestCases = `{
        id: "And-GPGP-1.66",
        gl: "AGL-006",
        ref: "1.66",
        title: "User Ratings, Reviews, and Installs",
        steps: "1. Review any in-app prompts asking users to rate the app.\\n2. Ensure no incentives (e.g., in-app currency, unlocks) are offered in exchange for a rating or review.",
        expected: "App does not solicit fake or incentivized ratings to manipulate store ranking.",
        policyText: "User Ratings, Reviews, and Installs:\\n• Developers must not attempt to manipulate the placement of any apps in Google Play. This includes, but is not limited to, inflating product ratings, reviews, or install counts by illegitimate means, such as fraudulent or incentivized installs, reviews and ratings.\\n\\nExamples of common violations\\n1) Asking users to rate your app while offering an incentive\\n2) Repeatedly submitting ratings to influence the app’s placement on Google Play.\\n3) Submitting or encouraging users to submit reviews containing inappropriate content, including affiliates, coupons, game codes, email addresses, or links to websites or other apps\\nRatings and reviews are benchmarks of app quality. Users depend on them to be authentic and relevant",
        originalRef: "Store Listing and Promotion",
        imageUrl: "https://lh3.googleusercontent.com/YE3Ni1kHIBr9NCMbR8MHb6d25GeqZSExgXpX7Mun7OQKn54asHNxDzkiAskdc4TLItQ=w600-h1100"
      },
      {
        id: "And-GPGP-1.67",
        gl: "AGL-006",
        ref: "1.67",
        title: "App Metadata Violations",
        steps: "1. Check the app title, icon, and developer name in the Store Listing.\\n2. Verify the absence of promotional language, store performance claims, or Google Play program endorsements.",
        expected: "App title, icon, and developer name are clear of promotional language and ranking claims.",
        policyText: "Examples of common violations in app title, icon, or developer name\\n1) Images or text that indicate store performance or ranking, such as 'App of the year,' '#1'\\n2) Images or text that indicate price and promotional information, such as '10% off,' '$50 cash back,' 'free for limited time only'\\n3) Images or text that indicate Google Play programs, such as 'Editor’s choice, or New'",
        originalRef: "Store Listing and Promotion",
        imageUrl: "https://lh3.googleusercontent.com/oinE3IemifnHTMi0UhqU9rz1H7Yti08fhcQpmUktbNdkMijfrcMn-SuceK4fOZjAUjM=w600-h1100"
      },
      {
        id: "And-GPGP-1.68",
        gl: "AGL-006",
        ref: "1.68",
        title: "News Apps Policy",
        steps: "1. If the app is in the 'News' category, check for clear ownership and contact information (in-app or website).\\n2. If it requires a membership, ensure a content preview is provided prior to purchase.\\n3. Ascertain that content is not primarily affiliate marketing, purely static, or riddled with grammar errors.",
        expected: "News apps maintain high-quality journalistic standards with transparent publisher information.",
        policyText: "News :\\nApps that select the ‘News’ category but exhibit content that does not meet these requirements are not permitted in the News category of the Play Store. News apps that require a user to purchase a membership must provide a content preview for users prior to purchase. \\n\\nNews apps MUST:\\n1) provide adequate information about the news publisher and its contributors including clear ownership, and \\n2) have a website or in-app page that provides valid contact information for the news publisher.\\n\\nNews apps MUST NOT:\\n1) contain significant spelling & grammar errors,\\n2) contain only static content, and \\n3) have affiliate marketing or ad revenue as its primary purpose.  \\n4) News aggregator apps must be transparent about the publishing source of the content in the app and each of the sources must meet News policy requirements.",
        originalRef: "Store Listing and Promotion",
      }
    ]
  }
};

export const IOS_ICONS: Record<string, string> = {
  "Compliance": "📋",
  "Info.plist": "📄",
  "Privacy check": "🔒",
  "HIG": "📐",
  "Apple Sign-in": "🔑",
  "Subscriptions": "💳"
};

export const AND_ICONS: Record<string, string> = {
  "Core App Functionality": "⚙️",
  "Google Play": "🛍️",
  "Test Procedures": "🧪",
  "APK Related Tests": "📦",
  "GPG Design Guidelines": "🎮",
  "FTCs": "🛠️",
  "Play Games Services": "🕹️",
  "GPG Policies": "🛡️",
  "Store Listing and Promotion": "📢",
  "Monetization and Ads": "💸"
};
`;

content += newTestCases;
fs.writeFileSync('src/data.ts', content);
console.log('Appended correctly');
