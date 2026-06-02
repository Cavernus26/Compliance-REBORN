const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const insertionPoint = `        originalRef: "Top 7 Google Featuring issues",
      },`;

const newTestCases = `
      {
        id: "And-FEAT-1.8",
        gl: "AGL-007",
        ref: "1.8",
        title: "Rating flow and 5 star manipulation",
        steps: "1. Trigger the Rate My App popup.\\n2. Ensure it does not interrupt the user inappropriately.\\n3. Verify there is no explicit demand or request specifically for a '5-star' rating in the popup.",
        expected: "App requests ratings passively and does not specifically manipulate or ask for 5 stars.",
        policyText: "Rating flow and 5 star manipulation :Rate My app Pop-up Should appear after some levels. The app displays a popup window that requests a 5 star rating. Apps should not interrupt the user, either through a popup window, notification or other means, to rate the app 5 stars. Please remove the 5 star reference from the popup or put the request in a more passive location.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.9",
        gl: "AGL-007",
        ref: "1.9",
        title: "Tagline",
        steps: "1. Review promotional content and taglines.\\n2. Ensure the tagline is clear, concise, and helps users readily understand the nature of the promotional content.",
        expected: "Taglines are clear, concise, and understandable.",
        policyText: "Tagline:Ensure that promotional content features taglines is clear and concise,tagline should enable users to readily understand the nature of the promotional content",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.10",
        gl: "AGL-007",
        ref: "1.10",
        title: "New Feature",
        steps: "1. Test deep links for store offers.\\n2. Verify the user can highlight and purchase store offers directly without needing to enter the game.",
        expected: "Users can highlight and purchase store offers directly via deep links.",
        policyText: "New Feature:Implement a new feature enabling direct highlighting and purchase of store offers, along with deep links, without the need to enter the game",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.11",
        gl: "AGL-007",
        ref: "1.11",
        title: "Technical Side",
        steps: "1. Check the app's build.gradle or manifest.\\n2. Verify the TargetSDKVersion is at least 35, and 36 if aiming for Google Featuring.",
        expected: "TargetSDKVersion is exactly as required (35 minimum, 36 for featuring).",
        policyText: "Technical Side:Any app updates must have a TargetSDKVersion of at least 35. Moreover, apps aiming for Google Featuring must target the latest SDK, which is currently TargetSDKVersion 36",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.12",
        gl: "AGL-007",
        ref: "1.12",
        title: "Google Play Game Services Implementation",
        steps: "1. Verify Google Play Game Services is implemented.\\n2. Sign out of Google Play, then relaunch the app. It should not auto-login.\\n3. Check for GPGS achievements and verify they are localized for all supported languages.",
        expected: "GPGS is implemented correctly, does not auto-login after sign out, and achievements are properly localized.",
        policyText: "Google Play Game Services Implementation:Suggest implementing Google Play Game Services into the game.After signing out of Google Play, the game should not automatically login a user the next time the app is launched.The game is missing Achievements for Google Play Game Services. PGS achievement section is not localized for all supported languages. (Flagged for Japanese language)",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.13",
        gl: "AGL-007",
        ref: "1.13",
        title: "Notifications",
        steps: "1. Check notification icons in the status bar to ensure they are completely white with no color.\\n2. Trigger multiple notifications of the same type and ensure they are stacked, rather than creating new independent notifications.",
        expected: "Notification icons are all white and multiple notifications of the same type stack.",
        policyText: "Notifications:Your app’s notification icons in the status bar must be completely white with no color.If your app creates a notification while another of the same type is still pending, avoid creating a new notification object. Instead, stack the notification.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.14",
        gl: "AGL-007",
        ref: "1.14",
        title: "Device Resolution Support and Assets",
        steps: "1. Check if the app has a xxxhdpi Launcher icon(s) for high density screens.\\n2. Verify the launcher icon is three-dimensional, front view, distinct silhouette, with a slight perspective.\\n3. Ensure launcher icon is not pixelated on high density screens.",
        expected: "App provides high-quality non-pixelated xxxhdpi launcher icons adhering to 3D and perspective visual guidelines.",
        policyText: "Device Resolution Support and Assets:The app does not have a xxxhdpi Launcher icon(s) for display on devices with high density screens. It's important to keep in mind that your app may be installed on a variety of devices that offer a range of pixel densities.In order to improve your icon for the Android Platform we suggest the following: Launcher icons should be three-dimensional, front view, distinct silhouette, with a slight perspective as if viewed from above.The launcher icon is pixelated on high density screens.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.15",
        gl: "AGL-007",
        ref: "1.15",
        title: "Material Design",
        steps: "1. Inspect any square badges used in the launcher and/or high-res icons.\\n2. Verify the rounded corners radius does not exceed 15% of the badge's width.",
        expected: "Square badge corner radiuses are within 15% of the badge width.",
        policyText: "Material Design:The square badge used in the launcher and/or high-res icon has rounded corners with radius in excess of 15% of the badge's width.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.16",
        gl: "AGL-007",
        ref: "1.16",
        title: "App Permissions",
        steps: "1. Verify the READ_LOGS permission is removed from the app.\\n2. Ensure requests for any sensitive permissions (ACCESS_FINE_LOCATION, READ_CALENDAR, WRITE_CALENDAR, RECORD_AUDIO, SEND_SMS) are clearly explained to the user.",
        expected: "READ_LOGS is absent, and any sensitive permissions have clear in-app disclosures.",
        policyText: "App Permissions:Please remove the READ_LOGS permission from your app.The request for the following sensitive permissions may not be clear to some users.\\n• ACCESS_FINE_LOCATION\\n• READ_CALENDAR\\n• WRITE_CALENDAR\\n• RECORD_AUDIO\\n• SEND_SMS",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.17",
        gl: "AGL-007",
        ref: "1.17",
        title: "Pixel Compatibility",
        steps: "1. Run the app on supported Pixel devices.\\n2. Ensure performance is within acceptable parameters without lag or crashes.",
        expected: "App performs smoothly on Pixel devices.",
        policyText: "Pixel Compatibility:Please ensure the app runs within acceptable performance parameters on supported Pixel devices.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.18",
        gl: "AGL-007",
        ref: "1.18",
        title: "Screen Orientation",
        steps: "1. Rotate the device into landscape mode.\\n2. Ensure the app supports both left and right landscape orientations (not fixed to one side only).",
        expected: "App rotates freely between both landscape orientations.",
        policyText: "Screen Orientation:Landscape Mode is fixed for one side only. Suggest adding support for both sides.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.19",
        gl: "AGL-007",
        ref: "1.19",
        title: "Full screen",
        steps: "1. Enter full-screen mode in the app.\\n2. Verify the status and navigation bars are hidden completely.",
        expected: "Status and navigation bars hide correctly in full-screen mode.",
        policyText: "Full screen:The app should hide the status and navigation bars when entering full-screen.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.20",
        gl: "AGL-007",
        ref: "1.20",
        title: "Language Selection",
        steps: "1. Open the language selection menu.\\n2. Ensure flag images are not used to represent languages unless the content is strictly country-specific.",
        expected: "Language selection does not rely on country flags to represent shared languages.",
        policyText: "Language Selection:Unless content is specific to the countries, please avoid using flag images to represent languages. The flags may alienate users from other countries that use the same language.",
        originalRef: "Optional Issues From Google Feedback",
      },`;

const index = content.lastIndexOf(insertionPoint);
if (index !== -1) {
  content = content.substring(0, index + insertionPoint.length) + newTestCases + content.substring(index + insertionPoint.length);
  
  content = content.replace('"Top 7 Google Featuring issues": "🏆",', '"Top 7 Google Featuring issues": "🏆",\\n  "Optional Issues From Google Feedback": "💡",');

  fs.writeFileSync('src/data.ts', content);
  console.log('Appended successfully');
} else {
  console.log('Insertion point not found');
}
