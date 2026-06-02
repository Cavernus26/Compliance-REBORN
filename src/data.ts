import { PlatformData } from "./types";

export const ALL_DATA: Record<string, PlatformData> = {
  ios: {
    guidelines: [
      {
        id: "GL-001",
        title: "Compliance",
        description:
          "App Store Review Guidelines (Safety, Performance, Business, Design, Legal)",
        category: "Compliance",
        impact: "high",
      },
      {
        id: "GL-002",
        title: "Info.plist",
        description:
          "Required Information Property List Keys, Purpose Strings, and System Configuration",
        category: "Info.plist",
        impact: "high",
      },
      {
        id: "GL-003",
        title: "Privacy check",
        description:
          "Privacy and Personal Data Usage Description Info.plist Keys",
        category: "Privacy check",
        impact: "high",
      },
      {
        id: "GL-004",
        title: "HIG",
        description: "Apple Human Interface Guidelines (Layout)",
        category: "HIG",
        impact: "high",
      },
      {
        id: "GL-005",
        title: "Apple Sign-in",
        description: "Apple Sign-in Integration and User Account Guidelines",
        category: "Apple Sign-in",
        impact: "high",
      },
      {
        id: "GL-006",
        title: "Subscriptions",
        description:
          "In-App Purchases, Auto-Renewable Subscriptions, and App Store Billing Guidelines",
        category: "Subscriptions",
        impact: "high",
      },
    ],
    testCases: [
      // Section: Objectionable content
      {
        id: "iOS-C-1.1.1",
        gl: "GL-001",
        ref: "1.1.1",
        title:
          "Defamatory or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, or other targeted groups, particularly if the app is likely to place a targeted individual or group in harm’s way. Professional political satirists and humorists are generally exempt from this requirement",
        steps:
          "1. Open the app.\n2. Look at all user-facing text and imagery for commentary about targeted groups.\n3. Check that no content places individuals in harm's way.\n4. Check that humor/satire follows professional standards.",
        expected: "No defamatory or mean-spirited content found.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.2",
        gl: "GL-001",
        ref: "1.1.2",
        title:
          "Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence. “Enemies” within the context of a game cannot solely target a specific race, culture, real government, corporation, or any other real entity",
        steps:
          "1. Open the app.\n2. Visually look at combat sequences and cinematic content for realistic maiming or torture.\n3. Check that enemy factions are fictional and do not target specific real-world groups or entities.",
        expected: "Violence is fictional; no targeting of real groups.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.3",
        gl: "GL-001",
        ref: "1.1.3",
        title:
          "Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms or ammunition",
        steps:
          "1. Open the app.\n2. Check whether the app encourages reckless weapon handling.\n3. Check that no links or functionality exist for purchasing real-world firearms/ammo.",
        expected:
          "No facilitation of firearm sales; no encouragement of reckless weapon use.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.4",
        gl: "GL-001",
        ref: "1.1.4",
        title:
          "Overtly sexual or pornographic material, defined by Webster's Dictionary as \"explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings.” This includes “hookup” apps that may include pornography or be used to facilitate prostitution.",
        steps:
          "1. Open the app.\n2. Look through all app content for nudity or explicit descriptions of sexual activity.\n3. Check that 'hookup' apps do not facilitate services like prostitution.",
        expected: "No overtly sexual or pornographic material present.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.5",
        gl: "GL-001",
        ref: "1.1.5",
        title:
          "Inflammatory religious commentary or inaccurate or misleading quotations of religious texts",
        steps:
          "1. Open the app.\n2. Look at scriptural quotations for accuracy.\n3. Make sure that religious commentary is not inflammatory or misleading.",
        expected: "No inflammatory or misleading religious content.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.6",
        gl: "GL-001",
        ref: "1.1.6",
        title:
          "False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers. Stating that the app is “for entertainment purposes” won’t overcome this guideline. Apps that enable anonymous or prank phone calls or SMS/MMS messaging will be rejected",
        steps:
          "1. Open the app.\n2. Check that device-related features (battery, storage, location) provide real data.\n3. Check that no anonymous call/SMS prank functionality is present.",
        expected:
          "Features are transparent and accurate; no prank call/SMS logic.",
        originalRef: "Objectionable content",
      },
      {
        id: "iOS-C-1.1.7",
        gl: "GL-001",
        ref: "1.1.7",
        title:
          "Harmful concepts which capitalize or seek to profit on recent or current events, such as violent conflicts, terrorist attacks, and epidemics.",
        steps:
          "1. Open the app.\n2. Check for references to real-world tragedies or ongoing conflicts used for profit.\n3. Check that the app does not exploit sensitive current events.",
        expected: "App does not capitalize on recent tragedies or epidemics.",
        originalRef: "Objectionable content",
      },

      // Section: User Generated Content
      {
        id: "iOS-C-1.2.1",
        gl: "GL-001",
        ref: "1.2.1",
        title:
          "A method for filtering objectionable material from being posted to the app",
        steps:
          "1. Open the app.\n2. Locate all UGC entry points (chat, profile name).\n3. Attempt to submit profanity or slurs to test filtering mechanism.",
        expected: "Filtering mechanism blocks or flags objectionable material.",
        originalRef: "User Generated Content",
      },
      {
        id: "iOS-C-1.2.2",
        gl: "GL-001",
        ref: "1.2.2",
        title:
          "A mechanism to report offensive content and timely responses to concerns",
        steps:
          "1. Open the app.\n2. Locate the 'Report' button on user-submitted content.\n3. Check that the reporting flow works and leads to a developer response system.",
        expected: "Reporting mechanism is functional and reachable.",
        originalRef: "User Generated Content",
      },
      {
        id: "iOS-C-1.2.3",
        gl: "GL-001",
        ref: "1.2.3",
        title: "The ability to block abusive users from the service",
        steps:
          "1. Open the app.\n2. Look for a 'Block' or 'Ignore' button on other user profiles/messages.\n3. Activate the block and confirm content from that user is no longer visible.",
        expected: "Blocking functionality is present and effective.",
        originalRef: "User Generated Content",
      },
      {
        id: "iOS-C-1.2.4",
        gl: "GL-001",
        ref: "1.2.4",
        title: "Published contact information so users can easily reach you",
        steps:
          "1. Open the app.\n2. Search the app (Settings, About, Help) for developer contact information.\n3. Check that the information is accurate and easy to find.",
        expected: "Contact information is accessible within the app.",
        originalRef: "User Generated Content",
      },
      {
        id: "iOS-C-1.2.5",
        gl: "GL-001",
        ref: "1.2.5",
        title:
          "If your app includes user-generated content from a web-based service, it may display incidental mature “NSFW” content, provided that the content is hidden by default and only displayed when the user turns it on via your website",
        steps:
          "1. Open the app.\n2. If web-service UGC is present, check if NSFW content is shown immediately.\n3. Check that NSFW content is hidden by default and requires user action to enable.",
        expected: "NSFW content is hidden by default; user must toggle it.",
        originalRef: "User Generated Content",
      },
      // Section: Creator Content
      {
        id: "iOS-C-1.3.1",
        gl: "GL-001",
        ref: "1.3.1",
        title:
          "The App Store supports apps offering such user-generated content so long as they follow all Guidelines, including Guideline 1.2 for moderating user-generated content and Guideline 3.1.1 for payments and in-app purchases.",
        steps:
          "1. Open the app.\n2. Check that creator content follows UGC moderation rules.\n3. Make sure that payments for creator content use in-app purchases (IAP).",
        expected: "Creator content follows guidelines 1.2 and 3.1.1.",
        originalRef: "Creator Content",
      },
      {
        id: "iOS-C-1.3.2",
        gl: "GL-001",
        ref: "1.3.2",
        title:
          "Creator apps should share the age rating of the highest age-rated creator content available in the app, and communicate to users which content requires additional purchases.",
        steps:
          "1. Open the app.\n2. Check that the app's age rating matches the most mature creator content.\n3. Check that paid content is clearly identified.",
        expected: "Age rating and purchase requirements are transparent.",
        originalRef: "Creator Content",
      },
      // Section: Kids Category
      {
        id: "iOS-C-1.4.1",
        gl: "GL-001",
        ref: "1.4.1",
        title:
          "Apps must not include links out of the app, purchasing opportunities, or other distractions to kids unless reserved for a designated area behind a parental gate",
        steps:
          "1. Open the app.\n2. Look through kid-accessible areas for external links or IAP buttons.\n3. Check that a parental gate (e.g., math problem, adult gesture) exists for restricted spots.",
        expected: "Links and purchases are locked behind a parental gate.",
        originalRef: "Kids Category",
      },
      {
        id: "iOS-C-1.4.2",
        gl: "GL-001",
        ref: "1.4.2",
        title:
          "Apps in the Kids Category may not include third-party advertising or analytics.",
        steps:
          "1. Open the app.\n2. Check for any third-party ad networks (AdMob, etc.).\n3. Check that analytics SDKs do not collect third-party data for advertising profiling.",
        expected: "No third-party ads or identifying analytics found.",
        originalRef: "Kids Category",
      },
      // Section: Physical Harm
      {
        id: "iOS-C-1.5.1",
        gl: "GL-001",
        ref: "1.5.1",
        title:
          "Medical apps that could provide inaccurate data or information, or that could be used for diagnosing or treating patients may be reviewed with greater scrutiny. If your medical app has received regulatory clearance, please submit a link to that documentation with your app.",
        steps:
          "1. Open the app.\n2. Check that medical claims are supported by documentation.\n3. Make sure that diagnostic tools are accurate and clear about their purpose.",
        expected: "Medical info is accurate and documentation is linked.",
        originalRef: "Physical Harm",
      },
      {
        id: "iOS-C-1.5.2",
        gl: "GL-001",
        ref: "1.5.2",
        title:
          "Drug dosage calculators must come from the drug manufacturer, a hospital, university, health insurance company, or other approved entity, or receive approval by the FDA or one of its international counterparts. Given the potential harm to patients, we need to be sure that the app will be supported and updated over the long term",
        steps:
          "1. Open the app.\n2. Check that the source of any dosage calculation logic.\n3. Check that the entity is approved (e.g., FDA, hospital).",
        expected: "Dosage calculator originates from an approved authority.",
        originalRef: "Physical Harm",
      },
      {
        id: "iOS-C-1.5.3",
        gl: "GL-001",
        ref: "1.5.3",
        title:
          "Apps that encourage consumption of tobacco and vape products, illegal drugs, or excessive amounts of alcohol are not permitted on the App Store. Apps that encourage minors to consume any of these substances will be rejected. Facilitating the sale of controlled substances (except for licensed pharmacies and licensed or otherwise legal cannabis dispensaries), or tobacco is not allowed.",
        steps:
          "1. Open the app.\n2. Search for content promoting drug/tobacco use.\n3. Check that no facilitation of illegal or minor-focused substance sales.",
        expected: "No promotion of reckless substance use or illegal sales.",
        originalRef: "Physical Harm",
      },
      {
        id: "iOS-C-1.5.4",
        gl: "GL-001",
        ref: "1.5.4",
        title:
          "Apps may only display DUI checkpoints that are published by law enforcement agencies, and should never encourage drunk driving or other reckless behavior such as excessive speed",
        steps:
          "1. Open the app.\n2. Check that DUI checkpoint sources.\n3. Make sure that no 'speeding' or 'drunk driving' gamification exists in real-world contexts.",
        expected:
          "Checkpoints are official; no encouragement of reckless driving.",
        originalRef: "Physical Harm",
      },
      {
        id: "iOS-C-1.5.5",
        gl: "GL-001",
        ref: "1.5.5",
        title:
          "Apps should not urge customers to participate in activities (like bets, challenges, etc.) or use their devices in a way that risks physical harm to themselves or others.",
        steps:
          "1. Open the app.\n2. Check for physical 'dares' or 'challenges'.\n3. Check that the UI doesn't distract drivers or cause other physical risks.",
        expected: "No dangerous physical challenges found.",
        originalRef: "Physical Harm",
      },
      // Section: Developer Information
      {
        id: "iOS-C-1.6.1",
        gl: "GL-001",
        ref: "1.6.1",
        title:
          "Make sure your app and its Support URL include an easy way to contact you; this is particularly important for apps that may be used in the classroom. Failure to include accurate and up-to-date contact information not only frustrates customers, but may violate the law in some countries.",
        steps:
          "1. Open the app.\n2. Try using the 'Support URL' provided in App Store Connect.\n3. Find contact info within the app UI if applicable.",
        expected: "Developer is easily reachable via multiple channels.",
        originalRef: "Developer Information",
      },
      {
        id: "iOS-C-1.6.2",
        gl: "GL-001",
        ref: "1.6.2",
        title:
          "Ensure that Wallet passes include valid contact information from the issuer and are signed with a dedicated certificate assigned to the brand or trademark owner of the pass",
        steps:
          "1. Open the app.\n2. Visually look at Wallet passes for contact details.\n3. Check that certificate ownership.",
        expected: "Wallet passes have valid info and ownership signatures.",
        originalRef: "Developer Information",
      },
      // Section: Reporting Criminal Activity
      {
        id: "iOS-C-1.7.1",
        gl: "GL-001",
        ref: "1.7.1",
        title:
          "Apps for reporting alleged criminal activity must involve local law enforcement, and can only be offered in countries where such involvement is active.",
        steps:
          "1. Open the app.\n2. Check the target countries for the reporting feature.\n3. Check that integration with official law enforcement APIs or contact methods.",
        expected:
          "Crime reporting involves active law enforcement involvement.",
        originalRef: "Reporting Criminal Activity",
      },
      // Section: App Completeness
      {
        id: "iOS-C-2.1.1",
        gl: "GL-001",
        ref: "2.1.1",
        title:
          "Make sure that there are no placeholder text, empty websites or any temporary content present in app",
        steps:
          "1. Open the app.\n2. Search for 'Lorem Ipsum' or 'TBD' strings.\n3. Check for broken image icons or dead links.",
        expected: "No placeholder content found.",
        originalRef: "App Completeness",
      },
      {
        id: "iOS-C-2.1.2",
        gl: "GL-001",
        ref: "2.1.2",
        title:
          "App must not present any bugs, obvious technical problems & crashes otherwise app will be rejected",
        steps:
          "1. Open the app.\n2. Do smoke tests on all major features.\n3. Look at crash logs if any occur.",
        expected: "App is stable and free of technical defects.",
        originalRef: "App Completeness",
      },
      {
        id: "iOS-C-2.1.3",
        gl: "GL-001",
        ref: "2.1.3",
        title:
          "If your app contains login functionality make sure that backend services are up and running",
        steps:
          "1. Open the app.\n2. Try using sign-in/sign-up flows.\n3. Check that server connectivity in production-like environment.",
        expected: "Backend authentication is active and reachable.",
        originalRef: "App Completeness",
      },
      {
        id: "iOS-C-2.1.4",
        gl: "GL-001",
        ref: "2.1.4",
        title:
          "If you offer in-app purchases make sure they are complete, pricing is up-to-date and visible",
        steps:
          "1. Open the app.\n2. Reconcile in-game prices with App Store Connect metadata.\n3. Check that purchase flow completes correctly.",
        expected: "IAPs are complete and correctly priced.",
        originalRef: "App Completeness",
      },
      // Section: Beta Testing
      {
        id: "iOS-C-2.2.1",
        gl: "GL-001",
        ref: "2.2.1",
        title:
          "Demos, betas and trial versions of the app must not be submitted to App Store- Test Flight should be used instead",
        steps:
          "1. Open the app.\n2. Make sure that this submission is a full production version.\n3. Use TestFlight for feature testing.",
        expected: "Submission is not a demo or beta version.",
        originalRef: "Beta Testing",
      },
      {
        id: "iOS-C-2.2.2",
        gl: "GL-001",
        ref: "2.2.2",
        title:
          "Apps submitted for beta distribution via Test Flight should be intended for public distribution and should comply with App review guidelines",
        steps:
          "1. Open the app.\n2. Check that Beta builds follow Safety and Performance rules.\n3. Check that the intent is eventual production.",
        expected: "Beta builds are compliant with core guidelines.",
        originalRef: "Beta Testing",
      },
      {
        id: "iOS-C-2.2.3",
        gl: "GL-001",
        ref: "2.2.3",
        title:
          "Apps using Test Flight cannot be distributed to testers in exchange for compensation of any kind",
        steps:
          "1. Open the app.\n2. Check that no 'paid beta' schemes.\n3. Look at tester recruitment for mentions of rewards.",
        expected: "No compensation offered to beta testers.",
        originalRef: "Beta Testing",
      },
      {
        id: "iOS-C-2.2.4",
        gl: "GL-001",
        ref: "2.2.4",
        title:
          "Significant updates to the beta build should be submitted to Test Flight App Review before being distributed",
        steps:
          "1. Open the app.\n2. Submit new versions through the 'TestFlight' review tab in ASC.",
        expected: "Beta updates are reviewed by Apple.",
        originalRef: "Beta Testing",
      },
      // Section: Accurate Metadata
      {
        id: "iOS-C-2.3.1",
        gl: "GL-001",
        ref: "2.3.1",
        title:
          "Don’t include any hidden, dormant, or undocumented features in your app; your app’s functionality should be clear to end-users and App Review. All new features, functionality, and product changes must be described with specificity in the Notes for Review section of App Store Connect (generic descriptions will be rejected) and accessible for review. Similarly, marketing your app in a misleading way, such as by promoting content or services that it does not actually offer (e.g. iOS-based virus and malware scanners) or promoting a false price, whether within or outside of the App Store, is grounds for removal of your app from the App Store and termination of your developer account. Egregious or repeated behavior is grounds for removal from the Developer Program. We work hard to make the App Store a trustworthy ecosystem and expect our app developers to follow suit; if you’re dishonest, we don’t want to do business with you.",
        steps:
          "1. Open the app.\n2. Look at all app features against the description in App Store Connect.\n3. Make sure that no hidden modules or diagnostic tools exist.\n4. Check that marketing claims match actual app capabilities.",
        expected: "Functionality is transparent; marketing is accurate.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.2",
        gl: "GL-001",
        ref: "2.3.2",
        title:
          "If you decide to promote in-app purchases on the App Store, ensure that the IAP Display Name and Description are written for a public audience, that you follow the guidance found in Promoting Your In-App Purchases , and that your app properly handles the SKPaymentTransactionObserver method so that customers can seamlessly complete the purchase when your app launches.",
        steps:
          "1. Open the app.\n2. Check that IAP metadata is public-facing and clear.\n3. Make sure that purchase flow is handled properly if initiated from the App Store.",
        expected: "IAP promotion is compliant and functional.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.3",
        gl: "GL-001",
        ref: "2.3.3",
        title:
          "Screenshots should show the app in use, and not merely the title art, log-in page, or splash screen.",
        steps:
          "1. Open the app.\n2. Look at App Store screenshots.\n3. Check that at least 60% of images show inside-app gameplay/UI.",
        expected: "Screenshots represent actual app use.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.4",
        gl: "GL-001",
        ref: "2.3.4",
        title:
          "Previews are a great way for customers to see what your app looks like and what it does. To ensure people understand what they’ll be getting with your app, previews may only use video screen captures of the app itself. You can add narration and video or textual overlays to help explain anything that isn’t clear from the video alone",
        steps:
          "1. Open the app.\n2. Carefully look at app previews for non-app footage.\n3. Make sure that video content is primarily screen-captured UI/Gameplay.",
        expected: "Previews are based on authentic screen capture.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.5",
        gl: "GL-001",
        ref: "2.3.5",
        title: "Select the most appropriate category for your app",
        steps:
          "1. Open the app.\n2. Check that app category in App Store Connect matches core functionality.",
        expected: "Category selection is appropriate.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.6",
        gl: "GL-001",
        ref: "2.3.6",
        title:
          "Answer the age rating questions in App Store Connect honestly so that your app aligns properly with parental controls. If your app is mis-rated, customers might be surprised by what they get, or it could trigger an inquiry from government regulators. If your app includes media that requires the display of content ratings or warnings (e.g. films, music, games, etc.), you are responsible for complying with local requirements in each territory where your app is available.",
        steps:
          "1. Open the app.\n2. Look at the age rating questionnaire answers.\n3. Check that against actual app content (violence, adult themes).",
        expected: "Age rating is honest and accurate.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.7",
        gl: "GL-001",
        ref: "2.3.7",
        title:
          "Choose a unique app name, assign keywords that accurately describe your app, and don’t try to pack any of your metadata with trademarked terms, popular app names, pricing information or other irrelevant phrases just to game the system. Apple may modify inappropriate keywords at any time or take other appropriate steps to prevent abuse. App names must be limited to 30 characters. Metadata such as app names, subtitles, screenshots, and previews should not include prices, terms, or descriptions that are not specific to the metadata type. App subtitles are a great way to provide additional context for your app; they must follow our standard metadata rules and should not include inappropriate content, reference other apps, or make unverifiable product claims.",
        steps:
          "1. Open the app.\n2. Check app name length (max 30 chars).\n3. Look at keywords for trademark spam or competitor names.\n4. Check that subtitles don't contain pricing or unverifiable claims.",
        expected: "App name and keywords are unique and honest.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.8",
        gl: "GL-001",
        ref: "2.3.8",
        title:
          "Metadata should be appropriate for all audiences, so make sure your app and in-app purchase icons, screenshots, and previews adhere to a 4+ age rating even if your app is rated higher.",
        steps:
          "1. Open the app.\n2. Visually look at icons and screenshots for mature content.\n3. Make sure that overall presentation is 'safe' for a 4+ audience.",
        expected: "Store metadata is safe for children (4+).",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.9",
        gl: "GL-001",
        ref: "2.3.9",
        title:
          "You are responsible for securing the rights to use all materials in your app icons, screenshots, and previews, and you should display fictional account information instead of data from a real person",
        steps:
          "1. Open the app.\n2. Check that property rights for all marketing assets.\n3. Make sure that 'John Doe' or fictional data is used in screenshots.",
        expected: "Rights are secured; fictional data is displayed.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.10",
        gl: "GL-001",
        ref: "2.3.10",
        title:
          "Make sure your app is focused on the iOS, macOS, tvOS or watchOS experience, and don’t include names, icons, or imagery of other mobile platforms in your app or metadata, unless there is specific, approved interactive functionality. Make sure your app metadata is focused on the app itself and its experience. Don’t include irrelevant information.",
        steps:
          "1. Open the app.\n2. Search for 'Android', 'Google Play' or logos of other platforms in metadata/app imagery.\n3. Check that focus is entirely on Apple OS experience.",
        expected: "No branding or references to competing platforms.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.11",
        gl: "GL-001",
        ref: "2.3.11",
        title:
          "Apps you submit for pre-order on the App Store must be complete and deliverable as submitted. Ensure that the app you ultimately release is not materially different from what you advertise while the app is in a pre-order state. If you make material changes to the app (e.g. change business models), you should restart your pre-order sales.",
        steps:
          "1. Open the app.\n2. Compare pre-order promises with current build functionality.\n3. Check that business model hasn't shifted significantly.",
        expected: "Pre-order promises align with current deliverable.",
        originalRef: "Accurate Metadata",
      },
      {
        id: "iOS-C-2.3.12",
        gl: "GL-001",
        ref: "2.3.12",
        title:
          "Apps must clearly describe new features and product changes in their “What’s New” text. Simple bug fixes, security updates, and performance improvements may rely on a generic description, but more significant changes must be listed in the notes.",
        steps:
          "1. Open the app.\n2. Look at 'What's New' text for specificity.\n3. Make sure that major updates aren't hidden under 'bug fixes'.",
        expected: "Significant changes are explicitly described.",
        originalRef: "Accurate Metadata",
      },
      // Section: Hardware Compatibility
      {
        id: "iOS-C-2.4.1",
        gl: "GL-001",
        ref: "2.4.1",
        title: "iPhone apps should run on iPad whenever possible",
        steps:
          "1. Open the app.\n2. Install the iPhone-only binary on an iPad.\n3. Check that the 1x/2x compatibility mode works without crashes.",
        expected: "App runs on iPad in compatibility mode.",
        originalRef: "Hardware Compatibility",
      },
      {
        id: "iOS-C-2.4.2",
        gl: "GL-001",
        ref: "2.4.2",
        title:
          "Design your app to use power efficiently and be used in a way that does not risk damage to the device. Apps should not rapidly drain battery, generate excessive heat, or put unnecessary strain on device resources. Apps, including any third-party advertisements displayed within them, may not run unrelated background processes, such as cryptocurrency mining.",
        steps:
          "1. Open the app.\n2. Monitor battery usage during a 5-minute session.\n3. Check device temperature.\n4. Check that no hidden mining or heavy background tasks.",
        expected: "No excessive heat or battery drain; no mining.",
        originalRef: "Hardware Compatibility",
      },
      {
        id: "iOS-C-2.4.3",
        gl: "GL-001",
        ref: "2.4.3",
        title:
          "People should be able to use your Apple TV app without the need for hardware inputs beyond the Siri remote or third-party game controllers, but feel free to provide enhanced functionality when other peripherals are connected. If you require a game controller, make sure you clearly explain that in your metadata so customers know they need additional equipment to play.",
        steps:
          "1. Open the app.\n2. (tvOS only) Test functionality with Siri Remote only.\n3. Check that metadata mentions controller requirements if applicable.",
        expected: "Core features work with Siri remote.",
        originalRef: "Hardware Compatibility",
      },
      {
        id: "iOS-C-2.4.4",
        gl: "GL-001",
        ref: "2.4.4",
        title:
          "Apps should never suggest or require a restart of the device or modifications to system settings unrelated to the core functionality of the app. For example, don’t encourage users to turn off Wi-Fi, disable security features, etc.",
        steps:
          "1. Open the app.\n2. Look through for prompts asking to reboot.\n3. Check that app doesn't ask to disable system security (VPN, Wi-Fi).",
        expected: "No unrequested system modifications or restarts.",
        originalRef: "Hardware Compatibility",
      },
      // Section: Software Requirements
      {
        id: "iOS-C-2.5.1",
        gl: "GL-001",
        ref: "2.5.1",
        title:
          "Apps may only use public APIs and MUST run on latest shipping iOS. Keep your apps up-to-date and make sure you phase out any deprecated features, frameworks or technologies that will no longer be supported in future versions of an OS, for this take confirmation from DEV team. Apps should use APIs and frameworks for their intended purposes and indicate that integration in their app description.",
        steps:
          "1. Open the app.\n2. Run on the latest public iOS release.\n3. Check that no private API usage (grep symbols if possible).\n4. Check that APIs are used as intended.",
        expected: "Runs on latest iOS using only public APIs.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.2",
        gl: "GL-001",
        ref: "2.5.2",
        title:
          "Apps should be self-contained in their bundles, and may not read or write data outside the designated container area, nor may they download, install, or execute code which introduces or changes features or functionality of the app, including other iOS, watchOS, Mac OS X, or tvOS apps.",
        steps:
          "1. Open the app.\n2. Check that app doesn't try to download zip/binary updates for features.\n3. Check that all logic is in the bundle.",
        expected: "Executable code is entirely self-contained.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.4",
        gl: "GL-001",
        ref: "2.5.4",
        title:
          "Multitasking apps may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc. If your app uses location background mode, include a reminder that doing so may dramatically decrease battery life.",
        steps:
          "1. Open the app.\n2. Check plist for Background Modes.\n3. Check that usage matches intent.\n4. Look for 'battery life' warning if using BG Location.",
        expected: "Background modes are justified and warned.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.5",
        gl: "GL-001",
        ref: "2.5.5",
        title: "Apps must be fully functional on IPv6-only networks",
        steps:
          "1. Open the app.\n2. Connect device to an IPv6-only hotspot.\n3. Launch app and test all network-dependent features.",
        expected: "App functions fully on IPv6.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.6",
        gl: "GL-001",
        ref: "2.5.6",
        title:
          "If your game is server dependent/has multiplayer, check the game functionality and loading process while being connected to IPv6 network",
        steps:
          "1. Open the app.\n2. Matchmake or join session on IPv6 network.\n3. Check that latency and stability.",
        expected: "Multiplayer works on IPv6.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.7",
        gl: "GL-001",
        ref: "2.5.7",
        title:
          "Verify In-App purchases can be made successfully through IPv6 Network",
        steps:
          "1. Open the app.\n2. Trigger IAP purchase on IPv6 network.\n3. Complete sandbox transaction.",
        expected: "IAP works on IPv6.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.10",
        gl: "GL-001",
        ref: "2.5.10",
        title:
          "Apps that browse the web must use the appropriate WebKit framework and WebKit JavaScript.",
        steps:
          "1. Open the app.\n2. Visually look at internal browser modules.\n3. Check that usage of WKWebView.",
        expected: "App uses WebKit for web browsing.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.12",
        gl: "GL-001",
        ref: "2.5.12",
        title:
          "Apps that alter or disable the functions of standard switches, such as the Volume Up/Down and Ring/Silent switches, or other native user interface elements or behaviors will be rejected. For example, apps should not block links out to other apps or other features that users would expect to work a certain way",
        steps:
          "1. Open the app.\n2. Try using hardware buttons while app is active.\n3. Check that volume/silent buttons still drive system changes.",
        expected: "Standard switches function normally.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.14",
        gl: "GL-001",
        ref: "2.5.14",
        title:
          "Apps integrating SiriKit and Shortcuts should only sign up for intents they can handle without the support of an additional app and that users would expect from the stated functionality.",
        steps:
          "1. Open the app.\n2. (If applicable) Test Siri intents.\n3. Check that they resolve directly.",
        expected: "Intents are handled directly and logically.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.18",
        gl: "GL-001",
        ref: "2.5.18",
        title:
          "Apps using facial recognition for account authentication must use LocalAuthentication (and not ARKit or other facial recognition technology) where possible, and must use an alternate authentication method for users under 13 years old.",
        steps:
          "1. Open the app.\n2. Check Auth implementation.\n3. Check that alternate path for kids < 13.",
        expected: "FaceID uses LocalAuth and supports under 13s.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.19",
        gl: "GL-001",
        ref: "2.5.19",
        title:
          "Apps must request explicit user consent and provide a clear visual and/or audible indication when recording, logging, or otherwise making a record of user activity. This includes any use of the device camera, microphone, screen recordings, or other user inputs.",
        steps:
          "1. Open the app.\n2. Trigger recording features.\n3. Check that system permission prompts AND clear in-app indicators (recording dot).",
        expected: "Recording is transparent and consented.",
        originalRef: "Software Requirements",
      },
      {
        id: "iOS-C-2.5.22",
        gl: "GL-001",
        ref: "2.5.22",
        title:
          "Apps that contain ads must also include the ability for users to report any inappropriate or age-inappropriate ads",
        steps:
          "1. Open the app.\n2. Locate 'Ad choice' or 'Report' icon on banners.\n3. Check that flow for reporting bad ads.",
        expected: "Ad reporting mechanism is present.",
        originalRef: "Software Requirements",
      },
      // Section: Payments
      {
        id: "iOS-C-3.1.1",
        gl: "GL-001",
        ref: "3.1.1",
        title:
          "To unlock features or functionality within your app, In-App purchase must be used. Apps may not use their own mechanisms to unlock content or functionality, such as license keys, augmented reality markers, QR codes, etc.",
        steps:
          "1. Open the app.\n2. Check that that 'Premium' features are unlocked via StoreKit.\n3. Make sure that no 'Input Code' field for feature unlocks.",
        expected: "IAP used for all digital unlocks.",
        originalRef: "Payments",
      },
      {
        id: "iOS-C-3.1.2",
        gl: "GL-001",
        ref: "3.1.2",
        title:
          "App may not include buttons, external links or other calls to action that direct customers to purchasing mechanism other than IAP",
        steps:
          "1. Open the app.\n2. Look through for 'Buy on Website' links.\n3. Check for hidden URLs in buttons.",
        expected: "No external purchase redirects.",
        originalRef: "Payments",
      },
      {
        id: "iOS-C-3.1.7",
        gl: "GL-001",
        ref: "3.1.7",
        title:
          "Apps offering “loot boxes” or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase.",
        steps:
          "1. Open the app.\n2. Locate Loot Crate/Gacha info.\n3. Check that drop rates (e.g. Rare 5%) are visible.",
        expected: "Drop odds are disclosed clearly.",
        originalRef: "Payments",
      },
      {
        id: "iOS-C-3.1.8",
        gl: "GL-001",
        ref: "3.1.8",
        title:
          "Digital gift cards, certificates, vouchers, and coupons which can be redeemed for digital goods or services can only be sold in your app using in-app purchase.",
        steps:
          "1. Open the app.\n2. Check for gift card sales.\n3. Check that they use IAP tiers.",
        expected: "Digital gift cards use IAP.",
        originalRef: "Payments",
      },
      // Section: Hardware-Specific Content
      {
        id: "iOS-C-3.2.1",
        gl: "GL-001",
        ref: "3.2.1",
        title:
          "When features are dependent upon specific hardware to function, app may unlock that functionality without using in-app purchase (e.g. an astronomy app that adds features when synced with a telescope)",
        steps:
          "1. Open the app.\n2. Connect external hardware.\n3. Check that features unlock automatically without IAP interaction.",
        expected: "Hardware-based unlocks are enabled without IAP.",
        originalRef: "Hardware-Specific Content",
      },
      {
        id: "iOS-C-3.2.2",
        gl: "GL-001",
        ref: "3.2.2",
        title:
          "App features that work in combination with an approved physical product (such as a toy) on an optional basis may unlock functionality without using in-app purchase, provided that an in-app purchase option is available as well.",
        steps:
          "1. Open the app.\n2. Check that both 'Physical Toy' unlock and 'Digital IAP' unlock paths exist for the same feature.",
        expected: "Digital alternative to physical toy unlock is present.",
        originalRef: "Hardware-Specific Content",
      },
      // Section: Cryptocurrencies
      {
        id: "iOS-C-3.1.5",
        gl: "GL-001",
        ref: "3.1.5",
        title:
          "Wallets: Apps may facilitate virtual currency storage, provided they are offered by developers enrolled as an organization.",
        steps:
          "1. Open the app.\n2. (ASC check) Verify developer account type is 'Organization'.\n3. Check wallet functionality.",
        expected: "Wallet app is from an organizational account.",
        originalRef: "Cryptocurrencies",
      },
      {
        id: "iOS-C-3.1.6",
        gl: "GL-001",
        ref: "3.1.6",
        title:
          "Mining: Apps may not mine for cryptocurrencies unless the processing is performed off device (e.g. cloud-based mining).",
        steps:
          "1. Open the app.\n2. Monitor CPU/GPU usage.\n3. Check that NO on-device hashing logic exists.",
        expected: "No on-device crypto mining.",
        originalRef: "Cryptocurrencies",
      },
      {
        id: "iOS-C-3.1.9",
        gl: "GL-001",
        ref: "3.1.9",
        title:
          "Exchanges: Apps may facilitate transactions or transmissions of cryptocurrency on an approved exchange, provided they are offered by the exchange itself.",
        steps:
          "1. Open the app.\n2. Check that app ownership matches the exchange entity.",
        expected: "Exchange app is official.",
        originalRef: "Cryptocurrencies",
      },
      // Section: Advertising
      {
        id: "iOS-C-3.4.1",
        gl: "GL-001",
        ref: "3.4.1",
        title:
          "Display advertising should be limited to your main app binary, and should not be included in extensions, App Clips, widgets, notifications, keyboards, watchOS apps, etc.",
        steps:
          "1. Open the app.\n2. Trigger notifications/widgets.\n3. Check that NO advertisements are displayed in these secondary interfaces.",
        expected: "Ads only appear in the main app.",
        originalRef: "Advertising",
      },
      {
        id: "iOS-C-3.4.2",
        gl: "GL-001",
        ref: "3.4.2",
        title:
          "Ads displayed in an app must be appropriate for the app’s age rating, allow the user to see all information used to target them for that ad (without requiring the user to leave the app), and may not engage in targeted or behavioral advertising based on sensitive user data",
        steps:
          "1. Open the app.\n2. Check ad content against app age rating.\n3. Check that 'Why this ad' info is accessible in-app.",
        expected: "Ads are age-appropriate and transparent.",
        originalRef: "Advertising",
      },
      {
        id: "iOS-C-3.4.3",
        gl: "GL-001",
        ref: "3.4.3",
        title:
          "Interstitial ads or ads that interrupt or block the user experience must clearly indicate that they are an ad, must not manipulate or trick users into tapping into them, and must provide easily accessible and visible close/skip buttons large enough for people to easily dismiss the ad.",
        steps:
          "1. Open the app.\n2. Trigger interstitial/video ads.\n3. Check that presence of clear 'Ad' label.\n4. Try using the close button size and accessibility (no dark patterns).",
        expected: "Ads have clear labels and accessible close buttons.",
        originalRef: "Advertising",
      },
      // Section: Other Business Model Issues
      {
        id: "iOS-C-3.5.1",
        gl: "GL-001",
        ref: "3.5.1",
        title:
          "Acceptable :Displaying your own apps for purchase or promotion within your app, provided the app is not merely a catalog of your apps",
        steps:
          "1. Open the app.\n2. Look at app promotion sections.\n3. Check that the app provides core utility beyond just listing other developer apps.",
        expected:
          "App is not a mere catalog; promotions are secondary to functionality.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.2",
        gl: "GL-001",
        ref: "3.5.2",
        title:
          "Acceptable :Displaying or recommending a collection of third party apps that are designed for a specific approved need (e.g. health management, aviation, accessibility). Your app should provide robust editorial content so that it doesn’t seem like a mere storefront.",
        steps:
          "1. Open the app.\n2. Visually look at app recommendations.\n3. Check that the presence of robust editorial content/descriptions for each recommendation.",
        expected:
          "Recommendations include editorial value and serve a specific approved need.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.3",
        gl: "GL-001",
        ref: "3.5.3",
        title:
          "Acceptable :Disabling access to specific approved rental content (e.g. films, television programs, music, books) after the rental period has expired; all other items and services may not expire.",
        steps:
          "1. Open the app.\n2. Try using rental period expiration logic.\n3. Check that that non-rental purchases do not have expiration dates.",
        expected:
          "Only approved rental content expires; all other digital goods are permanent.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.4",
        gl: "GL-001",
        ref: "3.5.4",
        title:
          "Acceptable :Wallet passes can be used to make or receive payments, transmit offers, or offer identification (such as movie tickets, coupons, and VIP credentials). Other uses may result in the rejection of the app and the revocation of Wallet credentials.",
        steps:
          "1. Open the app.\n2. Visually look at usage of Wallet passes.\n3. Check that they are used for payments, offers, or ID as per guidelines.",
        expected: "Wallet pass usage is restricted to approved categories.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.5",
        gl: "GL-001",
        ref: "3.5.5",
        title:
          "Acceptable :Insurance apps must be free, in legal-compliance in the regions distributed, and cannot use IAP.",
        steps:
          "1. Open the app.\n2. Check that insurance app is free to download.\n3. Check that NO in-app purchases are used for premiums or features.",
        expected: "Insurance app is free and does not utilize IAP.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.6",
        gl: "GL-001",
        ref: "3.5.6",
        title:
          "Acceptable :Approved nonprofits may fundraise directly within their own apps or third-party apps, provided those fundraising campaigns adhere to all App Review Guidelines and offer Apple Pay support. These apps must disclose how the funds will be used, abide by all required local and federal laws, and ensure appropriate tax receipts are available to donors",
        steps:
          "1. Open the app.\n2. Check that non-profit status and campaign legality.\n3. Check that Apple Pay support.\n4. Check for fund usage disclosures and tax receipt availability.",
        expected: "Fundraising is transparent, legal, and supports Apple Pay.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.7",
        gl: "GL-001",
        ref: "3.5.7",
        title:
          "Acceptable :Apps may enable individual users to give a monetary gift to another individual without using in-app purchase, provided that (a) the gift is a completely optional choice by the giver, and (b) 100% of the funds go to the receiver of the gift",
        steps:
          "1. Open the app.\n2. Try using person-to-person gifting flow.\n3. Check that 100% of funds reach the recipient (ignoring standard processor fees).\n4. Check that gifting is purely optional.",
        expected: "Gifting is optional and developer takes 0% commission.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.8",
        gl: "GL-001",
        ref: "3.5.8",
        title:
          "Acceptable :Apps used for financial trading, investing, or money management should be submitted by the financial institution performing such services.",
        steps:
          "1. Open the app.\n2. Check that developer account ownership matches the financial institution.\n3. Look at app for financial management features.",
        expected: "App is submitted by the official financial institution.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.9",
        gl: "GL-001",
        ref: "3.5.9",
        title:
          "Unacceptable: Creating an interface for displaying third party apps, extensions, or plug-ins similar to the App Store or as a general-interest collection.",
        steps:
          "1. Open the app.\n2. Analyze app interfaces that list other apps.\n3. Check that it does not mimic the App Store's catalog or aggregation style.",
        expected:
          "App does not behave as a third-party app store or general collection.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.10",
        gl: "GL-001",
        ref: "3.5.10",
        title:
          "Unacceptable: Artificially increasing the number of impressions or click-throughs of ads, as well as apps that are designed predominantly for the display of ads.",
        steps:
          "1. Open the app.\n2. Check for ad-farming logic (auto-refresh, fake clicks).\n3. Evaluate if the app has purpose beyond ad display.",
        expected: "No ad manipulation; app has distinct utility.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.11",
        gl: "GL-001",
        ref: "3.5.11",
        title:
          "Unacceptable: Collecting funds within the app for charities and fundraisers. Apps that seek to raise money for such causes must be free on the App Store and may only collect funds outside of the app, such as via Safari or SMS.",
        steps:
          "1. Open the app.\n2. Check for charity donation buttons.\n3. Check that they redirect to Safari or initiate SMS for payment rather than in-app processing.",
        expected: "Charity fundraising occurs outside the app binary flow.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.12",
        gl: "GL-001",
        ref: "3.5.12",
        title:
          "Unacceptable: Arbitrarily restricting who may use the app, such as by location or carrier.",
        steps:
          "1. Open the app.\n2. Check for geofences or carrier-specific blocks that aren't legally required.\n3. Check that app is available to all users within target regions.",
        expected: "No arbitrary usage restrictions found.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.13",
        gl: "GL-001",
        ref: "3.5.13",
        title:
          "Unacceptable: Artificially manipulating a user’s visibility, status, or rank on other services unless permitted by that service’s Terms and Conditions",
        steps:
          "1. Open the app.\n2. Check for 'Follower growth' or 'Like manipulation' features.\n3. Check that no unofficial API usage for status boosting.",
        expected: "No unauthorized service rank manipulation.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.14",
        gl: "GL-001",
        ref: "3.5.14",
        title:
          "Unacceptable: Apps that facilitate binary options trading are not permitted on the App Store. Consider a web app instead. Apps that facilitate trading in contracts for difference (“CFDs”) or other derivatives (e.g. FOREX) must be properly licensed in all jurisdictions where the service is available.",
        steps:
          "1. Open the app.\n2. Look at trading features for binary options.\n3. If CFD/Forex is present, verify licenses for all active territories.",
        expected: "No binary options; CFD/Forex is properly licensed.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-3.5.15",
        gl: "GL-001",
        ref: "3.5.15",
        title:
          "Unacceptable: Apps offering personal loans must clearly and conspicuously disclose all loan terms, including but not limited to equivalent maximum Annual Percentage Rate (APR) and payment due date. Apps may not charge a maximum APR higher than 36%, including costs and fees, and may not require repayment in full in 60 days or less.",
        steps:
          "1. Open the app.\n2. Look at personal loan terms and disclosures.\n3. Calculate max APR including fees; confirm <= 36%.\n4. Check that repayment term is > 60 days.",
        expected:
          "Loan terms are clear, APR is <= 36%, and repayment > 60 days.",
        originalRef: "Other Business Model Issues",
      },
      {
        id: "iOS-C-4.1.0",
        gl: "GL-001",
        ref: "4.1.0",
        title:
          "Make sure that the app you are submitting is not a copy of other app. App is not simply a copy of other app with minor changes to app's name or UI and Passed it off as your own. Submitting an apps which impersonate other apps or services is considered a violation of the Developer Code of Conduct and may result in removal from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Research similar apps in the same category.\n3. Check that the UI and name are distinct and unique.\n4. Check that no impersonation of existing services.",
        expected: "App is unique and does not impersonate other services.",
        originalRef: "Copycats",
      },
      // Section: Minimum Functionality
      {
        id: "iOS-C-4.2.1",
        gl: "GL-001",
        ref: "4.2.1",
        title:
          "Apps using ARKit should provide rich and integrated augmented reality experiences; merely dropping a model into an AR view or replaying animation is not enough.",
        steps:
          "1. Open the app.\n2. Try using AR features for interactivity and environmental integration.\n3. Check that that AR adds significant functional value beyond simple viewing.",
        expected: "AR experience is rich and interactive.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.2",
        gl: "GL-001",
        ref: "4.2.2",
        title:
          "Other than catalogs, which have a dedicated category, apps shouldn’t primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links",
        steps:
          "1. Open the app.\n2. Look at app content for original utility.\n3. Check that the app is not just a wrapper for a website or a list of external links.",
        expected:
          "App provides unique utility beyond web content or marketing.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.3",
        gl: "GL-001",
        ref: "4.2.3",
        title:
          "Your app should work on its own without requiring installation of another app to function.",
        steps:
          "1. Open the app.\n2. Run the app on a fresh device without any other third-party apps.\n3. Check that all core functions work without 'Please install App X' prompts.",
        expected: "App is fully functional standalone.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.4",
        gl: "GL-001",
        ref: "4.2.4",
        title:
          "Make sure you include sufficient content in the binary for the app to function at launch.",
        steps:
          "1. Open the app.\n2. Try using the app without network connectivity if possible (for offline-capable features).\n3. Check that initial screens are populated with useful data.",
        expected: "App has enough built-in content to function immediately.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.5",
        gl: "GL-001",
        ref: "4.2.5",
        title:
          "If your app needs to download additional resources in order to function on initial launch, disclose the size of the download and prompt users before doing so. Also ensure that the user has an option decline the download",
        steps:
          "1. Open the app.\n2. Trigger initial resource download.\n3. Check for size disclosure and user prompt.\n4. Check that decline option exists.",
        expected: "Large downloads are transparent and optional.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.6",
        gl: "GL-001",
        ref: "4.2.6",
        title:
          "Apps created from a commercialized template or app generation service will be rejected. These services should not submit apps on behalf of their clients and should offer tools that let their clients create customized, innovative apps that provide unique customer experiences",
        steps:
          "1. Open the app.\n2. Look at code and assets for 'generic template' patterns.\n3. Check that unique branding and custom feature sets.",
        expected: "App is unique and not a generic template clone.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.7.1",
        gl: "GL-001",
        ref: "4.2.7 (a)",
        title:
          "The app must only connect to a user-owned host device that is a personal computer or dedicated game console owned by the user, and both the host device and client must be connected on a local and LAN-based network.",
        steps:
          "1. Open the app.\n2. Check remote desktop connection logic.\n3. Check that it only targets local/LAN hosts owned by the user.",
        expected: "Connections are limited to user-owned local devices.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.7.2",
        gl: "GL-001",
        ref: "4.2.7 (b)",
        title:
          "Any software or services appearing in the client are fully executed on the host device, rendered on the screen of the host device, and may not use APIs or platform features beyond what is required to stream the Remote Desktop.",
        steps:
          "1. Open the app.\n2. Check that no local execution of streamed apps.\n3. Check that no usage of local system APIs beyond streaming.",
        expected: "Execution happens entirely on the host.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.7.3",
        gl: "GL-001",
        ref: "4.2.7 (c)",
        title:
          "All account creation and management must be initiated from the host device.",
        steps:
          "1. Open the app.\n2. Check for account sign-up buttons in the client.\n3. Check that they redirect to or occur on the host computer.",
        expected: "Account management is offloaded to the host.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.7.4",
        gl: "GL-001",
        ref: "4.2.7 (d)",
        title:
          "The UI appearing on the client does not resemble an iOS or App Store view, does not provide a store-like interface, or include the ability to browse, select, or purchase software not already owned or licensed by the user.",
        steps:
          "1. Open the app.\n2. Look at the client-side UI.\n3. Make sure that no 'App Store' clones or browseable catalogs of unowned software.",
        expected: "Client UI is purely a streaming pipe, not a store.",
        originalRef: "Minimum Functionality",
      },
      {
        id: "iOS-C-4.2.7.5",
        gl: "GL-001",
        ref: "4.2.7 (e)",
        title:
          "Thin clients for cloud-based apps are not appropriate for the App Store.",
        steps:
          "1. Open the app.\n2. Evaluate if the app is a mere front-end for a cloud service (e.g. game streaming without host ownership).",
        expected: "App is not a non-compliant thin client.",
        originalRef: "Minimum Functionality",
      },
      // Section: Spam
      {
        id: "iOS-C-4.3.1",
        gl: "GL-001",
        ref: "4.3.1",
        title:
          "Don't create multiple Bundle IDs of the same app. Consider submitting a single app and provide the variation using in-app purchase",
        steps:
          "1. Open the app.\n2. Check developer account for duplicate apps.\n3. Check that if functionality can be merged into a single multi-tier app.",
        expected: "No duplicate bundle IDs for the same core app.",
        originalRef: "Spam",
      },
      {
        id: "iOS-C-4.3.2",
        gl: "GL-001",
        ref: "4.3.2",
        title:
          "Do not spam the category of app which is already saturated. App store has enough fart, burp, flashlight, fortune telling, dating, drinking games & Kama Sutra apps already.",
        steps:
          "1. Open the app.\n2. Check whether the app falls into a 'cluttered' category.\n3. Check that the app provides unique value beyond existing flashlight/joke apps.",
        expected: "App is not part of a saturated spam category.",
        originalRef: "Spam",
      },
      // Section: Extensions
      {
        id: "iOS-C-4.4.1",
        gl: "GL-001",
        ref: "4.4.1",
        title:
          "Keyboard extensions must:\n- Provide keyboard input functionality (e.g. typed characters);\n- Follow Sticker guidelines if the keyboard includes images or emojis;\n- Provide a method for progressing to the next keyboard;\n- Remain functional without full network access and without requiring full access;\n- Collect user activity only to enhance the functionality of the user’s keyboard extension on the iOS device.\n\nThey must not:\n- Launch other apps besides Settings; or\n- Repurpose keyboard buttons for other behaviors (e.g. holding down the “return” key to launch the camera).",
        steps:
          "1. Open the app.\n2. Try using character input functionality.\n3. Check sticker guideline compliance.\n4. Check that the 'Next Keyboard' button exists.\n5. Try using functionality in offline mode.\n6. Look at keyboard button behaviors for repurposing.",
        expected:
          "Keyboard extension follows all input, privacy, and behavior rules.",
        originalRef: "Extensions",
      },
      {
        id: "iOS-C-4.4.2",
        gl: "GL-001",
        ref: "4.4.2",
        title:
          "Safari extensions must run on the current version of Safari on OS X. They may not interfere with System or Safari UI elements and must never include malicious or misleading content or code. Safari extensions should not claim access to more websites than strictly necessary to function.",
        steps:
          "1. Open the app.\n2. Try using extension on current macOS Safari.\n3. Check that it doesn't overlap or break browser UI.\n4. Look at permissions for excessive website access.",
        expected:
          "Safari extension is stable, honest, and uses minimal permissions.",
        originalRef: "Extensions",
      },
      // Section: Apple Sites and Services
      {
        id: "iOS-C-5.1.1",
        gl: "GL-001",
        ref: "5.1.1",
        title:
          "Apps may use approved Apple RSS feeds such as the iTunes Store RSS feed, but may not scrape any information from Apple sites (e.g. apple.com, the iTunes Store, App Store, App Store Connect, developer portal, etc.) or create rankings using this information.",
        steps:
          "1. Open the app.\n2. Look at app data sources.\n3. Check that no scraping logic for Apple domains.\n4. Check that RSS feed usage is limited to approved sources.",
        expected: "No unauthorized scraping of Apple sites found.",
        originalRef: "Apple Sites and Services",
      },
      {
        id: "iOS-C-5.1.2",
        gl: "GL-001",
        ref: "5.1.2",
        title:
          "MusicKit on iOS: Users must initiate the stream and be able to navigate playback using standard media controls such as “play,” “pause,” and “skip;” apps may not automate these actions. Moreover, your app may not require payment or indirectly monetize access to the Apple Music service (e.g. in-app purchase, advertising, requesting user info). Do not download, upload, or enable sharing of music files sourced from the MusicKit APIs, except as explicitly permitted in MusicKit documentation.",
        steps:
          "1. Open the app.\n2. Try using MusicKit playback controls.\n3. Check that NO automation of play/pause/skip.\n4. Check that access to Apple Music is not gated behind payments or ads.\n5. Check that no unauthorized sharing or downloading of MusicKit files.",
        expected:
          "MusicKit implementation is manual, non-monetized, and secure.",
        originalRef: "Apple Sites and Services",
      },
      {
        id: "iOS-C-5.1.3",
        gl: "GL-001",
        ref: "5.1.3",
        title:
          "Do not use Apple Services to spam, phish, or send unsolicited messages to customers, including Game Center, Push Notifications, etc. Do not attempt to reverse lookup, trace, relate, associate, mine, harvest, or otherwise exploit Player IDs, aliases, or other information obtained through Game Center, or you will be removed from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Look at usage of Game Center and Push Notifications.\n3. Check that no phishing or spamming behaviors.\n4. Check that Player IDs are not exploited or reverse-traced.",
        expected: "No abuse of Apple services for spam or exploitation.",
        originalRef: "Apple Sites and Services",
      },
      {
        id: "iOS-C-5.1.4",
        gl: "GL-001",
        ref: "5.1.4",
        title:
          "Push Notifications must not be required for the app to function, and should not be used for advertising, promotions, or direct marketing purposes or to send sensitive personal or confidential information. Abuse of these services may result in revocation of your privileges.",
        steps:
          "1. Open the app.\n2. Try using app functionality with notifications disabled.\n3. Look at notification content for marketing or sensitive data.\n4. Check that app works without notification consent.",
        expected: "Push notifications are optional and used appropriately.",
        originalRef: "Apple Sites and Services",
      },
      {
        id: "iOS-C-5.1.5",
        gl: "GL-001",
        ref: "5.1.5",
        title:
          "Only use Game Center Player IDs in a manner approved by the Game Center terms and do not display them in the app or to any third party.",
        steps:
          "1. Open the app.\n2. Visually look at UI for Game Center Player ID visibility.\n3. Check that IDs are used only for approved internal logic.",
        expected: "Game Center Player IDs are kept confidential.",
        originalRef: "Apple Sites and Services",
      },
      {
        id: "iOS-C-5.1.6",
        gl: "GL-001",
        ref: "5.1.6",
        title:
          "Apps may use Unicode characters that render as Apple emojis in their app and app metadata. Apple emojis may not be used on other platforms or embedded directly in your app binary.",
        steps:
          "1. Open the app.\n2. Look at emoji implementation.\n3. Check that emojis are rendered via Unicode and NOT static assets (PNGs) embedded in the binary.",
        expected:
          "Emojis use Unicode rendering; no prohibited binary embedding.",
        originalRef: "Apple Sites and Services",
      },
      // Section: Alternate App Icons
      {
        id: "iOS-C-4.5.1",
        gl: "GL-001",
        ref: "4.5.1",
        title:
          "Apps may display customized icons, provided that each change is initiated by the user.",
        steps:
          "1. Open the app.\n2. Try using icon change initiation inside the app.\n3. Check that each alternate icon variant change requires explicit user permission or action.",
        expected:
          "Each icon change is user-initiated, not triggered automatically.",
        originalRef: "Alternate App Icons",
      },
      {
        id: "iOS-C-4.5.2",
        gl: "GL-001",
        ref: "4.5.2",
        title: "App must include the setting to revert to original icon.",
        steps:
          "1. Open the app.\n2. Look at settings or profile areas for icon preferences.\n3. Check that a clear toggle or button exists to restore the original/default app icon.",
        expected:
          "A visible setting allows users to revert back to the original app icon.",
        originalRef: "Alternate App Icons",
      },
      {
        id: "iOS-C-4.5.3",
        gl: "GL-001",
        ref: "4.5.3",
        title:
          "All icon variants must relate to the content of the app and changes should be consistent across all system assets. E.g. icon in settings, notifications etc. must match the new springboard icon.",
        steps:
          "1. Open the app.\n2. Check that theme/alternate icon designs are relevant to the application.\n3. Make sure that changed icons look consistent across settings, notifications, and the iOS springboard screen.",
        expected:
          "Alternate icon variants are descriptive and fully synchronized across all system assets.",
        originalRef: "Alternate App Icons",
      },
      {
        id: "iOS-C-4.5.4",
        gl: "GL-001",
        ref: "4.5.4",
        title:
          "This feature may not be used in order to dynamically, automatic changing the icon.",
        steps:
          "1. Open the app.\n2. Analyze icon change scripts and triggers.\n3. Check for dynamic or scheduled icon alterations without explicit user confirmation.",
        expected:
          "The application contains no logic for automated or dynamic background icon modifications.",
        originalRef: "Alternate App Icons",
      },
      // Section: HTML5 Games, Bots, etc.
      {
        id: "iOS-C-4.7.1",
        gl: "GL-001",
        ref: "4.7.1",
        title:
          "Apps may offer certain software that is not embedded in the binary (HTML5 mini apps/games, streaming games, chatbots, plugins, retro emulators). You are responsible for all such software ensuring compliance with Guidelines & laws.",
        steps:
          "1. Open the app.\n2. Visually look at any non-embedded software utilities inside the app.\n3. Identify external widgets/games and confirm total accountability.",
        expected:
          "Host-app has oversight and ensures external/mini software blocks are clean.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.2",
        gl: "GL-001",
        ref: "4.7.2",
        title: "The software is free or purchased using in-app purchase.",
        steps:
          "1. Open the app.\n2. Check that that non-embedded offerings cannot be bought through third-party credit processors.\n3. Make sure that standard Apple In-App Purchase is used.",
        expected:
          "Mini-app billing models use Apple IAPs or are completely free.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.3",
        gl: "GL-001",
        ref: "4.7.3",
        title:
          "Only uses capabilities available in a standard WebKit view; your app must use WebKit and JavaScript Core to run third party software and should not attempt to extend or expose native platform APIs to third party software.",
        steps:
          "1. Open the app.\n2. Look at third-party script containers.\n3. Make sure that no non-standard APIs are appended to the WebKit host runtime.",
        expected:
          "The app utilizes sandboxed default WebKit views to load third-party scripts securely.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.4",
        gl: "GL-001",
        ref: "4.7.4",
        title:
          "The software/App is Offered by developers that have joined the Apple Developer Program and signed the Apple Developer Program License Agreement.",
        steps:
          "1. Open the app.\n2. Look at identity and verification states of external suppliers.\n3. Make sure that creators have accepted and signed Apple developer terms.",
        expected:
          "All mini-app authors are verified Apple Developer Program members.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.5",
        gl: "GL-001",
        ref: "4.7.5",
        title:
          "Software/App does not provide access to real money gaming, lotteries, or charitable donations.",
        steps:
          "1. Open the app.\n2. Probe sub-menus of external software.\n3. Check for real money casinos, external sweepstakes, lotto ticket purchases, or non-compliant charity links.",
        expected:
          "No casino, lotto, gambling, or standard donation systems are reachable.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.6",
        gl: "GL-001",
        ref: "4.7.6",
        title:
          "Software/App adheres to the terms of these App Review Guidelines (e.g. does not include objectionable content).",
        steps:
          "1. Open the app.\n2. Look at list of mini-apps for any objectionable or adult content.\n3. Check that standard offensive-material blocks are working.",
        expected:
          "Hosted contents conform smoothly to main App Store standards.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.7",
        gl: "GL-001",
        ref: "4.7.7",
        title: "Software/App does not support digital commerce.",
        steps:
          "1. Open the app.\n2. Check that whether mini-apps facilitate retail shopping, physical goods purchases, or digital subscription bypasses.",
        expected:
          "No e-commerce or digital stores are contained within hosted plugins.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.8",
        gl: "GL-001",
        ref: "4.7.8",
        title:
          "Your app may not extend or expose native platform APIs to the software without prior permission from Apple.",
        steps:
          "1. Open the app.\n2. Look at native hook methods for JavaScript interfaces.\n3. Check that no undocumented API access is unlocked for third-party programs.",
        expected: "Native APIs remain strictly unexposed.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.9",
        gl: "GL-001",
        ref: "4.7.9",
        title:
          "Your app may not share data or privacy permissions to any individual software offered in your app without explicit user consent in each instance.",
        steps:
          "1. Open the app.\n2. Trigger camera/location call inside a mini-app.\n3. Check that the host app presents a distinct user consent pop-up.",
        expected:
          "Privacy permissions are not shared automatically; individual explicit consent is required.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.10",
        gl: "GL-001",
        ref: "4.7.10",
        title:
          "You must provide an index of software and metadata available in your app. It must include universal links that lead to all of the software offered in your app.",
        steps:
          "1. Open the app.\n2. Check for directory page, search view, or grid of mini-apps.\n3. Check that universal links are present for easy navigation.",
        expected:
          "A fully linked, standardized directory of all hosted software is accessible.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      {
        id: "iOS-C-4.7.11",
        gl: "GL-001",
        ref: "4.7.11",
        title:
          "Your app must share the age rating of the highest age-rated content available in your app.",
        steps:
          "1. Open the app.\n2. Analyze content rating profiles of all embedded items.\n3. Make sure that App Store store-front values match the maximum age constraint.",
        expected:
          "The host app is rated correctly matching the highest tier content hosted.",
        originalRef: "HTML5 Games, Bots, etc.",
      },
      // Section: Login Services.
      {
        id: "iOS-C-4.8.1",
        gl: "GL-001",
        ref: "4.8.1",
        title:
          "If game/app allows user to login with any third party social accounts (e.g. Facebook, Gmail etc.) in order to authenticate themselves/to enter the game, then it is mandatory to offer sign in with Apple as well",
        steps:
          "1. Open the app.\n2. Try using user authentication flows.\n3. Check that if third-party social account logins are implemented.\n4. Check that that an equivalent Sign in with Apple option is provided or that it is mandatory if other social logins are present.",
        expected:
          "Sign in with Apple is offered alongside other social login authentication options.",
        originalRef: "Login Services",
      },
      {
        id: "iOS-C-4.8.2",
        gl: "GL-001",
        ref: "4.8.2",
        title:
          "The login service limits data collection to the user’s name and email address.",
        steps:
          "1. Open the app.\n2. Look at data requested by the login scopes during authentication.\n3. Make sure that the app does not request additional profiles, friends lists, or unneeded personal details.",
        expected:
          "Requested login scopes are strictly limited to user name and email address.",
        originalRef: "Login Services",
      },
      {
        id: "iOS-C-4.8.3",
        gl: "GL-001",
        ref: "4.8.3",
        title:
          "The login service allows users to keep their email address private as part of setting up their account.",
        steps:
          "1. Open the app.\n2. Try using the registration/login flow on a clean account.\n3. Check that that the login option offers a 'Hide My Email' or similar privacy feature (e.g. private relay address wrapper).",
        expected:
          "Users have an option to hide their true email address using private email relays.",
        originalRef: "Login Services",
      },
      {
        id: "iOS-C-4.8.4",
        gl: "GL-001",
        ref: "4.8.4",
        title:
          "The login service does not collect interactions with your app for advertising purposes without consent.",
        steps:
          "1. Open the app.\n2. Check background requests and tracking pixels on the login page.\n3. Check that no tracking or behavioral advertising is triggered unless explicit user consent has been obtained.",
        expected:
          "No unsolicited third-party advertising tracking occurs during or after the login flow.",
        originalRef: "Login Services",
      },
      // Section: Sign in with Apple
      {
        id: "iOS-C-4.9.1",
        gl: "GL-001",
        ref: "4.9.1",
        title:
          "Your app exclusively uses your company’s own account setup and sign-in systems.",
        steps:
          "1. Open the app.\n2. Check that if the app only utilizes custom registration/login mechanisms owned by your company.\n3. Check that no third-party identity providers require a conditional comparison if only proprietary accounts are used.",
        expected:
          "Exclusive proprietary account sign-in requires no multi-party identity integrations.",
        originalRef: "Sign in with Apple",
      },
      {
        id: "iOS-C-4.9.2",
        gl: "GL-001",
        ref: "4.9.2",
        title:
          "Your app is an alternative app marketplace, or an app distributed from an alternative app marketplace, that uses a marketplace-specific login for account, download, and commerce features.",
        steps:
          "1. Open the app.\n2. Check that if the app acts as or is distributed by an alternative app marketplace.\n3. Check that the login methods coordinate correctly with marketplace-specific account and commerce portals.",
        expected:
          "Marketplace login options are compliant, stable, and appropriately isolated.",
        originalRef: "Sign in with Apple",
      },
      {
        id: "iOS-C-4.9.3",
        gl: "GL-001",
        ref: "4.9.3",
        title:
          "Your app is a client for a specific third-party service and users are required to sign in to their mail, social media, or other third-party account directly to access their content.",
        steps:
          "1. Open the app.\n2. Visually look at if the app serves as a dedicated wrapper or client for a third-party service.\n3. Check that that users log directly and securely into that third-party service to retrieve their raw personal data.",
        expected:
          "Direct third-party auth allows the client wrapper to safely process the third-party service's materials.",
        originalRef: "Sign in with Apple",
      },
      // Section: Apple Pay
      {
        id: "iOS-C-4.10.1",
        gl: "GL-001",
        ref: "4.10.1",
        title:
          "Apps using Apple Pay for recurring payments must disclose the length of the renewal term and clearly state that the payment will continue until cancelled.",
        steps:
          "1. Open the app.\n2. Check that subscription screens using Apple Pay.\n3. Check that that the length of the renewal term is clearly stated.\n4. Check that clear disclosure that billing continues until cancelled.",
        expected:
          "Length of renewal term and continuation warning are clearly disclosed.",
        originalRef: "Apple Pay",
      },
      {
        id: "iOS-C-4.10.2",
        gl: "GL-001",
        ref: "4.10.2",
        title:
          "Apps using Apple Pay for recurring payments must disclose what goods, services, or content will be provided during each billing period.",
        steps:
          "1. Open the app.\n2. Look at user interface for the recurring product.\n3. Make sure that exactly what features/services/goods are delivered during the period are clearly defined.",
        expected:
          "Details of provided goods/services per billing period are clearly declared to the customer.",
        originalRef: "Apple Pay",
      },
      {
        id: "iOS-C-4.10.3",
        gl: "GL-001",
        ref: "4.10.3",
        title:
          "Apps using Apple Pay for recurring payments must disclose the actual charges that will be billed to the customer for each recurring payment period.",
        steps:
          "1. Open the app.\n2. Check the subscription price tags and disclosures.\n3. Check that the precise currency amount billed recurringly is shown.",
        expected:
          "Actual charges for each payment period are fully disclosed before confirmation.",
        originalRef: "Apple Pay",
      },
      {
        id: "iOS-C-4.10.4",
        gl: "GL-001",
        ref: "4.10.4",
        title:
          "Apps using Apple Pay for recurring payments must disclose clear instructions explaining how the customer can cancel the recurring payment or subscription.",
        steps:
          "1. Open the app.\n2. Visually look at the billing information, help, or product display screen.\n3. Check that the presence of precise steps explaining how the subscription can be cancelled.",
        expected: "Clear cancellation instructions are accessible to users.",
        originalRef: "Apple Pay",
      },
      // Section: Monetizing Built-In Capabilities
      {
        id: "iOS-C-4.11.1",
        gl: "GL-001",
        ref: "4.11.1",
        title:
          "You may not monetize built-in capabilities provided by the hardware or operating system, such as Push Notifications, the camera, or the gyroscope; or Apple services and technologies, such as Apple Music access, iCloud storage, or Screen Time APIs.",
        steps:
          "1. Open the app.\n2. Check that features like Push Notifications, Camera, and Gyroscope do not require paid access or subscriptions.\n3. Check that integrated Apple APIs (Apple Music, iCloud, Screen Time) are not gated behind monetization layers.",
        expected:
          "All built-in system capabilities and Apple services remain unmonetized.",
        originalRef: "Monetizing Built-In Capabilities",
      },
      // Section: Privacy
      {
        id: "iOS-C-5.1",
        gl: "GL-001",
        ref: "5.1.1",
        title:
          "Privacy Policies: All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner. The privacy policy must clearly and explicitly: Identify what data, if any, the app/service collects, how it collects that data, and all uses of that data.",
        steps:
          "1. Open the app.\n2. Locate the privacy policy link within the app.\n3. Check that the policy clearly specifies collected data types, collection methods, and all data uses.",
        expected:
          "Privacy policy link is easily accessible and fully details data collection and usage.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.2",
        gl: "GL-001",
        ref: "5.1.2",
        title:
          "Confirm that any third party with whom an app shares user data (in compliance with these Guidelines) — such as analytics tools, advertising networks and third party SDKs, as well as any parent, subsidiary or other related entities that will have access to user data — will provide the same or equal protection of user data as stated in the app’s privacy policy and required by these Guidelines.",
        steps:
          "1. Open the app.\n2. Look at list of integrated third-party SDKs and service providers.\n3. Check that the privacy policy states that all third parties provide same or equal data protection.",
        expected:
          "Privacy policy explicitly guarantees equal data protection by all third parties.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.3",
        gl: "GL-001",
        ref: "5.1.3",
        title:
          "Explain its data retention/deletion policies and describe how a user can revoke consent and/or request deletion of the user’s data.",
        steps:
          "1. Open the app.\n2. Check the privacy policy for explicit details on data retention and deletion.\n3. Check that the policy describes steps for users to revoke consent or request deletion.",
        expected:
          "Data retention, deletion, and consent revocation instructions are clearly explained.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.4",
        gl: "GL-001",
        ref: "5.1.4",
        title:
          "Permissions: Apps that collect user or usage data must secure user consent for the collection, even if such data is considered to be anonymous at the time of or immediately following collection.",
        steps:
          "1. Open the app.\n2. Identify all telemetry or analytical tracking calls.\n3. Check that that user consent is obtained before any data collection starts.",
        expected:
          "User consent is secured for any collection of user or usage data.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.5",
        gl: "GL-001",
        ref: "5.1.5",
        title:
          "Paid functionality must not be dependent on or require a user to grant access to this data.",
        steps:
          "1. Open the app.\n2. Attempt to access paid features while declining non-essential data permissions.\n3. Check that that declining permissions does not block access to paid functionality.",
        expected:
          "Declining data tracking or access permissions does not restrict paid functionality.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.6",
        gl: "GL-001",
        ref: "5.1.6",
        title:
          "Apps must also provide the customer with an easily accessible and understandable way to withdraw consent.",
        steps:
          "1. Open the app.\n2. Navigate to in-app settings or account options.\n3. Locate the consent withdrawal mechanism and verify it is easy to understand and use.",
        expected:
          "An understandable and accessible toggle or option allows users to withdraw consent.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.7",
        gl: "GL-001",
        ref: "5.1.7",
        title:
          "Ensure your purpose strings clearly and completely describe your use of the data.",
        steps:
          "1. Open the app.\n2. Visually look at the Info.plist permission description strings (e.g., Camera, Location, Contacts).\n3. Check that the strings describe exactly why the app needs the permission.",
        expected:
          "Purpose strings clearly and completely describe the utility of the requested data.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.8",
        gl: "GL-001",
        ref: "5.1.8",
        title:
          "Apps that collect data for a legitimate interest without consent by relying on the terms of the European Union’s General Data Protection Regulation (“GDPR”) or similar statute must comply with all terms of that law.",
        steps:
          "1. Open the app.\n2. Check that GDPR policy links and legal grounds stated for data processing without direct consent.\n3. Check that complete compliance with EU GDPR data inventory rules.",
        expected:
          "Legitimate-interest data processing satisfies all criteria under GDPR.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.9",
        gl: "GL-001",
        ref: "5.1.9",
        title:
          "Data Minimization: Apps should only request access to data relevant to the core functionality of the app and should only collect and use data that is required to accomplish the relevant task. Where possible, use the out-of-process picker or a share sheet rather than requesting full access to protected resources like Photos or Contacts.",
        steps:
          "1. Open the app.\n2. Checklist of required scopes vs. core functionality.\n3. Check that if the out-of-process document picker or system share sheet is preferred over raw full-access permission requests.",
        expected:
          "Data collection is minimal and utilizes native secure picker/share sheet delegates where possible.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.10",
        gl: "GL-001",
        ref: "5.1.10",
        title:
          "Access Apps must respect the user’s permission settings and not attempt to manipulate, trick, or force people to consent to unnecessary data access. Where possible, provide alternative solutions for users who don’t grant consent. For example, if a user declines to share Location, offer the ability to manually enter an address.",
        steps:
          "1. Open the app.\n2. Make sure that there are no coercive pop-ups forcing a permission grant.\n3. Check that that alternative solutions (such as manual input when Location is denied) are functional.",
        expected:
          "Permission settings are respected without coercive prompts, and fallback inputs are present.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.11",
        gl: "GL-001",
        ref: "5.1.11",
        title:
          "Account Sign-In: If your app doesn’t include significant account-based features, let people use it without a login. If your app supports account creation, you must also offer account deletion within the app. Apps may not require users to enter personal information to function, except when directly relevant to the core functionality of the app or required by law.",
        steps:
          "1. Open the app.\n2. Check that user can interact with core offline elements before or without registering support.\n3. Locate in-app account deletion controls.",
        expected:
          "Login is optional for non-account features, and registration is minimal and deletable.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.12",
        gl: "GL-001",
        ref: "5.1.12",
        title:
          "Ensure that the game offers an option to delete the game account [A dedicated BUTTON must be present in Settings].",
        steps:
          "1. Open the app.\n2. Open settings sub-menu inside the app/game.\n3. Check that a dedicated, clearly visible account deletion button exists.",
        expected:
          "A dedicated delete account button exists in the Settings section.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.13",
        gl: "GL-001",
        ref: "5.1.13",
        title:
          "For Games Authenticated by Ubi-account, the DELETE button navigates the user to Ubi-connect 'Account management' where the account can be delete [https://account.ubisoft.com/en-GB].",
        steps:
          "1. Open the app.\n2. Log in with a Ubisoft/Ubi-account.\n3. Click the delete account button.\n4. Check that the browser/SafariViewController loads 'https://account.ubisoft.com/en-GB'.",
        expected:
          "Ubi-account deletion directs user to Ubisoft Connect account management URL.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.14",
        gl: "GL-001",
        ref: "5.1.14",
        title:
          "For Games Authenticated by Guest Account - The DELETE button triggers the account deletion flow [Starting with a warning pop-up that detailing it's effect - Refer to the screenshot beside].",
        steps:
          "1. Open the app.\n2. Check guest session active state.\n3. Tap delete and verify a warning dialog explaining immediate data loss effects is present.",
        expected:
          "Guest account deletion triggers warning screen of permanent progress deletion.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.15",
        gl: "GL-001",
        ref: "5.1.15",
        title:
          "Upon confirming account deletion, ensure that the game reloads and starts afresh.",
        steps:
          "1. Open the app.\n2. Initiate and confirm guest/local account deletion.\n3. Check that the application automatically clears cache, resets internal identifiers, reloads state, and starts from initial screen.",
        expected:
          "App clears all localized memory, triggers complete clean reload, and starts fresh.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.16",
        gl: "GL-001",
        ref: "5.1.16",
        title:
          "The app must also include a mechanism to revoke social network credentials and disable data access between the app and social network from within the app.",
        steps:
          "1. Open the app.\n2. Check settings for linked accounts.\n3. Check that an explicit button exists to disconnect or revoke social network permissions from within the app.",
        expected:
          "Credentials can be revoked directly inside settings to disable active social integrations.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.17",
        gl: "GL-001",
        ref: "5.1.17",
        title:
          "Developers that use their apps to surreptitiously discover passwords or other private data will be removed from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Look at password inputs to ensure standard text field security masking (isSecureTextEntry).\n3. Probe network calls to confirm no phishing or unauthorized data discovery occurs.",
        expected:
          "Passwords and private entries are protected and never surreptitiously scanned or harvested.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.18",
        gl: "GL-001",
        ref: "5.1.18",
        title:
          "SafariViewContoller must be used to visibly present information to users; the controller may not be hidden or obscured by other views or layers. Additionally, an app may not use SafariViewController to track users without their knowledge and consent.",
        steps:
          "1. Open the app.\n2. Trigger external documentation or oauth inside the app.\n3. Make sure that SafariViewController is shown completely visible (unobscured).\n4. Check that no tracking cookies/pixels are run over hidden views.",
        expected:
          "SafariViewController is displayed cleanly and visibly, without covert tracking behaviors.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.19",
        gl: "GL-001",
        ref: "5.1.19",
        title:
          "Apps that compile personal information from any source that is not directly from the user or without the user’s explicit consent, even public databases, are not permitted on the App Store.",
        steps:
          "1. Open the app.\n2. Check whether the app pulls and compiles personal records or files from remote public/private directories.\n3. Check that explicit user consent is secured for any aggregated details.",
        expected:
          "No personal information is compiled or retrieved from non-consented collections or databases.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.20",
        gl: "GL-001",
        ref: "5.1.20",
        title:
          "Apps that provide services in highly-regulated fields (such as banking and financial services, healthcare, gambling, legal cannabis use, and air travel) or that require sensitive user information should be submitted by a legal entity that provides the services, and not by an individual developer. Apps that facilitate the legal sale of cannabis must be geo-restricted to the corresponding legal jurisdiction.",
        steps:
          "1. Open the app.\n2. Check that the submitter profile belongs to a vetted company/legal entity.\n3. Check that geo-restrictions are active to enforce legal compliance bounds where required.",
        expected:
          "The app represents a formal legal entity and regulates sensitive activities geographically.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.21",
        gl: "GL-001",
        ref: "5.1.21",
        title:
          "Apps may request basic contact information (such as name and email address) so long as the request is optional for the user, features and services are not conditional on providing the information, and it complies with all other provisions of these guidelines, including limitations on collecting information from kids.",
        steps:
          "1. Open the app.\n2. Locate contact request panels.\n3. Check that a clear 'Skip' or 'Not Now' toggle exists.\n4. Check that all features run properly regardless of contact entry.",
        expected:
          "Contact details requests are completely optional, non-conditional, and protect minors.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.22",
        gl: "GL-001",
        ref: "5.1.22",
        title:
          'Unless otherwise permitted by law, you may not use, transmit, or share someone’s personal data without first obtaining their permission. You must provide access to information about how and where the data will be used. Data collected from apps may only be shared with third parties to improve the app or serve advertising (in compliance with the Apple Developer Program License Agreement.). You must receive explicit permission from users via the App Tracking Transparency APIs to track their activity. Learn more about tracking. Apps that share user data without user consent or otherwise complying with data privacy laws may be removed from sale and may result in your removal from the Apple Developer Program. English wording : "Your data will be used to deliver you personalized and relevant ads"',
        steps:
          "1. Open the app.\n2. Check that App Tracking Transparency dialog triggers on startup.\n3. Check that the exact wording: 'Your data will be used to deliver you personalized and relevant ads'.",
        expected:
          "App Tracking Transparency pop-up displays the required explicit tracking wording.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.23",
        gl: "GL-001",
        ref: "5.1.23",
        title:
          "Data collected for one purpose may not be repurposed without further consent unless otherwise explicitly permitted by law.",
        steps:
          "1. Open the app.\n2. Look at functional targets of collected datasets.\n3. Check that no data collected for one context is passed to a secondary, unrelated system without explicit re-consent.",
        expected:
          "Purpose-bound data holds its strict parameters and never flows into secondary pipelines unconsented.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.24",
        gl: "GL-001",
        ref: "5.1.24",
        title:
          "Apps should not attempt to surreptitiously build a user profile based on collected data and may not attempt, facilitate, or encourage others to identify anonymous users or reconstruct user profiles based on data collected from Apple-provided APIs or any data that you say has been collected in an “anonymized,” “aggregated,” or otherwise non-identifiable way.",
        steps:
          "1. Open the app.\n2. Analyze ID tracking protocols and background identifiers.\n3. Check for fingerprinting or profile-reconstruction scripts.",
        expected:
          "The app forbids stealth profile building or matching of anonymized records.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.25",
        gl: "GL-001",
        ref: "5.1.25",
        title:
          "Do not use information from Contacts, Photos, or other APIs that access user data to build a contact database for your own use or for sale/distribution to third parties, and don’t collect information about which other apps are installed on a user’s device for the purposes of analytics or advertising/marketing.",
        steps:
          "1. Open the app.\n2. Look at Photos/Contacts utilization.\n3. Check that no localized address list compilation or installed-app checks exist.",
        expected:
          "Device resources are never scraped to build unauthorized contact lists or competitor app lists.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.26",
        gl: "GL-001",
        ref: "5.1.26",
        title:
          "Do not contact people using information collected via a user’s Contacts or Photos, except at the explicit initiative of that user on an individualized basis; do not include a Select All option or default the selection of all contacts. You must provide the user with a clear description of how the message will appear to the recipient before sending it",
        steps:
          "1. Open the app.\n2. Trigger invitations screen.\n3. Check that there is no 'Select All' contacts checkbox.\n4. Check for a detailed template mockup preview of how the message will appear.",
        expected:
          "Invitations are strictly individualized, lack default auto-selections, and display a message preview.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.27",
        gl: "GL-001",
        ref: "5.1.27",
        title:
          "Data gathered from the HomeKit API, HealthKit, Clinical Health Records API, MovementDisorder APIs, ClassKit or from depth and/or facial mapping tools (e.g. ARKit, Camera APIs, or Photo APIs) may not be used for marketing, advertising or use-based data mining, including by third parties.",
        steps:
          "1. Open the app.\n2. Look at utilization of specialized APIs like ARKit, HealthKit, and ClassKit.\n3. Make sure that no gathered attributes are passed down to advertisement trackers or brokers.",
        expected:
          "Framework metrics are fully isolated from marketing, ad networks, or data mining profiles.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.28",
        gl: "GL-001",
        ref: "5.1.28",
        title:
          "Apps using Apple Pay may only share user data acquired via Apple Pay with third parties to facilitate or improve delivery of goods and services.",
        steps:
          "1. Open the app.\n2. Visually look at outgoing payloads of custom checkout handlers.\n3. Check that the transactional information is only shared strictly for billing + logistics delivery fulfillment.",
        expected:
          "Apple Pay details are strictly shared for purchase fulfillment with no advertising reuse.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.29",
        gl: "GL-001",
        ref: "5.1.29",
        title:
          "Apps may not use or disclose to third parties data gathered in the health, fitness, and medical research context for advertising or other use-based data mining purposes other than improving health management, or for the purpose of health research, and then only with permission. Apps may, however, use a user’s health or fitness data to provide a benefit directly to that user (such as a reduced insurance premium), provided that the app is submitted by the entity providing the benefit, and the data is not be shared with a third party. You must disclose the specific health data that you are collecting from the device.",
        steps:
          "1. Open the app.\n2. Look at fitness/health metric routing.\n3. Make sure that health data feeds directly into patient utilities rather than target advertisement clusters.",
        expected:
          "Sensitive health tracking records are fully ring-fenced from data broker integrations.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.30",
        gl: "GL-001",
        ref: "5.1.30",
        title:
          "Apps must not write false or inaccurate data into HealthKit and may not store personal health information in iCloud",
        steps:
          "1. Open the app.\n2. Check HealthKit save and edit routines.\n3. Check that that no spoofed data profiles are created.\n4. Make sure that health records are saved locally or in appropriate backends, NOT on iCloud.",
        expected:
          "Write commands into HealthKit are verified and personal health information avoids iCloud storages.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.31",
        gl: "GL-001",
        ref: "5.1.31",
        title:
          "Apps conducting health-related human subject research must obtain consent from participants or, in the case of minors, their parent or guardian.",
        steps:
          "1. Open the app.\n2. Visually look at clinical test consent dialogs.\n3. Check that explicit adult signature pathways or parent/guardian verification triggers for children.",
        expected:
          "Formal research workflows receive pre-screening validation checkpoints.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.32",
        gl: "GL-001",
        ref: "5.1.32",
        title:
          "Apps conducting health-related human subject research must secure approval from an independent ethics review board. Proof of such approval must be provided upon request.",
        steps:
          "1. Open the app.\n2. Locate certification, study registration records, and IRB labels.\n3. Check that active ethics review board clearances accompany the metadata records.",
        expected:
          "Comprehensive medical trials verify active independent review declarations.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.33",
        gl: "GL-001",
        ref: "5.1.33",
        title:
          "It is critical to use care when dealing with personal data from kids, and we encourage you to carefully review all the requirements for complying with laws like the Children’s Online Privacy Protection Act (“COPPA”), the European Union’s General Data Protection Regulation (“GDPR”), and any international or local equivalents.",
        steps:
          "1. Open the app.\n2. Look at registration ages.\n3. Check that presence of high privacy gating when treating child accounts.",
        expected:
          "Underage accounts are securely separated with maximum COPPA and GDPR compliant constraints.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.34",
        gl: "GL-001",
        ref: "5.1.34",
        title:
          "Apps may ask for birthdate and parental contact information only for the purpose of complying with these statutes, but must include some useful functionality or entertainment value regardless of a person’s age.",
        steps:
          "1. Open the app.\n2. Check whether the app locks behind age walls without providing reasonable default games or activities.\n3. Check that collected birthdate values are used only to establish legal compliance.",
        expected:
          "Basic system loops remain open and playable without blocking younger segments.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.35",
        gl: "GL-001",
        ref: "5.1.35",
        title:
          "Apps intended for kids may not include third-party advertising or analytics.",
        steps:
          "1. Open the app.\n2. Check that if the 'Kids Category' target is selected in metadata.\n3. Look at and confirm the complete removal of Google AdMob, Unity Ads, and commercial analytics SDKs.",
        expected:
          "Kids category apps remain completely clean of third-party ads and analytics engines.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.36",
        gl: "GL-001",
        ref: "5.1.36",
        title:
          "Apps in Kids category or those that collect, transmit, or have the capability to share personal information from a minor must include a privacy policy. and must comply with all applicable children’s privacy statutes.",
        steps:
          "1. Open the app.\n2. Check that the presence of children terms inside the primary privacy link.\n3. Check that that child-data handling matches localized global privacy laws.",
        expected:
          "Children's privacy clauses are fully articulated and compliant.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.37",
        gl: "GL-001",
        ref: "5.1.37",
        title:
          "Collecting and transmitting data to third parties from apps in the Kids category is not allowed.",
        steps:
          "1. Open the app.\n2. Trap networks calling outside of host domains for Kids target category.\n3. Check that absolutely zero telemetry is shipped to foreign commercial data receptors.",
        expected:
          "Absolute local sandboxing blocks any external telemetry output.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.38",
        gl: "GL-001",
        ref: "5.1.38",
        title:
          "Location services must be used only when it is directly relevant to the features and services provided by the app",
        steps:
          "1. Open the app.\n2. Check whether background or foreground location tracking is active.\n3. Check that the feature (e.g., store locator) directly maps to that location dependency.",
        expected:
          "Location tracking options align tightly with explicit app functions.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.39",
        gl: "GL-001",
        ref: "5.1.39",
        title:
          "Ensure that you notify and obtain consent before collecting, transmitting, or using location data.",
        steps:
          "1. Open the app.\n2. Check for the native OS permission pop-up configuration.\n3. Make sure that no coordinate transmission starts prior to user tap.",
        expected:
          "Location coordinates stay uncollected until immediate consent is approved.",
        originalRef: "Privacy",
      },
      {
        id: "iOS-C-5.40",
        gl: "GL-001",
        ref: "5.1.40",
        title:
          "If your app uses location services, be sure to explain the purpose in your app",
        steps:
          "1. Open the app.\n2. Look at NSLocationWhenInUseUsageDescription inside Info.plist metadata.\n3. Check that the description clearly informs users of the exact benefit of sharing target coordinates.",
        expected: "The purpose explanation shows absolute transparency.",
        originalRef: "Privacy",
      },
      // Section: Intellectual Property
      {
        id: "iOS-C-5.41",
        gl: "GL-001",
        ref: "5.2.1",
        title:
          "Don’t use protected third party material such as trademarks, copyrighted works, or patented ideas in your app without permission, and don’t include misleading, false, or copycat representations, names, or metadata in your app bundle",
        steps:
          "1. Open the app.\n2. Check app name, metadata, and assets for any unapproved third-party brand names or copyrighted assets.\n3. Check that trademark permissions are in place.",
        expected:
          "All assets are original or properly licensed, and metadata is free of trademark infringements.",
        originalRef: "Intellectual Property",
      },
      {
        id: "iOS-C-5.42",
        gl: "GL-001",
        ref: "5.2.2",
        title:
          "If your app uses, accesses, monetizes access to, or displays content from a third party service, ensure that you are specifically permitted to do so under the service’s terms of use. Authorization must be provided upon request.",
        steps:
          "1. Open the app.\n2. Look at any integrated APIs or embeds from external services.\n3. Check that the terms of service of the third party permit the app's reuse and monetization.",
        expected:
          "Explicit authorization for third-party service content usage is documented and available.",
        originalRef: "Intellectual Property",
      },
      {
        id: "iOS-C-5.43",
        gl: "GL-001",
        ref: "5.2.3",
        title:
          "Apps should not facilitate illegal file sharing or include the ability to save, convert, or download media from third party sources (e.g. Apple Music, YouTube, SoundCloud, Vimeo, etc.) without explicit authorization from those sources.",
        steps:
          "1. Open the app.\n2. Check that the app does not contain downloaders or file converters for third-party streaming sites.\n3. Check that file-sharing functions comply with media copyrights.",
        expected: "The app blocks unauthorized media downloads or conversions.",
        originalRef: "Intellectual Property",
      },
      {
        id: "iOS-C-5.44",
        gl: "GL-001",
        ref: "5.2.4",
        title:
          "Don’t suggest or infer that Apple is a source or supplier of the App, or that Apple endorses any particular representation regarding quality or functionality. If your app is selected as an “Editor’s Choice,” Apple will apply the badge automatically.",
        steps:
          "1. Open the app.\n2. Look at copywriting in app store description and in-app interfaces.\n3. Make sure that zero claims that Apple is a sponsor or has endorsed the app's quality.",
        expected:
          "No inappropriate claims or hints of Apple endorsement are present.",
        originalRef: "Intellectual Property",
      },
      {
        id: "iOS-C-5.45",
        gl: "GL-001",
        ref: "5.2.5",
        title:
          "Don’t create an app that appears confusingly similar to an existing Apple product, interface (e.g. Finder), app (such as the App Store, iTunes Store, or Messages) or advertising theme, and don’t misspell Apple product names (i.e., GPS for Iphone, iTunz). iTunes music previews may not be used for their entertainment value (e.g. as the background music to a photo collage or the soundtrack to a game) or in any other unauthorized manner.",
        steps:
          "1. Open the app.\n2. Look at user interface layouts for similarities with system apps (e.g., Apple Messages).\n3. Check that spelling of Apple trademarks (e.g., iPhone keyword casing).\n4. Check for unauthorized iTunes music preview assets.",
        expected:
          "Visual identity and naming schemes avoid mimicking native Apple applications or misspelling trademarks.",
        originalRef: "Intellectual Property",
      },
      // Section: Gaming, Gambling and Lotteries
      {
        id: "iOS-C-5.46",
        gl: "GL-001",
        ref: "5.3.1",
        title:
          "Sweepstakes and contests must be sponsored by the developer of the app.",
        steps:
          "1. Open the app.\n2. Look at all reward campaigns, contests, or draw events inside the app.\n3. Check that the app developer is named as the sole organizer and sponsor.",
        expected:
          "The platform developer is the sole legal sponsor of contests.",
        originalRef: "Gaming, Gambling and Lotteries",
      },
      {
        id: "iOS-C-5.47",
        gl: "GL-001",
        ref: "5.3.2",
        title:
          "Official rules for sweepstakes, contests, and raffles must be presented in the app and make clear that Apple is not a sponsor or involved in the activity in any manner.",
        steps:
          "1. Open the app.\n2. Check that official rule documents are easily readable within the contested interface.\n3. Check that explicit disclaimer copy: 'Apple is not a sponsor, nor is it involved in any manner with this sweepstake'.",
        expected:
          "Official rules are declared clearly, showing absolute isolation from Apple sponsorship.",
        originalRef: "Gaming, Gambling and Lotteries",
      },
      {
        id: "iOS-C-5.48",
        gl: "GL-001",
        ref: "5.3.3",
        title:
          "Apps may not use IAP to purchase credit or currency for use in conjunction with real money gaming of any kind, and may not enable people to purchase lottery or raffle tickets or initiate fund transfers in the app.",
        steps:
          "1. Open the app.\n2. Look at In-App Purchases database.\n3. Check that no bought coins or consumable tokens are exchanged for actual fiat withdrawal/gambling or raffle entries.",
        expected:
          "IAPs are never linked to real money casino credits or lottery tickets.",
        originalRef: "Gaming, Gambling and Lotteries",
      },
      {
        id: "iOS-C-5.49",
        gl: "GL-001",
        ref: "5.3.4",
        title:
          "Apps that offer real money gaming (e.g. sports betting, poker, casino games, horse racing) or lotteries must have necessary licensing and permissions in the locations where the App is used, must be geo-restricted to those locations, and must be free on the App Store. Illegal gambling aids, including card counters, are not permitted on the App Store. Lottery apps must have consideration, chance, and a prize.",
        steps:
          "1. Open the app.\n2. Check that the app is distributed as a free download.\n3. Obtain licensing records matching jurisdictions.\n4. Check that geolocation APIs lock users out of illegal territories.\n5. Check for prohibited card counters.",
        expected:
          "The app enforces geographic limitations, is free of charge, and has valid gambling licences.",
        originalRef: "Gaming, Gambling and Lotteries",
      },
      // Section: VPN Apps
      {
        id: "iOS-C-5.50",
        gl: "GL-001",
        ref: "5.4.1",
        title:
          "Apps offering VPN services must utilize the NEVPNManager API and must make a clear declaration of what user data will be collected and how it will be used on an app screen prior to any user action to purchase or otherwise use the service. Apps offering VPN services may not sell, use, or disclose to third parties any data for any purpose, and must commit to this in their privacy policy. VPN apps must not violate local laws, and if you choose to make your VPN app available in a territory that requires a VPN license, you must provide your license information in the App Review Notes field. Parental control, content blocking, and security apps, among others, from approved providers may also use the NEVPNManager API. Apps that do not comply with this guideline will be removed from the App Store and you may be removed from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Check that network logic uses NEVPNManager system API.\n3. Check that user is presented with data collection declarations prior to buying/enabling.\n4. Check that the privacy policy includes a binding commitment never to sell VPN telemetry to third parties.\n5. Make sure that Chinese territory configurations or similar licensed areas hold valid local licensing notes.",
        expected:
          "The VPN service employs standard APIs, maintains absolute data separation, and includes required policy declarations.",
        originalRef: " VPN Apps ",
      },
      // Section: Mobile Device Management
      {
        id: "iOS-C-5.51",
        gl: "GL-001",
        ref: "5.5.1",
        title:
          "Mobile Device Management Apps that offer Mobile Device Management (MDM) services must request this capability from Apple. Such apps may only be offered by commercial enterprises (such as business organizations, educational institutions, or government agencies), and in limited cases, companies using MDM for parental control services.",
        steps:
          "1. Open the app.\n2. Check that presence of active MDM profile entitlement associated with the app.\n3. Check that the publisher account represents a commercial enterprise, school, or authorized company.",
        expected:
          "MDM services are fully verified and restricted to verified corporate or enterprise domains.",
        originalRef: " Mobile Device Management ",
      },
      {
        id: "iOS-C-5.52",
        gl: "GL-001",
        ref: "5.5.2",
        title:
          "You must make a clear declaration of what user data will be collected and how it will be used on an app screen prior to any user action to purchase or otherwise use the service.",
        steps:
          "1. Open the app.\n2. Look at registration and setup views on initial install.\n3. Check that clear content outlines precisely what telemetry, device actions, or profiles are surveyed.",
        expected:
          "Disclosures of data collection are prominent before the MDM setup completes.",
        originalRef: " Mobile Device Management ",
      },
      {
        id: "iOS-C-5.53",
        gl: "GL-001",
        ref: "5.5.3",
        title: "MDM apps must not violate local laws.",
        steps:
          "1. Open the app.\n2. Check that whether features (such as keylogging or surveillance tools) violate privacy frameworks in targeting countries.",
        expected: "System controls satisfy geographic security policies.",
        originalRef: " Mobile Device Management ",
      },
      {
        id: "iOS-C-5.54",
        gl: "GL-001",
        ref: "5.5.4",
        title:
          "Apps offering MDM services may not sell, use, or disclose to third parties any data for any purpose, and must commit to this in their privacy policy. Apps that do not comply with this guideline will be removed from the App Store and you may be removed from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Check that that the enterprise privacy policy outlaws third-party data distribution.\n3. Check that zero external tracking libraries are included inside target payloads.",
        expected:
          "Privacy guidelines commit to maximum protection, barring any third-party disclosure.",
        originalRef: " Mobile Device Management ",
      },
      // Section: Developer Code of Conduct
      {
        id: "iOS-C-5.55",
        gl: "GL-001",
        ref: "5.6.1",
        title:
          "Please treat everyone with respect, whether in your responses to App Store reviews, customer support requests, or when communicating with Apple, including your responses in Resolution Center. Do not engage in harassment of any kind, discriminatory practices, intimidation, bullying, and don’t encourage others to engage in any of the above. Repeated manipulative or misleading behavior or other fraudulent conduct will lead to your removal from the Apple Developer Program.",
        steps:
          "1. Open the app.\n2. Monitor customer support logs and App Store review responses.\n3. Make sure that team training blocks any hostile or offensive statements.",
        expected: "All responses maintain a polite, respectful tone.",
        originalRef: " Developer Code of Conduct ",
      },
      {
        id: "iOS-C-5.56",
        gl: "GL-001",
        ref: "5.6.2",
        title:
          "Apps should never prey on users or attempt to rip-off customers, trick them into making unwanted purchases, force them to share unnecessary data, raise prices in a tricky manner, charge for features or content that are not delivered, or engage in any other manipulative practices within or outside of the app.",
        steps:
          "1. Open the app.\n2. Look at price sliders, checkout menus, and purchase confirmations.\n3. Check that the pricing is transparent, clearly detailed, and has zero dark patterns.",
        expected:
          "Pricing mechanisms remain crystal-clear, transparent, and direct, without deceptive layouts.",
        originalRef: " Developer Code of Conduct ",
      },
      {
        id: "iOS-C-5.57",
        gl: "GL-001",
        ref: "5.6.3",
        title:
          "Use the provided API to prompt users to review your app; this functionality allows customers to provide an App Store rating and review without the inconvenience of leaving your app, and we will disallow custom review prompts.",
        steps:
          "1. Open the app.\n2. Identify the review command handler inside the app.\n3. Check that utilization of standard SKStoreReviewController.requestReview().\n4. Check that there are no proprietary custom feedback blocks that request store-side 5-star inputs.",
        expected: "Review hooks use Apple's native review prompts exclusively.",
        originalRef: " Developer Code of Conduct ",
      },
      {
        id: "iOS-C-5.58",
        gl: "GL-001",
        ref: "5.6.4",
        title:
          "Providing verifiable information to Apple and customers is critical to customer trust. Your representation of yourself, your business, and your offerings on the App Store must be accurate. The information you provide must be truthful, relevant, and up-to-date so that Apple and customers understand who they are engaging with and can contact you regarding any issues.",
        steps:
          "1. Open the app.\n2. Check that in-app about/support pages.\n3. Check that support email address, phone numbers, and physical company coordinates are accurate and operational.",
        expected:
          "Support addresses and publisher attributes are accurate and verifiable.",
        originalRef: " Developer Code of Conduct ",
      },
      {
        id: "iOS-C-5.59",
        gl: "GL-001",
        ref: "5.6.5",
        title:
          "Participating in the App Store requires integrity and a commitment to building and maintaining customer trust. Manipulating any element of the App Store customer experience such as charts, search reviews, or referrals to your app erodes customer trust and is not permitted",
        steps:
          "1. Open the app.\n2. Visually look at referring loops and marketing campaigns.\n3. Make sure that zero simulated referrers or inorganic review stimulation techniques are integrated.",
        expected:
          "Campaign systems and conversion triggers remain secure and organic.",
        originalRef: " Developer Code of Conduct ",
      },
      {
        id: "iOS-C-5.60",
        gl: "GL-001",
        ref: "5.6.6",
        title:
          "Customers expect the highest quality from the App Store, and maintaining high quality content, services, and experiences promotes customer trust. Indications that this expectation is not being met include excessive customer reports about concerns with your app, such as negative customer reviews, and excessive refund requests. Inability to maintain high quality may be a factor in deciding whether a developer is abiding by the Developer Code of Conduct.",
        steps:
          "1. Open the app.\n2. Look at recent user crash rate profiles inside Xcode Organizer.\n3. Monitor ratings graphs and support request queues.\n4. Resolve high-frequent technical failures proactively.",
        expected:
          "Core crashes remain within bounds and software holds a high-quality baseline.",
        originalRef: " Developer Code of Conduct ",
      },
      // Info.plist - Mandatory Keys
      {
        id: "iOS-I-M-1",
        gl: "GL-002",
        ref: "M.01",
        title: "CFBundleName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleName key is present.",
        expected:
          "The mandatory CFBundleName key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-2",
        gl: "GL-002",
        ref: "M.02",
        title: "DTPlatformVersion",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that DTPlatformVersion key is present.",
        expected:
          "The mandatory DTPlatformVersion key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-3",
        gl: "GL-002",
        ref: "M.03",
        title: "CFBundleVersion",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleVersion key is present.",
        expected:
          "The mandatory CFBundleVersion key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-4",
        gl: "GL-002",
        ref: "M.04",
        title: "CFBundleShortVersionString",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleShortVersionString key is present.",
        expected:
          "The mandatory CFBundleShortVersionString key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-5",
        gl: "GL-002",
        ref: "M.05",
        title: "CFBundleDevelopmentRegion",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleDevelopmentRegion key is present.",
        expected:
          "The mandatory CFBundleDevelopmentRegion key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-6",
        gl: "GL-002",
        ref: "M.06",
        title: "CFBundleInfoDictionaryVersion",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleInfoDictionaryVersion key is present.",
        expected:
          "The mandatory CFBundleInfoDictionaryVersion key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-7",
        gl: "GL-002",
        ref: "M.07",
        title: "CFBundleDisplayName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleDisplayName key is present.",
        expected:
          "The mandatory CFBundleDisplayName key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-8",
        gl: "GL-002",
        ref: "M.08",
        title: "CFBundleIdentifier",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleIdentifier key is present.",
        expected:
          "The mandatory CFBundleIdentifier key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-9",
        gl: "GL-002",
        ref: "M.09",
        title: "DTXcode",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that DTXcode key is present.",
        expected:
          "The mandatory DTXcode key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      {
        id: "iOS-I-M-10",
        gl: "GL-002",
        ref: "M.10",
        title: "CFBundleExecutable",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Make sure that CFBundleExecutable key is present.",
        expected:
          "The mandatory CFBundleExecutable key is successfully defined in the Info.plist bundle.",
        originalRef: "Mandatory Keys",
      },
      // Info.plist - Non-Mandatory Keys
      {
        id: "iOS-I-NM-1",
        gl: "GL-002",
        ref: "NM.01",
        title: "CFBundleAllowMixedLocalizations",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleAllowMixedLocalizations key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-2",
        gl: "GL-002",
        ref: "NM.02",
        title: "CFBundleURLTypes",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleURLTypes key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-3",
        gl: "GL-002",
        ref: "NM.03",
        title: "GKGameCenterBadgingDisabled",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether GKGameCenterBadgingDisabled key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-4",
        gl: "GL-002",
        ref: "NM.04",
        title: "UTExportedTypeDeclarations",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UTExportedTypeDeclarations key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-5",
        gl: "GL-002",
        ref: "NM.05",
        title: "UISupportedInterfaceOrientations",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UISupportedInterfaceOrientations key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-6",
        gl: "GL-002",
        ref: "NM.06",
        title: "NSLocationUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSLocationUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-7",
        gl: "GL-002",
        ref: "NM.07",
        title: "GCSupportsMultipleMicroGamepads",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether GCSupportsMultipleMicroGamepads key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-8",
        gl: "GL-002",
        ref: "NM.08",
        title: "UIRequiredDeviceCapabilities",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIRequiredDeviceCapabilities key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-9",
        gl: "GL-002",
        ref: "NM.09",
        title: "DTSDKBuild",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTSDKBuild key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-10",
        gl: "GL-002",
        ref: "NM.10",
        title: "UIDeviceFamily",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIDeviceFamily key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-11",
        gl: "GL-002",
        ref: "NM.11",
        title: "NSUbiquitousContainer",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUbiquitousContainer key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-12",
        gl: "GL-002",
        ref: "NM.12",
        title: "CFBundleIconFile",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleIconFile key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-13",
        gl: "GL-002",
        ref: "NM.13",
        title: "LSApplicationQueriesSchemes",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether LSApplicationQueriesSchemes key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-14",
        gl: "GL-002",
        ref: "NM.14",
        title: "GCSupportedGameControllers",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether GCSupportedGameControllers key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-15",
        gl: "GL-002",
        ref: "NM.15",
        title: "UILaunchStoryboardName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UILaunchStoryboardName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-16",
        gl: "GL-002",
        ref: "NM.16",
        title: "CFBundleLocalizations",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleLocalizations key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-17",
        gl: "GL-002",
        ref: "NM.17",
        title: "LSRequiresIPhoneOS",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether LSRequiresIPhoneOS key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-18",
        gl: "GL-002",
        ref: "NM.18",
        title: "UIWhitePointAdaptivityStyle",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIWhitePointAdaptivityStyle key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-19",
        gl: "GL-002",
        ref: "NM.19",
        title: "DTPlatformName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTPlatformName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-20",
        gl: "GL-002",
        ref: "NM.20",
        title: "UIStatusBarStyle",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIStatusBarStyle key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-21",
        gl: "GL-002",
        ref: "NM.21",
        title: "DTPlatformBuild",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTPlatformBuild key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-22",
        gl: "GL-002",
        ref: "NM.22",
        title: "UILaunchImages",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UILaunchImages key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-23",
        gl: "GL-002",
        ref: "NM.23",
        title: "UILaunchImageFile",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UILaunchImageFile key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-24",
        gl: "GL-002",
        ref: "NM.24",
        title: "UIPrerenderedIcon",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIPrerenderedIcon key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-25",
        gl: "GL-002",
        ref: "NM.25",
        title: "MKDirectionsApplicationSupportedModes",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether MKDirectionsApplicationSupportedModes key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-26",
        gl: "GL-002",
        ref: "NM.26",
        title: "DTXcodeBuild",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTXcodeBuild key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-27",
        gl: "GL-002",
        ref: "NM.27",
        title: "DTSDKName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTSDKName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-28",
        gl: "GL-002",
        ref: "NM.28",
        title: "UIViewEdgeAntialiasing",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIViewEdgeAntialiasing key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-29",
        gl: "GL-002",
        ref: "NM.29",
        title: "CFBundleIcons",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleIcons key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-30",
        gl: "GL-002",
        ref: "NM.30",
        title: "NSAppTransportSecurity",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSAppTransportSecurity key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-31",
        gl: "GL-002",
        ref: "NM.31",
        title: "UISupportedExternalAccessoryProtocols",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UISupportedExternalAccessoryProtocols key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-32",
        gl: "GL-002",
        ref: "NM.32",
        title: "UIFileSharingEnabled",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIFileSharingEnabled key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-33",
        gl: "GL-002",
        ref: "NM.33",
        title: "CFBundleIconName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleIconName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-34",
        gl: "GL-002",
        ref: "NM.34",
        title: "UINewsstandApp",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UINewsstandApp key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-35",
        gl: "GL-002",
        ref: "NM.35",
        title: "UIInterfaceOrientation",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIInterfaceOrientation key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-36",
        gl: "GL-002",
        ref: "NM.36",
        title: "coreSpotlightContinuation",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether coreSpotlightContinuation key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-37",
        gl: "GL-002",
        ref: "NM.37",
        title: "UIApplicationExitsOnSuspend",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIApplicationExitsOnSuspend key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-38",
        gl: "GL-002",
        ref: "NM.38",
        title: "NSUbiquitousContainerIsDocumentScopePublic",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUbiquitousContainerIsDocumentScopePublic key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-39",
        gl: "GL-002",
        ref: "NM.39",
        title: "UIAppSupportsHDR",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIAppSupportsHDR key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-40",
        gl: "GL-002",
        ref: "NM.40",
        title: "NSMainNibFile",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSMainNibFile key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-41",
        gl: "GL-002",
        ref: "NM.41",
        title: "CFBundleDocumentTypes",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleDocumentTypes key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-42",
        gl: "GL-002",
        ref: "NM.42",
        title: "NSSupportsPurgeableLocalStorage",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSSupportsPurgeableLocalStorage key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-43",
        gl: "GL-002",
        ref: "NM.43",
        title: "DTCompiler",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether DTCompiler key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-44",
        gl: "GL-002",
        ref: "NM.44",
        title: "CoreSpotlightContinuation",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CoreSpotlightContinuation key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-45",
        gl: "GL-002",
        ref: "NM.45",
        title: "NSUbiquitousContainerSupportedFolderLevels",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUbiquitousContainerSupportedFolderLevels key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-46",
        gl: "GL-002",
        ref: "NM.46",
        title: "UIRequiresPersistentWiFi",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIRequiresPersistentWiFi key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-47",
        gl: "GL-002",
        ref: "NM.47",
        title: "NSUbiquitousContainerName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUbiquitousContainerName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-48",
        gl: "GL-002",
        ref: "NM.48",
        title: "UIBackgroundModes",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIBackgroundModes key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-49",
        gl: "GL-002",
        ref: "NM.49",
        title: "NSUbiquitousDisplaySet",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUbiquitousDisplaySet key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-50",
        gl: "GL-002",
        ref: "NM.50",
        title: "CFBundleSpokenName",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleSpokenName key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-51",
        gl: "GL-002",
        ref: "NM.51",
        title: "UIViewGroupOpacity",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIViewGroupOpacity key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-52",
        gl: "GL-002",
        ref: "NM.52",
        title: "UIApplicationShortcutWidget",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIApplicationShortcutWidget key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-53",
        gl: "GL-002",
        ref: "NM.53",
        title: "UIApplicationShortcutItems",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIApplicationShortcutItems key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-54",
        gl: "GL-002",
        ref: "NM.54",
        title: "CFBundleIconFiles",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether CFBundleIconFiles key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-55",
        gl: "GL-002",
        ref: "NM.55",
        title: "UIRequiresFullScreen",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIRequiresFullScreen key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-56",
        gl: "GL-002",
        ref: "NM.56",
        title: "UIAppFonts",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIAppFonts key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-57",
        gl: "GL-002",
        ref: "NM.57",
        title: "UTImportedTypeDeclarations",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UTImportedTypeDeclarations key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-58",
        gl: "GL-002",
        ref: "NM.58",
        title: "MinimumOSVersion",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether MinimumOSVersion key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-NM-59",
        gl: "GL-002",
        ref: "NM.59",
        title: "UIStatusBarHidden",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether UIStatusBarHidden key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Non-Mandatory Keys",
      },
      {
        id: "iOS-I-PC-1",
        gl: "GL-003",
        ref: "PC.01",
        title: "NSUserTrackingUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSUserTrackingUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-2",
        gl: "GL-003",
        ref: "PC.02",
        title: "NSBluetoothPeripheralUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSBluetoothPeripheralUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-3",
        gl: "GL-003",
        ref: "PC.03",
        title: "NSCalendarsUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSCalendarsUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-4",
        gl: "GL-003",
        ref: "PC.04",
        title: "NSCameraUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSCameraUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-5",
        gl: "GL-003",
        ref: "PC.05",
        title: "NSContactsUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSContactsUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-6",
        gl: "GL-003",
        ref: "PC.06",
        title: "NSFaceIDUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSFaceIDUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-7",
        gl: "GL-003",
        ref: "PC.07",
        title: "NSHealthShareUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSHealthShareUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-8",
        gl: "GL-003",
        ref: "PC.08",
        title: "NSHealthUpdateUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSHealthUpdateUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-9",
        gl: "GL-003",
        ref: "PC.09",
        title: "NSHomeKitUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSHomeKitUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-10",
        gl: "GL-003",
        ref: "PC.10",
        title: "NSLocationAlwaysUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSLocationAlwaysUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-11",
        gl: "GL-003",
        ref: "PC.11",
        title: "NSLocationWhenInUseUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSLocationWhenInUseUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-12",
        gl: "GL-003",
        ref: "PC.12",
        title: "NSMicrophoneUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSMicrophoneUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-13",
        gl: "GL-003",
        ref: "PC.13",
        title: "NSMotionUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSMotionUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-14",
        gl: "GL-003",
        ref: "PC.14",
        title: "NSAppleMusicUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSAppleMusicUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-15",
        gl: "GL-003",
        ref: "PC.15",
        title: "NFCReaderUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NFCReaderUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-16",
        gl: "GL-003",
        ref: "PC.16",
        title: "NSPhotoLibraryAddUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSPhotoLibraryAddUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-17",
        gl: "GL-003",
        ref: "PC.17",
        title: "NSPhotoLibraryUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSPhotoLibraryUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-18",
        gl: "GL-003",
        ref: "PC.18",
        title: "NSRemindersUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSRemindersUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-19",
        gl: "GL-003",
        ref: "PC.19",
        title: "NSSiriUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSSiriUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-20",
        gl: "GL-003",
        ref: "PC.20",
        title: "NSSpeechRecognitionUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSSpeechRecognitionUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-I-PC-21",
        gl: "GL-003",
        ref: "PC.21",
        title: "NSVideoSubscriberAccountUsageDescription",
        steps:
          "1. Open the app.\n2. De-compile IPA file.\n3. Access Info.plist document.\n4. Check whether NSVideoSubscriberAccountUsageDescription key is present.\n5. If key is present mark as PASS, if key is missing mark as N/A.",
        expected: "Marked as PASS if present in the bundle, or N/A if missing.",
        originalRef: "Privacy check",
      },
      {
        id: "iOS-H-L-1",
        gl: "GL-004",
        ref: "L.01",
        title:
          "Ensure that app's layout fills the screen and isn't obscured by the device's rounded corners, its sensor housing, or the indicator for accessing the Home screen.",
        steps:
          "1. Launch the app on a device with rounded corners or sensor housing.\n2. Check that that layout and controls are not obscured or cut off.\n3. Visually look at the Home indicator area to ensure readability and accessibility.",
        expected:
          "All layout content and controls are fully visible and not cut off by device hardware features.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-2",
        gl: "GL-004",
        ref: "L.02",
        title:
          "Ensure that the app's background materials extend to the edges of the display, and UI elements are appropriately inset and positioned.",
        steps:
          "1. Open the app.\n2. Open different views in the app.\n3. Observe if background materials or colors bleed out to the screen edges.\n4. Check that interactive components are inset safely.",
        expected:
          "App backgrounds extend full-screen, while interactive UI remains inside readable boundaries.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-3",
        gl: "GL-004",
        ref: "L.03",
        title:
          "Ensure that your app adheres to safe area and margin layout guides in Portrait as well as landscape mode.",
        steps:
          "1. Open the app.\n2. Rotate the device between Portrait and Landscape modes.\n3. Carefully look at visual alignments against safe areas on both modes.",
        expected:
          "Safe area layouts are correctly respected in both device orientations.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-4",
        gl: "GL-004",
        ref: "L.04",
        title:
          "Ensure that app's content is centered and symmetrically inset and isn't affected in any orientation.",
        steps:
          "1. Open the app.\n2. Check content distribution in different orientations.\n3. Check that the layout remains centered or symmetrically aligned.",
        expected:
          "Content maintains symmetry and balance across screen rotation events.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-5",
        gl: "GL-004",
        ref: "L.05",
        title:
          "Apps should adhere to the safe area and layout margins defined by UIKit, which ensure appropriate insetting based on the device and context.",
        steps:
          "1. Open the app.\n2. Analyze UIKit/SwiftUI auto-layout constraints.\n3. Check that default margins are preserved without custom forcing into forbidden zones.",
        expected:
          "Default UIKit/SwiftUI safe area constraints are correctly leveraged.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-6",
        gl: "GL-004",
        ref: "L.06",
        title:
          "If possible, support both portrait and landscape orientations. People prefer to use apps in different orientations, so it’s best when you can fulfill that expectation.",
        steps:
          "1. Open the app.\n2. Try using if the app rotates smoothly under auto-rotate triggers.\n3. Check that that there's no layout crashes or UI overlapping upon orientation shifts.",
        expected:
          "Both portrait and landscape modes are properly supported or handled.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-7",
        gl: "GL-004",
        ref: "L.07",
        title:
          "Provide ample touch targets for interactive elements. Try to maintain a minimum tappable area of 44pt x 44pt for all controls.",
        steps:
          "1. Open the app.\n2. Measure interactive buttons and options in points.\n3. Make sure that the active hit target is at least 44pt by 44pt.",
        expected:
          "All interactive elements have a minimum touch target size of 44x44 points.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-8",
        gl: "GL-004",
        ref: "L.08",
        title:
          "Preview your app on multiple devices. Preview your app and check for clipping and other layout issues.",
        steps:
          "1. Launch the app on different simulator profiles (iPhone SE, Pro Max, iPad).\n2. Look for layout anomalies, truncation, or text clipping.",
        expected:
          "UI renders properly across a range of simulated Apple devices.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-9",
        gl: "GL-004",
        ref: "L.09",
        title:
          "If the app is designed to be used only in landscape orientation, ensure that it works equally well in both left and right orientations. This ensures that users can comfortably use the app regardless of how they prefer to hold their device.",
        steps:
          "1. Open the app.\n2. Turn the landscape-only app to Landscape Left and then Landscape Right.\n3. Make sure controls and rendering flip appropriately for both choices.",
        expected:
          "Landscape modes adapt symmetrically to both physical orientations.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-10",
        gl: "GL-004",
        ref: "L.10",
        title:
          "Customize your app’s response to rotation according to context. A game that lets people move a character by rotating the device, for example, probably shouldn’t switch orientations during gameplay. It could, however, display menus and intro sequences based on the current orientation.",
        steps:
          "1. Open the app.\n2. Try using context-aware rotation behavior during active states/gameplay vs menus.\n3. Check that rotation is inhibited or configured gracefully depending on gameplay context.",
        expected:
          "Rotation overrides are implemented elegantly according to user activity.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-11",
        gl: "GL-004",
        ref: "L.11",
        title:
          "Make sure your app works on iPad, not just on iPhone. Users appreciate having the flexibility to run your app on either type of iOS device. Even if you expect most people to use your app on iPhone, interface elements should remain visible and functional on iPad.",
        steps:
          "1. Open the app.\n2. Run the app on an iPad simulator.\n3. Check that that screen ratios, button scales, and margins adapt cleanly without awkward stretching.",
        expected:
          "Universal apps function seamlessly on iPad and present standard iPad layout styles.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-12",
        gl: "GL-004",
        ref: "L.12",
        title:
          "When the device is in landscape orientation, it may be appropriate for some apps—like games—to place tappable controls in the lower portion of the screen (extending below the safe area) to allow more room for content.",
        steps:
          "1. Open the app.\n2. For relevant applications (e.g. games), verify if lower control buttons are laid out neatly.\n3. Check for balance in content room.",
        expected:
          "Lower landscape buttons are appropriately positioned for thumb-reach ergonomics.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-13",
        gl: "GL-004",
        ref: "L.13",
        title:
          "Ensure that matching insets are used for controls at the top and bottom of the screen, and leave ample space around the Home indicator so people don't accidentally target it when trying to interact with a control.",
        steps:
          "1. Open the app.\n2. Measure margins around top and bottom controls.\n3. Make sure that safe distance margins are present around the Home indicator.",
        expected:
          "Equal insets are shared at the top and bottom with adequate clearance around the Home indicator.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-14",
        gl: "GL-004",
        ref: "L.14",
        title:
          "Avoid explicitly placing interactive controls at the very bottom of the screen and in corners.",
        steps:
          "1. Open the app.\n2. Look through screen corners and extreme bottom coordinates.\n3. Check that that no buttons or tap targets are sitting directly in corner touch-dead zones.",
        expected:
          "Interactive options are elevated away from screen edges and corners to prevent accidental mistaps.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-15",
        gl: "GL-004",
        ref: "L.15",
        title:
          "Ensure that full-width button at the bottom of the screen has rounded corners and is aligned with the bottom of the safe area—which also ensures that it doesn't conflict with the Home indicator.",
        steps:
          "1. Open the app.\n2. Visually look at full-width bottom buttons.\n3. Check that the presence of rounded corners.\n4. Check that clear separation space matches safe-area layout boundaries near the Home Indicator.",
        expected:
          "Bottom buttons have rounded corners and remain fully clear of the Home Indicator zone.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-16",
        gl: "GL-004",
        ref: "L.16",
        title:
          "Don't attempt to hide the device's rounded corners, sensor housing, or indicator for accessing the Home screen by placing black bars at the top and bottom of the screen. Don't use visual adornments like brackets, bezels, shapes, or instructional text to call special attention to these areas, either.",
        steps:
          "1. Open the app.\n2. Look at application header and footer styling.\n3. Check that there are no artificial black letterboxes, borders, or decorations designed to mask hardware sensors/bezels.",
        expected:
          "App operates dynamically inside the natural physical frame without masking hardware features.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-17",
        gl: "GL-004",
        ref: "L.17",
        title:
          "Ensure that auto-hiding of the indicator for accessing the Home screen is enabled only for passive viewing experiences like playing videos or photo slideshows.",
        steps:
          "1. Open the app.\n2. Check that interactive portions do not auto-hide the Home indicator.\n3. Check that indicator fades away only during passive full-screen media modes.",
        expected:
          "Indicator remains visible during user interaction and auto-hides strictly inside immersive playback screens.",
        originalRef: "Layout",
      },
      {
        id: "iOS-H-L-18",
        gl: "GL-004",
        ref: "L.18",
        title:
          "Immersive apps like games might require custom screen-edge gestures that take priority over the system's gestures—the first swipe should invoke app-specific gesture and the second swipe should invoke the system's gesture. This behavior (known as edge protect) should be implemented sparingly, as it makes it harder for people to access the system-level actions.",
        steps:
          "1. Open the app.\n2. Try using gestures on screen edges inside immersive modes.\n3. Check that the initial gesture triggers the intended app response.\n4. Check that system gestures are still discoverable on a second swipe.",
        expected:
          "Edge protect is implemented properly and ONLY in designated fully-immersive experiences.",
        originalRef: "Layout",
      },
      {
        id: "iOS-AS-I-1",
        gl: "GL-005",
        ref: "I.01",
        title:
          "Ask people to sign in only in exchange for value.For example, people might need to create an account to personalize their experience with the app, access additional features, or synchronize data.",
        steps:
          "1. Open the app.\n2. Navigate through the initial application launch flow.\n3. Identify areas requiring sign-in.\n4. Check that if sign-in is gating core functionality unnecessarily or if there is proportional value (e.g., personalization, syncing, or feature access) returned to the user.",
        expected:
          "The app only requests account sign-in when offering a direct, demonstrable value exchange.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-I-2",
        gl: "GL-005",
        ref: "I.02",
        title:
          "Consider Sign in with Apple for every version of your app and website.To create a consistent sign-in experience, you can offer Sign in with Apple for your app and website across all platforms, including non-Apple platforms and the web.",
        steps:
          "1. Open the app.\n2. Check the app’s sign-in page to see if Sign in with Apple button is present.\n3. Look at available platform services (web, other devices) to ensure consistent Sign in with Apple provision.",
        expected:
          "Sign in with Apple is consistently offered across all versions and platform deployments.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-I-3",
        gl: "GL-005",
        ref: "I.03",
        title:
          "Delay sign-in as long as possible.People often abandon apps when they're forced to sign in before doing anything useful. Give them a chance to familiarize themselves with your app before making a commitment. For example, a live-streaming app could let people explore available content before signing in to stream something.",
        steps:
          "1. Launch the app fresh (simulate guest/new user state).\n2. Explore screens, content, or features without logging in.\n3. Check that if user is allowed to navigate and preview app capability before encountering a high-friction sign-in request.",
        expected:
          "Users are permitted to familiarize themselves with app features and explore content prior to sign-in.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-I-4",
        gl: "GL-005",
        ref: "I.04",
        title:
          "In a commerce app, wait until after people make a purchase before asking them to create an account.If you support a guest checkout system, give people a quick way to create an account after the transaction completes. For example, if you support Apple Pay, let people create an account on the order confirmation page. In cases where people have already provided their name and email address during the Apple Pay transaction, you don't need to ask for this information.",
        steps:
          "1. Open the app.\n2. For commerce/transactional features, execute a mock checkout/purchase sequence.\n3. Check whether a guest checkout option is enabled. Check if account creation page appears strictly on/after order completion.\n4. Check that that name and email captured during Apple Pay transaction are reused without manual typing.",
        expected:
          "Account creation requests are deferred until after purchase completes, using existing transaction data to pre-populate details.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-I-5",
        gl: "GL-005",
        ref: "I.05",
        title:
          "Explain the benefits of signing in.If your app requires signing into an account, display a brief, friendly explanation on the login screen that describes the reasons for the requirement and its benefits. Also, remember that not everyone using your app has an account from the start.",
        steps:
          "1. Open the app.\n2. Open the login/sign-up page.\n3. Visually look at for the presence of a clear, friendly caption explaining why an account is required and what benefits it unlocks.\n4. Make sure that non-account holders are guided clearly.",
        expected:
          "Clear, professional onboarding copy explains sign-in requirements and benefits to the user.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-I-6",
        gl: "GL-005",
        ref: "I.06",
        title:
          "Consider letting people link an existing account to Sign in with Apple.When you support this type of linking, people can get the convenience of using Sign in with Apple while maintaining access to the information in an account they've already set up. You can offer account linking before or after people sign into their existing account. For example:\n - If people share an email address through Sign in with Apple and it matches the address in an existing account, you can suggest that they link Sign in with Apple to that account.\n - If people used an existing username and password to sign in, you can display an account-linking suggestion in their account's settings view or another logical place",
        steps:
          "1. Open the app.\n2. Try signing in with an existing traditional email/password account.\n3. Navigate to account settings or link suggestions dashboard.\n4. Check that if an option to link with Apple ID is presented. Check if app suggests linking if the Apple ID email matches an existing account.",
        expected:
          "Users can link traditional credentials to Sign in with Apple cleanly for subsequent secure entries.",
        originalRef: "Introduction",
      },
      {
        id: "iOS-AS-DM-1",
        gl: "GL-005",
        ref: "DM.01",
        title:
          "As soon as Sign in with Apple completes, welcome people to their new account.Help people use their new account right away; don't delay the experience by asking for information that isn't required.",
        steps:
          "1. Open the app.\n2. Complete the Sign in with Apple flow within the app.\n3. Check that that the user is immediately welcomed and redirected to standard app features without unnecessary post-registration fields or screens.",
        expected:
          "The app welcomes the user immediately after sign-in without forcing them through extra non-essential configuration workflows.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-DM-2",
        gl: "GL-005",
        ref: "DM.02",
        title:
          "Clarify whether additional data is required or just recommended.If the data is legally or contractually required — such as an agreement to terms of service, country of residence, birth date, or information required by a country's real-identity laws — make sure people understand that they must supply the additional information to complete the setup of their account. If additional data isn't required, but can improve the user experience, make sure people know the request is optional and help them understand the benefits of providing the information.",
        steps:
          "1. Open the app.\n2. Trigger any user profile expansion or data collection screen.\n3. Check that that legally or contractually required inputs are clearly labeled as mandatory.\n4. Check that optional inputs are explicitly identified as optional with clear descriptions of their premium benefits.",
        expected:
          "Optional versus mandatory user data entry requirements are clearly and explicitly distinguished.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-DM-3",
        gl: "GL-005",
        ref: "DM.03",
        title:
          "Don't ask people to supply a password. A key benefit of Sign in with Apple is that people don't have to create and memorize additional passwords. Unless people have stopped using Sign in with Apple, don't ask for a password.",
        steps:
          "1. Open the app.\n2. Look at the account settings page and profile setup workflow for Apple Sign-in users.\n3. Check that that they are not prompted or coerced to define a password unless explicitly decoupling or deleting their Apple link.",
        expected:
          "Password entry or creation fields are omitted entirely for active Apple Sign-in active sessions.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-DM-4",
        gl: "GL-005",
        ref: "DM.04",
        title:
          "Avoid asking for a personal email address when people supply a private relay address.Using Sign in with Apple, people can choose to share a private relay address that automatically forwards messages to their verified personal email account. It's essential to respect this choice and avoid overriding it by asking for a personal email address. If you present customer service, retail, or other experiences that request identification via email address, you can:\n - Make sure that people can view their private relay address in your app or website\n - Direct people to Settings > Apple ID > Password & Security > Apps using Apple ID to retrieve their private relay address\n - Use other identifying values, like an order number or phone number collected as part of a purchase",
        steps:
          "1. Open the app.\n2. Register/sign in using Apple Sign-In with private email relay active.\n3. Check for form requests that insist on entering a personal/unlocked email address.\n4. Check that that the app displays the relay address natively or guides users to Apple Settings if they need to copy it.",
        expected:
          "Private relay email preferences are fully respected without coercive prompts to reveal real/personal email addresses.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-DM-5",
        gl: "GL-005",
        ref: "DM.05",
        title:
          "Give people a chance to engage with your app before asking for optional data.As people use your app, you can help them discover places where they can benefit from sharing more information with you. For example, you might suggest that they provide a contact phone number if they want real-time text updates or social network information if they want to play games with friends. If people choose not to provide optional information, don't prevent them from accessing their account or using all the features of your app.",
        steps:
          "1. Open the app.\n2. Navigate the primary app features without filling optional details.\n3. Check that that refusal to provide optional inputs (e.g. phone number, social sync) does not terminate user sessions or restrict access to core screens.",
        expected:
          "Optional details are requested progressively over time, and refusal does not restrict standard functionality.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-DM-6",
        gl: "GL-005",
        ref: "DM.06",
        title:
          "Be transparent about the data you collect.People value knowing how you use the data that they share with you. One way you can be transparent is to welcome people by using the name or email address they shared. Doing this helps establish how you use this information and, for a relay address, shows people where to find it in the future. If you don't display all the data that people provide, they are likely to wonder why you asked for it.",
        steps:
          "1. Open the app.\n2. Visually look at the profile dashboard, welcome screens, and account settings for Apple-provided data.\n3. Check that that user's shared name/email is used directly, or clearly accounted for, ensuring full transparency.",
        expected:
          "All requested/provided user data is displayed transparently to make purposes clear.",
        originalRef: "Data Management",
      },
      {
        id: "iOS-AS-BTN-1",
        gl: "GL-005",
        ref: "B.01",
        title:
          "Prominently display a Sign in with Apple button/indicator. Make a Sign in with Apple button no smaller than other sign-in buttons, and avoid making people scroll to see the button.",
        steps:
          "1. Open the app.\n2. Visually look at the login/onboarding view of the app.\n3. Compare the Sign in with Apple button size and visual weight with other third-party login buttons (Google, Facebook, etc.).\n4. Check that that the button is immediately visible without needing the user to scroll down.",
        expected:
          "The button is prominent, matches or exceeds other login alternatives in size, and is visible above the fold.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-2",
        gl: "GL-005",
        ref: "B.02",
        title:
          "The following approved button titles must be used: 'Sign in with Apple', 'Sign up with Apple', and 'Continue with Apple'. (Available for iOS, macOS, tvOS, and web)",
        steps:
          "1. Open the app.\n2. Carefully look at the labels on all Sign in with Apple buttons in the app.\n3. Check that that they match official approved layouts: 'Sign in with Apple', 'Sign up with Apple', or 'Continue with Apple' exactly.",
        expected:
          "Buttons exclusively use Apple-approved titles with no custom branding or altered text.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-3",
        gl: "GL-005",
        ref: "B.03",
        title:
          "For watchOS, ensure that the system-provided single title is used: 'Sign in'.",
        steps:
          "1. Open the app.\n2. For watchOS builds, check the Apple ID authentication screens.\n3. Check that the label is strictly 'Sign in' with the Apple logo.",
        expected:
          "watchOS implementation correctly uses only the single 'Sign in' title variation.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-4",
        gl: "GL-005",
        ref: "B.04",
        title:
          "White Style compliance. Set white buttons only on dark or colored backgrounds that provide sufficient, high-contrast separation.",
        steps:
          "1. Open the app.\n2. Retrieve all screens featuring the White button variation.\n3. Check that they are situated over dark or highly colored backgrounds.\n4. Check that there is sufficient contrast so that the white body of the button stands out clearly.",
        expected:
          "White buttons are correctly contrasted against dark/colored backdrops to prevent boundary melting.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-5",
        gl: "GL-005",
        ref: "B.05",
        title:
          "White with Outline Style compliance. Use this style on white or light-colored backgrounds that don't provide sufficient contrast with a solid white fill. Avoid using on dark/saturated backgrounds.",
        steps:
          "1. Open the app.\n2. Find all screens featuring the White with Outline button.\n3. Check that they are resting on top of full-white or extremely light backgrounds.\n4. Make sure they are not placed on dark or deep-saturated colored backgrounds to prevent messy double outlines or excessive visual clutter.",
        expected:
          "White Outlined style is correctly locked to pale or white backgrounds, keeping borders clear and elegant.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-6",
        gl: "GL-005",
        ref: "B.06",
        title:
          "Black Style compliance. Use this style on white or light-colored backgrounds that provide sufficient contrast; never use on black or matching dark backdrops.",
        steps:
          "1. Open the app.\n2. Locate screens using the solid Black style button.\n3. Check that that the background is white or high-light colored, ensuring clear, crisp boundaries.\n4. Make sure that this solid black button is never placed on black or dark slate backgrounds where it would blend in.",
        expected:
          "Black button style is correctly displayed on high-contrast light backgrounds.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-7",
        gl: "GL-005",
        ref: "B.07",
        title:
          "watchOS button fill color compliance. Unlike the black Sign in with Apple button for other platforms, the watchOS button uses a system-defined dark gray appearance to contrast with the pure black background of Apple Watch.",
        steps:
          "1. Open the app.\n2. Check the button background color on Apple Watch.\n3. Check that that it uses system-defined solid dark charcoal/gray (not pure #000000 black or absolute white).\n4. Make sure that there is visible contrast against the watch face’s default black OLED environment.",
        expected:
          "The watchOS button utilizes standard dark gray fill to retain separation over black watch backdrops.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-8",
        gl: "GL-005",
        ref: "B.08",
        title:
          "Button Size and Corner Radius adjustment. By default, the button has rounded corners. In iOS, macOS, and the web, you can change the corner radius to produce square corners, rounded rectangles, or a pill-shaped button to match your app icon or overall UI styling.",
        steps:
          "1. Open the app.\n2. Match the corner radius of the Sign in with Apple button with other main actions in the app layout.\n3. Try using changing the style from custom sharp square edges (0px) up to full capsule pill (22px or automatic rounded values).\n4. Check that the layout maintains clean button interior centering and padding throughout styling scale adjustments.",
        expected:
          "Button corner radius values match app styling guidelines safely (square, slightly rounded, or pill format).",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-9",
        gl: "GL-005",
        ref: "B.09",
        title:
          "Minimum button size and margin guidelines. Maintain standard sizing in iOS, macOS, and the web: a minimum width of 140pt (280px @2x), minimum height of 30pt (60px @2x), and a minimum margin around the button equal to 1/10 of the button's height.",
        steps:
          "1. Open the app.\n2. Query dimensions of the rendering Sign in with Apple button elements.\n3. Check that width does not drop below 140pt. Verify height does not drop below 30pt.\n4. Measure external margin/spacing, ensuring it is at least 1/10 of the button height (e.g., 4.4pt margin for 44pt height) to prevent text overlap.",
        expected:
          "The button respects the required 140pt width, 30pt height, and 1/10 height safety margin.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-10",
        gl: "GL-005",
        ref: "B.10",
        title:
          "Logo Artwork custom design compliance. Use only official downloadable logo files, never use logo by itself as button, match height of logo to parent height, do not crop, do not add vertical padding, and do not recolor logo.",
        steps:
          "1. Open the app.\n2. Visually look at custom buttons using independent logo vectors.\n3. Check that the Apple logo is always paired with appropriate standard CTA text (never standalone).\n4. Check that the logo file matches button height, is never cropped/scaled unevenly, has no vertical padding, and maintains approved colors (black or white only).",
        expected:
          "Apple logo branding rules are followed perfectly: no coloring, no lone logo buttons, and no vertical padding/cropping.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-11",
        gl: "GL-005",
        ref: "B.11",
        title:
          "Left-Aligned Logo Button Proportions. For customized layout buttons, use the system font for the title. To look correct, the title's font size should be 43% of the button's height, or the button's height should be 233% of the title's font size, rounded to the nearest integer (e.g. 44pt height with 19pt font, 56pt height with 24pt font).",
        steps:
          "1. Open the app.\n2. Visually look at custom left-aligned logo layouts.\n3. Measure font size against button height (should be ~43% of height or height is ~233% of font size).\n4. Check that proportions when height scales (e.g. 44px height operates with 19px font; 56px height operates with 24px font).",
        expected:
          "The left-aligned button correctly pairs its height with a text size that matches the exact system 43% / 233% proportional standards.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-12",
        gl: "GL-005",
        ref: "B.12",
        title:
          "Title Capitalization Style. All variants of the button title must preserve the capitalization style of the title: capitalize the first word—that is, Sign or Continue—and Apple; all other letters are lowercase. Do not capitalize every letter in the title.",
        steps:
          "1. Open the app.\n2. Visually look at all Sign in with Apple buttons in the application.\n3. Check that that capitalization is sentence-case or title-case matching: 'Sign in with Apple', 'Sign up with Apple', or 'Continue with Apple'.\n4. Check that that all-caps strings like 'SIGN IN WITH APPLE' are NOT used.",
        expected:
          "Button capitalization follows approved Apple HIG casing (no ALL-CAPS styling permitted).",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-13",
        gl: "GL-005",
        ref: "B.13",
        title:
          "Vertical Alignment of Title and Logo inside Button. Keep the title and logo vertically aligned within the button. Vertically align the title to the middle of the button, then add the logo image, making sure its height matches the height of the button.",
        steps:
          "1. Open the app.\n2. Carefully look at the visual alignment of the Apple logo and text label within the button body.\n3. Check that both elements share a precise vertical center line.\n4. Make sure neither element is offset or floating too high or low.",
        expected:
          "Logo and title are perfectly vertically centered and aligned with the button middles.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-14",
        gl: "GL-005",
        ref: "B.14",
        title:
          "Logo Insets for Horizontal Alignments. If you need to horizontally align the Apple logo with other authentication logos, you can inset the left side of the logo.",
        steps:
          "1. Open the app.\n2. Visually look at multi-identity alignments (Google, Apple, Facebook).\n3. Check that the Apple logo can use subtle left padding/insets to ensure proportional alignment against competitor icons.\n4. Check that logo does not look unbalanced.",
        expected:
          "Subtle logo left insets are used properly and maintain neat alignment structures with other login buttons.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-15",
        gl: "GL-005",
        ref: "B.15",
        title:
          "Title to Right Edge Spacing. Maintain a minimum margin between the title and the right edge of the button. The margin should measure at least 8% of the button's width.",
        steps:
          "1. Open the app.\n2. Measure the padding space between the end of the text 'Apple' and the rightmost boundary of the button shape.\n3. Make sure that this space is at least 8% of the button's total width (e.g., 16px for a 200px wide button).\n4. Check that that the text is never clipped or too close to the boundary.",
        expected:
          "Title-to-right margin is at least 8% of the button's total width to protect the layout.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-16",
        gl: "GL-005",
        ref: "B.16",
        title:
          "Locale-Specific Sizing and Safe Margins. Maintain the minimum button size and margin around the button. Be mindful that the button title may vary in length depending on the locale. Use standard values for guidance (140pt min width, 30pt height, 1/10 margin).",
        steps:
          "1. Open the app.\n2. Switch the system locale to a lang/region where translations have longer labels.\n3. Check that the button width scales appropriately without causing ellipsis or line breaks.\n4. Check that minimum 140pt width and 30pt height stay respected.",
        expected:
          "The button scales beautifully in all locales, respecting minimum dimensions and margins.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-17",
        gl: "GL-005",
        ref: "B.17",
        title:
          "Logo-Only Buttons Padding & Aspect Ratio. Don't add horizontal padding to a logo-only image. A logo-only Sign in with Apple button always has a 1:1 aspect ratio, and the artwork already includes the correct padding on all sides.",
        steps:
          "1. Open the app.\n2. Locate any logo-only authentication icons/buttons.\n3. Check that the aspect ratio is exactly 1:1 (square, circle, or rounded square mask).\n4. Make sure that no extra custom horizontal padding is added to the Apple-provided asset.",
        expected:
          "Logo-only button renders with exact 1:1 aspect ratio and standard default built-in padding.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-18",
        gl: "GL-005",
        ref: "B.18",
        title:
          "Logo-Only Mask Shape Customization. Use a mask to change the default square shape of the logo-only image (e.g. rounded rect mask, no mask, or circular mask). Never crop the Apple-provided artwork to decrease its built-in padding or use the logo by itself, and avoid including additional padding.",
        steps:
          "1. Open the app.\n2. Visually look at circular or custom logo-only buttons.\n3. Make sure that the shape change is created using a mask (e.g. border-radius or clip-path) and not by cropping the core logo artwork.\n4. Check that the logo is never cropped to reduce its standard safety margin padding or used without its default container padding background.",
        expected:
          "Masking is applied correctly to adjust the outer shape of logo-only buttons without cropping the artwork.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-AS-BTN-19",
        gl: "GL-005",
        ref: "B.19",
        title:
          "Logo-Only Safe Outer Margins. Maintain a minimum margin around the button. The margin should measure at least 1/10 of the button's height.",
        steps:
          "1. Open the app.\n2. Look at spacing surrounding any logo-only sign-in icons in the layout.\n3. Check that the margin is at least 1/10th of the button's height to prevent overlapping adjacent assets.",
        expected:
          "Logo-only buttons maintain a reliable outer border margin equal to at least 1/10th of their height.",
        originalRef: "Buttons",
      },
      {
        id: "iOS-SUB-1",
        gl: "GL-006",
        ref: "S.1",
        title:
          "Subscriptions Visibility in Shop. Check that subscriptions are visible in the shop, and verify that the backend/server connection is verified if they fail to load.",
        steps:
          "1. Open the app.\n2. Navigate to the shop screen.\n3. Check that subscription tiers and products are displayed.\n4. Check that backend communication state.",
        expected:
          "Subscriptions load and display properly with valid names and prices.",
        originalRef: "Display & Visibility",
      },
      {
        id: "iOS-SUB-2",
        gl: "GL-006",
        ref: "S.2",
        title:
          "Purchasable Subscriptions. Confirm that the subscription purchase can be successfully completed and the user-facing entitlement/time/products are immediately delivered.",
        steps:
          "1. Open the app.\n2. Select a subscription package and tap Purchase.\n3. Complete the Sandbox or StoreKit transaction.\n4. Check that subscription status changes to Active and premium features are unlocked.",
        expected:
          "Premium entitlement and subscription expiration date / time are successfully delivered.",
        originalRef: "Purchase Flow",
      },
      {
        id: "iOS-SUB-3",
        gl: "GL-006",
        ref: "S.3",
        title:
          "Purchase Restoration. Validate that previously purchased subscriptions can be restored, especially within 30 minutes, or when re-installing or running on another device.",
        steps:
          "1. Open the app.\n2. Under a fresh installation or secondary device, navigate to the checkout or shop screen.\n3. Tap the 'Restore Purchases' button using the same Apple ID.\n4. Check that existing subscriptions are restored.",
        expected:
          "Purchases are seamlessly restored without requiring re-payment.",
        originalRef: "Purchase Flow",
      },
      {
        id: "iOS-SUB-4",
        gl: "GL-006",
        ref: "S.4",
        title:
          "Required Subscription Information & Price Transparency. Check that all critical specification details are prominently displayed in the purchase view without extra steps.",
        steps:
          "1. Open the app.\n2. Carefully look at the checkout / paywall screen. Verify that the Subscription Name, Duration, and full Subscription Price are clearly legible without clicking additional buttons.",
        expected:
          "Plan details, pricing frequency, and duration are clearly shown before initiating IAP.",
        originalRef: "Disclosures",
      },
      {
        id: "iOS-SUB-5",
        gl: "GL-006",
        ref: "S.5",
        title:
          "Auto-Renewal & Renewal Charges Disclosure. Review the presence of legally required disclosures regarding automatic billing and charge timing.",
        steps:
          "1. Open the app.\n2. Read the subscription text or policy on the paywall screen.\n3. Check that disclosure that it renews automatically unless turned off at least 24h prior to current period ending.\n4. Check that disclosure that account is charged within 24h before end of period.",
        expected:
          "Both auto-renewal mechanism and 24-hour billing disclosure are visible during purchasing.",
        originalRef: "Disclosures",
      },
      {
        id: "iOS-SUB-6",
        gl: "GL-006",
        ref: "S.6",
        title:
          "Subscription Management & Disclaimers (Free Trial/Links). Verify management instructions, terms of use, privacy policy, and free trial forfeiture warnings are present.",
        steps:
          "1. Open the app.\n2. Check that the paywall states users can manage subscriptions in Apple Account Settings.\n3. Look for explicit terms of use (EULA) and privacy policy links.\n4. Check that statement that unused free trial portions are forfeited upon subscription purchase.",
        expected:
          "Links and management guidelines are easily readable directly on the paywall layout.",
        originalRef: "Disclosures",
      },
      {
        id: "iOS-SUB-7",
        gl: "GL-006",
        ref: "S.7",
        title:
          "Promoted In-App Purchases (IAP) & Policy Visibility. Confirm the subscription policy displays before initiating the App Store purchase flow.",
        steps:
          "1. Open the app.\n2. Trigger an in-app purchase scenario directly or simulate a promoted App Store launch.\n3. Check that that the subscription policy pop-up or screen is displayed first.",
        expected:
          "Policy details are shown immediately before launching native checkout.",
        originalRef: "Promo & Flow",
      },
    ],
  },
  android: {
    guidelines: [
      {
        id: "AGL-002",
        title: "Core App Functionality",
        description: "Android Core App Quality: Core App Functionality",
        category: "Core App Functionality",
        impact: "high",
      },
      {
        id: "AGL-003",
        title: "GPG Design Guidelines",
        description:
          "Google Play Games Design Guidelines & PC Compatibility Checkpoints",
        category: "GPG Design Guidelines",
        impact: "high",
      },
      {
        id: "AGL-004",
        title: "FTCs",
        description: "Basic Android Functionality&Best Practices guidelines",
        category: "FTCs",
        impact: "medium",
      },
      {
        id: "AGL-005",
        title: "Play Games Services",
        description: "Google Play Games Services requirements",
        category: "Play Games Services",
        impact: "medium",
      },
      {
        id: "AGL-006",
        title: "GPG Policies",
        description: "Google Play Games services policy compliance guidelines",
        category: "GPG Policies",
        impact: "high",
      },
      {
        id: "AGL-007",
        title: "Featuring tests",
        description: "Google Play featured status tests and guidelines",
        category: "Featuring tests",
        impact: "high",
      },
    ],
    testCases: [
      // Section: Navigation
      {
        id: "And-CAF-1.1",
        gl: "AGL-002",
        ref: "1.1",
        title:
          'App supports standard Back button navigation and does not make use of any custom, on-screen "Back button" prompts.',
        steps:
          '1. Open any sub-page or menu in the app.\n2. Tap the Android system Back button or perform the edge-swipe gesture.\n3. Verify if it returns you to the previous screen without encountering on-screen custom "Go Back" buttons.',
        expected:
          "Standard Back button logic is present without custom on-screen prompts.",
        originalRef: "Navigation",
      },
      {
        id: "And-CAF-1.2",
        gl: "AGL-002",
        ref: "1.2",
        title:
          "All dialogs are dismissible using the Gesture Navigation (Back button).",
        steps:
          "1. Click an action that pops up a dialog window or alert.\n2. Press the system Back button or perform the swipe gesture.\n3. Confirm that the dialog modal immediately dismisses.",
        expected: "Dialog dismisses when Back gesture is used.",
        originalRef: "Navigation",
      },
      {
        id: "And-CAF-1.3",
        gl: "AGL-002",
        ref: "1.3",
        title:
          "When the app is resumed from the Recents app switcher, the app should return the user to the exact state in which it was last used.",
        steps:
          "1. Locate a specific screen or type text into an input field in the app.\n2. Swipe up from the bottom (or press the square Recents button) to show the app switcher.\n3. Tap on another app, then switch back to this app.\n4. Check if you are returned exactly where you left off with your progress intact.",
        expected: "App returns to the exact previous state.",
        originalRef: "Navigation",
      },
      {
        id: "And-CAF-1.4",
        gl: "AGL-002",
        ref: "1.4",
        title:
          "When the app is resumed after the device wakes from the sleep (locked) state, the app should return the user to the exact state in which it was last used.",
        steps:
          "1. Navigate to any active screen inside the app.\n2. Press the power button on the side of your test device to lock the screen.\n3. Unlock the device immediately.\n4. Confirm that the app stays loaded on the same screen you were viewing.",
        expected: "App returns to the exact previous state.",
        originalRef: "Navigation",
      },
      {
        id: "And-CAF-1.5",
        gl: "AGL-002",
        ref: "1.5",
        title:
          "When the app is relaunched from Home or All Apps, it should do one of the following, depending on how much time has passed since it was last used.",
        steps:
          "1. Press the home button to minimize the app.\n2. Wait a few seconds, then tap the app icon on your home screen to launch it again.\n3. Wait a few hours (or force stop/clear memory to simulate a long period) and launch it again to make sure it loads gracefully.",
        expected:
          "App handles relaunching appropriately according to standard Android application lifecycles.",
        originalRef: "Navigation",
      },
      // Section: Notifications
      {
        id: "And-CAF-2.1",
        gl: "AGL-002",
        ref: "2.1",
        title:
          "Notifications are not used for cross-promotion or advertising another product, as this is strictly prohibited by the Play Store.",
        steps:
          "1. Trigger a notification from the app.\n2. Swipe down from the top panel to open the notification list.\n3. Carefully read the title and text to make sure there is NO advertisement or coupon code for separate products.",
        expected:
          "Notifications do not contain cross-promotion or advertising.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.2",
        gl: "AGL-002",
        ref: "2.2",
        title:
          "Notification channels are defined according to best practices, rather than serving all notifications from one channel.",
        steps:
          '1. Press and hold the app icon, then tap \'App Info\' (the "i" icon).\n2. Tap on \'Notifications\'.\n3. Review the list of notification categories (channels) to check that different alerts (like "Messages" vs "System") are split into separate toggles.',
        expected: "Notifications are appropriately separated into channels.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.3",
        gl: "AGL-002",
        ref: "2.3",
        title: "Selecting the correct notification priority.",
        steps:
          "1. Send various alerts to the device.\n2. Confirm that urgent alerts play a sound/popup at the top, while low-priority background alerts arrive silently.",
        expected:
          "Notification priorities are correctly assigned based on importance.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.4",
        gl: "AGL-002",
        ref: "2.4",
        title:
          "Multiple notifications are stacked into a single notification group, where possible.",
        steps:
          "1. Cause the app to send 4 or more notifications of the same kind.\n2. Pull down the status bar.\n3. Verify those notifications are bundled into a single expandable list with a summary count.",
        expected: "Notifications of the same type are grouped together.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.5",
        gl: "AGL-002",
        ref: "2.5",
        title: "Set timeouts for notifications where appropriate.",
        steps:
          "1. Start a time-sensitive feature in the app, like an active stopwatch or temporary invite.\n2. Reject/ignore the event or wait for it to expire.\n3. Ensure the notification fades out of the system bar on its own.",
        expected:
          "Notification disappears automatically when it is no longer relevant.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.6",
        gl: "AGL-002",
        ref: "2.6",
        title:
          "Notifications are persistent only if related to ongoing events, such as music playback or a phone call.",
        steps:
          "1. Confirm which notifications can't be cleared by swiping them away.\n2. Ensure these un-clearing alerts are only used when a real background service is active (like a music track playing or active map directions).",
        expected:
          "Persistent notifications are only used for legitimate ongoing background tasks.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.7",
        gl: "AGL-002",
        ref: "2.7",
        title:
          "For messaging apps, social apps and conversations: Use the MessagingStyle notifications for conversations.",
        steps:
          "1. Trigger a chat or conversational notification in the app.\n2. Expand the notification shade.\n3. Verify that the notification includes the sender's avatar, standard reply buttons, and readable inline logs.",
        expected:
          "Notification utilizes MessagingStyle to clearly show the sender and conversation context.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.8",
        gl: "AGL-002",
        ref: "2.8",
        title:
          "For messaging apps, social apps and conversations: Support the direct reply action.",
        steps:
          '1. Trigger a chat notification on the lockscreen or notification panel.\n2. Tap the inline "Reply" action button in the notification box.\n3. Type some text and press send, verified without opening the main app interface.',
        expected: "A direct reply inline action is available and functional.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.9",
        gl: "AGL-002",
        ref: "2.9",
        title:
          "For messaging apps, social apps and conversations: Support conversation shortcuts, and implement best practices for getting the best direct share ranking.",
        steps:
          '1. Open Google Chrome or another app, select any item and tap "Share".\n2. Look at the top row of the system share panel.\n3. Confirm that direct contacts from this app are recommended list.',
        expected:
          "Relevant conversation shortcuts appear in the direct share menu.",
        originalRef: "Notifications",
      },
      {
        id: "And-CAF-2.10",
        gl: "AGL-002",
        ref: "2.10",
        title:
          "For messaging apps, social apps and conversations: Support bubbles.",
        steps:
          '1. Receive an incoming chat message notification.\n2. Look for the small "Bubble" icon in the bottom-right corner of the alert.\n3. Tap it to see if the chat opens in a floating circle overlaying other applications.',
        expected:
          "The conversation can be opened successfully in a floating bubble.",
        originalRef: "Notifications",
      },
      // Section: UI and Graphics
      {
        id: "And-CAF-3.1",
        gl: "AGL-002",
        ref: "3.1",
        title:
          "The app supports both landscape and portrait orientations (if possible) and folding / unfolding.",
        steps:
          "1. Open any page inside the app.\n2. Rotate your phone sideways to landscape mode, then back to vertical portrait.\n3. On foldables, fold and unfold the device.\n4. Ensure the content adapts smoothly to the screen shape without overlaps.",
        expected:
          "Layout successfully adapts to both orientations and folds without UI distortion or freezing.",
        originalRef: "UI and Graphics",
      },
      {
        id: "And-CAF-3.2",
        gl: "AGL-002",
        ref: "3.2",
        title:
          "The app uses the whole screen in both orientations and does not letterbox to account for orientation changes, including folding and unfolding.",
        steps:
          "1. Switch the device to horizontal landscape and vertical portrait layouts.\n2. Check the edges around the screen.\n3. Make sure the background color fills the screen edge-to-edge and there are no solid black empty bars.",
        expected:
          "The application renders edge-to-edge across the entire screen area without artificial letterboxing.",
        originalRef: "UI and Graphics",
      },
      {
        id: "And-CAF-3.3",
        gl: "AGL-002",
        ref: "3.3",
        title:
          "The app correctly handles rapid transitions between display orientations and device folding / unfolding without rendering problems or losing state (Multi Tasking, Switching between the different apps).",
        steps:
          "1. Spin your test phone from vertical to horizontal and back 5 times quickly.\n2. Open split-screen multitasking with another app alongside it.\n3. Verify the app does not freeze, lose entered keyboard text, or force close.",
        expected:
          "Transitions are smooth, the UI state is perfectly preserved, and no rendering artifacts or crashes occur.",
        originalRef: "UI and Graphics",
      },
      // Section: Visual quality
      {
        id: "And-CAF-4.1",
        gl: "AGL-002",
        ref: "4.1",
        title:
          "The app displays graphics, text, images, and other UI elements without noticeable distortion, blurring, or pixelation.",
        steps:
          "1. Look closely at logos, vectors, illustrations, and user photos inside the app.\n2. Check for pixelation, blurriness, or weird stretching (wrong width/height aspect ratios).",
        expected:
          "All graphic elements and texts remain crisp, sharp, non-pixelated, and maintain correct aspect ratios.",
        originalRef: "Visual quality",
      },
      {
        id: "And-CAF-4.2",
        gl: "AGL-002",
        ref: "4.2",
        title:
          "The app displays text and text blocks in an acceptable manner for each of the app’s supported languages.",
        steps:
          "1. Open Android Settings and change the system language to Spanish, German, or any other supported language.\n2. Reopen the app and review text containers.\n3. Confirm sentences terminate gracefully without overlaying nearby buttons.",
        expected:
          "Text wraps naturally and is displayed correctly according to the typographical rules of each supported locale.",
        originalRef: "Visual quality",
      },
      {
        id: "And-CAF-4.3",
        gl: "AGL-002",
        ref: "4.3",
        title: "No cut-off letters or words are visible.",
        steps:
          "1. Go to Android Settings > Accessibility > Display size & text.\n2. Set Font Size to the MAXIMUM option.\n3. Return to the app and review all menus.\n4. Check that no words are cut off at the bottom or truncated with ugly ellipses.",
        expected:
          "All textual layouts dynamically scale or scroll without cutting off letters or words.",
        originalRef: "Visual quality",
      },
      {
        id: "And-CAF-4.4",
        gl: "AGL-002",
        ref: "4.4",
        title: "No improper word wraps within buttons or icons are visible.",
        steps:
          '1. Review call-to-action buttons and icon titles.\n2. Verify that short terms don\'t break awkwardly onto newline structures (for example, displaying "OK" over two lines with "O" and then "K").',
        expected:
          "Label text wraps properly without structural breaks within buttons or adjacent icon indicators.",
        originalRef: "Visual quality",
      },
      {
        id: "And-CAF-4.5",
        gl: "AGL-002",
        ref: "4.5",
        title:
          "There is sufficient spacing between text and surrounding elements.",
        steps:
          "1. Visually check margins and padding between texts and neighboring elements.\n2. Confirm that margins are consistent and that blocks are not squeezed tight up against screen borders.",
        expected:
          "Adequate text margins and line heights prevent crammed or overlapping elements.",
        originalRef: "Visual quality",
      },
      // Section: Accessibility
      {
        id: "And-CAF-5.1",
        gl: "AGL-002",
        ref: "5.1",
        title: "Touch targets should be at least 48dp in size.",
        steps:
          "1. Turn on Layout Bounds in Android Developer Options (or use accessibility testing overlays).\n2. Touch miniature icons, tiny checkboxes, and close symbols to verify they are easy to press with standard fingers without mis-clicking.",
        expected:
          "Every touchable element complies with the minimum 48dp standard to ensure clickability.",
        originalRef: "Accessibility",
      },
      {
        id: "And-CAF-5.2",
        gl: "AGL-002",
        ref: "5.2",
        title:
          "The sum of the values of android:paddingLeft, android:minWidth, and android:paddingRight is greater than or equal to 48dp.",
        steps:
          "1. For all clickable buttons and tabs, examine if the horizontal tap zone spans at least 48dp.\n2. Ensure thin icons have horizontal padding to broaden their active click area.",
        expected: "Combined horizontal targets measure 48dp or above.",
        originalRef: "Accessibility",
      },
      {
        id: "And-CAF-5.3",
        gl: "AGL-002",
        ref: "5.3",
        title:
          "The sum of the values of android:paddingTop, android:minHeight, and android:paddingBottom is greater than or equal to 48dp.",
        steps:
          "1. For compact buttons or small horizontal bars, check if the vertical tap zone spans at least 48dp.\n2. Ensure narrow items have vertical padding bounds to prevent accidental misses.",
        expected: "Combined vertical targets measure 48dp or above.",
        originalRef: "Accessibility",
      },
      {
        id: "And-CAF-5.4",
        gl: "AGL-002",
        ref: "5.4",
        title:
          "The app’s text and foreground content should maintain a high enough color contrast ratio with its background: 3.0:1 for large text / graphics, and 4.5:1 for small text (text smaller than 18pt or bold text smaller than 14pt).",
        steps:
          "1. Toggle between light and dark themes.\n2. Check light grey text, active links, and tags relative to the surrounding canvas color.\n3. Confirm that all paragraphs and headings stand out clearly and can be read effortlessly on both light and dark backgrounds.",
        expected:
          "Text layouts adhere strictly to the 4.5:1 and 3.0:1 contrast ceilings across both light and dark themes.",
        originalRef: "Accessibility",
      },
      {
        id: "And-CAF-5.5",
        gl: "AGL-002",
        ref: "5.5",
        title:
          "Describe each UI element, except for TextView, using content Description.",
        steps:
          '1. Turn on TalkBack in Android Settings under Accessibility.\n2. Navigate the screen using double-taps and swipes.\n3. Confirm that every button, status image, and input form is read aloud with a clear description, instead of just saying "Unlabelled button".',
        expected:
          "Non-text interactive or informational elements have clear content descriptions for screen reader accessibility.",
        originalRef: "Accessibility",
      },
      // Section: Audio
      {
        id: "And-CAF-6.1",
        gl: "AGL-002",
        ref: "6.1",
        title:
          "Audio resumes when the app returns to the foreground (open the app again through multitask window), or indicates to the user that playback is in a paused state.",
        steps:
          '1. Play any song or sound track within the app.\n2. Minimize the app, switch to another app, then return back to this app via the multitask screen.\n3. Verify that the audio either resumes playing sound immediately or clearly renders an ongoing, visible "Paused" icon.',
        expected:
          "Audio successfully resumes, or shows a distinct, user-controlled pause state when returning to the foreground.",
        originalRef: "Audio",
      },
      {
        id: "And-CAF-6.2",
        gl: "AGL-002",
        ref: "6.2",
        title:
          "The app should support background playback, If audio playback is a core feature (e.g. Music Player).",
        steps:
          "1. Start playing music or audio inside the app.\n2. Return to your phone's home screen or lock the screen.\n3. Verify that the sound continues playing and a system media player block appears in your notification drawer or lockscreen.",
        expected:
          "Core playbacks persist in background executing states with active system-level controls.",
        originalRef: "Audio",
      },
      {
        id: "And-CAF-6.3",
        gl: "AGL-002",
        ref: "6.3",
        title:
          "When the user initiates audio playback, the app should do one of the following within one second: Start playing the audio, or Provide a visual indicator that the audio data is being prepared.",
        steps:
          '1. Tap the "Play" button on an audio or video track.\n2. Verify that within 1 second, either the audio sound starts playing, or a clear progress loading circle/animated icon appears of what is preparing.',
        expected:
          "Audio starts playing immediately (under 1 second) or a loading state indicator appears to keep the user informed.",
        originalRef: "Audio",
      },
      {
        id: "And-CAF-6.4",
        gl: "AGL-002",
        ref: "6.4",
        title:
          "The app should request audio focus when audio starts playing and abandon audio focus when playback stops.",
        steps:
          "1. Start playing music in an external player (like Spotify), then play content in our app.\n2. Ensure Spotify immediately pauses as our app requests focus.\n3. Pause our app, open Spotify, and verify that Spotify can regain focus.",
        expected:
          "The application requests and releases standard Android system audio focus appropriately.",
        originalRef: "Audio",
      },
      {
        id: "And-CAF-6.5",
        gl: "AGL-002",
        ref: "6.5",
        title:
          "The app should handle other apps’ requests for audio focus. For example, an app might reduce playback volume when another app plays speech.",
        steps:
          "1. Start audio inside the app.\n2. Long-press the home button to summon Google Assistant so it starts listening.\n3. Ensure our app's audio volume temporarily ducks (lowers significantly) or pauses so you can hear the speech feedback clearly.",
        expected:
          "The app reacts correctly to transient or permanent loss of audio focus (such as ducking or pausing).",
        originalRef: "Audio",
      },
      // Section: Media
      {
        id: "And-CAF-7.1",
        gl: "AGL-002",
        ref: "7.1",
        title:
          "If the app plays audio in the background, it must create a Notification styled with Media Style.",
        steps:
          "1. Start playback in the app and minimize it to the background.\n2. Swipe down to open your notifications drawer.\n3. Confirm that a standard Media notification is shown (featuring album art, play/pause buttons, and a draggable progress line).",
        expected:
          "A system media notification featuring active playback controls, track details, album art, and seek bars is shown.",
        originalRef: "Media",
      },
      {
        id: "And-CAF-7.2",
        gl: "AGL-002",
        ref: "7.2",
        title:
          "If the app plays video, it should support picture-in-picture playback.",
        steps:
          "1. Play any video in the video player screen.\n2. Swipe up to return Home.\n3. Confirm that the video shrinks into a resizable, draggable floating window on your home screen and continues to play.",
        expected:
          "Video continues playback in a resizable, drag-and-drop Picture-in-Picture window without freeze frames.",
        originalRef: "Media",
      },
      {
        id: "And-CAF-7.3",
        gl: "AGL-002",
        ref: "7.3",
        title:
          "If the app encodes video, it should do so using the HEVC video compression standard.",
        steps:
          "1. Record or export a short video in the app.\n2. Open your device files app, select the video, and tap details.\n3. Verify that the video is encoded in HEVC / H.265 compression format for lightweight file sizes.",
        expected:
          "Video files are compressed using efficient modern HEVC standard formats by default.",
        originalRef: "Media",
      },
      {
        id: "And-CAF-7.4",
        gl: "AGL-002",
        ref: "7.4",
        title:
          'The app should use the "Android Share sheet" when sharing content.',
        steps:
          '1. Click any "Share" button inside the app.\n2. Verify it prompts the native Android share window (with contacts row, copy button, and standard app icons) rather than listing them on a custom menu.',
        expected:
          "App initiates standard Android Share sheet dialogues with quick target icons and direct share targets.",
        originalRef: "Media",
      },
      // Section: Background Services
      {
        id: "And-CAF-8.1",
        gl: "AGL-002",
        ref: "8.1",
        title:
          "The app should avoid running unnecessarily long services in the background, To ensure that system applies various restrictions on background services. \nThese are not considered good uses of background services.\n- Maintaining a network connection for notifications\n- Maintaining a Bluetooth connection\n- Keeping the GPS powered-on",
        steps:
          "1. Check if the app runs any long continuous services in the background.\n2. Verify the application does NOT remain continuously active in the background for things like:\n- Keeping open persistent web connections for push alerts (should use standard Firebase Cloud Messaging)\n- Maintaining ongoing Bluetooth scans\n- Keeping GPS turned on when closed.",
        expected:
          "No long background processes are scheduled for standard socket, Bluetooth loop, or persistent geolocation connections, conforming properly to background execution limits.",
        originalRef: "Background Services",
      },
      // Section: Performance and stability
      {
        id: "And-CAF-9.1",
        gl: "AGL-002",
        ref: "9.1",
        title:
          "App does not crash, force close, freeze, or otherwise function abnormally (ANR - Application Not Responding) on any targeted device.",
        steps:
          '1. Navigate through all screens of the app continuously, tapping buttons and typing comments.\n2. Double-check that you encounter no forced closed dialogs, infinite loaders, or "App Not Responding" sluggish screens.',
        expected:
          "The app handles unexpected inputs gracefully without thread hangs, ANR, or crashes.",
        originalRef: "Performance and stability",
      },
      {
        id: "And-CAF-9.2",
        gl: "AGL-002",
        ref: "9.2",
        title:
          "App loads quickly or provides onscreen feedback to the user (a progress indicator or similar cue) if the app takes longer than two seconds to load.",
        steps:
          "1. Force close the app and re-open it.\n2. Watch the initial screen carefully. If it takes longer than 2 seconds to display the home dashboard, ensure there is an active progress spinner or loading indicator to inform you of the wait.",
        expected:
          "Initialization is near instant, or loading screens show real-time progress indicators.",
        originalRef: "Performance and stability",
      },
      {
        id: "And-CAF-9.3",
        gl: "AGL-002",
        ref: "9.3",
        title:
          "Apps should render frames every 16ms to achieve 60 frames per second. Developers can use the Profile HWUI rendering option in testing.",
        steps:
          '1. Go to developer settings and turn on "Profile HWUI Rendering" (displays as a colored graph outline on the screen).\n2. Scroll rapidly through lists and slide pages back and forth.\n3. Watch the graph level; verify that almost all frame spikes remain under the horizontal green line (indicating 16ms limit) to maintain fluidity.',
        expected:
          "Layout structures avoid frame drops or excessive layouts, maintaining smooth 60fps scrolling animations.",
        originalRef: "Performance and stability",
      },
      {
        id: "And-CAF-9.4",
        gl: "AGL-002",
        ref: "9.4",
        title:
          "With StrictMode enabled (see StrictMode Testing, below), no red flashes (performance warnings from StrictMode) are visible when testing the app. Any red flashes indicate bad behaviors regarding storage, network access, or memory leaks, including during game play, animations and UI transitions, and any other part of the app.",
        steps:
          "1. Test the developer version of the app with StrictMode toggled on.\n2. Read, save, or retrieve info from database sheets inside the app.\n3. Ensure that screen borders NEVER flash red (which indicates bad main-thread slowdowns standard file operations).",
        expected:
          "Main thread stays lean, blocking Disk/Net access is delegated to worker pools, resulting in zero red StrictMode flash boundaries.",
        originalRef: "Performance and stability",
      },
      // Section: SDK
      {
        id: "And-CAF-10.1",
        gl: "AGL-002",
        ref: "10.1",
        title:
          "The app runs on the latest public version of the Android platform without crashing or loss of core function.",
        steps:
          "1. Install the app on a phone running the newest public version of Android.\n2. Verify that there are no app crashes, visual offsets, or system dialog interferences.",
        expected:
          "No unexpected exception occurs, and the user interface responds perfectly.",
        originalRef: "SDK",
      },
      {
        id: "And-CAF-10.2",
        gl: "AGL-002",
        ref: "10.2",
        title:
          "The app targets the latest SDK by setting the targetSdk value to minimize the use of any platform-provided compatibility fallbacks.",
        steps:
          '1. Open build.gradle or app build configurations.\n2. Check the "targetSdk" attribute.\n3. Make sure it matches the latest officially required Android version level.',
        expected: "The app sets its target SDK to the latest public level.",
        originalRef: "SDK",
      },
      {
        id: "And-CAF-10.3",
        gl: "AGL-002",
        ref: "10.3",
        title:
          "The app is built with the latest SDK by setting the compileSdk value.",
        steps:
          '1. Open build.gradle or app files.\n2. Verify that the "compileSdk" parameter matches the latest required Android version.',
        expected: "Compilation aligns with the latest SDK capabilities.",
        originalRef: "SDK",
      },
      {
        id: "And-CAF-10.4",
        gl: "AGL-002",
        ref: "10.4",
        title:
          "Any Google or third-party SDKs used are up-to-date. Any improvements to these SDKs, such as stability, compatibility, or security, should be available to users in a timely manner.",
        steps:
          "1. Scan through the dependencies listed in gradle or packages configuration.\n2. Ensure that no libraries are labeled as out-of-date or vulnerable, and that Google libraries are updated to modern releases.",
        expected:
          "No vulnerable, deprecated, or drastically outdated third party SDK blocks are present.",
        originalRef: "SDK",
      },
      {
        id: "And-CAF-10.5",
        gl: "AGL-002",
        ref: "10.5",
        title: "The app does not use non-SDK interfaces.",
        steps:
          "1. Run compatibility analyzer scans or scan package imports.\n2. Confirm that the application doesn't call system methods that are marked private or restricted in the Android source code.",
        expected:
          "Solely public standard SDK classes and interfaces are called, avoiding unsupported hidden components.",
        originalRef: "SDK",
      },
      {
        id: "And-CAF-10.6",
        gl: "AGL-002",
        ref: "10.6",
        title:
          "No debug libraries are included in the production app. This can cause performance as well as security issues.",
        steps:
          "1. Open the project configuration or generate a release APK.\n2. Check that debugging packages (for example, LeakCanary or developer console bridges) are excluded from the release build structure.",
        expected:
          "Production assemblies exclude all developer-focused instrumentation or logging bridges.",
        originalRef: "SDK",
      },
      // Section: Battery
      {
        id: "And-CAF-11.1",
        gl: "AGL-002",
        ref: "11.1",
        title:
          "App supports power management features in Android 6.0+ (Doze and App Standby) properly. In the case where core functionality is disrupted by power management, only qualified apps may request an exemption.",
        steps:
          '1. Connect your phone to adb and force the device into Doze mode while standard tasks are scheduled (with: adb shell dumpsys deviceidle force-idle).\n2. Verify that the app pauses tasks gracefully, uses standard WorkManager, and does not popup asking the user for "Ignore Battery Optimization" system exemptions.',
        expected:
          "The app behaves efficiently during Doze boundaries without custom exemption policies.",
        originalRef: "Battery",
      },
      // Section: Google Play
      {
        id: "And-CAF-12.1",
        gl: "AGL-002",
        ref: "12.1",
        title:
          "App strictly adheres to the terms of the Google Play Developer Content Policy and does not offer inappropriate content, does not use intellectual property or brand of others, and so on.",
        steps:
          "1. Open the app and tap through every screen, setting, and disclaimer.\n2. Confirm that there is NO offensive imagery, hate speech, or adult content.\n3. Make sure the app does not display trademarked logos or copy names of popular competitor apps without written permission.",
        expected:
          "The app contains policy-compliant material and respects third-party intellectual property.",
        originalRef: "Google Play",
      },
      {
        id: "And-CAF-12.2",
        gl: "AGL-002",
        ref: "12.2",
        title:
          'App maturity level is set appropriately, based on the Content Rating Guidelines. Especially, note that apps that request permission to use the device location cannot be given the maturity level "Everyone".',
        steps:
          "1. Check if the app prompts you for GPS / Location access anywhere.\n2. Log in to the Google Play Console, click on your app project, and open 'App Content' > 'Content Rating'.\n3. Verify that if location access is requested, the minimum age level is NOT rated as 'Everyone' (3+ or 0+).",
        expected:
          "Maturity level rating corresponds correctly with the user location data collection settings.",
        originalRef: "Google Play",
      },
      {
        id: "And-CAF-12.3",
        gl: "AGL-002",
        ref: "12.3",
        title:
          "App feature graphic follows the guidelines. Make sure that:\n* The app listing includes a high-quality feature graphic.\n* The feature graphic does not contain device images, screenshots, or small text that will be illegible when scaled down and displayed on the smallest screen size that your app is targeting.\n* The feature graphic does not resemble an advertisement.",
        steps:
          "1. Locate the 1024x500 Feature Graphic uploaded on the Google Play Store console.\n2. Spot-check that the design holds premium resolution without visible pixels.\n3. Verify there are NO mock phone screens, actual app screenshots, or tiny hard-to-read text words.\n4. Check that it doesn't look like an ad (no pricing tags, flash promo words, or discount stickers).",
        expected:
          "Feature graphic is clean, readable on small screens, and avoids device templates or promotional copy.",
        originalRef: "Google Play",
      },
      {
        id: "And-CAF-12.4",
        gl: "AGL-002",
        ref: "12.4",
        title:
          "App screenshots and videos do not show or reference non-Android devices.",
        steps:
          "1. Open the app's public store listing page.\n2. Look closely at Google Play carousel screenshots and the promo video.\n3. Confirm that no screenshots display iPhone physical shapes (like a dynamic island), Apple battery indicator icons, or iOS layout designs.",
        expected:
          "Promotional listing assets show neutral frames or Android system indicators exclusively.",
        originalRef: "Google Play",
      },
      {
        id: "And-CAF-12.5",
        gl: "AGL-002",
        ref: "12.5",
        title:
          "App screenshots or videos do not represent the content and experience of your app in a misleading way.",
        steps:
          "1. Inspect all screenshots and preview clips on the Play Store page.\n2. Compare what is displayed in those materials to the actual features of the physical app in front of you.\n3. Verify that no custom simulated graphics or mock features are shown that are missing in the real app build.",
        expected:
          "Store marketing media represents the actual operational build and capabilities truthfully.",
        originalRef: "Google Play",
      },
      {
        id: "And-CAF-12.6",
        gl: "AGL-002",
        ref: "12.6",
        title:
          "Common user-reported bugs in the Reviews tab of the Google Play page are addressed if they are reproducible and occur on many different devices. If a bug occurs on only a few devices, you should still address it if those devices are particularly popular or new.",
        steps:
          "1. Go to the Play Store Reviews dashboard and filter for public '1-star' and '2-star' ratings.\n2. Scan for recent reports of freezes, broken buttons, or screen overlap on popular phones (like Samsung S-series or Pixels).\n3. Re-create those exact scenarios on your physical test device.\n4. Verify that the bugs have been fully fixed and clean workflows are maintained.",
        expected:
          "Widespread or critical device-specific user issues are resolved in the latest application build.",
        originalRef: "Google Play",
      },
      // Section: Test Procedures
      {
        id: "And-CAF-13.1",
        gl: "AGL-002",
        ref: "13.1",
        title:
          "Navigate to all parts of the app — all screens, dialogs, settings, and all user flows.\n* If the application allows for editing or content creation, game play, or media playback, make sure to test those flows.\n* While testing the app, introduce interruptions from other apps, such as receiving a notification or a phone call; and apply transient changes to device attributes, such as network connectivity, battery function, GPS availability, and system load.\n* Enter and test all in-app purchase flows",
        steps:
          "1. Tap on every menu button and settings tab to browse all screens and dialog boxes in the application.\n2. Try modifying data, playing music or mini-games if active.\n3. Swipe the quick-settings panel to toggle Wi-Fi off and back on during tasks, or simulate a call/notification interruption.\n4. Open and navigate through any in-app purchase screens to ensure the full shopping layouts function correctly.",
        expected:
          "All major screen flows, child screens, dynamic settings, and purchase states load cleanly under interruption.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.2",
        gl: "AGL-002",
        ref: "13.2",
        title:
          "From each app screen, press the device's Home key or swipe up in gesture navigation, then re-launch the app from the All Apps screen.",
        steps:
          "1. Choose any page inside the application.\n2. Tap the device's main Home key or perform an upward-swipe overlay gesture to minimize the app.\n3. Open your phone's full application list drawer.\n4. Scroll and tap our app icon to launch it again.\n5. Verify that it initializes seamlessly without freezing or blank states.",
        expected:
          "The app resumes beautifully and displays the correct active layout.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.3",
        gl: "AGL-002",
        ref: "13.3",
        title:
          "From each app screen, switch to another running app, and then return to the app under test using the Recents app switcher.",
        steps:
          "1. Navigate to a deep screens view in the application.\n2. Tap the Recents box key (or swipe-and-hold from the bottom margin) to bring up standard multitasking.\n3. Open another running app, then quickly switch back to this app again from the Recents menu.\n4. Confirm that the app stays on the active screen with no lost state.",
        expected:
          "The user is returned exactly where they left off with no layout freezing.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.4",
        gl: "AGL-002",
        ref: "13.4",
        title:
          "From each app screen (and dialogs), press the Back button or use the back swipe gesture.",
        steps:
          "1. Trigger any active child alert pop-up, keyboard state, or inner page.\n2. Perform the Android system Back navigation swipe or press the Back key.\n3. Verify the active elements / dialog container dismisses as expected and takes you back to the prior view.",
        expected:
          "The system Back action operates uniformly without crashing or creating infinite cycles.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.5",
        gl: "AGL-002",
        ref: "13.5",
        title:
          "From each app screen, rotate the device between landscape and portrait orientation and folding / unfolding at least three times.",
        steps:
          "1. Open any input page or dashboard layout inside the app.\n2. Turn your test device from vertical (portrait) to wide (landscape) and back 3 times in quick succession.\n3. Fold and unfold collapsible phone panels if available.\n4. Confirm that content elements adapt gracefully without text overlays or buttons clipping.",
        expected:
          "Layout coordinates adapt smoothly to orientation shifts and fold changes without breaking user input.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.6",
        gl: "AGL-002",
        ref: "13.6",
        title:
          "Switch to another app to send the test app into the background. Go to Settings and check whether the test app has any services running while in the background",
        steps:
          "1. Leave the app running in the background by home-keying out.\n2. Go to Android Settings > Developer Options > Running Services.\n3. Scan the active packages checklist.\n4. Confirm that our package name isn't locking continuous network/scans unless actively expected.",
        expected:
          "Background services stay completely dormant when the application is minimized.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.7",
        gl: "AGL-002",
        ref: "13.7",
        title:
          "Press the power button to put the device to sleep, then press the power button again to wake the screen.",
        steps:
          "1. Leave the app visible on screen.\n2. Tap the physical Power button on the side of your test mobile to put the display to sleep.\n3. Wait 3 seconds, then click Power again to light up the display.\n4. Unlock the display and confirm the app remains active at the same place.",
        expected:
          "Device power sleep events do not cause memory-refresh loss or app closures.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.8",
        gl: "AGL-002",
        ref: "13.8",
        title:
          "Set up a screen lock on the device. Press the power button to put the device to sleep (which locks the device). Then, press the power button again to wake the screen and unlock the device.",
        steps:
          "1. Configure any secure screen lock (pattern, bio, PIN) in Android Settings.\n2. Switch to our open application.\n3. Press the physical Power button to sleep and lock your phone.\n4. Press Power again, clear the password prompt screen, and ensure the app is open right where you left off.",
        expected: "The app resumes perfectly after lockscreen authentication.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.9",
        gl: "AGL-002",
        ref: "13.9",
        title:
          "Trigger and observe in the notifications drawer all types of notifications that the app can display. Expand notifications where applicable",
        steps:
          "1. Trigger various types of push messages or reminders from the app.\n2. Slide down to pull open your Android notification tray.\n3. Touch the small expansion chevron in the top-right corner of the alert.\n4. Verify that the larger view exhibits perfectly wrapping text and clear buttons.",
        expected:
          "The notifications present legible details and expand easily inside the drawer.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.10",
        gl: "AGL-002",
        ref: "13.10",
        title:
          "Review the Android manifest file and build configuration to ensure that the application is built against the latest available SDK (targetSdk and compileSdk).",
        steps:
          "1. Locate 'AndroidManifest.xml' and 'build.gradle' files in your Android project files explorer.\n2. Read the properties matching 'targetSdk' and 'compileSdk'.\n3. Check Google's latest recommended API levels on the developer portal to make sure there are no out-of-date settings.",
        expected:
          "Target properties align with modern Google Play rules and requirements.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.11",
        gl: "AGL-002",
        ref: "13.11",
        title: "Review the build.gradle file for any outdated dependencies.",
        steps:
          "1. Inspect 'build.gradle' dependencies under compilation setups.\n2. Run a standard gradle command or hover indicators to search for deprecated version lines.\n3. Ensure libraries aren't marked as vulnerable or drastically behind.",
        expected: "Package arrays reflect stable and updated API integrations.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.12",
        gl: "AGL-002",
        ref: "13.12",
        title:
          "Use the Android Studio lint tool to detect non-SDK interface usage",
        steps:
          "1. Head to the top menu of Android Studio and select 'Analyze' > 'Inspect Code...'.\n2. Run a full suite inspection over the whole project workspace.\n3. Look for private API usage warnings inside the results report console.",
        expected:
          "No warnings of restricted non-SDK implementation blocks are reported.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.13",
        gl: "AGL-002",
        ref: "13.13",
        title: "Review all data stored in external storage.",
        steps:
          "1. Connect your device or open Android Studio's 'Device File Explorer'.\n2. Navigate to external storage directories like '/sdcard' or '/storage/emulated/0/'.\n3. Review the saved folders and files created by this app package.\n4. Confirm that user settings, passwords, or diagnostic files are completely private.",
        expected:
          "Unencrypted personal records or private tokens are never stored on public storage partitions.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.14",
        gl: "AGL-002",
        ref: "13.14",
        title:
          "Review all content providers defined in the Android manifest file. Make sure each provider has an appropriate protectionLevel.",
        steps:
          "1. Scan the contents of 'AndroidManifest.xml'.\n2. Locate all '<provider>' tags.\n3. Verify that if 'android:exported' is set to 'true', it has secure read/write permission levels to block foreign access.",
        expected:
          "Data content providers prevent leaking sensitive databases to third-party programs.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.15",
        gl: "AGL-002",
        ref: "13.15",
        title:
          "Review all permissions that your app requires, in the manifest file, at runtime, and in the app settings screen (Settings > App Info) on the device.",
        steps:
          "1. Verify permissions requested inside 'AndroidManifest.xml'.\n2. Navigate through the software on a fresh install and trigger dialog request popups.\n3. Head to Settings > Apps > App Info > Permissions.\n4. Double-check that no unneeded permissions have been left enabled in production.",
        expected:
          "The app limits itself strict to essential permissions and gracefully handles users declining access.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.16",
        gl: "AGL-002",
        ref: "13.16",
        title:
          "Review all application components defined in the Android manifest file for the appropriate export state.",
        steps:
          "1. Examine 'AndroidManifest.xml' contents systematically.\n2. Look up all '<activity>', '<service>', and '<receiver>' targets.\n3. Confirm that 'android:exported' is explicitly marked as 'false' unless it needs to receive broad system alerts or launches from the home screen.",
        expected:
          "Intra-app actions are secured to prevent malicious background launches.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.17",
        gl: "AGL-002",
        ref: "13.17",
        title: "For each WebView, navigate to a page that requires JavaScript.",
        steps:
          "1. Click on components that launch nested layout browsers (WebViews) inside the app.\n2. Direct the browser link toward a page relying heavily on modern interactive scripts.\n3. Verify that scrolling elements, sliders, and form components react and render properly.",
        expected:
          "Embedded WebViews parse JavaScript correctly and dynamically.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.18",
        gl: "AGL-002",
        ref: "13.18",
        title:
          "In each WebView, attempt to navigate to sites and content that aren’t loaded directly by your app.",
        steps:
          "1. Access an active WebView screen inside your app build.\n2. Tap an external redirect hyperlink or button.\n3. Confirm that the application intercepts this click and hands it off to an external web browser application, rather than opening outside content inside your protected app container.",
        expected:
          "WebViews securely delegate foreign domain targets to the Android system browser.",
        originalRef: "Test Procedures",
      },
      {
        id: "And-CAF-13.19",
        gl: "AGL-002",
        ref: "13.19",
        title:
          "Run the application and exercise all core functionality, while observing the device log. No private user information should be logged.",
        steps:
          "1. Plug your device into Android Studio or run standard adb logging.\n2. Stream continuous diagnostic logs ('Logcat') on screen.\n3. Perform basic tasks in the app like typing account names, logging in, or uploading content.\n4. Carefully inspect the logs to check that no confidential coordinates or passwords are listed.",
        expected:
          "Diagnostics are strictly sanitized of identifiable human user parameters.",
        originalRef: "Test Procedures",
      },
      // Section: APK Related Tests
      {
        id: "And-CAF-14.1",
        gl: "AGL-002",
        ref: "14.1",
        title:
          "Check that the app’s install size (APK/AAB base download) is under 100 MB when built for release.",
        steps:
          "1. Open Android Studio and select 'Build' > 'Generate Signed Bundle / APK...'.\n2. Compile a Release build (APK or Android App Bundle) of your app.\n3. Locate the completed compilation file (.apk or .aab) inside your build/outputs directory.\n4. Right-click the file and click 'Properties' (or 'Get Info' on macOS) to read its total file size.\n5. Verify that this file size reads less than 100 MB.",
        expected:
          "The build artifact size is confirmed to be under the 100 MB release limit for standard downloads.",
        originalRef: "APK Related Tests",
      },
      {
        id: "And-CAF-14.2",
        gl: "AGL-002",
        ref: "14.2",
        title:
          "The build size should be lower than 150 MB for the app generated from App Bundles",
        steps:
          "1. Open the Google Play Console page and select your app package.\n2. Navigate to 'Release' > 'App bundle explorer' in the left-hand navigation pane.\n3. Upload your production AAB file or select the active draft.\n4. Read the 'Compressed download size' estimate calculated by the Play Console.\n5. Double-check that it does not exceed 150 MB.",
        expected:
          "The final generated App Bundle delivery size is checked online and is strictly below 150 MB.",
        originalRef: "APK Related Tests",
      },
      {
        id: "And-CAF-14.3",
        gl: "AGL-002",
        ref: "14.3",
        title: "Application uses a single build for all Screen Types.",
        steps:
          "1. Review your build.gradle configuration file and check if there are any custom 'splits' for screen densities activated.\n2. Verify that you compile and release a single, universal APK/AAB build containing assets/layouts for all screen types.\n3. Test the same universal install file on both a small-screen smartphone and a broad tablet to confirm identical functionality.",
        expected:
          "A single universal build file is verified to package resources for all Android screen form factors.",
        originalRef: "APK Related Tests",
      },
      {
        id: "And-CAF-14.4",
        gl: "AGL-002",
        ref: "14.4",
        title:
          "Builds are created for every Screen Type (Small, Normal, Large and Extra Large).",
        steps:
          '1. Check the \'src/main/res/\' directory in your Android project explorer layout.\n2. Verify the existence of resource folders or responsive layouts for directories matching screen groupings (such as mdpi/hdpi for normal/small screens, and xhdpi/xxhdpi or sw600dp for large/extra large layouts like tablets).\n3. Install the app on four separate emulators running: Small (e.g. 2.7"), Normal (e.g. 5.1"), Large (e.g. 7" tablet), and Extra Large (e.g. 10" tablet).\n4. Walk through the main page on each emulator to ensure no layouts or assets fail to load.',
        expected:
          "The app successfully loads appropriate and legible resources on Small, Normal, Large, and Extra Large emulator options.",
        originalRef: "APK Related Tests",
      },
      {
        id: "And-CAF-14.5",
        gl: "AGL-002",
        ref: "14.5",
        title:
          "APK signature check (application can not be updated if different signature is used for signing the  updated build).",
        steps:
          "1. Build an update version of the application package signed with a different debug or release key than the currently installed version.\n2. Plug in your test phone and send the new update package to the device using 'adb install -r path/to/mismatched_signed_apk'.\n3. Verify that the Android system refuses to update the app, printing a signature mismatch installation error like 'INSTALL_FAILED_UPDATE_INCOMPATIBLE'.\n4. Re-sign the update package with the original matching production key and verify that it installs successfully over the existing app.",
        expected:
          "The system security rules block mismatched signature updates, preventing unauthorized app overwrites.",
        originalRef: "APK Related Tests",
      },
      // Section: GPG Design Guidelines - Style
      {
        id: "And-GPG-1.1",
        gl: "AGL-003",
        ref: "1.1",
        title:
          "Android powers hundreds of millions of phones, tablets, and other devices in a wide variety of screen sizes and form factors. By taking advantage of Android's flexible layout system, you can create apps that gracefully scale from large tablets to smaller phones.",
        steps:
          "1. Open the application on multiple devices of varying sizes (e.g., small phones, large tablets, and foldables).\n2. Rotate the device to monitor layout adaptation.\n3. Verify that visual elements resize and reposition dynamically without overlapping or breaking layout constraints.",
        expected:
          "The application utilizes a flexible layout system that scales seamlessly across all target screen sizes and form factors.",
        originalRef: "Style",
      },
      {
        id: "And-GPG-1.2",
        gl: "AGL-003",
        ref: "1.2",
        title:
          "Android themes apply a consistent visual style to an app or activity by defining UI properties like color, height, padding, and font size.",
        steps:
          "1. Navigate through all screens of the application.\n2. Compare UI attributes such as brand colors, touch margins, padding blocks, and typography weights.\n3. Confirm that a unified theme is consistently applied across the entire app hierarchy.",
        expected:
          "A cohesive visual theme is maintained universally across all application views and activities.",
        originalRef: "Style",
      },
      {
        id: "And-GPG-1.3",
        gl: "AGL-003",
        ref: "1.3",
        title:
          "Use illumination and dimming to respond to touches, reinforce the resulting behaviors of gestures, and indicate what actions are enabled and disabled.",
        steps:
          "1. Press interactive UI elements like buttons, cards, and tabs.\n2. Verify that focus, hover, press, and drag actions trigger immediate illumination/dimming changes or ripple visual effects.\n3. Disable specific buttons and ensure they visually dim to represent inactive states.",
        expected:
          "The interface provides clear responsive visual feedback for active, hovered, pressed, and disabled states.",
        originalRef: "Style",
      },
      {
        id: "And-GPG-1.4",
        gl: "AGL-003",
        ref: "1.4",
        title:
          "Optimize your application's UI by designing alternative layouts for some of the different size buckets, and provide alternative bitmap images for different density buckets.",
        steps:
          "1. Review the resource structure in the codebase (e.g., mdpi, hdpi, xhdpi folders/buckets).\n2. Test on low-density vs. high-density emulator screens to verify image resolution.\n3. Verify layout configurations switch to optimized tablet-specific structures on large screens.",
        expected:
          "Alternative layouts and density-specific bitmap resources are optimized for each device resolution bucket.",
        originalRef: "Style",
      },
      {
        id: "And-GPG-1.5",
        gl: "AGL-003",
        ref: "1.5",
        title:
          "An icon is a graphic that takes up a small portion of screen real estate and provides a quick, intuitive representation of an action, a status, or an app. You should follow the 2:3:4:6:8 scaling ratio between the five primary densities (medium, high, x-high, xx-high, and xxx-high respectively).",
        steps:
          "1. Access the assets directory for graphic icons in the source project.\n2. Measure the dimension size scaling of individual icon versions across mdpi (1x), hdpi (1.5x), xhdpi (2x), xxhdpi (3x), and xxxhdpi (4x).\n3. Confirm that they precisely match the official 2:3:4:6:8 ratio.",
        expected:
          "All bitmap icons follow the standard 2:3:4:6:8 scaling ratio across critical density buckets for crisp rendering.",
        originalRef: "Style",
      },
      // Section: GPG Design Guidelines - Patterns
      {
        id: "And-GPG-2.1",
        gl: "AGL-003",
        ref: "2.1",
        title:
          "Consistent navigation is an essential component of the overall user experience. Few things frustrate users more than basic navigation that behaves in inconsistent and unexpected ways. Android 3.0 introduced significant changes to the global navigation behavior. Thoughtfully following the guidelines for Back and Up will make your app's navigation predictable and reliable for your users.",
        steps:
          "1. Navigate deep into the navigation hierarchy or game screens.\n2. Trigger the Back gesture or hardware Back button repeatedly.\n3. Observe the screen-by-screen reverse transition path, and check if Up button navigates cleanly to the parent category.",
        expected:
          "Navigation behaves in an expected, predictable, and consistent manner matching standard guidelines.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.2",
        gl: "AGL-003",
        ref: "2.2",
        title:
          "Hardware back button dismisses floating windows (dialogs, popups)",
        steps:
          "1. Open a dialog box, detailed popup window, or modal within any game screen.\n2. Press the hardware/system Back gesture/button.\n3. Verify that the floating window is dismissed immediately without changing the screen behind it.",
        expected:
          "The dialog or popup closes instantly upon detecting the hardware Back command.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.3",
        gl: "AGL-003",
        ref: "2.3",
        title:
          "Hardware back button dismisses contextual action bars, and removes the highlight from the selected items",
        steps:
          "1. Choose one or more items to highlight and trigger a contextual action bar header.\n2. Tap the hardware Back button.\n3. Check that the contextual header overlay is removed and highlights are deselected immediately.",
        expected:
          "Contextual states are cleared and highlights are removed upon Back gesture invocation.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.4",
        gl: "AGL-003",
        ref: "2.4",
        title: "Hardware back button hides the onscreen keyboard",
        steps:
          "1. Select a text input field to open the onscreen mobile keyboard.\n2. Press the hardware Back option/gesture.\n3. Verify that the onscreen keyboard retracts/hides immediately from the display view.",
        expected:
          "The software/onscreen keyboard is dismissed cleanly when Back is pressed.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.5",
        gl: "AGL-003",
        ref: "2.5",
        title:
          "Some content is best experienced full screen, like videos, games, image galleries, books, and slides in a presentation. You can engage users more deeply with content in full screen by minimizing visual distraction from app controls and protecting users from escaping the app accidentally.",
        steps:
          "1. Launch media, cinematic scenes, or gameplay view inside the app.\n2. Verify the screen automatically hides system bars (status bar, navigation bar) to focus on full-screen rendering.\n3. Ensure system bars can be easily revealed via standard edge swipes without causing accidental page escape.",
        expected:
          "Application transitions to a polished immersive full-screen layout containing no visual layout visual noise.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.6",
        gl: "AGL-003",
        ref: "2.6",
        title:
          "In some situations, when a user invokes an action in your app, it's a good idea to confirm or acknowledge that action through text.",
        steps:
          "1. Initiate important actions (like resource creation, state modifications, or resets).\n2. Verify a small toast, confirmation prompt, or feedback text message temporarily alerts the user of success.",
        expected:
          "Clear user-facing text confirmations acknowledge all major user-triggered actions.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.7",
        gl: "AGL-003",
        ref: "2.7",
        title:
          "The notification system allows users to keep informed about relevant and timely events in your app, such as new chat messages from a friend or a calendar event. Think of notifications as a news channel that alerts the user to important events as they happen or a log that chronicles events while the user is not paying attention—and one that is synced as appropriate across all their Android devices.",
        steps:
          "1. Trigger key milestones, friend updates, or live events in background states.\n2. Check if a notification is neatly posted to the Android notification drawer.\n3. Verify notification states are properly synced across additional device screens.",
        expected:
          "Notifications act as a reliable chronological log alerting users to essential events.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.8",
        gl: "AGL-003",
        ref: "2.8",
        title:
          "Triggered notifications are mapped to essential and frequent events in the game",
        steps:
          "1. Play through typical user cycles in standard game flows.\n2. Check the rate and contextual importance of push notifications delivered to the device drawer.\n3. Verify that non-essential or overly spammy marketing events do not trigger system alerts.",
        expected:
          "Notifications correspond exclusively to important game-related events and updates.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.9",
        gl: "AGL-003",
        ref: "2.9",
        title:
          "The notifications allow the user to accomplish some task quickly",
        steps:
          "1. Trigger an active task alert in the notification shade (e.g., chat reply, invite accept).\n2. Look for quick-action buttons (e.g. 'Reply', 'Join Now') on the custom push panel.\n3. Click the interactive action and verify the action completes immediately without fully loading the app container.",
        expected:
          "Direct action items on notifications allow swift task completion without layout bottlenecks.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.10",
        gl: "AGL-003",
        ref: "2.10",
        title:
          "Icon in notification area is distinct from other Android system icons",
        steps:
          "1. Trigger an active alert to view the notification icon inside the system status header.\n2. Inspect design assets and verify that they represent a distinct brand silhouette of your specific app.",
        expected:
          "The notification icon stands out clearly, avoiding confusion with system indicators like battery or signal status.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.11",
        gl: "AGL-003",
        ref: "2.11",
        title:
          "Icon in notification area is simple and easy to understand, without excessive detail that is hard to discern",
        steps:
          "1. Display the app's notification badge at its standard small size (typically 24x24dp).\n2. Review the layout design details and check if there are any tiny gradients or complex lines that look blurred.",
        expected:
          "The design is highly simplified with bold geometric lines that remain crisp at small scale.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.12",
        gl: "AGL-003",
        ref: "2.12",
        title:
          "Icon in notification area should not have any additional visual effect(dimming, fade out)",
        steps:
          "1. Inspect the raw PNG/Vector source assets created in the application resource directory.\n2. Confirm that there are no custom alpha fades, soft transparency transitions, gradient masks, or dimming effects styled directly inside the graphic file layers.",
        expected:
          "Graphics contain solid opacity layers without unapproved visual fades or pre-baked alpha gradients.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.13",
        gl: "AGL-003",
        ref: "2.13",
        title:
          "Icon in notification area should not be colored. Should be white on transparent background",
        steps:
          "1. Inspect the active notification icon graphic under standard status tray visibility constraints.\n2. Make sure that the icon contains only solid pure white pixels mapped against a fully transparent background.",
        expected:
          "The icon uses a single flat monochromatic white format built with zero colored tint layers.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.14",
        gl: "AGL-003",
        ref: "2.14",
        title:
          "Some of your users will run into questions or problems along the way. They'll be looking for answers within your app, and if they don't find them quickly, they may leave and never come back.",
        steps:
          "1. Open the drawer navigation or menu overlay of the app.\n2. Verify there are clear, intuitive access options directing users to troubleshooting resources.",
        expected:
          "The interface provides prominent routes to support and guidance for troubleshooting problems.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.15",
        gl: "AGL-003",
        ref: "2.15",
        title: "Ensure that there is a Help section in your game",
        steps:
          "1. Navigate around the primary settings or system menu screens.\n2. Locate the designated 'Help' entry point.\n3. Make sure it responds to clicks by opening a dedicated workspace displaying relevant instructions and guides.",
        expected:
          "An accessible 'Help' panel is present inside the workspace interface.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.16",
        gl: "AGL-003",
        ref: "2.16",
        title: "Highly recommended to include an FAQ section within the game",
        steps:
          "1. Open the player profile, context menus, or support lists in the app.\n2. Expand the native 'FAQ' or 'Frequently Asked Questions' section.\n3. Verify relevant, typical gameplay questions and answers render properly in an interactive list.",
        expected:
          "A rich, well-formatted FAQ catalog is clearly mapped inside the help screens.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.17",
        gl: "AGL-003",
        ref: "2.17",
        title: "Ensure that there is a Contact Us section in the game",
        steps:
          "1. In the settings or details section, find the interactive 'Contact Us' or 'Reach Support' trigger.\n2. Ensure it provides active contact channels like a touch-responsive feedback form or active helpdesk email links.",
        expected:
          "An interactive and accessible channel is maintained so users can contact active support networks.",
        originalRef: "Patterns",
      },
      {
        id: "And-GPG-2.18",
        gl: "AGL-003",
        ref: "2.18",
        title:
          'Most developers want to distribute their apps on multiple platforms. As you plan your app for Android, keep in mind that different platforms play by different rules and conventions. Design decisions that make perfect sense on one platform will look and feel misplaced in the context of a different platform. While a "design once, ship anywhere" approach might save you time up-front, you run the very real risk of creating inconsistent apps that alienate users.',
        steps:
          "1. Check key interaction designs (like toggle buttons, sheet overlays, tabs, and shares).\n2. Formally verify the application adopts native Material Design mechanics instead of raw iOS-looking navigation hierarchies or layout blocks.",
        expected:
          "Platform interfaces embrace standard Android design metaphors rather than general cross-platform compromises.",
        originalRef: "Patterns",
      },
      // Section: GPG Design Guidelines - Building blocks
      {
        id: "And-GPG-3.1",
        gl: "AGL-003",
        ref: "3.1",
        title:
          "Scrolling allows the user to navigate to content in the overflow using a swipe gesture. The scrolling speed is proportional to the speed of the gesture.",
        steps:
          "1. Load a view containing elements that overflow the screen bounds.\n2. Apply drag or swipe gestures at different velocities.\n3. Confirm that scrolling speed operates in proportion to gesture velocity (momentum physics), and that boundaries act as expected without jitter.",
        expected:
          "Viewport scroll momentum adapts dynamically to the swipe gesture velocity.",
        originalRef: "Building blocks",
      },
      {
        id: "And-GPG-3.2",
        gl: "AGL-003",
        ref: "3.2",
        title:
          "A button consists of text and/or an image that clearly communicates what action will occur when the user touches it. A button can have an image, text, or both.",
        steps:
          "1. Inspect all visual buttons across the user interface.\n2. Confirm that each button clearly identifies its action through intuitive labels, standard system icons, or both.\n3. Set buttons with distinct shape parameters and border feedback.",
        expected:
          "Visual buttons explicitly state and symbolize their exact actions cleanly.",
        originalRef: "Building blocks",
      },
      {
        id: "And-GPG-3.3",
        gl: "AGL-003",
        ref: "3.3",
        title:
          "Text fields allow the user to type text into your app. They can be either single line or multi-line. Touching a text field places the cursor and automatically displays the keyboard. In addition to typing, text fields allow for a variety of other activities, such as text selection (cut, copy, paste) and data lookup via auto-completion.",
        steps:
          "1. Tap on single-line and multi-line message fields.\n2. Confirm the cursor places instantly and displays the onscreen keyboard.\n3. Long-press on entered text and verify that selection bounds with cut, copy, paste buttons appear properly.",
        expected:
          "Text input fields automatically expose system keyboards, cursor placements, and standard text selection functions.",
        originalRef: "Building blocks",
      },
      {
        id: "And-GPG-3.4",
        gl: "AGL-003",
        ref: "3.4",
        title:
          "Interactive sliders make it possible to select a value from a continuous or discrete range of values by moving the slider thumb. The smallest value is to the left, the largest to the right. The interactive nature of the slider makes it a great choice for settings that reflect intensity levels, such as volume, brightness, or color saturation.",
        steps:
          "1. Locate settings overlays or volume sliders inside the application.\n2. Move the interactive slider thumb and confirm values dynamically shift between left minimums and right maximums.\n3. Verify smooth real-time response of the adjusted intensity level parameter.",
        expected:
          "Interactive intensity sliders display dynamic ranges correctly, running lower values on the left and higher values on the right.",
        originalRef: "Building blocks",
      },
      {
        id: "And-GPG-3.5",
        gl: "AGL-003",
        ref: "3.5",
        title:
          "Progress bars and activity indicators signal to users that something is happening that will take a moment.",
        steps:
          "1. Trigger background transactions, data loading, or assets unpacking procedures.\n2. Ensure a visible activity indicator (spinner) or a continuous horizontal progress bar immediately reveals itself.\n3. Confirm indicators vanish automatically upon completion of the loading task.",
        expected:
          "Progress displays or activity spinners reveal active processes to users during wait periods.",
        originalRef: "Building blocks",
      },
      // Section: FTCs - Game Content Guidelines
      {
        id: "And-FTC-1.1",
        gl: "AGL-004",
        ref: "1.1",
        title:
          "Apps that duplicate apps already in the market may be rejected, particularly if there are many of them.",
        steps:
          "1. Search public stores for identical names, logos, or repackaged templates.\n2. Review visual assets and core mechanics to confirm unique branding and differentiated value.\n3. Make sure the app adds custom value beyond a simple webview envelope.",
        expected:
          "The app features original core layouts, assets, and value to prevent instant marketplace duplication flags.",
        originalRef: "Game Content Guidelines",
      },
      {
        id: "And-FTC-1.2",
        gl: "AGL-004",
        ref: "1.2",
        title:
          "Apps that are primarily marketing materials or advertisements will be rejected.",
        steps:
          "1. Inspect all user navigation routes and screens to verify full functional utility is provided to the end user.\n2. Ensure the app is not merely an interactive billboard, catalog of external coupon links, or solid display ad.",
        expected:
          "The app delivers direct functional utility to learners or gamers, rather than strictly hosting commercial ads.",
        originalRef: "Game Content Guidelines",
      },
      {
        id: "And-FTC-1.3",
        gl: "AGL-004",
        ref: "1.3",
        title:
          "Apps that encourage excessive consumption of alcohol or illegal substances, or encourage minors to consume alcohol or smoke cigarettes, will be rejected.",
        steps:
          "1. Review in-game text content, images, scenarios, and microtransactions.\n2. Verify the application has no themes promoting underage smoking, substance use, or binging/consumption mechanics.",
        expected:
          "The application strictly adheres to high safety standards and does not encourage minors to engage with alcohol or harmful substances.",
        originalRef: "Game Content Guidelines",
      },
      {
        id: "And-FTC-1.4",
        gl: "AGL-004",
        ref: "1.4",
        title:
          "Apps that provide incorrect diagnostic or other inaccurate device data will be rejected.",
        steps:
          "1. Trigger diagnostic, performance measuring, or device statistics reporting widgets.\n2. Cross-reference shown diagnostic values with actual hardware sensor readings.\n3. Check that mock gauges, deceptive resource meters, or incorrect reports are completely absent.",
        expected:
          "All reported device capabilities, clean-up counts, and diagnostics are correct and accurate.",
        originalRef: "Game Content Guidelines",
      },
      {
        id: "And-FTC-1.5",
        gl: "AGL-004",
        ref: "1.5",
        title: "Apps that download other standalone apps will be rejected.",
        steps:
          "1. Attempt to launch dynamic, third-party APK/IPA asset downloads or automatic standalone app installer scripts.\n2. Confirm the app does not self-update outside official channels or trigger unauthorized device-level standalone installer prompts.",
        expected:
          "The app loads all interactive logic inside its package or through approved in-app assets rather than downloading secondary apps.",
        originalRef: "Game Content Guidelines",
      },
      // Section: FTCs - Game DRM Guidelines
      {
        id: "And-FTC-2.1",
        gl: "AGL-004",
        ref: "2.1",
        title:
          "Apps that require license keys or implement their own copy protection will be rejected.",
        steps:
          "1. Install and launch the application under evaluation.\n2. Look for manual license code prompts, serial input forms, or custom hardware-locked validation dialogs on startup.\n3. Verify the app relies on Google Play Licensing (LVL) or platform native solutions instead.",
        expected:
          "The app does not demand custom self-managed licensing screens or proprietary key protections.",
        originalRef: "Game DRM Guidelines",
      },
      {
        id: "And-FTC-2.2",
        gl: "AGL-004",
        ref: "2.2",
        title:
          "Apps may not use update mechanisms outside of the Android market.",
        steps:
          "1. Prompt the application to detect an available application package version update.\n2. Observe if the app downloads and prompts manual installation of an APK from background server ports.\n3. Ensure it redirects users to the official Google Play Store or uses Google Play In-App Updates SDK.",
        expected:
          "Software updates execute exclusively via Google Play or standard platform stores.",
        originalRef: "Game DRM Guidelines",
      },
      // Section: FTCs - Basic Functionality Guidelines
      {
        id: "And-FTC-3.1",
        gl: "AGL-004",
        ref: "3.1",
        title:
          "Apps must contain all language support in a single app bundle (single binary multiple language).",
        steps:
          "1. Query the primary build configuration, Android App Bundle (AAB), or universal APK contents.\n2. Switch system language values to French, Spanish, Japanese, etc.\n3. Make sure localized strings load instantly without requiring secondary manual resource downloads.",
        expected:
          "All supported translations or locale bundles sit neatly inside a single unified app binary.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.2",
        gl: "AGL-004",
        ref: "3.2",
        title:
          "Apps that do not run on the currently shipping OS version will be rejected.",
        steps:
          "1. Launch and configure the application on a target device running the latest publicly released stable Android OS.\n2. Run regular interactions, gameplay flows, and option edits.\n3. Verify that zero crashes, black screens, or API incompatibility alerts interrupt the experience.",
        expected:
          "Application runs without errors or degradation on the current Android release.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.3",
        gl: "AGL-004",
        ref: "3.3",
        title:
          "Apps that are set to auto-launch or have other code automatically run at startup or login without user consent will be rejected.",
        steps:
          "1. Inspect the AndroidManifest.xml file for BOOT_COMPLETED broadcast receivers or startup autostart attributes.\n2. Restart the evaluation device and observe background services.\n3. Verify no foreground overlays or sound-emitting code loops launch without explicit initialization/prior consent.",
        expected:
          "The app maintains a passive offline state until explicitly activated by user click.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.4",
        gl: "AGL-004",
        ref: "3.4",
        title:
          "Pausing the game and going back to Main Menu should be easy to do.",
        steps:
          "1. Initiate active gameplay or responsive simulation loops.\n2. Locate the designated pause trigger (e.g. Pause button / Escape / back gesture).\n3. Confirm that a clearly labeled 'Exit to Main Menu' option is accessible with standard click actions.",
        expected:
          "Simple menu flows enable users to pause play states and return home in a few quick screen gestures.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.5",
        gl: "AGL-004",
        ref: "3.5",
        title: 'Device\'s "home" button has to minimize the AUT immediately.',
        steps:
          "1. Open heavy active game screens or graphics rendering surfaces.\n2. Press the hardware or gesture 'Home' action.\n3. Verify the application minimizes to background memory without visual hang, stutter, or delay.",
        expected:
          "System home command immediately suspends the active application view.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.6",
        gl: "AGL-004",
        ref: "3.6",
        title:
          "Two commands with different names must not execute the same action.",
        steps:
          "1. Review interactive button groupings, action icons, or navigation items placed on the same screen.\n2. Click on elements with distinct labels or titles (e.g., 'Restore' vs. 'Recover').\n3. Ensure distinct titles are mapped to distinct, non-redundant logical flows unless functionally intended (like double-confirmation triggers).",
        expected:
          "Distinct UI titles translate to unique visual behaviors or system paths without confusing redundancy.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.7",
        gl: "AGL-004",
        ref: "3.7",
        title:
          "All games should allow the user to Accept or Decline external interrupts.",
        steps:
          "1. Simulate incoming phone systems, hardware battery logs, or custom background service indicators during active tasks.\n2. Confirm the game does not block system notification banners or volume sliders.\n3. Verify options to pause, dismiss, or tap outside remain accessible.",
        expected:
          "The system respects incoming client signals, allowing users to choose how to handle interrupts.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.8",
        gl: "AGL-004",
        ref: "3.8",
        title: "Game sounds should not be heard during Calls/Video Calls.",
        steps:
          "1. Connect a real-time incoming voice or video call line while game streams are playing audio channels.\n2. Confirm application audio track automatically drops to silent state once the line is picked up.\n3. Verify audio remains muted throughout the telephony conversation.",
        expected:
          "In-game soundtrack volumes fall completely silent during telephone or VoIP system call connections.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.9",
        gl: "AGL-004",
        ref: "3.9",
        title: "Incoming call prompt should not be delayed by the application.",
        steps:
          "1. Place active telephone voice calls to the device while heavy application graphics rendering or computation is active.\n2. Measure the delivery time from call broadcast to visual ring indicator arrival.\n3. Check there is zero visible delay, UI locking, or latency in displaying the incoming call window.",
        expected:
          "Telephony signals take absolute priority, showing prompts with zero graphics bottlenecks.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.10",
        gl: "AGL-004",
        ref: "3.10",
        title:
          "The game should save all progress made if the user accepts the call.",
        steps:
          "1. Play through interactive modes or content structures.\n2. Accept an incoming audio call interrupt, switching context completely away from the application.\n3. Return to the game after terminating the line, and verify session history, points, or current task states are retained.",
        expected:
          "Critical state is persisted on-the-fly upon detection of call suspension events.",
        originalRef: "Basic Functionality Guidelines",
      },
      {
        id: "And-FTC-3.11",
        gl: "AGL-004",
        ref: "3.11",
        title:
          "User should be able to listen to his own music without any issues.",
        steps:
          "1. Initialize a system background music player (like YouTube Music or Spotify) to start audio playback.\n2. Boot the application up and navigate active dashboards.\n3. Confirm background music continues to stream cleanly and are not forcibly paused, muted, or overlapped by secondary soundtracks.",
        expected:
          "User-preferred external soundtracks play continuously with priority over standard non-cinematic game backgrounds.",
        originalRef: "Basic Functionality Guidelines",
      },
      // Section: FTCs - Android Manifest checks
      {
        id: "And-FTC-4.1",
        gl: "AGL-004",
        ref: "4.1",
        title:
          "android:versionName and android:versionCode attributes must be set in the <application> element in the apktool.yml file",
        steps:
          "1. Decode the built APK container using Apktool to examine its internal directory structure.\n2. Locate and open the apktool.yml configuration file from the root output folder.\n3. Verify that both android:versionName (representing the friendly public version string) and android:versionCode (representing the monotonically increasing integer schema version) attributes are formally declared and set.",
        expected:
          "Both versionName and versionCode parameters are successfully registered inside the apktool application elements.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.2",
        gl: "AGL-004",
        ref: "4.2",
        title:
          "Ensure that supported screens tab is present in the manifest (not mandatory, but highly recommended)",
        steps:
          "1. Read the decompiled AndroidManifest.xml package document details.\n2. Search for the <supports-screens> declaration block code.\n3. Make sure supported hardware configurations, screen size classes, and high-density scaling factors are specified to ensure broad device rendering consistency.",
        expected:
          "The <supports-screens> tag is clearly declared in the manifest file of the package to support diverse layout metrics.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.3",
        gl: "AGL-004",
        ref: "4.3",
        title:
          "Ensure that all required permissions are present in the manifest file",
        steps:
          "1. Map out all core application modules and functional tasks (e.g. storage access, camera use, notifications, telemetry).\n2. Cross-check your list of needed capabilities against the registered <uses-permission> tags in the AndroidManifest.xml.\n3. Verify that zero required standard access permissions are missing from the configuration.",
        expected:
          "All essential system permissions needed to run the application components are registered properly inside the master manifest.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.4",
        gl: "AGL-004",
        ref: "4.4",
        title:
          "Ensure that there are no unnecessary permissions declarations in the manifest file",
        steps:
          "1. Examine the active list of elements declared in the AndroidManifest.xml.\n2. Trace each permission back to an active, required feature function in the code.\n3. Remove dangerous or sensitive requests that are no longer actively utilized by runtime modules (e.g. READ_SMS, ACCESS_FINE_LOCATION if unused by gameplay).",
        expected:
          "No redundant or excessive permissions are present in the manifest, optimizing security hygiene.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.5",
        gl: "AGL-004",
        ref: "4.5",
        title:
          "Ensure that there are no references to other Stores in the manifest",
        steps:
          "1. Open the decompiled manifest document and scan all elements.\n2. Run a global string search for external marketplace URLs, custom intent deep links, store names (e.g. Amazon, Huawei AppGallery, Galaxy Store), or non-Google update packages.\n3. Verify that Google Play Store remains the exclusive targeted service.",
        expected:
          "The AndroidManifest.xml contains zero references or configurations directing to alternative app stores.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.6",
        gl: "AGL-004",
        ref: "4.6",
        title:
          "Ensure that the targetSDK version is the latest one in the manifest/YML file within the APK",
        steps:
          "1. Check the targetSdkVersion value declared under the <uses-sdk> element in AndroidManifest.xml or the build configurations.\n2. Compare this value with the latest API level enforced by the Google Play Store console (e.g. API level 33, 34, or above).\n3. Confirm that the application compilation version targets the latest stable platform SDK.",
        expected:
          "The package targets the latest required Android SDK level, satisfying modern platform policy rules.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.7",
        gl: "AGL-004",
        ref: "4.7",
        title:
          "Check that Apps targeting API Level 33 (Android 13) and above must have the com.google.android.gms.permission.AD_ID permission to access the Android Advertising Identifier",
        steps:
          '1. Check if the targetSdkVersion is set to API level 33 (Android 13) or higher.\n2. Locate the <uses-permission android:name="com.google.android.gms.permission.AD_ID" /> tag in the manifest configuration.\n3. Verify that this flag is declared for applications using data cookies, advertisements, analytics, or user tracking SDKs.',
        expected:
          "The AD_ID permission is properly present in the manifest for API 33+ tracking/analytics utility.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.8",
        gl: "AGL-004",
        ref: "4.8",
        title:
          "Ensure that dangerous permissions are authenticated from users during runtime of the game (Includes list of dangerous Android permissions)",
        steps:
          "1. Identify all manifest declarations matching Android's Dangerous Permissions group.\n2. Review the list of dangerous Android permissions:\n- CALENDAR (READ_CALENDAR, WRITE_CALENDAR)\n- CAMERA (CAMERA)\n- CONTACTS (READ_CONTACTS, WRITE_CONTACTS, GET_ACCOUNTS)\n- LOCATION (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION)\n- MICROPHONE (RECORD_AUDIO)\n- PHONE (READ_PHONE_STATE, CALL_PHONE, ANSWER_PHONE_CALLS)\n- SENSORS (BODY_SENSORS, BODY_SENSORS_BACKGROUND)\n- SMS (SEND_SMS, RECEIVE_SMS, READ_SMS, RECEIVE_WAP_PUSH, RECEIVE_MMS)\n- STORAGE/MEDIA (READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, READ_MEDIA_AUDIO, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE)\n- NOTIFICATIONS (POST_NOTIFICATIONS)\n3. Verify the app queries user consent at runtime before accessing any of these APIs.",
        expected:
          "The application prompts the user for runtime permission authorization before accessing any dangerous API.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.9",
        gl: "AGL-004",
        ref: "4.9",
        title:
          "At launch, a message should be displayed signifying the need for any permission (with example illustration)",
        steps:
          "1. Launch the application for the first time on a fresh device setup session.\n2. Before triggering the system pop-up, verify an elegant custom dialog is displayed to the user.\n3. Confirm that the dialog clearly explains why the application requires the requested permission (e.g., Local Storage for saving game progress file assets).\n4. View the interactive mock device simulator below to see a visual example of this pre-request rationale prompt.",
        expected:
          "A distinct pre-request explanatory rationale dialog display is shown to the user on startup to signify permission needs.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.10",
        gl: "AGL-004",
        ref: "4.10",
        title:
          "On Tapping OK, system should pop-up the permission to be approved from end user (with example illustration)",
        steps:
          "1. Review the custom rationale prompt and click the 'OK' button.\n2. Confirm that the official Android OS native system permission popup is triggered immediately.\n3. Check that the user can choose 'Allow' or 'Don't Allow'.\n4. View the live interactive smartphone simulation below to play through this action with accurate system popup graphics.",
        expected:
          "Tapping OK on the explanation UI instantly triggers the official system permission approval dialog.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.11",
        gl: "AGL-004",
        ref: "4.11",
        title:
          "On denying the permission, a warning message should appear that informs user that the game can't run without the permission (with example illustration)",
        steps:
          "1. Tap the 'Don't Allow' action on the OS system permission pop-up dialog.\n2. Verify the application handles the denial gracefully by showing a clear warn overlay/dialog.\n3. Ensure this message explains why the game is locked/limited and cannot proceed without approval.\n4. Interact with the live mobile mock-up below to see a visual example of this safety warning container.",
        expected:
          "A helpful warning dialog clearly states that the experience is locked/restricted unless the permission is approved.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.12",
        gl: "AGL-004",
        ref: "4.12",
        title:
          "On retrying from the above pop-up, the system pop-up should be triggered again for user approval",
        steps:
          "1. Review the warning notification that appeared after denying consent.\n2. Click the 'Retry' or 'Request Again' action button on that warning card.\n3. Ensure that the native Android OS system permission dialogue is requested and launched a second time.",
        expected:
          "Tapping the Retry option from the warning UI successfully requests a system permissions popup once more.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.13",
        gl: "AGL-004",
        ref: "4.13",
        title:
          "If user denies by selecting Never Ask Again option, a message should be displayed where the settings button should redirect user to the App Settings page (with example illustration)",
        steps:
          "1. On the second system permission prompt, deny the permission by choosing the 'Don't Ask Again' option or secondary dismissal.\n2. Verify the app displays a custom UI explaining the permanent denial state.\n3. Confirm it provides a prominent 'Go to Settings' action button.\n4. Check that this button redirects the user directly to the app's system Settings info page to allow manual adjustments.\n5. Click 'Settings' in the interactive phone layout below to see how this transition and setting behaves.",
        expected:
          "A persistent settings transition prompt provides a direct route for users who enabled 'Never Ask Again' to toggle the parameter manually in settings.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.14",
        gl: "AGL-004",
        ref: "4.14",
        title:
          "Check that the app functionality/permissions flow is not affected for each one approved by the user",
        steps:
          "1. Navigate to a feature that requires permission (e.g. local save files or asset downloads).\n2. Approve the permission when prompted by the system.\n3. Confirm that the feature loads, performs, and behaves perfectly with zero crash events or layout issues.",
        expected:
          "Granting permissions enables seamless feature execution without any performance degradation.",
        originalRef: "Android Manifest checks",
      },
      {
        id: "And-FTC-4.15",
        gl: "AGL-004",
        ref: "4.15",
        title:
          "Check that the app functionality is not affected for each permission denied OR check that the app requests approval for the permission again if mandatory to run the game",
        steps:
          "1. Deny a requested permission and verify non-critical features degrade gracefully rather than crashing (e.g. profile photos falling back to defaults if camera is denied).\n2. If the feature/permission is strictly mandatory for the game to start, confirm that the app prevents gameplay and guides the user back to the permission flow.",
        expected:
          "Platform execution stays robust, returning clean failures, standard safe fallbacks, or re-initiating mandatory requests.",
        originalRef: "Android Manifest checks",
      },
      // Section: FTCs - Multi Window Feature
      {
        id: "And-FTC-5.1",
        gl: "AGL-004",
        ref: "5.1",
        title:
          "If the targetSdkVersion is 23 or higher: If user attempts to use the app in multi-window mode, the system forcibly resizes the app unless the app declares a fixed orientation",
        steps:
          "1. Build and install an application targeting SDK version 23 or above.\n2. Attempt to trigger multi-window/split-screen mode on the test device.\n3. Verify that the system forcibly resizes the application canvas unless a fixed portrait/landscape orientation has been explicitly requested in the manifest.",
        expected:
          "The application is forcibly resized correctly on devices supporting multi-window layouts when no fixed orientation is defined.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.2",
        gl: "AGL-004",
        ref: "5.2",
        title:
          "If the targetSdkVersion is 23 or higher: If your app does not declare a fixed orientation, you should launch your app on a device running Android 7.0 or higher and attempt to put the app in split-screen mode. Verify that the user experience is acceptable when the app is forcibly resized",
        steps:
          "1. Launch your app on a standard device or emulator running Android 7.0 (API level 24) or higher.\n2. Place the device in split-screen configuration.\n3. Examine all screen text, margins, and layouts to verify the UI adapts gracefully and remains fully interactive.",
        expected:
          "The user interface adapts dynamically to the split-screen dimensions with readable text and accessible buttons.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.3",
        gl: "AGL-004",
        ref: "5.3",
        title:
          "If the targetSdkVersion is 23 or higher: If the app declares a fixed orientation, you should attempt to put the app in multi-window mode. Verify that when you do so, the app remains in full-screen mode",
        steps:
          "1. Ensure the app has set a fixed screenOrientation (portrait or landscape) in its main manifest activity declarations.\n2. Attempt to trigger multi-window split-screen split layouts.\n3. Confirm that the application ignores split-screen and stays displayed in full-screen mode as enforced by the OS.",
        expected:
          "The application stays in full-screen orientation when multi-window is triggered under fixed orientation settings.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.4",
        gl: "AGL-004",
        ref: "5.4",
        title:
          "If you support multi-window mode: Launch the app in full-screen mode, then switch to multi-window mode by long-pressing the Overview button. Verify that the app switches properly",
        steps:
          "1. Boot the app into absolute full-screen mode.\n2. Locate and hold down the hardware or soft-key Overview/Recent Apps system button.\n3. Verify that the system launches multi-window layout and the app smoothly moves to its allocated half without crashing.",
        expected:
          "The application processes the system-level transition to multi-window without errors or state resets.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.5",
        gl: "AGL-004",
        ref: "5.5",
        title:
          "If you support multi-window mode: Launch the app directly in multi-window mode, and verify that the app launches properly.",
        steps:
          "1. Press the system Overview button.\n2. Click and hold the app title bar, then drag it to a highlighted screen zone to place it in multi-window mode immediately.\n3. Launch the app directly from this view and ensure it instantiates correctly.",
        expected:
          "The application launches on-the-fly and initializes all graphic canvases directly inside the partial-screen boundary.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.6",
        gl: "AGL-004",
        ref: "5.6",
        title:
          "If you support multi-window mode: Resize your app in split-screen mode by dragging the divider line. Verify that the app resizes without crashing, and that necessary UI elements are visible",
        steps:
          "1. Place the device in split-screen mode.\n2. Drag the central screen dividing line back and forth.\n3. Monitor thread activity to verify zero crashes, checking that vital items remain within view.",
        expected:
          "The application layout changes smoothly on divider drag with all interactive buttons rendering correctly.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.7",
        gl: "AGL-004",
        ref: "5.7",
        title:
          "If you support multi-window mode: If you have specified minimum dimensions for your app, attempt to resize the app below those dimensions. Verify that you cannot resize the app to be smaller than the specified minimum",
        steps:
          "1. Review layout parameter constraints (e.g. android:defaultWidth, android:defaultHeight) in Android Manifest.\n2. Attempt to force-drag the split-screen divider below these pre-set safe boundaries.\n3. Verify the OS restricts the resize operation, keeping it locked to the defined minimum dimensions.",
        expected:
          "The application prevents scaling below declared layout limits, maintaining content presentation safety.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.8",
        gl: "AGL-004",
        ref: "5.8",
        title:
          "If you support multi-window mode: Through all tests, verify that your app's performance is acceptable. For example, verify that there is not too long a lag to update the UI after the app is resized",
        steps:
          "1. Measure layout re-render times during active resize events.\n2. Make sure there are no rendering delays, UI freezes, stuttering visuals, or audio-video desync.\n3. Ensure all menus update virtually instantly to reflect new size states.",
        expected:
          "The UI adapts instantly with minimum responsive latency, presenting high frame rates.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.9",
        gl: "AGL-004",
        ref: "5.9",
        title: "Enter and leave multi-window mode",
        steps:
          "1. Place the app in split-screen multi-window configuration.\n2. Exit split-screen mode to return the application to native full-screen layout.\n3. Repeat the cycle multiple times to verify no memory leaks, state drops, or process crashes occur.",
        expected:
          "Dynamic lifecycle switches between full-screen and split-screen proceed smoothly.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.10",
        gl: "AGL-004",
        ref: "5.10",
        title:
          "Switch from your app to another app, and verify that the app behaves properly while it is visible but not active. For example, if your app is playing video, verify that the video continues to play while the user is interacting with another app",
        steps:
          "1. Launch a continuous media file or simulation track in your app under multi-window mode.\n2. Tap the adjacent pane to interact with another active application.\n3. Verify your app continues playing, executing routines, or updating values correctly while in the visible-but-paused (non-focused) lifecycle stage.",
        expected:
          "The application maintains media playbacks and state rendering tasks even when focus is shifted.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.11",
        gl: "AGL-004",
        ref: "5.11",
        title:
          "In split-screen mode, try moving the dividing bar to make your app both larger and smaller. Try these operations in both side-by-side and one-above-the-other configurations. Verify that the app does not crash, essential functionality is visible, and the resize operation doesn't take too long",
        steps:
          "1. Test the app in side-by-side split screen setup, dragging the divider bar to extremes.\n2. Flip the device orientation to trigger standard one-above-the-other layout configuration.\n3. Drag the horizontal separator to confirm it doesn't cause any runtime exceptions and performs changes quickly.",
        expected:
          "The layouts in both portrait and landscape multi-window options are highly durable and performant.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.12",
        gl: "AGL-004",
        ref: "5.12",
        title:
          "Perform several resize operations in rapid succession. Verify that your app doesn't crash",
        steps:
          "1. Drag the split-screen divider handle rapidly back and forth several times within a short duration (e.g., 5 seconds).\n2. Monitor the console logs to verify that layout calculations or GC pauses don't cause app instability or full crash events.",
        expected:
          "Fast back-to-back resize cycles execute safely, demonstrating high layout architecture stability.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.13",
        gl: "AGL-004",
        ref: "5.13",
        title:
          "Use your app normally in a number of different window configurations, and verify that the app behaves properly. Verify that text is readable, and that UI elements aren't too small to interact with",
        steps:
          "1. Run mainstream application operations under 1/3, 1/2, and 2/3 split-screen ratios.\n2. Verify visual asset rendering scale, button size (at least 48dp target), and font size consistency.\n3. Ensure all clickable items remain comfortable to press with fingers without accidental inputs.",
        expected:
          "The user layout stays visually and physically ergonomic across all valid scaling ratios.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-5.14",
        gl: "AGL-004",
        ref: "5.14",
        title:
          "You should launch your app on a device running Android 7.0 or higher and attempt to put the app in freeform and split-screen modes. Verify that when you do so, the app remains in full-screen mode",
        steps:
          "1. Boot the application on devices with Freeform window mode enabled (e.g. tablet or desktop emulator profiles).\n2. Drag the corners of the app window or attempt to tile it.\n3. Confirm that the application handles freeform configuration natively, or safely forces standard display rules without any visual tearing.",
        expected:
          "Freeform scaling or split-screen bounds are respected and rendered correctly.",
        originalRef: "Multi Window Feature",
      },
      {
        id: "And-FTC-6.1",
        gl: "AGL-004",
        ref: "6.1",
        title:
          "When server is down/under maintenance, user must be notified appropriately with a warning message. This applies to always online games & multiplayer sessions - Test on WiFi , 4G & 5G",
        steps:
          "1. Launch the always-online game or multiplayer session under evaluation.\n2. Simulate server downtime, connection timeout, or active service maintenance status.\n3. Test the app behavior on different network connection types (WiFi, 4G, and 5G).\n4. Verify that the user is notified appropriately with a clear, graceful warning/maintenance window message instead of showing unhandled errors or crashing.",
        expected:
          "A clear maintenance or offline warning screen displays under server downtime states across all WiFi, 4G, and 5G connections.",
        originalRef: "Online Connection Issue Tests",
      },
      {
        id: "And-FTC-7.1",
        gl: "AGL-004",
        ref: "7.1",
        title:
          "Apps offering “loot boxes” or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase. In General, every lootbox/gatcha bought by the players through direct IAP or with In-game currency must display its odds as per the rarity or items types. The display can be done through an in game pop-up, or a WebView. For e.g. In South Park: Phone Destroyer, the Card Packs offered by paying Hard Currency or IAP displays the odds of the number of cards/coins/items to be received by the player on the info icon.",
        steps:
          "1. Identify loot boxes or randomized purchases made with in-game currency or standard IAPs.\n2. Confirm that the exact odds per rarity or item type are disclosed prior to purchase.\n3. Verify they are accessible via an in-game pop-up, info icon, or WebView.",
        expected:
          "Loot box and randomized item probabilities are fully disclosed to the user before purchasing.",
        originalRef: "Gacha/Loot Box Test",
      },
      {
        id: "And-FTC-8.1",
        gl: "AGL-004",
        ref: "8.1",
        title:
          "Manually put the device to 'Battery Saver' Mode & ensure that game's performance is not affected (there should not be any stability related issues)",
        steps:
          "1. Turn on 'Battery Saver' Mode manually in the device's OS settings.\n2. Play the game or navigate the application.\n3. Make sure performance remains smooth and there are no stability-related issues.",
        expected:
          "The application runs smoothly and with complete stability under active Battery Saver Mode.",
        originalRef: "Battery saver test",
      },
      {
        id: "And-FTC-9.1",
        gl: "AGL-004",
        ref: "9.1",
        title:
          "When the server is down or undergoing maintenance, a clear, cause-specific notification must be shown to the user",
        steps:
          "1. Simulate a server outage or maintenance state.\n2. Start the application or interact with online modules.\n3. Verify that a clear, cause-specific warning message or maintenance window is shown to the user.",
        expected:
          "A user-facing notification specifies that the server is down or undergoing maintenance.",
        originalRef: "Error Handling",
      },
      {
        id: "And-FTC-9.2",
        gl: "AGL-004",
        ref: "9.2",
        title:
          "When an account sign-in attempt fails using iOS or GPGS credentials, a pop-up must trigger detailing the exact problem and a potential fix",
        steps:
          "1. Trigger an intentional sign-in error or credentials mismatch using iOS or GPGS sign-in flow.\n2. Verify that a pop-up modal is immediately triggered.\n3. Ensure it details the exact problem and highlights a potential fix for the user.",
        expected:
          "A descriptive pop-up details sign-in errors and potential resolution paths.",
        originalRef: "Error Handling",
      },
      {
        id: "And-FTC-9.3",
        gl: "AGL-004",
        ref: "9.3",
        title:
          "When user progression fails to save or load due to poor or extreme network conditions, the system must handle the failure gracefully",
        steps:
          "1. Mock poor, degraded, or decoupled network connections during progress saves or loads.\n2. Confirm that progression storage handles the failure gracefully.\n3. Ensure it prompts simple retries or backs up data safely without crashing.",
        expected:
          "Saves and loads fail gracefully under severe network degradation without crashing the client.",
        originalRef: "Error Handling",
      },
      {
        id: "And-GPGS-1.1",
        gl: "AGL-005",
        ref: "1.1",
        title:
          "Initialize the Google Play Games Services SDK and check if the player is authenticated.",
        type: "required",
        steps:
          'Launch the game representation as a new or returning player.\nNotice if the Google Play Games authentication overlay automatically pops up and signs you in.\nVerify that if automatic sign-in is disabled or declined, a clear "Sign In" button is visible and functional on the main menu or settings panel.',
        expected:
          "The Google Play Games Services SDK initializes correctly, attempts automatic authentication, and supports a prominent Settings or main screen sign-in trigger if initial sign-in is declined.",
        originalRef: "Platform authentication",
      },
      {
        id: "And-GPGS-1.2",
        gl: "AGL-005",
        ref: "1.2",
        title: "Follow Google branding guidelines.",
        type: "best_practice",
        steps:
          "Locate the sign-in button and logo elements mapped to the Google Play Games integration.\nVerify that the button shape, color scheme, icon assets, and trademark labels follow standard branding instructions.\nEnsure layout constraints preserve aspect ratio and don't squeeze or low-res scale Google assets.",
        expected:
          "In-game branding, icons, logo placements, and colors are displayed in full alignment with official Google branding criteria.",
        originalRef: "Platform authentication",
      },
      {
        id: "And-GPGS-1.3",
        gl: "AGL-005",
        ref: "1.3",
        title: "Remind players that they are authenticated.",
        type: "best_practice",
        steps:
          'Ensure you are authenticated with Google Play Games services in the active session.\nPerform an asynchronous player event that syncs state, like finishing a round or unlocking a visual trophy.\nLook for an on-screen dialog or popup message reinforcing state storage (e.g., "You are authenticated with Google. Your achievements and scores will be saved automatically").',
        expected:
          "Autosave alerts, action cues, or user notifications actively remind players of automatic progress cloud sync.",
        originalRef: "Platform authentication",
      },
      {
        id: "And-GPGS-1.4",
        gl: "AGL-005",
        ref: "1.4",
        title: "Back up player progress using the Play Games Services ID.",
        type: "required",
        steps:
          "Earn higher scores or modify app preferences as an authenticated player to generate save state.\nTrigger a manual device reset simulation or wipe browser/client-side storage entirely.\nReopen the game, re-authenticate via the same Play Games account, and ensure all progress data gets retrieved and restored to your session.",
        expected:
          "Save progress profiles are correctly associated with the authenticated Google Play Games Service ID, and local progression caches are cleanly reconciled upon post-launch authentication.",
        originalRef: "Platform authentication",
      },
      {
        id: "And-GPGS-ACH-1",
        gl: "AGL-005",
        ref: "2.1",
        title:
          "Minimum of ten visible achievements spread across the lifetime of the game.",
        type: "required",
        steps:
          "Open the Google Play Games overlay or in-game achievements pane.\nCount the total number of visible or standard achievements listed in the UI.\nConfirm there are at least ten separate, fully-revealed achievements available on day one.",
        expected:
          "At least 10 visible achievements are shown as revealed to the player.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-2",
        gl: "AGL-005",
        ref: "2.2",
        title:
          "Allow at least four achievements to be reasonably achievable within one hour.",
        type: "required",
        steps:
          "Launch a fresh game instance and play through the initial game loops naturally.\nTrack your session timer and count the achievements unlocked during the first hour of normal play.\nVerify that at least four different achievements are unlocked with relative ease by an average beginner.",
        expected:
          "Four or more distinct achievements can be unlocked reliably within the first 60 minutes of gameplay.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-3",
        gl: "AGL-005",
        ref: "2.3",
        title: "Ensure all achievements have unique names and descriptions.",
        type: "required",
        steps:
          "Review the complete list of achievements in the Play Console or achievement dashboard.\nCheck each entry's title, description, and conditions.\nConfirm no two achievements share the same name or repeat identical objective text.",
        expected:
          "Every achievement features a distinctive name and copy describing its exact unlock instructions.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-4",
        gl: "AGL-005",
        ref: "2.4",
        title: "Provide unique custom icons for each achievement.",
        type: "required",
        steps:
          "Inspect the graphics uploaded for achievements in Google Play Console or custom in-game menus.\nVerify that each achievement has its own distinct illustration or badge art (no duplicates).\nEnsure files are designed as 512x512 PNG, JPEG, or JPG assets on transparent background.",
        expected:
          "No achievements reuse artwork or icons, and all badges utilize unique 512x512 high-resolution assets.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-5",
        gl: "AGL-005",
        ref: "2.5",
        title: "Verify that all achievements are fully attainable.",
        type: "required",
        steps:
          "Audit achievement trigger conditions against level designs or high score ceilings.\nSimulate progress updates for each condition via QA tools or debug states.\nConfirm players can physically unlock and trigger 100% of the defined achievements without game blocks.",
        expected:
          "All achievements are technically and logically unlockable during natural gameplay.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-6",
        gl: "AGL-005",
        ref: "2.6",
        title: "Use incremental achievements to show cumulative progress.",
        type: "best_practice",
        steps:
          "Locate a long-term goal achievement (e.g., 'Defeat 100 enemies' or 'Collect 5000 coins').\nPerform a partial action (e.g., defeat 20 enemies) and close the game, then reopen it.\nConfirm the achievement tracker persists the step progression (e.g., showing 20% complete).",
        expected:
          "Incremental tracker correctly aggregates and exposes progressive unlock milestones across sessions.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-7",
        gl: "AGL-005",
        ref: "2.7",
        title:
          "Establish at least forty achievements spread across the game lifetime.",
        type: "best_practice",
        steps:
          "Verify the comprehensive list of achievements defined for the title in the registry.\nCalculate the total size of the achievement matrix across all stages, difficulty levels, and hidden tiers.\nVerify the quantity meets or exceeds 40 unique achievements, capturing diverse milestones.",
        expected:
          "A rich catalog of 40+ achievements is available to support user retention.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-8",
        gl: "AGL-005",
        ref: "2.8",
        title: "Use hidden achievements to spark surprise and delight.",
        type: "best_practice",
        steps:
          "Find achievements designed for secret milestones or easter eggs.\nVerify they are flagged as 'Hidden' in the Google Play Console configuration.\nEnsure their descriptive labels are masked until the player completes the mystery trigger.",
        expected:
          "Secret milestones are flagged as hidden so details are masked until they are successfully achieved.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-9",
        gl: "AGL-005",
        ref: "2.9",
        title:
          "Introduce new achievements when adding fresh expansions or episodes.",
        type: "best_practice",
        steps:
          "Identify new game levels, episodic DLCs, or map updates rolled out in a software release.\nReview the accompanying achievement catalog mapped to the new content pack.\nVerify new objectives exist to motivate players to explore the added gameplay segments.",
        expected:
          "New DLC or map episodes are launched alongside a proportional addition of newly lockable accomplishments.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-10",
        gl: "AGL-005",
        ref: "2.10",
        title: "Score achievement experience points proportionately.",
        type: "best_practice",
        steps:
          "Compare easy achievement scores (e.g., finishing the tutorial) against difficult ones (e.g., defeating the final boss on hard).\nVerify that the allocated Play Games XP or point scale curves upwards with difficulty.\nEnsure simple achievements aren't over-rewarded and grueling milestones aren't under-valued.",
        expected:
          "XP/Points map proportionally to gameplay effort, where hard rewards yield higher currency than simple tutorial steps.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-11",
        gl: "AGL-005",
        ref: "2.11",
        title:
          "Design achievements spanning a balanced variety of difficulty tiers.",
        type: "best_practice",
        steps:
          "Examine the complete achievement matrix.\nConfirm there is a healthy ratio of low-difficulty (casual), medium-difficulty (progression), and high-difficulty (elite) milestones.\nCheck that at least 1-2 ultra-hard achievements exist to challenge dedicated collectors.",
        expected:
          "The catalog covers a wide spectrum of visual tiers, from casual onboarding badges up to extreme, hard-earned feats.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-12",
        gl: "AGL-005",
        ref: "2.12",
        title:
          "Avoid frontloading achievements in the early stages of gameplay.",
        type: "best_practice",
        steps:
          "Start a brand-new play session and monitor the rate of achievements for the first 5 minutes.\nVerify that not more than one achievement pops up during this initial introductory window.\nConfirm trophies are not granted too trivially before the player invests attention.",
        expected:
          "Achievement notifications are cleanly paced to avoid oversaturating the user experience in the opening minutes of play.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-13",
        gl: "AGL-005",
        ref: "2.13",
        title: "Structure achievements around compelling in-game metrics.",
        type: "best_practice",
        steps:
          "Review the primary metrics used to trigger in-game achievements.\nEnsure they challenge active engagement (e.g. 'Defeat 100 zombies') rather than mechanical labor (e.g. 'Walk 100 miles on an empty road').\nVerify the criteria reinforce re-playability and game exploration.",
        expected:
          "Achievements are aligned with active, exciting mechanical gameplay instead of boring repetition.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-14",
        gl: "AGL-005",
        ref: "2.14",
        title:
          "Build colored badge graphics that degrade to grayscale when unearned.",
        type: "best_practice",
        steps:
          "View an unearned, locked achievement badge on your profile; verify it is rendered in clean grayscale.\nEarn the target achievement and trigger the success unlock.\nCheck that the locked grayscale graphic transforms into a highly saturated, full-color icon.",
        expected:
          "Achievement illustrations leverage elegant colors, with unearned versions rendering as crisp grayscale overlays by default.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-15",
        gl: "AGL-005",
        ref: "2.15",
        title:
          "Minimize the use of hidden achievements to avoid unnecessary mystery.",
        type: "best_practice",
        steps:
          "Scan the full list of achievements and count the total flagged as hidden vs visible.\nVerify that the visual majority of the achievement library remains fully visible.\nConfirm hidden tags are strictly reserved for narrative plot points or endgame secrets.",
        expected:
          "Most achievements are visible, with hidden categories kept to a low, intentional percentage.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-16",
        gl: "AGL-005",
        ref: "2.16",
        title: "Avoid achievements too heavily dependent on pure chance.",
        type: "best_practice",
        steps:
          "Review any luck-based parameters in achievements (e.g., dropping ultra-rare loot).\nVerify that users can earn the badge through dedication (e.g., 'Examine 100 chests') instead of lucky outcomes (e.g., 'Find an item with a 1% chance in a chest').\nEnsure accomplishments reward player agency.",
        expected:
          "Trophies measure player skill, technique, or exploration progress, without being locked behind raw probability thresholds.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-ACH-17",
        gl: "AGL-005",
        ref: "2.17",
        title: "Cater to dedicated achievement hunters without lockouts.",
        type: "best_practice",
        steps:
          "Analyze major branching paths or decisions in the story.\nVerify that making one choice does not permanently prevent a player from eventually unlocking other achievements on the same profile.\nEnsure players are never placed in an unrecoverable state where 100% completion is forever blocked.",
        expected:
          "The game architecture allows completionists to eventually claim all achievement trophies on a single account profile.",
        originalRef: "Achievements",
      },
      {
        id: "And-GPGS-LEAD-1",
        gl: "AGL-005",
        ref: "3.1",
        title:
          "Make leaderboards visible in your main menu and after key transitions.",
        type: "best_practice",
        steps:
          "Verify launcher or main menu has links or access buttons to leaderboards.\nAlso, check after critical transitions (e.g., game over, level clear) that links to relevant leaderboards are displayed.",
        expected:
          "Leaderboards are accessible directly from the main menu and during key gameplay transitions, keeping players connected to competitive stats.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-2",
        gl: "AGL-005",
        ref: "3.2",
        title: "Define upper limits for scores that can be submitted.",
        type: "best_practice",
        steps:
          "Inspect leaderboard parameters on Google Play Console and client checks.\nVerify that maximum scoring limits are defined to drop/discard fake or impossible values automatically.",
        expected:
          "Upper thresholds are configured to prevent obviously fraudulent or cheated scores from entering leaderboards.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-3",
        gl: "AGL-005",
        ref: "3.3",
        title: "Use custom icons.",
        type: "best_practice",
        steps:
          "Check graphic assets uploaded to Google Play Games Services Console for leaderboards.\nConfirm custom styled icons are provided instead of repeating the default game icon.",
        expected:
          "Distinct custom artwork and individual representative icons are styled for each leaderboard.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-4",
        gl: "AGL-005",
        ref: "3.4",
        title: "Keep the frequency of score submissions appropriate.",
        type: "best_practice",
        steps:
          "Analyze code event triggers for score submission request rate.\nVerify scores are only posted during critical boundaries (e.g. level completion, death) and not continuously or every second.",
        expected:
          "Score synchronization occurs at structured transition events only to avoid network congestion and API spam.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-5",
        gl: "AGL-005",
        ref: "3.5",
        title: "Make use of scoretags.",
        type: "best_practice",
        steps:
          "Review the payload format submitted to leaderboards API.\nEnsure scoretags feature extra metadata (e.g. gameplay proof clips or validity verification flags) as extra context.",
        expected:
          "Scoretags are appended correctly with score updates to attach verification tokens or replay references.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-6",
        gl: "AGL-005",
        ref: "3.6",
        title: "Creatively design your own leaderboard UI.",
        type: "best_practice",
        steps:
          "Verify if custom, themed layouts are drawn in-game to list ranking tables directly.\nConfirm the system queries social leaderboards first, falling back gracefully to public leaderboards if list entries are empty.",
        expected:
          "An immersive, beautifully integrated in-game leaderboards interface is displayed with social filter prioritization.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-LEAD-7",
        gl: "AGL-005",
        ref: "3.7",
        title: "Show players how they stack up against the competition.",
        type: "best_practice",
        steps:
          "Look at the visual scoring window presentation in high-score views.\nConfirm ranking details display a player-centered relative offset window (e.g., +/- 10 spots) to motivate competitive re-playability.",
        expected:
          "Leaderboard panels dynamically focus around the current player's relative performance window to demonstrate local ranking competitive proximity.",
        originalRef: "Leaderboards",
      },
      {
        id: "And-GPGS-FRND-1",
        gl: "AGL-005",
        ref: "4.1",
        title:
          "Show the Play Games Services icon next to users who have a Play Games profile in user lists.",
        type: "required",
        steps:
          "Open any friends list, recently-played list, or social menu in the game.\nFind players who have linked a Play Games profile.\nConfirm that the official Google Play Games logo is visible right next to their name.",
        expected:
          "The official Google Play Games Services icon is rendered prominently beside users who have verified Play Games profiles.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-2",
        gl: "AGL-005",
        ref: "4.1.1",
        title:
          "Ensure the Play Games Services icon is clickable to compare profiles.",
        type: "required",
        steps:
          "Navigate to your social list and locate a player with the Google Play Games icon.\nTap or click directly on the Google Play Games icon near their name.\nConfirm that a comparison interface opens, letting you compare your accomplishments and statistics against theirs.",
        expected:
          "A profile comparison window is correctly presented upon pressing the Google Play Games icon.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-3",
        gl: "AGL-005",
        ref: "4.1.2",
        title:
          "Support player profiles and friend invitations for customizable in-game player names.",
        type: "required",
        steps:
          "Go to your profile options and set up a custom, unique in-game display name different from your main Play Games account name.\nSend a friend invitation or open a profile view with another player.\nConfirm that both players can clearly see your custom nickname alongside your profile, giving clear in-game context to the invitation.",
        expected:
          "Friendship setups convey custom in-game identifiers alongside original Google Play user profiles securely.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-4",
        gl: "AGL-005",
        ref: "4.2",
        title:
          "Differentiate friends from authenticated non-friends using clear icon states.",
        type: "best_practice",
        steps:
          "Look at your list of other players.\nVerify that the game uses two distinct visual status indicators: one emblem to show players who are already your friends, and another style of emblem for players who have authenticated profiles but are not your friends yet.",
        expected:
          "Two highly distinct graphic symbols denote 'Friend' vs 'Not Friend' or 'Unknown' relationships.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-5",
        gl: "AGL-005",
        ref: "4.3",
        title:
          "Keep your friends list automatically updated whenever displaying it.",
        type: "best_practice",
        steps:
          "Open your social list or friends dashboard shortly after booting up the game or linking your account.\nVerify that your Play Games friends list automatically updates in the background, showing all online statuses and newly added friends without you needing to manually trigger a refresh.",
        expected:
          "A fresh state represents current Google Play friendship changes as a result of active background sync triggers.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-6",
        gl: "AGL-005",
        ref: "4.4",
        title:
          "Incorporate Play Games Friends into existing in-game friends trackers.",
        type: "best_practice",
        steps:
          "Open your active social or in-game contact desk.\nCheck if players from your Google Play Games friend network are merged directly into your overall game friends dashboard, and linked friends carry the correct Play Games indicator.",
        expected:
          "The social dashboard unifies direct game contacts and Play Games profiles under a cohesive, marked layout.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-7",
        gl: "AGL-005",
        ref: "4.5",
        title:
          "Do not trigger automatic access requests again if a player has denied friends list permission.",
        type: "best_practice",
        steps:
          "When prompted for permission to access your Play Games friends list, select 'Deny'.\nRestart or navigate around the game, and verify that the game does not continuously spam or auto-prompt you with the same permission dialog unless you explicitly request it.",
        expected:
          "Repeated intrusive permission panels are suppressed following initial negative response from the player.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-8",
        gl: "AGL-005",
        ref: "4.6",
        title:
          "Adorn the interface with an 'Import Play Games Friends' entry point after rejection.",
        type: "best_practice",
        steps:
          "Decline the friends list permission prompt initially.\nGo to your game settings or social menu.\nVerify that there is a clear button labeled 'Import Play Games Friends' (or similar) that lets you manually request set up and grant access on-demand.",
        expected:
          "A prominent user-activated command is provided to let users easily grant friends list access again on-demand.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-FRND-9",
        gl: "AGL-005",
        ref: "4.7",
        title:
          "Ensure secure and consistent social player profile management across platforms.",
        type: "best_practice",
        steps:
          "Log in using multiple different profiles across devices or test accounts.\nVerify that each player profile displays their own correct friends, progress, and usernames consistently, without any profile mixing or incorrect identity links.",
        expected:
          "Backend integration relies on secure API channels to consistently authenticate and parse player identification properties.",
        originalRef: "Friends",
      },
      {
        id: "And-GPGS-QUOTA-1",
        gl: "AGL-005",
        ref: "5.1",
        title:
          "Use modern SDK libraries to automatically optimize connectivity and data caching.",
        type: "best_practice",
        steps:
          "Play the game and navigate between dashboards and menus repeatedly.\nVerify that list elements represent cached structures that load immediately without generating excessive network calls, loading freezes, or heavy battery drainage.",
        expected:
          "Data caching and score filtering occurs seamlessly in the background to minimize server calls.",
        originalRef: "Quota and rate limiting",
      },
      {
        id: "And-GPGS-QUOTA-2",
        gl: "AGL-005",
        ref: "5.2",
        title:
          "Combine frequent incremental progress updates into spaced batch updates.",
        type: "best_practice",
        steps:
          "Generate quick repetitive task actions, such as shooting targets, doing jumps, or harvesting resources.\nVerify that individual progress numbers do not trigger persistent immediate network synchronization, instead bundling increments and updating either at level-end or in fixed milestone groups.",
        expected:
          "Incremental progress is bundled and submitted in batches to optimize network use and battery life.",
        originalRef: "Quota and rate limiting",
      },
      {
        id: "And-GPGS-QUOTA-3",
        gl: "AGL-005",
        ref: "5.3",
        title:
          "Limit automatic data synchronization schedules to essential gameplay transitions.",
        type: "best_practice",
        steps:
          "Play the game continuously and toggle save/load states.\nConfirm that progress-saving synchronization runs at reasonable periodic intervals rather than on every screen touch, and supreme scores publish solely once a round concludes.",
        expected:
          "Synchronization frequency is capped gracefully to prevent battery strain, high network load, and quota exhaustion.",
        originalRef: "Quota and rate limiting",
      },
      {
        id: "And-GPGS-SAVE-1",
        gl: "AGL-005",
        ref: "6.1",
        title: "Add metadata to provide additional context for saved games.",
        type: "required",
        steps:
          "Initiate a save game action or inspect the game saving files screen.\nConfirm that each saved slot includes context details: a representative cover image screenshot of gameplay, a short description of progress, and a timestamp showing how long you have been playing.",
        expected:
          "Saved game files are committed with cover images, progress descriptions, and active duration timestamps.",
        originalRef: "Saved games",
      },
      {
        id: "And-GPGS-SAVE-2",
        gl: "AGL-005",
        ref: "6.2",
        title: "Allow players to load saved games.",
        type: "required",
        steps:
          "In the game settings or main menu, navigate to load a saved file or make a selection from the Google Play Games saved game user interface.\nVerify that selecting a save file correctly loads the exact state, position, and progress corresponding to that entry.",
        expected:
          "Saved games load precisely to the exact gameplay point requested by the player.",
        originalRef: "Saved games",
      },
      {
        id: "And-GPGP-1.1",
        gl: "AGL-006",
        ref: "1.1",
        title: "Child Endangerment",
        steps:
          "1. Review the application's overall content and theme to determine if it is targeted towards children.\n2. If the app allows user-generated content, verify that clear mechanisms exist to report and prohibit exploitation materials.\n3. Check for any in-app features that could promote inappropriate interaction, grooming, or child sexualization.\n4. Confirm that the application has zero tolerance for apps that endanger children, including adult themes marketed to minors.",
        expected:
          "Application fully adheres to the Child Endangerment policy restrictions.",
        policyText:
          "Child Endangerment:\nApps that do not prohibit users from creating, uploading, or distributing content that facilitates the exploitation or abuse of children will be subject to immediate removal from Google Play. This includes all child sexual abuse materials. To report content on a Google product that may exploit a child, click Report abuse. If you find content elsewhere on the internet, please contact the appropriate agency in your country directly.\n\nWe prohibit the use of apps to endanger children. This includes but is not limited to use of apps to promote predatory behavior towards children, such as:\n\n1. Inappropriate interaction targeted at a child (for example, groping or caressing).\n2.Child grooming (for example, befriending a child online to facilitate, either online or offline, sexual contact and/or exchanging sexual imagery with that child).\n3.Sexualization of a minor (for example, imagery that depicts, encourages or promotes the sexual abuse of children or the portrayal of children in a manner that could result in the sexual exploitation of children).\n4.Sextortion (for example, threatening or blackmailing a child by using real or alleged access to a child's intimate images).\n5.Trafficking of a child (for example, advertising or solicitation of a child for commercial sexual exploitation).\n\nWe will take appropriate action, which may include reporting to the National Center for Missing & Exploited Children, if we become aware of content with child sexual abuse materials. If you believe a child is in danger of or has been subject to abuse, exploitation, or trafficking, please contact your local law enforcement and contact a child safety organization listed here.\n\nIn addition, apps that appeal to children but contain adult themes are not allowed, including but not limited to:\n1.Apps with excessive violence, blood, and gore.\n2.Apps that depict or encourage harmful and dangerous activities.\nWe also don't allow apps that promote negative body or self image including apps that depict for entertainment purposes plastic surgery, weight loss, and other cosmetic adjustments to a person's physical appearance.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.2",
        gl: "AGL-006",
        ref: "1.2",
        title: "Sexual Content and Profanity",
        steps:
          "1. Review all in-game content, images, dialogue, and store listings for sexual content, nudity, or sexually suggestive imagery.\n2. Check for any lewd or profane content, slurs, or explicit text within the app or its metadata.\n3. Verify the application does not contain or promote services related to sexually gratifying content or compensation for sexual acts.\n4. Ensure no characters or subjects are depicted in a degrading or objectified manner.",
        expected:
          "Application fully adheres to the Sexual Content and Profanity policy restrictions.",
        policyText:
          "Sexual Content and Profanity :-\nApps are not allowed that contain or promote sexual content or profanity, including pornography, or any content or services intended to be sexually gratifying. App contents are not allowed that appear to promote or solicit a sexual act in exchange for compensation. Apps are not allowed that contain or promote content associated with sexually predatory behavior, or distribute non-consensual sexual content. Content that contains nudity may be allowed if the primary purpose is educational, documentary, scientific or artistic, and is not gratuitous.\n\nHere are some examples of common violations:\n1) Depictions of sexual nudity, or sexually suggestive poses in which the subject is nude, blurred or minimally clothed, and/or where the clothing would not be acceptable in an appropriate public context.\n2) Depictions, animations or illustrations of sex acts, sexually suggestive poses or the sexual depiction of body parts.\n3) Content that depicts or are functionally sexual aids, sex guides, illegal sexual themes and fetishes.\n4) Content that is lewd or profane - including but not limited to content which may contain profanity, slurs, explicit text, adult/sexual keywords in the store listing or in-app.\n5) Content that depicts, describes, or encourages bestiality.\n6) Apps that promote sex-related entertainment, escort services, or other services that may be interpreted as providing sexual acts in exchange for compensation.\n7) Apps that degrade or objectify people.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.3",
        gl: "AGL-006",
        ref: "1.3",
        title: "Hate Speech",
        steps:
          "1. Review all app text, dialogue, and metadata for slurs, stereotypes, or hate symbols.\n2. Ensure no content promotes violence or incites hatred against protected groups.\n3. Verify if any EDSA content related to Nazis is appropriately geo-blocked where required by local laws.",
        expected:
          "Application is free of any hate speech or promotional material for violence/discrimination.",
        policyText:
          "Hate Speech: \nApps are not allowed that promote violence, or incite hatred against individuals or groups based on race or ethnic origin, religion, disability, age, nationality, veteran status, sexual orientation, gender, gender identity, or any other characteristic that is associated with systemic discrimination or marginalization.\nApps which contain EDSA (Educational, Documentary, Scientific, or Artistic) content related to Nazis may be blocked in certain countries, in accordance with local laws and regulations.\n\nHere are examples of common violations:\n• Content or speech asserting that a protected group is inhuman, inferior or worthy of being hated.\n• Apps that contain hateful slurs, stereotypes, or theories about a protected group possessing negative characteristics (e.g. malicious, corrupt, evil, etc.), or explicitly or implicitly claims the group is a threat.\n• Content or speech trying to encourage others to believe that people should be hated or discriminated against because they are a member of a protected group.\n• Content which promotes hate symbols such as flags, symbols, insignias, paraphernalia or behaviors associated with hate groups.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.4",
        gl: "AGL-006",
        ref: "1.4",
        title: "Violence",
        steps:
          "1. Review the app for graphic depictions of realistic violence or threats.\n2. Ensure the app does not promote self-harm, eating disorders, or choking games.\n3. Check if violent depictions are strictly fictional and context-appropriate (like cartoons or hunting games).",
        expected:
          "Application avoids gratuitous, realistic violence and dangerous activities.",
        policyText:
          "Violence :\nDepictions of gratuitous violence or other dangerous activities are not allowed. Apps that depict fictional violence in the context of a game, such as cartoons, hunting or fishing, are generally allowed.\nHere are some examples of common violations:\n - Graphic depictions or descriptions of realistic violence or violent threats to any person or animal.\n - Apps that promote self harm, suicide, eating disorders, choking games or other acts where serious injury or death may result",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.5",
        gl: "AGL-006",
        ref: "1.5",
        title: "Violent Extremism",
        steps:
          "1. Search for content that glorifies, plans, or prepares violence against civilians.\n2. Ensure no recruitment material for dangerous organizations exists.\n3. Check that any EDSA content covering extremism is clearly contextualized.",
        expected:
          "Application is completely clear of terrorist or extremist recruitment/promotion.",
        policyText:
          "Violent Extremism :\nApps are not allowed which permit terrorist organizations, or other dangerous organizations or movements that have engaged in, prepared for, or claimed responsibility for acts of violence against civilians to publish apps on Google Play for any purpose, including recruitment.\n\nApps are not allowed with content related to violent extremism, or content related to planning, preparing, or glorifying violence against civilians, such as content that promotes terrorist acts, incites violence, or celebrates terrorist attacks. If posting content related to violent extremism for an educational, documentary, scientific, or artistic purpose, be mindful to provide relevant EDSA context.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.6",
        gl: "AGL-006",
        ref: "1.6",
        title: "Sensitive Events",
        steps:
          "1. Verify the app does not deny major tragic events or natural disasters.\n2. Ensure no content capitalizes on recent deaths, health crises, or atrocities without discernible benefit to victims.\n3. Review for insensitivity toward ongoing or past conflicts.",
        expected:
          "Application treats tragic events with respect and avoids profiting from suffering.",
        policyText:
          "Sensitive Events: \nApps are not allowed with content which may be deemed as capitalizing on or lacking reasonable sensitivity towards a natural disaster, atrocity, health crisis, conflict, death or other tragic event.\nHere are examples of common violations:\n• Lacking sensitivity regarding the death of a real person or group of people due to suicide, overdose, natural causes, etc.\n• Denying a major tragic event.\n• Appearing to profit from a tragic event with no discernible benefit to the victims.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.7",
        gl: "AGL-006",
        ref: "1.7",
        title: "Bullying and Harassment",
        steps:
          "1. Verify user interactions for potential exploitation, extortion, or blackmail.\n2. Ensure there are tools to prevent public humiliation of individuals.\n3. Checks that no content harasses victims of tragedies or conflicts.",
        expected:
          "Application prevents and strictly prohibits bullying, harassment, and extortion.",
        policyText:
          "Bullying and Harassment:\nApps are not allowed that contain or facilitate threats, harassment, or bullying. Following are the common examples of violations:\n• Bullying victims of international or religious conflicts.\n• Content that seeks to exploit others, including extortion, blackmail, etc.\n• Posting content in order to humiliate someone publicly.\n• Harassing victims, or their friends and families, of a tragic event.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.8",
        gl: "AGL-006",
        ref: "1.8",
        title: "Dangerous Products",
        steps:
          "1. Review any in-app store or external links to ensure no sale of firearms, ammo, or explosives.\n2. Check that the app lacks instructions for manufacturing weapons or converting them to automatic fire.\n3. Ensure restricted firearm accessories are not facilitated.",
        expected:
          "Application does not sell or instruct on the creation of dangerous products.",
        policyText:
          "Dangerous Products :\nApps are not allowed that facilitate the sale of explosives, firearms, ammunition, or certain firearms accessories.\n - Restricted accessories include those that enable a firearm to simulate automatic fire or convert a firearm to automatic fire (e.g. bump stocks, gatling triggers, drop-in auto sears, conversion kits), and magazines or belts carrying more than 30 rounds.\n• Apps are not allowed that provide instructions for the manufacture of explosives, firearms, ammunition, restricted firearm accessories, or other weapons. This includes instructions on how to convert a firearm to automatic, or simulated automatic, firing capabilities",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.9",
        gl: "AGL-006",
        ref: "1.9",
        title: "Marijuana",
        steps:
          "1. Attempt to add marijuana or THC items to an in-app shopping cart if present.\n2. Verify the app does not arrange deliveries or pickups for marijuana.\n3. Check that CBD products with THC are properly restricted from sale.",
        expected:
          "Application strictly prohibits the sale and delivery of marijuana/THC products.",
        policyText:
          "Marijuana\nApps are not allowed that facilitate the sale of marijuana or marijuana products, regardless of legality.\nFew examples of common violations:\n•Allowing users to order marijuana through an in-app shopping cart feature.\n•Assisting users in arranging delivery or pick up of marijuana.\n•Facilitating the sale of products containing THC (Tetrahydrocannabinol), including products such as CBD oils containing THC.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.10",
        gl: "AGL-006",
        ref: "1.10",
        title: "Tobacco and Alcohol",
        steps:
          "1. Ensure the app does not depict or encourage alcohol/tobacco use by minors.\n2. Check for implications that tobacco improves social/athletic standing.\n3. Look for advertising, banners, or links to tobacco-selling sites.\n4. Verify any food/delivery apps that sell alcohol/tobacco implement strict age-gating.",
        expected:
          "Application complies with all rules regarding the display and sale of tobacco/alcohol.",
        policyText:
          "Tobacco and Alcohol\nApps are not allowed that facilitate the sale of tobacco or products containing nicotine (such as e-cigarettes, vape pens and nicotine pouches) or encourage the illegal or inappropriate use of alcohol, tobacco, or nicotine.\nHere are examples of common violations:\n• Depicting or encouraging the use or sale of alcohol or tobacco to minors is not allowed.\n• Implying that consuming tobacco can improve social, sexual, professional, intellectual, or athletic standing is not allowed.\n• Portraying excessive drinking favorably, including the favorable portrayal of excessive, binge or competition drinking is not allowed.\n• Advertisements, promotions, or prominent featuring of tobacco products (includes ads, banners, categories and links out to tobacco selling sites) is not allowed.\n• Google may allow the limited sale of tobacco products in food/grocery delivery apps, in certain regions, and subject to age-gating safeguards (such as ID check at delivery).\n• Google may allow the sale of products marketed as nicotine cessation aids subject to age-gating safeguards.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.11",
        gl: "AGL-006",
        ref: "1.11",
        title: "Financial Services",
        steps:
          "1. Review any financial instruments offered (loans, crypto, trading).\n2. Ensure all risks and fees are transparently disclosed before taking user action.\n3. Check that there are no deceptive UI elements forcing or obscuring financial commitments.",
        expected:
          "Financial instruments presented do not deceive or harm users.",
        policyText:
          "Financial Services : Apps are not allowed that expose users to deceptive or harmful financial instruments",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.12",
        gl: "AGL-006",
        ref: "1.12",
        title: "Binary Options",
        steps:
          "1. Check the app for any feature that allows trading binary options.\n2. Ensure related terminology is not used to obfuscate such trading.\n3. Test the trading workflows to confirm no binary option mechanics exist.",
        expected:
          "Trading of binary options is entirely absent from the application.",
        policyText:
          "Binary Options :\nApps are not allowed that provide users with the ability to trade binary options.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.13",
        gl: "AGL-006",
        ref: "1.13",
        title: "Cryptocurrencies",
        steps:
          "1. Monitor device performance and background tasks for cryptocurrency mining activities.\n2. Ensure any mining features operate strictly as remote-management rather than on-device processing.\n3. Review code traces for integrated mining scripts.",
        expected: "No direct on-device cryptomining is performed by the app.",
        policyText:
          "Cryptocurrencies :\nApps are not allowed that mine cryptocurrency on devices. Apps are permitted that remotely manage the mining of cryptocurrency.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.14",
        gl: "AGL-006",
        ref: "1.14",
        title: "Personal loans",
        steps:
          "1. Verify the app metadata lists the minimum/maximum repayment period, maximum APR, and a representative cost example.\n2. Submit a test application to confirm no short-term personal loans (60 days or less) are offered.\n3. Ensure high APR loans (36%+) are not provided to US users.\n4. Check required regulatory documents in specific countries (India, Indonesia, Nigeria, Kenya, Pakistan, Thailand).",
        expected:
          "Personal loan facilities meet global transparency policies and strict regional lending regulations.",
        policyText:
          'Personal loans :-\nPersonal loans are defined by Google as lending money from one person/organization, or entity to an individual consumer on a nonrecurring basis, not for the purpose of financing purchase of a fixed asset or education. \nPersonal loan consumers require information about the quality, features, fees, risks, and benefits of loan products in order to make informed decisions about whether to undertake the loan.\nExamples: Personal loans, payday loans, peer-to-peer loans, title loans\nNot included: Mortgages, car loans, student loans, revolving lines of credit (such as credit cards, personal lines of credit)\n\nApps for personal loans must disclose the following information in the app metadata:\n1) Minimum and maximum period for repayment\n2) Maximum Annual Percentage Rate (APR), which generally includes interest rate plus fees and other costs for a year, or similar other rate calculated consistently with local law\n3) A representative example of the total cost of the loan, including all applicable fees\n\nApps are not allowed that promote personal loans which require repayment in full in 60 days or less from the date the loan is issued (we refer to these as "short-term personal loans"). This policy applies to apps which offer loans directly, lead generators, and those who connect consumers with third-party lenders.\n\nHigh APR personal loans :-\nApps are not allowed for personal loans where the Annual Percentage Rate (APR) is 36% or higher in United States.\nThis policy applies to apps which offer loans directly, lead generators, and those who connect consumers with third-party lenders.\n\nRequirements for personal loan apps in India and Indonesia - \nPersonal loan apps in India and Indonesia must complete the additional proof of eligibility requirements stated below.\nIndia -\n• Complete the Personal Loan App Declaration for India, and provide necessary documentation to support your declaration.\n• If you are licensed by the Reserve Bank of India (RBI) to provide personal loans, you must submit a copy of your license for our review.\n• If you are not directly engaged in money lending activities and are only providing a platform to facilitate money lending by registered Non-Banking Financial Companies.\n• Ensure that the developer account name reflects the name of the associated registered business name provided through your declaration.\nIndonesia -  \nPersonal loan apps licensed by or registered with the Financial Services Authority are only allowed.\n• Complete the Personal Loan App Declaration for Indonesia, and provide the OJK documentation to support the declaration.\n• Ensure that the developer account name reflects the name of the associated registered business name provided through the declaration.\nNigeria - \nDigital Money Lenders (DML) must adhere to and complete the LIMITED INTERIM REGULATORY/ REGISTRATION FRAMEWORK AND GUIDELINES FOR DIGITAL LENDING, 2022 (as may be amended from time to time) by the Federal Competition and Consumer Protection Commission (FCCPC) of Nigeria and obtain a verifiable approval letter from the FCCPC.\nLoan Aggregators must provide documentation and/or certification for digital lending services and contact details for every partnered DML.\nKenya\n•Digital Credit Providers (DCP) should complete the DCP registration process and obtain a license from the Central Bank of Kenya (CBK). •You must provide a copy of your license from the CBK as part of your declaration.\n•If you are not directly engaged in money lending activities and are only providing a platform to facilitate money lending by registered DCP(s) to users, you will need to accurately reflect this in the declaration and provide a copy of the DCP license of your respective partner(s).\n•Currently, we only accept declarations and licenses from entities published under the Directory of Digital Credit Providers on the official website of the CBK.\nPakistan\n•Each Non-Banking Finance Company (NBFC) lender can only publish one Digital Lending App (DLA). Developers who attempt to publish more than one DLA per NBFC risk the termination of their developer account and any other associated accounts.\n•You must submit proof of approval from the SECP to offer or facilitate digital lending services in Pakistan.\nThailand\n•Personal loan apps targeting Thailand, with interest rates at or above 15%, must obtain a valid license from the Bank of Thailand (BoT) or the Ministry of Finance (MoF). Developers must provide documentation that proves their ability to provide or facilitate personal loans in Thailand. This documentation should include:\n•A copy of their license issued by the Bank of Thailand to operate as a personal loan provider or nano finance organization.\n•A copy of their Pico-finance business license issued by the Ministry of Finance to operate as a Pico or Pico-plus lender.',
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.15",
        gl: "AGL-006",
        ref: "1.15",
        title: "Gambling Apps",
        steps:
          "1. Confirm the app is free to download and does not use Google Play In-app Billing for purchases.\n2. Ensure the rating is AO (Adult Only) or IARC equivalent, and underage gambling safeguards exist.\n3. Test that the app blocks IP connections from countries where the developer lacks a gambling license.\n4. Verify clear, responsible gambling information is prominently displayed.",
        expected:
          "Regulated gambling apps adhere to strict licensing, age-gating, and geographic restrictions.",
        policyText:
          "Gambling Apps :\nGoogle allow apps that are enable or facilitate online gambling in select countries, as long as the Developer completes the application process for gambling apps being distributed on Google Play, is an approved governmental operator and/or is registered as a licensed operator with the appropriate governmental gambling authority in the specified country, and provides a valid operating license in the specified country for the type of online gambling product they want to offer.\nValid licensed or authorized gambling apps that have the following types of online gambling products are allowed by Google.\nOnline Casino games, Sports Betting, Horse Racing (where regulated and licensed separately from Sports Betting), Lotteries, Daily Fantasy Sports.\nBelow mentioned are the specific types of gambling products that are allowed in each country - Eligible apps must meet the following requirements :\n• Developer must successfully complete the application process in order to distribute the app on Play;\n• App must comply with all applicable laws and industry standards for any country in which it is distributed;\n• Developer must have a valid gambling license for each country in which the app is distributed;\n• App must prevent under-age users from gambling in the app;\n• App must prevent use from countries not covered by the developer-provided gambling license;\n• App must NOT be purchasable as a paid app on Google Play, nor use Google Play In-app Billing;\n• App must be free to download and install from the Store;\n• App must be rated AO (Adult Only) or IARC equivalent; and\n• App and its app listing must clearly display information about responsible gambling.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.16",
        gl: "AGL-006",
        ref: "1.16",
        title: "Other Real-Money Games, Contests, and Tournament Apps",
        steps:
          "1. Traverse the app menus to check if users can participate using real money (or purchased in-app items) to win cash prizes.\n2. Look for call-to-action buttons (e.g., “BET!”, “COMPETE!”) that trigger real-money stakes.\n3. Confirm no physical/monetary prizes are being rewarded through wagering.",
        expected:
          "Without a valid gambling license, the app does not allow betting or cash tournaments.",
        policyText:
          "Other Real-Money Games, Contests, and Tournament Apps :\nApps which does not meet the eligibility requirements for gambling Stated above), doesn't allow content or services that enable or facilitate users ability to wager, stake, or participate using real money (including in-app items purchased with money) to obtain a prize of real world monetary value.\nExamples of violations - \n• Games that accept money in exchange for an opportunity to win a physical or monetary prize\n• Apps that have navigational elements or features (e.g. menu items, tabs, buttons, webviews, etc.) that provide a “call to action” to wager, stake, or participate in real-money games, contests or tournaments using real money, such as apps that invite users to “BET!” or “REGISTER!” or “COMPETE!” in a tournament for a chance to win a cash prize.\n• Apps that accept or manage wagers, in-app currencies, winnings, or deposits in order to gamble for, or obtain a physical or monetary prize.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.17",
        gl: "AGL-006",
        ref: "1.17",
        title: "Gamified Loyalty Programs",
        steps:
          "1. Review how loyalty rewards are earned in relation to monetary transactions.\n2. For games, confirm that rewards are given on a fixed ratio, not tied to game performance or chance.\n3. For non-games using a chance/contest system, check that official rules with fixed entry deadlines and transparent ratios are published in the app.",
        expected:
          "Loyalty programs do not serve as stealth gambling mechanisms and disclose clear, fixed rules.",
        policyText:
          "Gamified Loyalty Programs :\nLoyalty programs that reward users with real world prizes or monetary equivalent, are allowed to subject to the following Play Store eligibility requirements.\nFor all apps (games and non-games) - \nLoyalty program benefits, perks, or rewards must be clearly supplementary and subordinate to any qualifying monetary transaction within the app and may not be subject to purchase nor tied to any mode of exchange otherwise in violation of the Real-Money Gambling, Games, and Contests policy restrictions.\nFor example:- No portion of the qualifying monetary transaction may represent a fee or wager to participate in the loyalty program, and the qualifying monetary transaction must not result in the purchase of goods or services above its usual price.\n\nFor Game apps - \nLoyalty points or rewards with benefits, perks or rewards associated with a qualifying monetary transaction may only be awarded and redeemed on a fixed ratio basis, and the earning of benefits or redemptive value may not be wagered, awarded or exponentiated by game performance or chance-based outcomes.\nFor non-Game apps - \nLoyalty points or rewards may be tied to a contest or chance based outcomes if they fulfill the requirements noted below. Loyalty programs with benefits, perks or rewards associated with a qualifying monetary transaction must:\n• Publish official rules for the program within the app\n• Programs involving variable, chance-based, or randomized reward systems: disclose within the official terms.\n• Specify a fixed number of winners, fixed entry deadline, and prize award date, per promotion, within the official terms of a program offering drawings, sweepstakes, or other similar style promotions.\n• Document any fixed ratio for loyalty point or loyalty reward accrual and redemption conspicuously in the app and also within the official terms of the program.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.18",
        gl: "AGL-006",
        ref: "1.18",
        title: "Gambling Ads within Play-distributed apps",
        steps:
          "1. Use the app as an under-18 user and confirm no gambling ads are displayed.\n2. Observe any in-app ads to verify they don't use deceptive UI buttons to disguise gambling promotions.\n3. Verify the app is not enrolled in 'Designed for Families' or targeting minors while showing these ads.",
        expected:
          "Gambling ads are strictly regulated, age-gated, and avoid deceptive UI.",
        policyText:
          "Gambling Ads within Play-distributed apps :\nApps which have ads that promotes gambling, real-money games, contests, and tournaments are allowed if they meet the following requirements:\n• App and ad (including gambling advertisers) must comply with all applicable laws and industry standards for any location where the gambling ad is displayed;\n• Ad must meet local licensing requirements for all gambling-related products and services being promoted;\n• App must not display a gambling ad to individuals known to be under the age of 18;\n• App must not be enrolled in the Designed for Families program;\n• App must not target individuals under the age of 18;\n• App must not provide simulated gambling content (e.g. social casino apps; apps with virtual slot machines);\n• App must not provide gambling or real-money games, lotteries or tournament support functionality (e.g. functionality that assists  with wagering, payouts, sports score/odds tracking, or management of participation funds);\n• You must not have an ownership interest in gambling or real-money games, lotteries or tournament services advertised within the app; \n• App content must not promote or direct users to gambling or real-money games, lotteries or tournament services  \nExamples of violations - \n• App that’s designed for under-age users and shows an ad promoting gambling services\n• Simulated casino game that promotes or directs users to real money casinos\n• Dedicated sports odds tracker app containing integrated gambling ads linking to a sports betting site\n• Apps that have gambling ads that violate our Deceptive Ads policy, such as ads that appear to users as buttons, icons, or other interactive in-app elements",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.19",
        gl: "AGL-006",
        ref: "1.19",
        title: "Illegal Activities",
        steps:
          "1. Browse app shops and communities to check if illegal or prescription drugs without prescriptions are facilitated.\n2. Check for instructions or guides on how to manufacture illegal drugs.\n3. Ensure any activities depicted in games do not actively instruct or encourage real-world illegal actions.",
        expected:
          "App does not promote or supply illegal goods or instructions.",
        policyText:
          "Illegal Activities:  Apps are not allowed that facilitate or promote illegal activities. \nHere are some examples of common violations:\n1) Facilitating the sale or purchase of illegal drugs or prescription drugs without a prescription.\n2) Depicting or encouraging the use or sale of drugs, alcohol, or tobacco by minors.\n3) Instructions for growing or manufacturing illegal drugs.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.20",
        gl: "AGL-006",
        ref: "1.20",
        title: "User Generated Content",
        steps:
          "1. Locate UGC features (forums, messaging, AR anchoring).\n2. Test the reporting and blocking systems by attempting to block a user and report an item.\n3. Ensure terms of use clearly define and prohibit objectionable behaviors before allowing UGC creation.",
        expected:
          "All UGC is governed by clear policies and robust in-app reporting/blocking systems.",
        policyText:
          "User Generated Content :\nUser-generated content (UGC) is content that users contribute to an app, and which is visible to or accessible by at least a subset of the app's users. Objectionable content is content that violates our policies.\nApps that contain or feature UGC must:\n1) require that users accept the app's terms of use and/or user policy before users can create or upload UGC;\n2) define objectionable content and behaviors (in a way that complies with Play’s Developer Program Policies), and prohibit them in the app’s terms of use or user policies; \n3) Conducts UGC moderation, as is reasonable and consistent with the type of UGC hosted by the app. This includes providing an in-app system for reporting and blocking objectionable UGC and users, and taking action against UGC or users where appropriate. Different UGC experiences may require different moderation efforts. For example:\n• Apps featuring UGC that identify a specified set of users through means such as user verification or offline registration (for example, apps exclusively used within a specific school or company, etc.) must provide in-app functionality to report content and users.\n• UGC features that enable 1:1 user interaction with specific users (for example, direct messaging, tagging, mentioning, etc.) must provide an in-app functionality for blocking users.\n• Apps that provide access to publicly accessible UGC, such as social networking apps and blogger apps, must implement in-app functionality to report users and content, and to block users.\n• In the case of augmented reality (AR) apps, UGC moderation (including the in-app reporting system) must account for both objectionable AR UGC (for example, a sexually explicit AR image) and sensitive AR anchoring location (for example, AR content anchored to a restricted area, such as a military base, or a private property where AR anchoring may cause issues for the property owner).\n4) provide safeguards to prevent in-app monetization from encouraging objectionable user behavior.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.21",
        gl: "AGL-006",
        ref: "1.21",
        title: "Incidental Sexual Content",
        steps:
          "1. Identify if the UGC app hides incidental sexual content behind a secondary safe filter.\n2. Confirm it takes at least two actions for a user to disable this filter.\n3. Test age screening systems to ensure children cannot access this app.",
        expected:
          "Incidental sexual content in legitimate UGC platforms is hidden safely by default and age-restricted.",
        policyText:
          "Incidental Sexual Content\nSexual content is considered “incidental” if it appears in a UGC app that (1) provides access to primarily non-sexual content, and (2) does not actively promote or recommend sexual content. Sexual content defined as illegal by applicable law and child endangerment content are not considered “incidental” and are not permitted.\nUGC apps may contain incidental sexual content if all of the following requirements are met:\n• Such content is hidden by default behind filters that require at least two user actions in order to completely disable (for example, behind an obfuscating interstitial or precluded from view by default unless “safe search” is disabled).\n• Children, as defined in the Families policy, are explicitly prohibited from accessing your app using age screening systems such as a neutral age screen or an appropriate system as defined by applicable law.\n• Your app provides accurate responses to the content rating questionnaire regarding UGC, as required by the Content Ratings policy.\nApps whose primary purpose is featuring objectionable UGC will be removed from Google Play. Similarly, apps that end up being used primarily for hosting objectionable UGC, or that develop a reputation among users of being a place where such content thrives, will also be removed from Google Play.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.22",
        gl: "AGL-006",
        ref: "1.22",
        title: "Cryptocurrency Exchanges and Software Wallets",
        steps:
          "1. Review the app's services for purchasing or exchanging cryptocurrency.\n2. Ensure the developer is a certified service operating in regulated jurisdictions.\n3. Validate the app is not published in regions where such products are prohibited.",
        expected:
          "Crypto wallet and exchange apps are properly certified and geo-restricted based on local regulations.",
        policyText:
          "Cryptocurrency Exchanges and Software Wallets\n1)  Purchase, holding, or exchange of cryptocurrencies should be conducted through certified services in regulated jurisdictions.\n2) App must comply with applicable regulations for any region or country that your app targets and avoid publishing your app where your products and services are prohibited.\n3) Google Play may request you to provide additional information or documents regarding your compliance with any applicable regulatory or licensing requirements.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.23",
        gl: "AGL-006",
        ref: "1.23",
        title: "Cryptomining",
        steps:
          "1. Check if the app runs any scripts that consume significant device CPU natively for cryptomining.\n2. Confirm that only remote management tools for external mining operations are provided.",
        expected: "No direct on-device mining is permitted.",
        policyText:
          "Cryptomining\n1) Policy prohibits apps from conducting cryptocurrency mining directly on devices. However, apps that facilitate remote management of cryptocurrency mining operations are permissible within Android guidelines.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.24",
        gl: "AGL-006",
        ref: "1.24",
        title:
          "Transparency Requirements for Distributing Tokenized Digital Assets",
        steps:
          "1. View any in-app products representing a Tokenized Digital Asset.\n2. Ensure the product details explicitly specify that they contain digital assets or NFTs.\n3. Verify the app's promotional material does not glamorize potential trading earnings.",
        expected:
          "Sale of tokenized assets is fully transparent and accurately categorised in the Play Console.",
        policyText:
          "Transparency Requirements for Distributing Tokenized Digital Assets\n1) Apps that sell or enable users to earn Tokenized Digital Assets must declare this via the Financial features declaration form on the App Content page in Play Console.\n2) When creating an in-app product that represents a Tokenized Digital Asset, you must specify this in the product details.\n3) Apps are prohibited from promoting or glamorizing potential earnings from playing or trading activities.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.25",
        gl: "AGL-006",
        ref: "1.25",
        title: "Additional Requirements for NFT Gamification",
        steps:
          "1. Attempt to purchase a bundle of NFTs and confirm the specific contents and values are clear.\n2. Test that NFTs earned are usable within the game rather than mere speculative wagering devices.\n3. Make sure NFTs cannot be staked or gambled for real-world monetary prizes.",
        expected:
          "NFTs are utilized solely to enhance gameplay without functioning as gambling instruments.",
        policyText:
          "Additional Requirements for NFT Gamification\n1) Apps that do not qualify as gambling apps or are not part of Other Real-Money Game Pilots should not accept anything of monetary value in exchange for a chance to obtain an NFT of unknown value.\n2) NFTs purchased by users should be used within the game to enhance the user experience or aid in advancing gameplay.\n3) NFTs must not be used for gambling purposes, including wagering, or staking in exchange for opportunities to win real-world monetary prizes, including other NFTs.\nExamples:\n• Apps that sell bundles of NFTs without disclosing the specific contents and values of the NFTs.\n• Pay-to-play social casino games, such as slot machines, that reward NFTs.",
        originalRef: "Restricted Content",
      },
      {
        id: "And-GPGP-1.26",
        gl: "AGL-006",
        ref: "1.26",
        title: "Unauthorized Use of Copyrighted Content",
        steps:
          "1. Inspect all visual assets (icons, backgrounds, item sprites, promotional banners) for unoriginal, copyrighted material.\n2. Verify the app does not incorporate unauthorized audio tracks or sound effects from popular media.\n3. Check if 'fan art' or modified versions of copyrighted properties are present without verified authorization.",
        expected:
          "All assets are original, appropriately licensed, or public domain.",
        policyText:
          "Unauthorized Use of Copyrighted Content\nWe don’t allow apps that infringe copyright. Modifying copyrighted content may still lead to a violation. Developers may be required to provide evidence of their rights to use copyrighted content.\nFollowing are the examples of copyrighted content that is often used without authorization or a legally valid reason:\n1) Cover art for music albums, video games, and books.\n2) Marketing images from movies, television, or video games.\n3) Artwork or images from comic books, cartoons, movies, music videos, or television.\n4) College and professional sports team logos.\n5) Photos taken from a public figure’s social media account.\n6) Professional images of public figures.\n7) Reproductions or “fan art” indistinguishable from the original work under copyright.\n8) Apps that have soundboards that play audio clips from copyrighted content.\n9) Full reproductions or translations of books that are not in the public domain.",
        originalRef: "Intellectual Property :",
      },
      {
        id: "And-GPGP-1.27",
        gl: "AGL-006",
        ref: "1.27",
        title: "Encouraging Infringement of Copyright",
        steps:
          "1. Check if the app features any functionality allowing users to stream or download copyrighted material without limits/rights.\n2. Ensure the app does not provide instructions, mechanisms, or links to third-party piracy sites.",
        expected:
          "The app does not promote or facilitate the unauthorized acquisition of copyrighted materials.",
        policyText:
          "Encouraging Infringement of Copyright:\nApps are not allowed that induce or encourage copyright infringement. Before you publish your app, look for ways your app may be encouraging copyright infringement and get legal advice if necessary.\n\nFollowing are the examples of common violations:\n1) Streaming apps that allow users to download a local copy of copyrighted content without authorization.\n2) Apps that encourage users to stream and download copyrighted works, including music and video, in violation of applicable copyright law",
        originalRef: "Intellectual Property :",
      },
      {
        id: "And-GPGP-1.28",
        gl: "AGL-006",
        ref: "1.28",
        title: "Trademark Infringement",
        steps:
          "1. Review the app's name, logo, and in-game brand descriptions to ensure they do not replicate existing trademarks.\n2. Confirm whether identical or confusingly similar trademarks are used that might imply false affiliations.",
        expected:
          "App identity and assets do not illegally mimic formal trademarks belonging to other entities.",
        policyText:
          "Trademark Infringement:\n1) Apps are not allowed that infringe on others’ trademarks. A trademark is a word, symbol, or combination that identifies the source of a good or service. Once acquired, a trademark gives the owner exclusive rights to the trademark usage with respect to certain goods or services.\n2) Trademark infringement is improper or unauthorized use of an identical or similar trademark in a way that is likely to cause confusion as to the source of that product. If your app uses another party’s trademarks in a way that is likely to cause confusion, your app may be suspended",
        originalRef: "Intellectual Property :",
      },
      {
        id: "And-GPGP-1.29",
        gl: "AGL-006",
        ref: "1.29",
        title: "Counterfeit",
        steps:
          "1. Verify any physical or digital merchandise sold/promoted via the app is officially branded.\n2. Ensure the app does not distribute counterfeit items mimicking genuine products or attempt to deceive users regarding a brand's authenticity.",
        expected:
          "The application absolutely avoids promoting, housing, or facilitating counterfeit brands and goods.",
        policyText:
          "Counterfeit:\nWe don't allow apps that sell or promote for sale counterfeit goods. Counterfeit goods contain a trademark or logo that is identical to or substantially indistinguishable from the trademark of another. They mimic the brand features of the product in an attempt to pass themselves off as a genuine product of the brand owner.",
        originalRef: "Intellectual Property :",
      },
      {
        id: "And-GPGP-1.30",
        gl: "AGL-006",
        ref: "1.30",
        title: "User Data",
        steps:
          "1. Check the app's privacy policy and in-app disclosures to ensure transparency regarding data collection.\n2. Verify the data usage matches the disclosed purposes and user consent.",
        expected:
          "Complete transparency and adherence to disclosed user data handling practices.",
        policyText:
          "User Data: \nApp must be transparent in how it handles user data (e.g., information collected from or about a user, including device information), disclosing the collection, use, and sharing of the data, and limiting the use of the data to the purposes disclosed, and the consent provided by the user.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.31",
        gl: "AGL-006",
        ref: "1.31",
        title: "Personal and Sensitive Information",
        steps:
          "1. Audit the app to verify it only collects data needed for documented features.\n2. Check that all sensitive data is transmitted securely (e.g., HTTPS).\n3. Ensure runtime permissions are requested before accessing sensitive data.\n4. Confirm the app does not sell personal/sensitive data.",
        expected:
          "Sensitive user data is handled securely, not sold, and collected only for necessary features.",
        policyText:
          "Personal and Sensitive Information : \nPersonal and sensitive user data includes, but isn't limited to, personally identifiable information, financial and payment information, authentication information, phonebook, contacts SMS and call related data, microphone and camera sensor data, and sensitive device or usage data. Following are the guidelines -\n1) App must limit your collection and use of this data to purposes directly related to providing and improving the features of the app (e.g. user anticipated functionality that is documented and promoted in the app's description). Apps that extend usage of this data for serving advertising must be in compliance with our Ads Policy.\n2) App may also transfer data as necessary to service providers or for legal reasons such as to comply with a valid governmental request, applicable law, or as part of a merger or acquisition with legally adequate notice to users.\n3) App must Handle all personal and sensitive user data securely, including transmitting it using modern cryptography (for example, over HTTPS)\n4) App must Use a runtime permissions request whenever available, prior to accessing data gated by Android permissions\n5) Not to sell personal and sensitive user data.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.32",
        gl: "AGL-006",
        ref: "1.32",
        title: "Prominent Disclosure Requirement",
        steps:
          "1. Launch the app and observe if a prominent disclosure is shown before sensitive data is collected.\n2. Check that the disclosure is in-app (not just web/settings), clearly describes what data is collected, and how it's used.\n3. Ensure the consent dialog requires an affirmative tap/check (not an auto-dismiss or passing navigation).",
        expected:
          "Prominent, in-app disclosures and explicit consent dialogs correctly precede any data collection.",
        policyText:
          "Prominent Disclosure Requirement :\nApps requesting users for their personal or sensitive user data provide or improve the features of the app must provide an in-app disclosure of your data collection and use as mentioned below -\n1) Must be within the app itself, not only in the app description or on a website;\n2) Must be displayed in the normal usage of the app and not require the user to navigate into a menu or settings;\n3) Must describe the data being accessed or collected;\n4) Must explain how the data will be used and/or shared;\n5) Cannot only be placed in a privacy policy or terms of service; and\n6) Cannot be included with other disclosures unrelated to personal or sensitive data collection.\n\nSecondarily, the App providing in-app disclosure must include a request for user consent and MUST contain following :\n1) Must present the consent dialog clearly and unambiguously;\n2) Must require affirmative user action (e.g. tap to accept, tick a check-box);\n3) Must not interpret navigation away from the disclosure (including tapping away D361or pressing the back or home button) as consent; and\n4) Must not use auto-dismissing or expiring messages as a means of obtaining user consent.\n5) Must be granted by the user before  app can begin to collect or access the personal and sensitive user data.\nTo meet policy requirements, it’s recommended that you reference the following example format for Prominent Disclosure when it’s required:\n- “[This app] collects/transmits/syncs/stores [type of data] to enable  [\"feature\"], [in what scenario].\"\n- Example: “Fitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising.”\n- Example: “Call buddy collects read and write call log data to enable contact organization even when the app is not in use.”\n\nApp that accesses a user's inventory of installed apps and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.\n\nFitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising\n\nAn app that accesses a user's phone or contact book data and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.33",
        gl: "AGL-006",
        ref: "1.33",
        title: "Privacy Policy",
        steps:
          "1. Open the Play Console data and the app itself to locate the Privacy Policy.\n2. Read the policy to confirm it specifies developer info, data types collected, secure handling procedures, and a clear data retention/deletion policy.",
        expected:
          "A clear, accessible Privacy Policy is present both in the app and on the Play listing.",
        policyText:
          "Privacy Policy\nApps must post a privacy policy in both the designated field in Play Console and within the app itself. The privacy policy must, together with any in-app disclosures, comprehensively disclose how your app accesses, collects, uses, and shares user data, not limited by the data disclosed in the Data Safety section.\nApps should include - \n• Developer information and a privacy point of contact or a mechanism to submit inquiries\n• Disclosing the types of personal and sensitive user data your app accesses, collects, uses, and shares; and any parties with which any personal or • Sensitive user data is shared\n• Secure data handling procedures for personal and sensitive user data\n• Developer’s data retention and deletion policy\n• Clear labeling as a privacy policy (e.g., listed as “privacy policy” in title)",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.34",
        gl: "AGL-006",
        ref: "1.34",
        title: "Account Deletion Requirement",
        steps:
          "1. Create an account within the app.\n2. Look for a clearly visible in-app option to delete the account.\n3. Verify an external web link is provided for account deletion.\n4. Confirm that deletion removes associated data, rather than just freezing the account.",
        expected:
          "Users can readily discover and initiate a true account deletion both in-app and via web.",
        policyText:
          "Account Deletion Requirement\n1) Your app must provide users with the ability to create an account directly within the app.\n2) Users should be able to request deletion of their account from both within the app and through an external method, such as visiting your website.\n3) A clearly visible option for initiating account deletion must be readily discoverable within the app interface.\n4) You must provide a designated URL in the Play Console where users can find information and initiate account deletion.\n5) Deleting an app account, upon user request, necessitates the deletion of all associated user data.\n6) Merely deactivating, disabling, or freezing an account does not qualify as deletion.\n7) If certain data must be retained for legitimate purposes (e.g., security, fraud prevention, regulatory compliance), users must be informed about these practices in your privacy policy.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.35",
        gl: "AGL-006",
        ref: "1.35",
        title: "Usage of App Set ID",
        steps:
          "1. Review any network outgoing data to check if 'App set ID' is sent to advertising networks.\n2. Verify the ID is not linked to Android advertising IDs (AAID) or sensitive data for ads tracking.",
        expected:
          "App set ID is used exclusively for analytics/fraud prevention, never ads personalization.",
        policyText:
          "Usage of App Set ID\nAndroid introduce a new ID to support essential use cases such as analytics and fraud prevention. Such as -\n\n• Usage: App set ID must not be used for ads personalization and ads measurement. \n• Association with personally-identifiable information or other identifiers: App set ID may not be connected to any Android identifiers (e.g., AAID) or any personal and sensitive data for advertising purposes.\n• Transparency and consent: The collection and use of the app set ID and commitment to these terms must be disclosed to users in a legally adequate privacy notification, including your privacy policy.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.36",
        gl: "AGL-006",
        ref: "1.36",
        title: "EU-U.S., Swiss Privacy Shield",
        steps:
          "1. Check if the app targets or accesses personal data from EU/Swiss citizens via Google.\n2. Confirm the app strictly complies with the Privacy Shield framework and related European data security rules.",
        expected:
          "EU and Swiss user data is handled securely under the appropriate privacy shields and laws.",
        policyText:
          "EU-U.S., Swiss Privacy Shield\nApps which access, use, or process personal information made available by Google that directly or indirectly identifies an individual and that originated in the European Union or Switzerland (“EU Personal Information”), then - \n• Comply with all applicable privacy, data security, and data protection laws, directives, regulations, and rules\n• Access, use or process EU Personal Information only for purposes that are consistent with the consent obtained from the individual to whom the EU Personal Information relates\n• Implement appropriate organizational and technical measures to protect EU Personal Information against loss, misuse, and unauthorized or unlawful access, disclosure, alteration and destruction\n• Provide the same level of protection as is required by the Privacy Shield Principles",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.37",
        gl: "AGL-006",
        ref: "1.37",
        title: "Permissions",
        steps:
          "1. Extract the AndroidManifest.xml and review requested permissions.\n2. Match permissions to current app features; flag unneeded or unused permissions.\n3. Test the app by denying permissions to ensure it gracefully handles missing access.",
        expected:
          "Requested permissions are minimal, understood contextually, and tightly connected to current features.",
        policyText:
          "Permissions :\nRequested permissions by app should be simple to understand, and can request permissions that are necessary to implement critical current features or services in your application\nApp is not allowed to use permissions that give access to user or device data for undisclosed, unimplemented, or disallowed features or purposes. Personal or sensitive data accessed through permissions may never be sold.\nRequest permissions to access data in context (via incremental auth), so that users understand why your app is requesting the permission. Use the data only for purposes that the user has consented to. If you later wish to use the data for other purposes, you must ask users and make sure they affirmatively agree to the additional uses",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.38",
        gl: "AGL-006",
        ref: "1.38",
        title: "Restricted Permissions",
        steps:
          "1. Identify if Restricted Permissions (like Call Logs, SMS) are requested.\n2. Deny the restricted permission and check if the app provides a manual alternative.\n3. Confirm data from these permissions is not sold or transferred beyond core functionality needs.",
        expected:
          "Restricted permissions are treated with high sensitivity and users are never forced into granting them.",
        policyText:
          "Restricted Permissions :-\n1) Sensitive user or device data accessed through Restricted Permissions may only be transferred to third parties if necessary to provide or improve current features or services in the app from which the data was collected. App is allowed to transfer data as necessary to comply with applicable law or as part of a merger, acquisition, or sale of assets with legally adequate notice to users. All other transfers or sales of the user data are prohibited.\n2) Respect users’ decisions if they decline a request for a Restricted Permission, and users may not be manipulated or forced into consenting to any non-critical permission. App must accommodate users who do not grant access to sensitive permissions (e.g., allowing a user to manually enter a phone number if they’ve restricted access to Call Logs).\n3) Use of permissions in contravention of official Android developer App permissions best practices or in violation of existing policies (including Elevated Privilege Abuse) are expressly prohibited.\n4) Certain Restricted Permissions may be subject to additional requirements as detailed below. The objective of these restrictions is to safeguard user privacy. We may make limited exceptions to the requirements below in very rare cases where apps provide a highly compelling or critical feature and where there is no alternative method available to provide the feature. We evaluate proposed exceptions against the potential privacy or security impacts on users.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.39",
        gl: "AGL-006",
        ref: "1.39",
        title: "Location Permissions",
        steps:
          "1. Ensure background location isn't requested unless the app offers a compelling, core feature that requires it.\n2. Confirm coarse location is preferred over fine location where applicable.\n3. Check that location data isn't used purely for advertising.",
        expected:
          "Location tracking is tightly scoped and primarily foreground unless heavily justified.",
        policyText:
          'Location Permissions :Apps may not access data protected by location permissions (e.g., ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION) after it is no longer necessary to deliver current features or services in your app.\n\nApp\'s should never request location permissions from users for the sole purpose of advertising or analytics. Apps that extend permitted usage of this data for serving advertising must be in compliance with our Ads Policy.\n\nApps should request the minimum scope necessary (i.e., coarse instead of fine, and foreground instead of background) to provide the current feature or service requiring location and users should reasonably expect that the feature or service needs the level of location requested. For example, we may reject apps that request or access background location without compelling justification.\n\nBackground location may only be used to provide features beneficial to the user and relevant to the core functionality of the app.\n\nApps are allowed to access location using foreground service (when the app only has foreground access e.g.: "while in use") permission if the use:\n1) has been initiated as a continuation of an in-app user-initiated action, and\n2) is terminated immediately after the intended use case of the user-initiated action is completed by the application.',
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.40",
        gl: "AGL-006",
        ref: "1.40",
        title: "Package (App) Visibility Permission",
        steps:
          "1. Search for 'QUERY_ALL_PACKAGES' in the manifest.\n2. Verify if broad visibility is absolutely necessary for the app to function (e.g., an antivirus or launcher).\n3. Replace broad app visibility queries with targeted approaches if specific packages are known.",
        expected:
          "Broad app visibility permissions are restricted to verified utility/launcher apps and absent otherwise.",
        policyText:
          "Package (App) Visibility Permission :-\nApps that have a core purpose to launch, search, or interoperate with other apps on the device, may obtain scope-appropriate visibility to other installed apps on the device as outlined below\nBroad app visibility : Capability of an app to have extensive (or “broad”) visibility of the installed apps (“packages”) on a device.\n• For apps targeting API level 30 or later, broad visibility to installed apps via the QUERY_ALL_PACKAGES permission is restricted to specific use cases where awareness of and/or interoperability with any and all apps on the device are required for the app to function. \n• You may not use QUERY_ALL_PACKAGES if your app can operate with a more targeted scoped package visibility declaration(e.g. querying and interacting with specific packages instead of requesting broad visibility).\n• Use of alternative methods to approximate the broad visibility level associated with QUERY_ALL_PACKAGES permission are also restricted to user-facing core app functionality and interoperability with any apps discovered via this method.\n• Please see this Help Center article for allowable use cases for the QUERY_ALL_PACKAGES permission.\n\nLimited app visibility : Limited visibility is when an app minimizes access to data by querying for specific apps using more targeted (instead of “broad”) methods\n• Visibility to the inventory of installed apps on a device must be directly related to the core purpose or core functionality that users access within your app. \n• App inventory data queried from Play-distributed apps may never be sold nor shared for analytics or ads monetization purposes.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.41",
        gl: "AGL-006",
        ref: "1.41",
        title: "Accessibility API",
        steps:
          "1. Test if the app requests Accessibility services.\n2. Confirm it does not stealthily change system settings or prevent uninstalls using the API.\n3. Ensure the service isn't used to bypass built-in privacy controls.",
        expected:
          "Accessibility APIs are strictly used to assist users, not for deceptive configuration changes.",
        policyText:
          "Accessibility API :-\nThe Accessibility API cannot be used to:\n• Change user settings without their permission unless authorized by a parent or guardian through a parental control app or by authorized administrators through enterprise management software; \n• Prevent the ability for users to disable or uninstall any app or service, \n• Work around Android built-in privacy controls and notifications, or\n• Change or leverage the user interface in a way that is deceptive or otherwise violates Google Play Developer Policies",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.42",
        gl: "AGL-006",
        ref: "1.42",
        title: "Device and Network Abuse",
        steps:
          "1. Test the app for background activities that circumvent power management without being whitelisted.\n2. Verify the application doesn't block other apps from displaying ads.\n3. Ensure 'USE_FULL_SCREEN_INTENT' isn't abused to push disruptive notifications.\n4. Confirm all downloaded code/SDKs are hosted safely and are not arbitrary executables.",
        expected:
          "The app respects the device ecosystem, system limits, and other applications on the user's device.",
        policyText:
          "Device and Network Abuse: \nApps are not allowed on store that interfere with, disrupt, damage, or access in an unauthorized manner the user’s device, other devices or computers, servers, networks, application programming interfaces (APIs), or services, including but not limited to other apps on the device, any Google service, or an authorized carrier’s network. \nApps on Google Play must comply with the default Android system optimization requirements documented in the Core App Quality guidelines for Google Play.\nExamples of common violations -\n• Apps that block or interfere with another app displaying ads.\n• Game cheating apps that affect the gameplay of other apps.\n• Apps that facilitate or provide instructions on how to hack services, software or hardware, or circumvent security protections.\n• Apps that access or use a service or API in a manner that violates its terms of service.\n• Apps that are not eligible for whitelisting and attempt to bypass system power management .\n• Apps that facilitate proxy services to third parties may only do so in apps where that is the primary, user-facing core purpose of the app.\n• Apps or third party code (e.g., SDKs) that download executable code, such as dex files or native code, from a source other than Google Play.\n• Apps that install other apps on a device without the user's prior consent.\n• Apps that link to or facilitate the distribution or installation of malicious software.\n• Apps or third party code (e.g., SDKs) containing a WebView with added JavaScript Interface that loads untrusted web content.\n• Apps that use the full-screen intent permission to force user interaction with disruptive ads or notifications.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.43",
        gl: "AGL-006",
        ref: "1.43",
        title: "Deceptive Behavior",
        steps:
          "1. Playtest the app to confirm its actual function matches its store description and screenshots.\n2. Look for UI elements that mimic Android system notifications or warnings.\n3. Verify the app doesn't incentivize users into rating or uninstalling third-party apps.",
        expected:
          "App operates precisely as marketed without system mimicry or functional deception.",
        policyText:
          "Deceptive Behavior:\nApps are not allowed that  that attempt to deceive users or enable dishonest behavior including but not limited to apps which are determined to be functionally impossible. Apps must provide an accurate disclosure, description and images/video of their functionality in all parts of the metadata and should perform as reasonably expected by the user. Apps must not attempt to mimic functionality or warnings from the operating system or other apps. Any changes to device settings must be made with the user's knowledge and consent and be easily reversible by the user.\n• Apps must not encourage, incentivize or mislead users into removing or disabling third-party apps except as part of a security service provided by the app.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.44",
        gl: "AGL-006",
        ref: "1.44",
        title: "Misleading Claims",
        steps:
          "1. Check the app title and description for false affiliations (like 'Official Government App').\n2. Ensure the app doesn't claim medically impossible or physically unfeasible tasks (like an insect repellent audio tool).\n3. Ensure the app is correctly categorized in the Play Console.",
        expected:
          "Descriptions and titles reflect only the real, achievable capabilities of the app.",
        policyText:
          "Misleading Claims : \nApps are not allowed that contain false or misleading information or claims, including in the description, title, icon, and screenshots.\nExamples of common violations\n1) Apps that misrepresent or do not accurately and clearly describe their functionality:\n2) An app that claims to be a racing game in its description and screenshots, but is actually a puzzle block game using a picture of a car.\n3) An app that claims to be an antivirus app, but only contains a text guide explaining how to remove viruses.\n4) Apps that feature medical or health-related content or functionalities that are misleading or potentially harmful.\n5) Apps that claim functionalities that are not possible to implement, such as insect repellent apps, even if it is represented as a prank, fake, joke, etc.\n6) Apps that are improperly categorized, including but not limited to the app rating or app category.\n7) Demonstrably deceptive or false content that may interfere with voting processes.\n8) Apps that falsely claim affiliation with a government entity or to provide or facilitate government services for which they are not properly authorized.\n9) Apps that falsely claim to be the official app of an established entity. Titles like “Justin Bieber Official” are not allowed without the necessary permissions or rights.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.45",
        gl: "AGL-006",
        ref: "1.45",
        title: "Deceptive Device Settings Changes",
        steps:
          "1. Confirm the app does not alter home screen shortcuts, bookmarks, or system settings outside its purview.\n2. Verify any authorized settings modifications are easily reversible.\n3. Ensure ads served in the app do not modify device settings.",
        expected:
          "The app strictly obeys system boundaries and user configurations.",
        policyText:
          "Deceptive Device Settings Changes :\n Apps are not allowed that make changes to the user’s device settings or features outside of the app without the user’s knowledge and consent. Device settings and features include system and browser settings, bookmarks, shortcuts, icons, widgets, and the presentation of apps on the home screen.\n\nAdditionally, following settings are not allowed:\n- Apps that modify device settings or features with the user’s consent but do so in a way that is not easily reversible.\n- Apps or ads that modify device settings or features as a service to third parties or for advertising purposes.\n- Apps that mislead users into removing or disabling third-party apps or modifying device settings or features.\n- Apps that encourage or incentivize users into removing or disabling third-party apps or modifying device settings or features unless it is part of a verifiable security service.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.46",
        gl: "AGL-006",
        ref: "1.46",
        title: "Enabling Dishonest Behavior",
        steps:
          "1. Ensure the app does not create fake IDs, forged diplomas, or fake credit cards (even if labeled as a 'prank').\n2. Test that it doesn't display real-world PII of non-consenting users.\n3. Ensure core functionality doesn't drastically change post-review without store listing updates.",
        expected:
          "No deceptive generation engines or hidden proxy logic exist in the app.",
        policyText:
          'Enabling Dishonest Behavior :\n1) Apps are not allowed that help users to mislead others, including, but not limited to, apps that generate or facilitate the generation of ID cards, social security numbers, passports, diplomas, credit cards and driver\'s licenses. \n2) Any claim that an app is a "prank", "for entertainment purposes" (or other synonym) does not exempt an app from application of our policies.\n3) Apps must provide accurate disclosures, titles, descriptions and images/video regarding the app\'s functionality and/or content and should perform as reasonably and accurately expected by the user.\n\nExamples of common violations - \n• Apps that mimic other apps or websites to trick users into disclosing personal or authentication information.\n• Apps that depict or display unverified or real world phone numbers, contacts, addresses, or personally identifiable information of non-consenting individuals or entities.\n• Apps with different core functionality based on a user’s geography, device parameters, or other user-dependent data where those differences are not prominently advertised to the user in the store listing.  \n• Apps that change significantly between versions without alerting the user (e.g., ‘what’s new’ section) and updating the store listing.\n• Apps that attempt to modify or obfuscate behavior during review.\n• Apps with content delivery network (CDN) facilitated downloads that fail to prompt the user and disclose the download size prior to downloading.',
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.47",
        gl: "AGL-006",
        ref: "1.47",
        title: "Manipulated Media",
        steps:
          "1. If the app facilitates deepfakes or altered media, ensure it embeds prominent watermarks.\n2. Confirm the app does not encourage generating false news clips or sensitive event manipulation.",
        expected:
          "Altered media tools implement clear disclaimers and visible watermarks on outputs.",
        policyText:
          "Manipulated Media :\n- Apps that promote or help create false or misleading information or claims conveyed through imagery, videos and/or text are not allowed. \n- Apps that determined to promote or perpetuate demonstrably misleading or deceptive imagery, videos and/or text, which may cause harm pertaining to a sensitive event, politics, social issues, or other matters of public concern.\n- Apps that manipulate or alter media, beyond conventional and editorially acceptable adjustments for clarity or quality, must prominently disclose or watermark altered media when it may not be clear to the average person that the media has been altered.\nExamples of common violations - \n• Apps adding a public figure to a demonstration during a politically sensitive event.\n• Apps using public figures or media from a sensitive event to advertise media altering capability within an app's store listing.\n• Apps that alter media clips to mimic a news broadcast.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.48",
        gl: "AGL-006",
        ref: "1.48",
        title: "Behavior Transparency",
        steps:
          "1. Audit the source code and app bundles for hidden 'dormant' features that wait until post-launch.\n2. Make sure UI flows are reasonably clear and avoid trick-based interactions.",
        expected:
          "The app limits itself strictly to transparent, documented behavior.",
        policyText:
          "Behavior Transparency\nApp’s functionality should be reasonably clear to users; don't include any hidden, dormant, or undocumented features within the app. Techniques to evade app reviews are not allowed. Apps may be required to provide additional details to ensure user safety, system integrity, and policy compliance.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.49",
        gl: "AGL-006",
        ref: "1.49",
        title: "Misrepresentation",
        steps:
          "1. Verify the developer account details match the app's apparent origin and purpose.\n2. Ensure the app is not coordinating artificially with other apps to manipulate user metrics or hide its origin.",
        expected:
          "Developer identities and the country of origin accurately match what is publicly represented.",
        policyText:
          "Misrepresentation:\nApps or developer accounts are not allowed that are - \n• Impersonate any person or organization, or that misrepresent or conceal their ownership or primary purpose, that engage in coordinated activity to mislead users. This includes, but isn’t limited to, apps or developer accounts that misrepresent or conceal their country of origin and that direct content at users in another country.\n• Coordinate with other apps, sites, developers, or other accounts to conceal or misrepresent developer or app identity or other material details, where app content relates to politics, social issues or matters of public concern.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.50",
        gl: "AGL-006",
        ref: "1.50",
        title: "Google Play's Target API Level Policy",
        steps:
          "1. Check the build.gradle or manifest for the targetSdkVersion.\n2. Ensure it targets an API level released within the last year for new apps, or two years for updates.\n3. Compile to confirm no deprecated APIs conflict with the target level.",
        expected:
          "The application targets the most recent, secure Android API standards.",
        policyText:
          "Google Play's Target API Level Policy\n1) New Apps and Updates:\n•Apps must target an Android API level within one year of the latest major Android version release.\n•Failure to meet this requirement will prevent new app submissions in Play Console.\n2) Existing Apps:\n•Apps on Google Play must target an API level within two years of the latest major Android version release.\n•Apps that do not comply will not be available to new users on devices running newer Android OS versions.\n•Existing users who have installed the app from Google Play can still discover, re-install, and use the app on any supported Android OS version.",
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.51",
        gl: "AGL-006",
        ref: "1.51",
        title: "SDK Requirements",
        steps:
          "1. Review all third-party SDKs imported into the app (e.g., ads, analytics).\n2. Verify the SDKs do not covertly steal OAuth tokens, AAIDs, locations, or bypass the permission model.\n3. Ensure SDK usage matches user consent scopes (e.g. data given to an anti-fraud SDK is not used for ads).",
        expected:
          "Integrated SDKs meet the same privacy, security, and consent burdens as native code.",
        policyText:
          'SDK Requirements\nPersonal and Sensitive User Data\n•Limit the access, collection, use, and sharing of personal and sensitive user data acquired through the app to app and service functionality and policy conforming purposes reasonably expected by the user:\n•Apps that extend usage of personal and sensitive user data for serving advertising must comply with Google Play’s Ads policy.\n•Handle all personal and sensitive user data securely, including transmitting it using modern cryptography (for example, over HTTPS).\n•Use a runtime permissions request whenever available, prior to accessing data gated by Android permissions\nSale of Personal and Sensitive User Data\nDo not sell personal and sensitive user data.\n•"Sale" means the exchange or transfer of personal and sensitive user data to a third party for monetary consideration.\n•User-initiated transfer of personal and sensitive user data (for example, when the user is using a feature of the app to transfer a file to a third party, or when the user chooses to use a dedicated purpose research study app), is not regarded as sale.\nProminent Disclosure & Consent Requirements\nYour app’s access, collection, use, or sharing of personal and sensitive user data may not be within the reasonable expectation of the user of the product or feature in question, you must meet the prominent disclosure and consent requirements of the User Data policy.\nExamples of SDK-caused violations\n•An app with an SDK that collects personal and sensitive user data and doesn’t treat this data as subject to this User Data policy, access, data handling (including disallowed sale), and prominent disclosure and consent requirements.\n•An app integrates an SDK that collects personal and sensitive user data by default in violation of this policy’s requirements regarding user consent and prominent disclosure.\n•An app with an SDK that claims to collect personal and sensitive user data only to provide anti-fraud and anti-abuse functionality for the app, but the SDK also shares the data it collects with third parties for advertising or analytics.\n•An app includes an SDK that transmits users’ installed packages information without meeting the prominent disclosure guidelines and/or privacy policy guidelines.\n•An app using an SDK which links Android ID and Location\n•An app with an SDK which connects AAID to persistent device identifiers for any advertising purpose or analytics purpose.\n•An app using an SDK that connects AAID and email address for analytics purposes.\n•Your app includes an SDK which requests location in the background for an unallowed or undisclosed purpose.\n•Your app includes an SDK which transmits IMEI derived from the read_phone_state Android permission without user consent.\n•An app that includes SDK libraries from providers that distribute malicious software.\n•An app that violates the Android permissions model, or steals credentials (such as OAuth tokens) from other apps.\n•Apps that abuse features to prevent them from being uninstalled or stopped.\n•An app that disables SELinux.\n•An app includes an SDK that violates the Android permissions model by gaining elevated privileges through the access of device data for an undisclosed purpose.\n•An app includes an SDK with code that tricks users into subscribing to or purchasing content via their mobile phone bill.\nTransparent behavior and clear disclosures\nAll code should deliver on promises made to the user. Apps should provide all communicated functionality. Apps should not confuse users.\n•Example violations:\noAd fraud\noSocial Engineering\n\nProtect user data\nBe clear and transparent about the access, use, collection, and sharing of personal and sensitive user data. Uses of user data in must adhere to all relevant User Data Policies, where applicable, and take all precautions to protect the data.\nExample violations:\n•Data Collection (cf Spyware)\n•Restricted Permissions abuse',
        originalRef: "Privacy, Security, and Deception",
      },
      {
        id: "And-GPGP-1.52",
        gl: "AGL-006",
        ref: "1.52",
        title: "Mobile Unwanted Software",
        steps:
          "1. Review the app for deceptive promises or trick installations (e.g., bundling).\n2. Verify app transparency and user approval flows for significant changes.\n3. Check for accurate representation of device status, ensuring no fake security alerts.",
        expected:
          "The app delivers clear, expected functionality without deception, bundles, or system alterations.",
        policyText:
          "Key Characteristics of Unwanted Software:\n1) Deceptive Promises: Claims value that it fails to deliver.\n2) Trick Installations: Misleads users into installation or bundles with other software without disclosure.\n3) Lack of Transparency: Fails to communicate significant functions clearly.\n4) Unexpected System Effects: Alters user systems in unforeseen ways.\n5) Privacy Violations: Collects or transmits personal information without user consent or secure handling.\n6) Bundling: Is included with other software without proper notification.\nGoogle commits to taking action against software that violates these principles to protect users and maintain a healthy software ecosystem. The Mobile Unwanted Software policy will continue to evolve to address emerging threats.\n\nApps must fulfill the promises made to users and provide clear, communicated functionality without causing confusion. \nKey requirements include:\n1) Transparency: Apps should clearly outline their functionality and objectives, explaining any system changes they will implement.\n2) User Approval: Users must be allowed to review and approve significant installation options and changes.\n3) Accuracy: Apps must not misrepresent the status of the user’s device, such as falsely claiming critical security issues or infections.\n4) Integrity: Invalid practices to boost ad traffic or conversions are prohibited.\n5) Impersonation: Apps must not mislead users by impersonating other developers, companies, or apps.\nExample Violations:\nAd fraud\nSocial engineering\n\nTo protect user data and privacy, apps must:\n1) Transparency: Clearly communicate how personal and sensitive data is accessed, used, collected, and shared, in compliance with relevant User Data policies.\n2) User Consent: Obtain user agreement before collecting any data, including details about third-party accounts, location, and other sensitive information.\n3) Data Security: Handle collected data securely, ensuring transmission uses modern encryption methods like HTTPS.\n4) Functional Relevance: Only transmit personal data that is necessary for the app's functionality.\n5) Avoid Deception: Do not mislead users into disabling device security features, such as Google Play Protect, for additional app benefits.\nExample Violations:\nUnauthorized data collection (akin to spyware)\nMisuse of restricted permissions\n\nThe mobile user experience should be clear, straightforward, and aligned with user choices, providing a distinct value without disruption. Key principles include:\n1) Clarity: The user experience must be easy to understand and not interfere with the expected functionality.\n2) Ad Presentation: Ads should not disrupt usability, appear unexpectedly, or require complex dismissals without proper consent and attribution.\n3) Non-Interference: Apps should not disrupt other applications or device usability.\n4) Clear Uninstall Options: Users should have clear options for uninstalling apps.\n5) Avoid Mimicking System Prompts: Apps must not imitate device OS prompts or suppress important alerts from other apps.\nExample Violations:\nDisruptive ads\nUnauthorized use or imitation of system functionality",
        originalRef: "Mobile Unwanted Software",
      },
      {
        id: "And-GPGP-1.53",
        gl: "AGL-006",
        ref: "1.53",
        title: "Hostile Downloader",
        steps:
          "1. Ensure the app does not contain code designed to download and install mobile unwanted software (MUwS).\n2. Confirm the app does not drive downloads without user interaction.",
        expected:
          "The app does not act as a hostile downloader spreading MUwS.",
        policyText:
          "Code that isn't in itself unwanted software, but downloads other mobile unwanted software (MUwS).\nCode may be a hostile downloader if:\n1) There is reason to believe it was created to spread MUwS and it has downloaded MUwS or contains code that could download and install apps; or\n2) At least 5% of apps downloaded by it are MUwS with a minimum threshold of 500 observed app downloads (25 observed MUwS downloads).\n3) Major browsers and file-sharing apps aren't considered hostile downloaders as long as:They don't drive downloads without user interaction; and All software downloads are initiated by consenting users.",
        originalRef: "Mobile Unwanted Software",
      },
      {
        id: "And-GPGP-1.54",
        gl: "AGL-006",
        ref: "1.54",
        title: "Ad Fraud",
        steps:
          "1. Monitor network traffic to ensure no invisible or fake clicking activity is artificially generating ad revenue.\n2. Prevent apps from rendering out-of-context ads or modifying system device IDs to falsely attribute installs.",
        expected:
          "The app does not participate in any ad fraud, invalid clicks, or misrepresentation of ad inventory.",
        policyText:
          "Ad fraud is strictly forbidden and involves generating interactions that deceive ad networks into thinking traffic comes from genuine user interest. This type of invalid traffic can occur through methods such as displaying hidden ads, automatically clicking on ads, or manipulating information. Such practices may involve non-human actions (like bots) or intentional human activities aimed at creating invalid traffic. Ad fraud is detrimental to advertisers, developers, and users, undermining trust in the mobile advertising ecosystem in the long run.\n\nExamples of common violations-\n1) An app that renders ads that are not visible to the user.\n2) An app that automatically generates clicks on ads without the user's intention or that produces equivalent network traffic to fraudulently give click credits.\n3) An app sending fake installation attribution clicks to get paid for installations that did not originate from the sender’s network.\n4) An app that pops up ads when the user is not within the app interface.\n5) False representations of the ad inventory by an app, for example, an app that communicates to ad networks that it is running on an iOS device when it is in fact running on an Android device; an app that misrepresents the package name that is being monetized.",
        originalRef: "Mobile Unwanted Software",
      },
      {
        id: "And-GPGP-1.55",
        gl: "AGL-006",
        ref: "1.55",
        title: "Mimicking System Functionality",
        steps:
          "1. Audit in-app dialogs and notifications to ensure they don't mimic native system warnings or OS updates.\n2. Confirm system-level notification mechanisms are only used for the app's integral features.",
        expected:
          "App interfaces and notifications do not mimic OS features to trick users.",
        policyText:
          "Apps and Ads are not allowed that mimic or interfere with system functionality, such as  notifications or warnings. System level notifications may only be used for an app’s integral features, such as an airline app that notifies users of special deals, or a game that notifies users of in-game promotions.",
        originalRef: "Mobile Unwanted Software",
      },
      {
        id: "And-GPGP-1.56",
        gl: "AGL-006",
        ref: "1.56",
        title: "Impersonation",
        steps:
          "1. Verify the app isn't pretending to be another app, company, or developer.\n2. Assure users aren't deceived into giving login credentials meant for another trusted app.",
        expected:
          "The app maintains a clear, distinct identity and does not impersonate other trusted entities.",
        policyText:
          "Apps are not allowed that pretend to be another app with the intention of deceiving users into performing actions that the user intended for the original trusted app.",
        originalRef: "Mobile Unwanted Software",
      },
      {
        id: "And-GPGP-1.57",
        gl: "AGL-006",
        ref: "1.57",
        title: "Payments & In-App Purchases",
        steps:
          "1. Verify if the app offers digital goods, subscriptions, or virtual currencies.\n2. Confirm Google Play In-app Billing is used as the payment method for these items.\n3. Check for transparent pricing and loot box odds disclosures before purchase.",
        expected:
          "All digital purchases utilize Play Billing, with clear pricing and odds where applicable.",
        policyText:
          "Payments:Apps that employ in-store or in-app purchases must comply with the following guidelines:\n1. In-store purchases: Developers charging for apps and downloads from Google Play must use Google Play’s payment system.\n\n2. In-app purchases: Apps that employ in-store or in-app purchases must comply with the following guidelines:\n• Developers offering products within a game downloaded from Google Play or providing access to game content must use Google Play In-app Billing as the method of payment.\n• Play-distributed apps requiring or accepting payment for access to in-app features or services, including any app functionality, digital content or goods (collectively “in-app purchases”), must use Google Play’s billing system for those transactions\nExamples of app features or services requiring use of Google Play's billing system include, but are not limited to, in-app purchases of:\n• Items (such as virtual currencies, extra lives, additional playtime, add-on items, characters and avatars)\n• Subscription services (such as fitness, game, dating, education, music, video, service upgrades and other content subscription services)\n• App functionality or content (such as an ad-free version of an app or new features not available in the free version); and\n• Cloud software and services (such as data storage services, business productivity software, and financial management software)\n5. In-app virtual currencies must only be used within the app or game title for which they were purchased.\n6. Developers must clearly and accurately inform users about the terms and pricing of their app or any in-app features or subscriptions offered for purchase. App listing must clearly notify users that payment is required to access those features.\n7. Apps and games offering mechanisms to receive randomized virtual items from a purchase including, but not limited to, “loot boxes” must clearly disclose the odds of receiving those items in advance of, and in close and timely proximity to, that purchase.\n8. Unless the conditions described in Section 3 apply, developers of Play-distributed apps on mobile phones and tablets requiring or accepting payment from users in South Korea for access to in-app purchases may offer users an in-app billing system in addition to Google Play's billing system for those transactions if they successfully complete the additional in-app billing system declaration form and agree to the additional terms and program requirements included therein.\n9. Developers of Play-distributed apps may lead users in the European Economic Area (EEA) outside the app, including to promote offers for digital in-app features and services. Developers who lead EEA users outside the app must successfully complete the declaration form for the program and agree to the additional terms and program requirements included therein.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.58",
        gl: "AGL-006",
        ref: "1.58",
        title: "Payments - External Systems & Exceptions",
        steps:
          "1. Identify purchases of physical goods/services or those exempt from Play Billing.\n2. Ensure the app does not lead users to external payment methods for digital goods (unless exceptions like South Korea/EEA forms are completed).",
        expected:
          "External payments are only used for physical goods/exempt categories.",
        policyText:
          "3. Google Play's billing system must not be used in cases where:\na) Payment is primarily for the purchase or rental of physical goods (such as groceries, clothing, housewares, electronics);\nb) For the purchase of physical services (such as transportation services, cleaning services, airfare, gym memberships, food delivery, tickets for live \nc) Remittance in respect of a credit card bill or utility bill\nd) Payments include peer-to-peer payments, online auctions, and tax exempt donations;\ne) Payment is for content or services that facilitate online gambling, as described in the Gambling Apps section of the Real-Money Gambling, Games, and Contests policy;\nf) Payment is in respect of any product category deemed unacceptable under Google’s Payments Center Content Policies.\n4. As per Section 3 and Section 8, apps may not lead users to a payment method other than Google Play's billing system. This prohibition includes, but is not limited to, leading users to other payment methods via:\n• An app’s listing in Google Play\n• In-app promotions related to purchasable content\n• In-app webviews, buttons, links, messaging, advertisements or other calls to action\n• In-app user interface flows, including account creation or sign-up flows",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.59",
        gl: "AGL-006",
        ref: "1.59",
        title: "Subscriptions, Free Trials & Cancellation",
        steps:
          "1. Audit subscription flows, splash screens, and free trials for clear terms (billing cycle, cost).\n2. Verify the presence of an easy-to-find subscription cancellation interface or instructions.",
        expected:
          "Subscription terms are fully transparent without requiring extra action, and cancellations are supported.",
        policyText:
          "Subscriptions : App must not mislead users about any subscription services or content you offer within your app. It is critical to communicate clearly in any in-app promotions or splash screens. \nIn your app: You must be transparent about your offer. This includes being explicit about your offer terms, the cost of your subscription, the frequency of your billing cycle, and whether a subscription is required to use the app. Users should not have to perform any additional action to review the information.\n\nFree Trials & Introductory Offers :\nBefore enrolling any user in the subscription, App must clearly and accurately describe the terms of your offer, including the duration, pricing, and description of accessible content or services. Be sure to let your users know how and when a free trial will convert to a paid subscription, how much the paid subscription will cost, and that a user can cancel if they do not want to convert to a paid subscription.\n\nSubscription Management & Cancellation\nApp(s) should clearly disclose how a user can manage or cancel their subscription. If a user cancels a subscription purchased from an app on Google Play, as per the Google policy, the user will not receive a refund for the current billing period, but will continue to receive their subscription content for the remainder of the current billing period, regardless of the cancellation date. The user's cancellation goes into effect after the current billing period has passed.You (as the content or access provider) may implement a more flexible refund policy with your users directly. It is your responsibility to notify your users of any changes to your subscription, cancellation and refund policies and ensure that the policies comply with applicable law.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.60",
        gl: "AGL-006",
        ref: "1.60",
        title: "Deceptive & Disruptive Ads",
        steps:
          "1. Ensure ads only display inside the app serving them and do not pose as system warnings.\n2. Confirm interstitial ads are easily dismissible without forcing clicks or personal data submission.",
        expected:
          "Ads are clearly identifiable, easily dismissible, and non-disruptive to the user experience.",
        policyText:
          "ADS: Apps are not allowed that contain deceptive or disruptive ads. Ads must only be displayed within the app serving them. We consider ads served in your app as part of your app.\n\nDeceptive Ads :\nAds must not simulate or impersonate the user interface of any app, notification, or warning elements of an operating system. It must be clear to the user which app is serving each ad.\nFor e.g. - Ads that mimic an app's UI OR Ads that mimic a system notification wont be accepted.\n\nDisruptive Ads\n• Ads should not be shown in a way that results in inadvertent clicks. Forcing a user to click an ad or submit personal information for advertising purposes before they can fully use an app is prohibited.\n• Interstitial ads may only be displayed inside of the app serving them. If your app displays interstitial ads or other ads that interfere with normal use, they must be easily dismissible without penalty. \nFollowing is an example of a common violation:\n• Ads that take up the entire screen or interfere with normal use and do not provide a clear means to dismiss the ad",
        originalRef: "Monetization and Ads",
        imageUrl:
          "https://lh3.googleusercontent.com/EXnH0pgj-OUd5mEpV4PDRZVsz0aM0IwHJh-LFvLvDgmp2Y9Qu5exDC49coQy5KUnEvI",
      },
      {
        id: "And-GPGP-1.61",
        gl: "AGL-006",
        ref: "1.61",
        title: "Use of Location Data for Ads",
        steps:
          "1. If location is used for ads, verify the privacy policy mentions this usage explicitly.\n2. Ensure the location permission was requested for a core feature first, not solely for advertising.",
        expected:
          "Location data used for ads complies strictly with permission policies and is disclosed fully.",
        policyText:
          "Use of Location Data for Ads :\nApps that extend usage of permission based device location data for serving ads are subject to the Personal and Sensitive Information policy, and must also comply with the following requirements:\n1) Use or collection of permission based device location data for advertising purposes must be clear to the user and documented in the app’s mandatory privacy policy, including linking to any relevant ad network privacy policies addressing location data use.\n2) In accordance with Location Permissions requirements, location permissions may only be requested to implement current features or services within your app, and may not request device location permissions solely for the use of ads.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.62",
        gl: "AGL-006",
        ref: "1.62",
        title: "Lock Screen Monetization",
        steps:
          "1. Observe device lock screen behavior after installation.\n2. Guarantee that ads do not appear on the lock screen unless the app's sole purpose is to serve as a lock screen.",
        expected:
          "Lock screen monetization is strictly avoided in non-lock-screen applications.",
        policyText:
          "Lock screen Monetization\nApps may not introduce ads or features that monetize the locked display of a device, unless the exclusive purpose of the app is that of a lock screen.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.63",
        gl: "AGL-006",
        ref: "1.63",
        title: "Interfering Ads & Made for Ads",
        steps:
          "1. Validate that ads don't trigger when navigating via the home button or exiting the app.\n2. Ensure interstitial ads are not spawned consecutively (spamming) after normal user actions (e.g. clicks/swipes).",
        expected:
          "Ad volume and placement do not degrade system interaction or distract from the core app.",
        policyText:
          "Interfering with Apps and Third-party Ads, or Device Functionality :\n• Ads associated with your app must not interfere with other apps, ads, or the operation of the device, including system or device buttons and ports. This includes overlays, companion functionality, and widgetized ad units. Ads must only be displayed within the app serving them.\nFollowing is an example of common violations: \n1) Ads that display outside of the app serving them OR Ads that are triggered by the home button or other features explicitly designed for exiting the app.\n2) Ads that are triggered by the home button or other features explicitly designed for exiting the ap\n\nMade for Ads\nApps are not allowed that display interstitial ads repeatedly to distract users from interacting with an app and performing in-app tasks.\nExamples of common violations-\n1) Apps where an interstitial ad is placed after a user action (including but not limited to clicks, swipes, etc.) in a consecutive manner.",
        originalRef: "Monetization and Ads",
        imageUrl:
          "https://storage.googleapis.com/support-kms-prod/pvRi7rBu3Nfi2q8Pf4pj1fyCwaX5o7SnLtQU",
      },
      {
        id: "And-GPGP-1.64",
        gl: "AGL-006",
        ref: "1.64",
        title: "Usage of Android Advertising ID",
        steps:
          "1. Verify the AAID is only utilized for analytics/ads and respects user opt-outs.\n2. Confirm AAID is not linked with persistent hardware identifiers (IMEI, MAC) or PII without explicit user consent.",
        expected:
          "AAID is handled compliantly, preserving user anonymity and opt-out preferences.",
        policyText:
          "Usage of Android advertising ID\nGoogle Play Services version 4.0 introduced new APIs and an ID for use by advertising and analytics providers. Terms for the use of this ID are below.\n\n• Usage. The Android advertising identifier must only be used for advertising and user analytics. The status of the “Opt-out of Interest-based Advertising” setting must be verified on each access of the ID.\n• Association with personally identifiable information or other identifiers. The advertising identifier must not be connected to personally identifiable information or associated with any persistent device identifier (for example: SSAID, MAC address, IMEI, etc.) without the explicit consent of the user.\n• Respecting users' selections. Upon reset, a new advertising identifier must not be connected to a previous advertising identifier or data derived from a previous advertising identifier without the explicit consent of the user. Furthermore, you must abide by a user’s “Opt out of Interest-based Advertising” setting. If a user has enabled this setting, you may not use the advertising identifier for creating user profiles for advertising purposes or for targeting users with interest-based advertising. Allowed activities include contextual advertising, frequency capping, conversion tracking, reporting and security and fraud detection.\n• Transparency to users. The collection and use of the advertising identifier and commitment to these terms must be disclosed to users in a legally adequate privacy notification.\n• Abiding by the terms of use. The advertising identifier may only be used in accordance with these terms, including by any party that you may share it with in the course of your business. Beginning 1 August 2014, all updates and new apps uploaded to the Play Store must use the advertising ID (when available on a device) in lieu of any other device identifiers for any advertising purposes.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.65",
        gl: "AGL-006",
        ref: "1.65",
        title: "Family Ads Program",
        steps:
          "1. Identify if the app is directed towards children.\n2. Verify the ad SDK is certified by Google Play for Families.\n3. Confirm personalized/interest-based ads are disabled for child audiences.",
        expected:
          "Child-directed applications use only certified SDKs and protect minors from inappropriate/personalized ads.",
        policyText:
          "Family Ads Program\nApps that serve Ads, and includes children as the target audience as described in the Families Policy, then App must use ad SDKs that have self-certified compliance with Google Play policies, including the Ad SDK certification requirements below. If the target audience for your app includes both children and older users, you must implement age screening measures and make sure that ads shown to children come exclusively from one of these self-certified ad SDKs. Apps in the Designed for Families program are required to only use self-certified ad SDKs.\n\nAd SDK Certification Requirements\n• Define what are objectionable ad content and behaviors and prohibit them in the ad network's terms or policies. The definitions should not result in non-compliance with Play's Developer Program Policies.\n• Create a method to rate your ad creatives according to age appropriate groups, including at least groups for Everyone and Mature. The rating methodology must align with the methodology that Google supplies to certified networks.\n• Allow publishers, on a per-request or per-app basis, to request child-directed treatment for ad serving. Such treatment must be in compliance with at least the US Children's Online Privacy and Protection Act (COPPA) and the EU General Data Protection Regulation (GDPR), Google Play also requires disabling of personalized ads, interest based advertising, and remarketing as part of the child-directed treatment.\n• Allow publishers to select ad formats that are compliant with Play’s Families Ads and Monetization policy, and meet the requirement of the Teacher Approved program. \n• Ensure that when real-time bidding is used to serve ads to children, the creatives have been reviewed and privacy indicators are propagated to the bidders.\n• Provide Google with sufficient information to verify the ad network's compliance with all certification requirements, and respond in a timely manner to any subsequent requests for information.\nNote: Ad networks must support ad serving that complies with all relevant statutes and regulations concerning children that may apply to their publishers.\nMediation requirements for serving platforms when serving ads to children:\n• only use Play certified ad networks or implement safeguards necessary to ensure that all ads served from mediation networks comply with these requirements; and\n• pass signals necessary to indicate the ad content rating and any applicable child-directed treatment.\nDevelopers can find a list of self-certified ad SDKs HERE.",
        originalRef: "Monetization and Ads",
      },
      {
        id: "And-GPGP-1.66",
        gl: "AGL-006",
        ref: "1.66",
        title: "User Ratings, Reviews, and Installs",
        steps:
          "1. Review any in-app prompts asking users to rate the app.\n2. Ensure no incentives (e.g., in-app currency, unlocks) are offered in exchange for a rating or review.",
        expected:
          "App does not solicit fake or incentivized ratings to manipulate store ranking.",
        policyText:
          "User Ratings, Reviews, and Installs:\n• Developers must not attempt to manipulate the placement of any apps in Google Play. This includes, but is not limited to, inflating product ratings, reviews, or install counts by illegitimate means, such as fraudulent or incentivized installs, reviews and ratings.\n\nExamples of common violations\n1) Asking users to rate your app while offering an incentive\n2) Repeatedly submitting ratings to influence the app’s placement on Google Play.\n3) Submitting or encouraging users to submit reviews containing inappropriate content, including affiliates, coupons, game codes, email addresses, or links to websites or other apps\nRatings and reviews are benchmarks of app quality. Users depend on them to be authentic and relevant",
        originalRef: "Store Listing and Promotion",
        imageUrl:
          "https://lh3.googleusercontent.com/YE3Ni1kHIBr9NCMbR8MHb6d25GeqZSExgXpX7Mun7OQKn54asHNxDzkiAskdc4TLItQ=w600-h1100",
      },
      {
        id: "And-GPGP-1.67",
        gl: "AGL-006",
        ref: "1.67",
        title: "App Metadata Violations",
        steps:
          "1. Check the app title, icon, and developer name in the Store Listing.\n2. Verify the absence of promotional language, store performance claims, or Google Play program endorsements.",
        expected:
          "App title, icon, and developer name are clear of promotional language and ranking claims.",
        policyText:
          "Examples of common violations in app title, icon, or developer name\n1) Images or text that indicate store performance or ranking, such as 'App of the year,' '#1'\n2) Images or text that indicate price and promotional information, such as '10% off,' '$50 cash back,' 'free for limited time only'\n3) Images or text that indicate Google Play programs, such as 'Editor’s choice, or New'",
        originalRef: "Store Listing and Promotion",
        imageUrl:
          "https://lh3.googleusercontent.com/oinE3IemifnHTMi0UhqU9rz1H7Yti08fhcQpmUktbNdkMijfrcMn-SuceK4fOZjAUjM=w600-h1100",
      },
      {
        id: "And-GPGP-1.68",
        gl: "AGL-006",
        ref: "1.68",
        title: "News Apps Policy",
        steps:
          "1. If the app is in the 'News' category, check for clear ownership and contact information (in-app or website).\n2. If it requires a membership, ensure a content preview is provided prior to purchase.\n3. Ascertain that content is not primarily affiliate marketing, purely static, or riddled with grammar errors.",
        expected:
          "News apps maintain high-quality journalistic standards with transparent publisher information.",
        policyText:
          "News :\nApps that select the ‘News’ category but exhibit content that does not meet these requirements are not permitted in the News category of the Play Store. News apps that require a user to purchase a membership must provide a content preview for users prior to purchase. \n\nNews apps MUST:\n1) provide adequate information about the news publisher and its contributors including clear ownership, and \n2) have a website or in-app page that provides valid contact information for the news publisher.\n\nNews apps MUST NOT:\n1) contain significant spelling & grammar errors,\n2) contain only static content, and \n3) have affiliate marketing or ad revenue as its primary purpose.  \n4) News aggregator apps must be transparent about the publishing source of the content in the app and each of the sources must meet News policy requirements.",
        originalRef: "Store Listing and Promotion",
      },
      {
        id: "And-GPGP-1.69",
        gl: "AGL-006",
        ref: "1.69",
        title: "Spam & Affiliate Webviews",
        steps:
          "1. Check if the app's primary purpose is to drive affiliate traffic.\n2. Verify if it's merely providing a WebView of an existing website without documented permission.",
        expected:
          "App possesses standalone value and does not act purely as an unauthorized wrapper or referral farm.",
        policyText:
          "SPAM : Apps are not allowed that spam users or Google Play with apps that send users unsolicited messages or that are repetitive or low-quality.\n\nWebviews and Affiliate Spam :\nApps are not allowed whose primary purpose is to drive affiliate traffic to a website or provide a WebView of a website without permission from the website owner or administrator.\nExamples of common violations\n1) An app whose primary purpose is to drive referral traffic to a website to receive credit for user sign-ups or purchases on that website.\n2) Apps whose primary purpose is to provide a WebView of a website without permission:\n\nImage of Right >> This app is called “Ted’s Shopping Deals” and it simply provides a WebView of Google Shopping",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.70",
        gl: "AGL-006",
        ref: "1.70",
        title: "Repetitive Content",
        steps:
          "1. Search for highly similar apps developed by the same account.\n2. Ensure the app adds original content or value compared to existing market offerings, rather than purely copying and pasting content.",
        expected:
          "App provides a distinct, unique experience and aggregates content sensibly instead of publishing multiple identical thin apps.",
        policyText:
          "Repetitive Content :\nApps are not allowed that merely provide the same experience as other apps already on Google Play. Apps should provide value to users through creation of unique content or services.\nHere are some examples of common violations:\n - Copying content from other apps without adding any original content or value.\n - Creating multiple apps with highly similar content and user experience. If these apps are each small in content volume, developers should consider creating a single app that aggregates all the content.\nApps that are created by an automated tool, wizard service, or based on templates and submitted to Google Play by the operator of that service on behalf of other persons are not allowed. Such apps are only permissible if they are published by an individually registered developer account belonging to the user of the automated tool, not the operator of the service.",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.71",
        gl: "AGL-006",
        ref: "1.71",
        title: "Limited Functionality and Content",
        steps:
          "1. Review the app for interactivity and purpose.\n2. Ascertain if it's purely static text/PDF or a single wallpaper lacking engaging UI.",
        expected:
          "App provides an engaging base level of utility exceeding a simple text document or a single image.",
        policyText:
          "Functionality, Content, and User Experience: \nApps should provide a stable, responsive, and engaging user experience. Apps that crash, do not have the basic degree of adequate utility as mobile apps, lack engaging content, or exhibit other behavior that is not consistent with a functional and engaging user experience are not allowed on Google Play.\n\nLimited Functionality and Content\nApps are not allowed that only have limited functionality and content.\nExamples of common violations\n1) Apps that are static without app-specific functionalities, for example, text only or PDF file apps\n2) Apps with very little content and that do not provide an engaging user experience, for example, single wallpaper apps\n3) Apps that are designed to do nothing or have no function",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.72",
        gl: "AGL-006",
        ref: "1.72",
        title: "Broken Functionality",
        steps:
          "1. Attempt to install and run the app on supported target devices.\n2. Identify crashes, force closes, freezes, or missing basic load sequences.",
        expected:
          "App installs, loads, and responds gracefully to user interaction without crashing.",
        policyText:
          "Broken Functionality\nApps are not allowed that crash, force close, freeze, or otherwise function abnormally.\nExample of common violations: Apps that don’t install; Apps that install, but don’t load; Apps that load, but are not responsive",
        originalRef: "Spam and Minimum Functionality",
      },
      {
        id: "And-GPGP-1.73",
        gl: "AGL-006",
        ref: "1.73",
        title: "Malware",
        steps:
          "1. Run automated malware scans on the APK.\n2. Verify the application does not request unnecessary permissions that could exploit the device or transmit unauthorized personal data.\n3. Check for unauthorized remote-control functionalities or background processing indicative of spam dissemination or device compromise.",
        expected:
          "App is free of malicious code and does not compromise user data, device integrity, or network security.",
        policyText:
          "Malware : Malware is any code that could put a user, a user's data, or a device at risk\n\ntype and capabilities, malware usually has one of the following objectives - \n- Compromise the integrity of the user's device.\n- Gain control over a user's device.\n- Enable remote-controlled operations for an attacker to access, use, or otherwise exploit an infected device.\n- Transmit personal data or credentials off the device without adequate disclosure and consent.\n- Disseminate spam or commands from the infected device to affect other devices or networks.\n- Defraud the user.",
        originalRef: "Malware",
      },
      {
        id: "And-GPGP-1.74",
        gl: "AGL-006",
        ref: "1.74",
        title: "Families Policy Requirements",
        steps:
          "1. Verify the app's content is appropriate for children.\n2. Confirm the app is not merely an affiliate WebView.\n3. If Augmented Reality (AR) is used, check for a mandatory safety warning upon launch explaining parental supervision and physical hazards.",
        expected:
          "App content is safe for children, does not use unapproved wrappers, and incorporates AR safety warnings.",
        policyText:
          "Designing Apps for Children and Families :\nApps designed specifically  for Children must be safe for all the users, including Families\n\nFamilies Policy Requirements:\n1. App content: App's content that is accessible to children must be appropriate for children.\n2. App functionality: Your app must not merely provide a WebView of a website or have a primary purpose of driving affiliate traffic to a website, regardless of ownership of the website.\n3. Augmented Reality (AR): If your app uses Augmented Reality, you must include a safety warning immediately upon launch of the AR section. The warning should contain the following:\n• An appropriate message about the importance of parental supervision.\n• A reminder to be aware of physical hazards in the real world (e.g., be aware of your surroundings).\n• Your app must not require the usage of a device that is advised not to be used by children",
        originalRef: "Families",
      },
      {
        id: "And-GPGP-1.75",
        gl: "AGL-006",
        ref: "1.75",
        title: "Designed for Families Ad Formats",
        steps:
          "1. Check for ad walls or ads that interfere with app use (must be closeable after 5 seconds).\n2. Verify interstitial ads are not displayed immediately upon launch.\n3. Ensure ads are well-distinguished from app content and there are no deceptive or emotionally manipulative placements.",
        expected:
          "Ad formats in child-directed apps are clearly distinguishable, limit disruption, and do not encourage inadvertent clicks.",
        policyText:
          "Ad format requirements\nAds in apps participating in Designed for Families must not have deceptive content or be designed in a way that will result in inadvertent clicks from child users. For example:\n1) Use of Ad walls\n2) Ads that interfere with normal app use that are not closeable after 5 seconds\n3) Interstitial ads or offers for in-app purchase displayed immediately upon app launch\n4) Multiple ad placements on a page\n5) Ads or offers for in-app purchases that are not clearly distinguishable from your app content\n6)Use of shocking or emotionally manipulative tactics to encourage ads viewing or in-app purchases\n7) Not providing a distinction between the use of virtual game coins versus real-life money to make in-app purchases",
        originalRef: "Families",
      },
      {
        id: "And-GPGP-1.76",
        gl: "AGL-006",
        ref: "1.76",
        title: "Appropriate Ad Content in Families Program",
        steps:
          "1. Monitor the content of ads served within the app.\n2. Verify the absence of mature media, inappropriate games, alcohol/tobacco, gambling/sweepstakes, adult content, or dating services.",
        expected:
          "Ad content is strictly appropriate for children and filters out all restricted categories.",
        policyText:
          "Apps that participate in the Designed for Families program must present ad content that is appropriate for children - \nThe following are examples of ads not allowed in the Designed for Families program. Please note this is not an exhaustive list.\n- Media Content: Ads for TV shows, movies, music albums, or any other media outlet not appropriate for children.\n- Video Games & Downloadable Software: Ads for downloadable software and electronic video games that are not appropriate for children.\n- Controlled or Uncontrolled Substances: Ads for alcohol, tobacco, controlled or uncontrolled substances.\n- Gambling: Ads for simulated gambling, contests or sweepstakes promotions, even if free to enter.\n- Adult and Sexually Suggestive Content: Ads with sexual and mature content.\n- Dating or Relationships: Ads for dating sites",
        originalRef: "Families",
      },
      {
        id: "And-GPGP-1.77",
        gl: "AGL-006",
        ref: "1.77",
        title: "Policy Coverage & App Installation",
        steps:
          "1. Verify if the app allows users to install other apps to their devices.\n2. If the app provides access to other apps, games, or software without installation, ensure all accessed content is strictly compliant with Google Play policies.",
        expected:
          "App does not facilitate unapproved app installations and ensures any hosted third-party content complies with all Play policies.",
        policyText:
          "Policy Coverage\nApps that let users install other apps to their devices are not allowed. Apps that provide access to other apps, games, or software without installation, including features and experiences provided by third parties, must ensure that all the content they provide access to adheres to all Google Play policies and may also be subject to additional policy reviews.",
        originalRef: "Enforcement",
      },
      {
        id: "And-GPGP-1.78",
        gl: "AGL-006",
        ref: "1.78",
        title: "Enforcement Actions & Resubmission",
        steps:
          "1. Address all underlying policy issues across the entire app before attempting to resubmit a rejected or removed app.\n2. Avoid republishing a suspended app unless explicitly permitted.\n3. Acknowledge that repeated or egregious violations may lead to developer account termination.",
        expected:
          "Developer fully rectifies all flagged and unflagged policy issues prior to resubmission, respecting Google Play's enforcement standing.",
        policyText:
          "Enforcement Process\nA) If our app violates any of Google policies, it will be removed from Google Play, and you will receive an email notification...\nB) Please note that removal or administrative notices may not indicate each and every policy violation present in your app or broader app catalog.\n\nRejection\nNote: Do not attempt to resubmit a rejected app until you’ve fixed all the policy violations.\n\nRemoval\nNote: Don't attempt to republish a removed app until you’ve fixed all policy violation.\n\nSuspension\nMultiple strikes can result in the termination of individual and related Google Play Developer accounts.\nNote: Don't attempt to republish a suspended app unless Google Play has explained that you may do so.",
        originalRef: "Enforcement",
      },
      {
        id: "And-FEAT-1.1",
        gl: "AGL-007",
        ref: "1.1",
        title: "Localization",
        steps:
          "1. Check for missing, awkward, or incorrect translations in app or metadata.\n2. Look for line breaks, incorrect local currency, incorrect special characters.\n3. Check if font size is too large or small.\n4. Verify country flags are not used solely to select language.",
        expected:
          "No awkward translations, correct currency/chars, good text fitting, no country flags for language selection.",
        policyText:
          "You should not have: missing, awkward or incorrect translations (in app or metadata), line breaks, incorrect local currency, incorrect special characters, font too large or small, country flag used to select language",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.2",
        gl: "AGL-007",
        ref: "1.2",
        title: "Touch Feedback",
        steps:
          "1. Interact with all interactive elements within the app.\n2. Verify that some form of touch feedback is provided.\n3. Verify all UI elements that provide touch-feedback invoke an action.",
        expected:
          "Interactive elements have standard touch feedback driving an action.",
        policyText:
          "It is important to provide some form of touch feedback on all interactive elements within the app; All UI elements that provide touch-feedback should invoke an action",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.3",
        gl: "AGL-007",
        ref: "1.3",
        title: "Permissions",
        steps:
          "1. Review required app permissions.\n2. Remove any unnecessary permissions (e.g., Read/Write/Manage_external_storage, Camera) or explain how they are being used.",
        expected:
          "Only necessary permissions are present, and their usage is clearly explained to users.",
        policyText:
          "Remove any unnecessary permissions and/or explain how the permissions are being used (Read/Write/Manage_external_storage, Camera, etc)",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.4",
        gl: "AGL-007",
        ref: "1.4",
        title: "Play Games Services",
        steps:
          "1. Sign out of Google Play Games Services via the 'Sign Out' option.\n2. Ensure that any GPGS buttons and entry points become functional entry points to log back in rather than being functionless.",
        expected: "GPGS buttons act as login entry points after signing out.",
        policyText:
          "If the user chooses to sign out of Google Play Games Services via the 'Sign Out' option in the default UI, some GPGS buttons and entry points become functionless. If the user signs out of Play Games, these buttons must act as an entry point to log back in",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.5",
        gl: "AGL-007",
        ref: "1.5",
        title: "Back Button",
        steps:
          "1. Press the Android system back button at the main menu or home screen.\n2. Verify it functions like an on-screen back or close button, allowing the user to exit or prompting them to confirm an exit.",
        expected:
          "Android back button naturally exits the app or prompts for exit confirmation on the root screen.",
        policyText:
          "Function as any on-screen back or close button, allow the user to exit or prompt the user to confirm an exit when the Android system back button is pressed at the main menu or home screen.",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.6",
        gl: "AGL-007",
        ref: "1.6",
        title: "Game Icon",
        steps:
          "1. Review the high-res icons used for the app launcher and Google Play listing.\n2. Ensure they don't resemble non-Android styling (e.g., very rounded corners carried from iOS).\n3. Ensure Android app icons are distinctly shaped.",
        expected:
          "App icon shape adheres to Android standards without mimicking other platforms' distinctive styles.",
        policyText:
          "The high-res icons used for the app launcher and/or Google Play listing resembles non-Android styling, including very rounded corners. As you build your app for Android, don't carry over elements from other platforms. Android app icons should be distinctly shaped",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.7",
        gl: "AGL-007",
        ref: "1.7",
        title: "Optional feedback",
        steps:
          "1. Check if the app targets the latest SDK (targetSdkVersion 33 or higher).\n2. Review ANR rate to ensure it's low.\n3. Check for a promo video and an option to skip the tutorial.",
        expected:
          "Target SDK is 33/latest (supporting Material You & hardware acceleration), ANR rate is low, and the user has options to skip tutorials. Promo video is added.",
        policyText:
          "Target latest SDK, keep low ANR rate, Add promo video, add option to skip tutorial\nThe app's targetSdkVersion must be set to the latest version (33) in order to ensure that newer platform behaviors such as hardware acceleration and the correct default visual theme (Material You) are applied.",
        originalRef: "Top 7 Google Featuring issues",
      },
      {
        id: "And-FEAT-1.8",
        gl: "AGL-007",
        ref: "1.8",
        title: "Rating flow and 5 star manipulation",
        steps:
          "1. Trigger the Rate My App popup.\n2. Ensure it does not interrupt the user inappropriately.\n3. Verify there is no explicit demand or request specifically for a '5-star' rating in the popup.",
        expected:
          "App requests ratings passively and does not specifically manipulate or ask for 5 stars.",
        policyText:
          "Rating flow and 5 star manipulation :Rate My app Pop-up Should appear after some levels. The app displays a popup window that requests a 5 star rating. Apps should not interrupt the user, either through a popup window, notification or other means, to rate the app 5 stars. Please remove the 5 star reference from the popup or put the request in a more passive location.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.9",
        gl: "AGL-007",
        ref: "1.9",
        title: "Tagline",
        steps:
          "1. Review promotional content and taglines.\n2. Ensure the tagline is clear, concise, and helps users readily understand the nature of the promotional content.",
        expected: "Taglines are clear, concise, and understandable.",
        policyText:
          "Tagline:Ensure that promotional content features taglines is clear and concise,tagline should enable users to readily understand the nature of the promotional content",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.10",
        gl: "AGL-007",
        ref: "1.10",
        title: "New Feature",
        steps:
          "1. Test deep links for store offers.\n2. Verify the user can highlight and purchase store offers directly without needing to enter the game.",
        expected:
          "Users can highlight and purchase store offers directly via deep links.",
        policyText:
          "New Feature:Implement a new feature enabling direct highlighting and purchase of store offers, along with deep links, without the need to enter the game",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.11",
        gl: "AGL-007",
        ref: "1.11",
        title: "Technical Side",
        steps:
          "1. Check the app's build.gradle or manifest.\n2. Verify the TargetSDKVersion is at least 35, and 36 if aiming for Google Featuring.",
        expected:
          "TargetSDKVersion is exactly as required (35 minimum, 36 for featuring).",
        policyText:
          "Technical Side:Any app updates must have a TargetSDKVersion of at least 35. Moreover, apps aiming for Google Featuring must target the latest SDK, which is currently TargetSDKVersion 36",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.12",
        gl: "AGL-007",
        ref: "1.12",
        title: "Google Play Game Services Implementation",
        steps:
          "1. Verify Google Play Game Services is implemented.\n2. Sign out of Google Play, then relaunch the app. It should not auto-login.\n3. Check for GPGS achievements and verify they are localized for all supported languages.",
        expected:
          "GPGS is implemented correctly, does not auto-login after sign out, and achievements are properly localized.",
        policyText:
          "Google Play Game Services Implementation:Suggest implementing Google Play Game Services into the game.After signing out of Google Play, the game should not automatically login a user the next time the app is launched.The game is missing Achievements for Google Play Game Services. PGS achievement section is not localized for all supported languages. (Flagged for Japanese language)",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.13",
        gl: "AGL-007",
        ref: "1.13",
        title: "Notifications",
        steps:
          "1. Check notification icons in the status bar to ensure they are completely white with no color.\n2. Trigger multiple notifications of the same type and ensure they are stacked, rather than creating new independent notifications.",
        expected:
          "Notification icons are all white and multiple notifications of the same type stack.",
        policyText:
          "Notifications:Your app’s notification icons in the status bar must be completely white with no color.If your app creates a notification while another of the same type is still pending, avoid creating a new notification object. Instead, stack the notification.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.14",
        gl: "AGL-007",
        ref: "1.14",
        title: "Device Resolution Support and Assets",
        steps:
          "1. Check if the app has a xxxhdpi Launcher icon(s) for high density screens.\n2. Verify the launcher icon is three-dimensional, front view, distinct silhouette, with a slight perspective.\n3. Ensure launcher icon is not pixelated on high density screens.",
        expected:
          "App provides high-quality non-pixelated xxxhdpi launcher icons adhering to 3D and perspective visual guidelines.",
        policyText:
          "Device Resolution Support and Assets:The app does not have a xxxhdpi Launcher icon(s) for display on devices with high density screens. It's important to keep in mind that your app may be installed on a variety of devices that offer a range of pixel densities.In order to improve your icon for the Android Platform we suggest the following: Launcher icons should be three-dimensional, front view, distinct silhouette, with a slight perspective as if viewed from above.The launcher icon is pixelated on high density screens.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.15",
        gl: "AGL-007",
        ref: "1.15",
        title: "Material Design",
        steps:
          "1. Inspect any square badges used in the launcher and/or high-res icons.\n2. Verify the rounded corners radius does not exceed 15% of the badge's width.",
        expected:
          "Square badge corner radiuses are within 15% of the badge width.",
        policyText:
          "Material Design:The square badge used in the launcher and/or high-res icon has rounded corners with radius in excess of 15% of the badge's width.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.16",
        gl: "AGL-007",
        ref: "1.16",
        title: "App Permissions",
        steps:
          "1. Verify the READ_LOGS permission is removed from the app.\n2. Ensure requests for any sensitive permissions (ACCESS_FINE_LOCATION, READ_CALENDAR, WRITE_CALENDAR, RECORD_AUDIO, SEND_SMS) are clearly explained to the user.",
        expected:
          "READ_LOGS is absent, and any sensitive permissions have clear in-app disclosures.",
        policyText:
          "App Permissions:Please remove the READ_LOGS permission from your app.The request for the following sensitive permissions may not be clear to some users.\n• ACCESS_FINE_LOCATION\n• READ_CALENDAR\n• WRITE_CALENDAR\n• RECORD_AUDIO\n• SEND_SMS",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.17",
        gl: "AGL-007",
        ref: "1.17",
        title: "Pixel Compatibility",
        steps:
          "1. Run the app on supported Pixel devices.\n2. Ensure performance is within acceptable parameters without lag or crashes.",
        expected: "App performs smoothly on Pixel devices.",
        policyText:
          "Pixel Compatibility:Please ensure the app runs within acceptable performance parameters on supported Pixel devices.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.18",
        gl: "AGL-007",
        ref: "1.18",
        title: "Screen Orientation",
        steps:
          "1. Rotate the device into landscape mode.\n2. Ensure the app supports both left and right landscape orientations (not fixed to one side only).",
        expected: "App rotates freely between both landscape orientations.",
        policyText:
          "Screen Orientation:Landscape Mode is fixed for one side only. Suggest adding support for both sides.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.19",
        gl: "AGL-007",
        ref: "1.19",
        title: "Full screen",
        steps:
          "1. Enter full-screen mode in the app.\n2. Verify the status and navigation bars are hidden completely.",
        expected:
          "Status and navigation bars hide correctly in full-screen mode.",
        policyText:
          "Full screen:The app should hide the status and navigation bars when entering full-screen.",
        originalRef: "Optional Issues From Google Feedback",
      },
      {
        id: "And-FEAT-1.20",
        gl: "AGL-007",
        ref: "1.20",
        title: "Language Selection",
        steps:
          "1. Open the language selection menu.\n2. Ensure flag images are not used to represent languages unless the content is strictly country-specific.",
        expected:
          "Language selection does not rely on country flags to represent shared languages.",
        policyText:
          "Language Selection:Unless content is specific to the countries, please avoid using flag images to represent languages. The flags may alienate users from other countries that use the same language.",
        originalRef: "Optional Issues From Google Feedback",
      },
    ],
  },
};

export const IOS_ICONS: Record<string, string> = {
  Compliance: "📋",
  "Info.plist": "📄",
  "Privacy check": "🔒",
  HIG: "📐",
  "Apple Sign-in": "🔑",
  Subscriptions: "💳",
};

export const AND_ICONS: Record<string, string> = {
  "Core App Functionality": "⚙️",
  "Google Play": "🛍️",
  "Test Procedures": "🧪",
  "APK Related Tests": "📦",
  "GPG Design Guidelines": "🎮",
  FTCs: "🛠️",
  "Play Games Services": "🕹️",
  "GPG Policies": "🛡️",
  "Featuring tests": "🌟",
  "Store Listing and Promotion": "📢",
  "Monetization and Ads": "💸",
  "Spam and Minimum Functionality": "🚫",
  Malware: "🦠",
  Families: "👪",
  Enforcement: "⚖️",
  "Top 7 Google Featuring issues": "🏆",
  "Optional Issues From Google Feedback": "💡",
};
