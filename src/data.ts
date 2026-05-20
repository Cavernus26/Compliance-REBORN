import { PlatformData } from './types';

export const ALL_DATA: Record<string, PlatformData> = {
  ios: {
    guidelines: [
      { 
        id: "GL-001", 
        title: "Compliance", 
        description: "App Store Review Guidelines (Safety, Performance, Business, Design, Legal)", 
        category: "Compliance", 
        impact: "high" 
      }
    ],
    testCases: [
      // Section: Objectionable content
      { 
        id: "iOS-C-1.1.1", 
        gl: "GL-001", 
        ref: "1.1.1", 
        title: "Defamatory or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, or other targeted groups, particularly if the app is likely to place a targeted individual or group in harm’s way. Professional political satirists and humorists are generally exempt from this requirement", 
        steps: "1. Review all user-facing text and imagery for commentary about targeted groups.\n2. Confirm no content places individuals in harm's way.\n3. Verify humor/satire follows professional standards.", 
        expected: "No defamatory or mean-spirited content found.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.2", 
        gl: "GL-001", 
        ref: "1.1.2", 
        title: "Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence. “Enemies” within the context of a game cannot solely target a specific race, culture, real government, corporation, or any other real entity", 
        steps: "1. Inspect combat sequences and cinematic content for realistic maiming or torture.\n2. Verify enemy factions are fictional and do not target specific real-world groups or entities.", 
        expected: "Violence is fictional; no targeting of real groups.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.3", 
        gl: "GL-001", 
        ref: "1.1.3", 
        title: "Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms or ammunition", 
        steps: "1. Check if the app encourages reckless weapon handling.\n2. Confirm no links or functionality exist for purchasing real-world firearms/ammo.", 
        expected: "No facilitation of firearm sales; no encouragement of reckless weapon use.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.4", 
        gl: "GL-001", 
        ref: "1.1.4", 
        title: "Overtly sexual or pornographic material, defined by Webster's Dictionary as \"explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings.” This includes “hookup” apps that may include pornography or be used to facilitate prostitution.", 
        steps: "1. Scan all app content for nudity or explicit descriptions of sexual activity.\n2. Confirm 'hookup' apps do not facilitate services like prostitution.", 
        expected: "No overtly sexual or pornographic material present.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.5", 
        gl: "GL-001", 
        ref: "1.1.5", 
        title: "Inflammatory religious commentary or inaccurate or misleading quotations of religious texts", 
        steps: "1. Review scriptural quotations for accuracy.\n2. Ensure religious commentary is not inflammatory or misleading.", 
        expected: "No inflammatory or misleading religious content.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.6", 
        gl: "GL-001", 
        ref: "1.1.6", 
        title: "False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers. Stating that the app is “for entertainment purposes” won’t overcome this guideline. Apps that enable anonymous or prank phone calls or SMS/MMS messaging will be rejected", 
        steps: "1. Verify device-related features (battery, storage, location) provide real data.\n2. Confirm no anonymous call/SMS prank functionality is present.", 
        expected: "Features are transparent and accurate; no prank call/SMS logic.",
        originalRef: "Objectionable content"
      },
      { 
        id: "iOS-C-1.1.7", 
        gl: "GL-001", 
        ref: "1.1.7", 
        title: "Harmful concepts which capitalize or seek to profit on recent or current events, such as violent conflicts, terrorist attacks, and epidemics.", 
        steps: "1. Check for references to real-world tragedies or ongoing conflicts used for profit.\n2. Verify the app does not exploit sensitive current events.", 
        expected: "App does not capitalize on recent tragedies or epidemics.",
        originalRef: "Objectionable content"
      },

      // Section: User Generated Content
      { 
        id: "iOS-C-1.2.1", 
        gl: "GL-001", 
        ref: "1.2.1", 
        title: "A method for filtering objectionable material from being posted to the app", 
        steps: "1. Locate all UGC entry points (chat, profile name).\n2. Attempt to submit profanity or slurs to test filtering mechanism.", 
        expected: "Filtering mechanism blocks or flags objectionable material.",
        originalRef: "User Generated Content"
      },
      { 
        id: "iOS-C-1.2.2", 
        gl: "GL-001", 
        ref: "1.2.2", 
        title: "A mechanism to report offensive content and timely responses to concerns", 
        steps: "1. Locate the 'Report' button on user-submitted content.\n2. Confirm the reporting flow works and leads to a developer response system.", 
        expected: "Reporting mechanism is functional and reachable.",
        originalRef: "User Generated Content"
      },
      { 
        id: "iOS-C-1.2.3", 
        gl: "GL-001", 
        ref: "1.2.3", 
        title: "The ability to block abusive users from the service", 
        steps: "1. Look for a 'Block' or 'Ignore' button on other user profiles/messages.\n2. Activate the block and confirm content from that user is no longer visible.", 
        expected: "Blocking functionality is present and effective.",
        originalRef: "User Generated Content"
      },
      { 
        id: "iOS-C-1.2.4", 
        gl: "GL-001", 
        ref: "1.2.4", 
        title: "Published contact information so users can easily reach you", 
        steps: "1. Search the app (Settings, About, Help) for developer contact information.\n2. Verify the information is accurate and easy to find.", 
        expected: "Contact information is accessible within the app.",
        originalRef: "User Generated Content"
      },
      { 
        id: "iOS-C-1.2.5", 
        gl: "GL-001", 
        ref: "1.2.5", 
        title: "If your app includes user-generated content from a web-based service, it may display incidental mature “NSFW” content, provided that the content is hidden by default and only displayed when the user turns it on via your website", 
        steps: "1. If web-service UGC is present, check if NSFW content is shown immediately.\n2. Confirm NSFW content is hidden by default and requires user action to enable.", 
        expected: "NSFW content is hidden by default; user must toggle it.",
        originalRef: "User Generated Content"
      },
      // Section: Creator Content
      { 
        id: "iOS-C-1.3.1", 
        gl: "GL-001", 
        ref: "1.3.1", 
        title: "The App Store supports apps offering such user-generated content so long as they follow all Guidelines, including Guideline 1.2 for moderating user-generated content and Guideline 3.1.1 for payments and in-app purchases.", 
        steps: "1. Verify creator content follows UGC moderation rules.\n2. Ensure payments for creator content use in-app purchases (IAP).", 
        expected: "Creator content follows guidelines 1.2 and 3.1.1.",
        originalRef: "Creator Content"
      },
      { 
        id: "iOS-C-1.3.2", 
        gl: "GL-001", 
        ref: "1.3.2", 
        title: "Creator apps should share the age rating of the highest age-rated creator content available in the app, and communicate to users which content requires additional purchases.", 
        steps: "1. Verify the app's age rating matches the most mature creator content.\n2. Check that paid content is clearly identified.", 
        expected: "Age rating and purchase requirements are transparent.",
        originalRef: "Creator Content"
      },
      // Section: Kids Category
      { 
        id: "iOS-C-1.4.1", 
        gl: "GL-001", 
        ref: "1.4.1", 
        title: "Apps must not include links out of the app, purchasing opportunities, or other distractions to kids unless reserved for a designated area behind a parental gate", 
        steps: "1. Scan kid-accessible areas for external links or IAP buttons.\n2. Verify a parental gate (e.g., math problem, adult gesture) exists for restricted spots.", 
        expected: "Links and purchases are locked behind a parental gate.",
        originalRef: "Kids Category"
      },
      { 
        id: "iOS-C-1.4.2", 
        gl: "GL-001", 
        ref: "1.4.2", 
        title: "Apps in the Kids Category may not include third-party advertising or analytics.", 
        steps: "1. Check for any third-party ad networks (AdMob, etc.).\n2. Verify analytics SDKs do not collect third-party data for advertising profiling.", 
        expected: "No third-party ads or identifying analytics found.",
        originalRef: "Kids Category"
      },
      // Section: Physical Harm
      { 
        id: "iOS-C-1.5.1", 
        gl: "GL-001", 
        ref: "1.5.1", 
        title: "Medical apps that could provide inaccurate data or information, or that could be used for diagnosing or treating patients may be reviewed with greater scrutiny. If your medical app has received regulatory clearance, please submit a link to that documentation with your app.", 
        steps: "1. Verify medical claims are supported by documentation.\n2. Ensure diagnostic tools are accurate and clear about their purpose.", 
        expected: "Medical info is accurate and documentation is linked.",
        originalRef: "Physical Harm"
      },
      { 
        id: "iOS-C-1.5.2", 
        gl: "GL-001", 
        ref: "1.5.2", 
        title: "Drug dosage calculators must come from the drug manufacturer, a hospital, university, health insurance company, or other approved entity, or receive approval by the FDA or one of its international counterparts. Given the potential harm to patients, we need to be sure that the app will be supported and updated over the long term", 
        steps: "1. Verify the source of any dosage calculation logic.\n2. Confirm the entity is approved (e.g., FDA, hospital).", 
        expected: "Dosage calculator originates from an approved authority.",
        originalRef: "Physical Harm"
      },
      { 
        id: "iOS-C-1.5.3", 
        gl: "GL-001", 
        ref: "1.5.3", 
        title: "Apps that encourage consumption of tobacco and vape products, illegal drugs, or excessive amounts of alcohol are not permitted on the App Store. Apps that encourage minors to consume any of these substances will be rejected. Facilitating the sale of controlled substances (except for licensed pharmacies and licensed or otherwise legal cannabis dispensaries), or tobacco is not allowed.", 
        steps: "1. Search for content promoting drug/tobacco use.\n2. Verify no facilitation of illegal or minor-focused substance sales.", 
        expected: "No promotion of reckless substance use or illegal sales.",
        originalRef: "Physical Harm"
      },
      { 
        id: "iOS-C-1.5.4", 
        gl: "GL-001", 
        ref: "1.5.4", 
        title: "Apps may only display DUI checkpoints that are published by law enforcement agencies, and should never encourage drunk driving or other reckless behavior such as excessive speed", 
        steps: "1. Verify DUI checkpoint sources.\n2. Ensure no 'speeding' or 'drunk driving' gamification exists in real-world contexts.", 
        expected: "Checkpoints are official; no encouragement of reckless driving.",
        originalRef: "Physical Harm"
      },
      { 
        id: "iOS-C-1.5.5", 
        gl: "GL-001", 
        ref: "1.5.5", 
        title: "Apps should not urge customers to participate in activities (like bets, challenges, etc.) or use their devices in a way that risks physical harm to themselves or others.", 
        steps: "1. Check for physical 'dares' or 'challenges'.\n2. Verify the UI doesn't distract drivers or cause other physical risks.", 
        expected: "No dangerous physical challenges found.",
        originalRef: "Physical Harm"
      },
      // Section: Developer Information
      { 
        id: "iOS-C-1.6.1", 
        gl: "GL-001", 
        ref: "1.6.1", 
        title: "Make sure your app and its Support URL include an easy way to contact you; this is particularly important for apps that may be used in the classroom. Failure to include accurate and up-to-date contact information not only frustrates customers, but may violate the law in some countries.", 
        steps: "1. Test the 'Support URL' provided in App Store Connect.\n2. Find contact info within the app UI if applicable.", 
        expected: "Developer is easily reachable via multiple channels.",
        originalRef: "Developer Information"
      },
      { 
        id: "iOS-C-1.6.2", 
        gl: "GL-001", 
        ref: "1.6.2", 
        title: "Ensure that Wallet passes include valid contact information from the issuer and are signed with a dedicated certificate assigned to the brand or trademark owner of the pass", 
        steps: "1. Inspect Wallet passes for contact details.\n2. Verify certificate ownership.", 
        expected: "Wallet passes have valid info and ownership signatures.",
        originalRef: "Developer Information"
      },
      // Section: Reporting Criminal Activity
      { 
        id: "iOS-C-1.7.1", 
        gl: "GL-001", 
        ref: "1.7.1", 
        title: "Apps for reporting alleged criminal activity must involve local law enforcement, and can only be offered in countries where such involvement is active.", 
        steps: "1. Check the target countries for the reporting feature.\n2. Verify integration with official law enforcement APIs or contact methods.", 
        expected: "Crime reporting involves active law enforcement involvement.",
        originalRef: "Reporting Criminal Activity"
      },
      // Section: App Completeness
      { 
        id: "iOS-C-2.1.1", 
        gl: "GL-001", 
        ref: "2.1.1", 
        title: "Make sure that there are no placeholder text, empty websites or any temporary content present in app", 
        steps: "1. Search for 'Lorem Ipsum' or 'TBD' strings.\n2. Check for broken image icons or dead links.", 
        expected: "No placeholder content found.",
        originalRef: "App Completeness"
      },
      { 
        id: "iOS-C-2.1.2", 
        gl: "GL-001", 
        ref: "2.1.2", 
        title: "App must not present any bugs, obvious technical problems & crashes otherwise app will be rejected", 
        steps: "1. Perform smoke tests on all major features.\n2. Review crash logs if any occur.", 
        expected: "App is stable and free of technical defects.",
        originalRef: "App Completeness"
      },
      { 
        id: "iOS-C-2.1.3", 
        gl: "GL-001", 
        ref: "2.1.3", 
        title: "If your app contains login functionality make sure that backend services are up and running", 
        steps: "1. Test sign-in/sign-up flows.\n2. Verify server connectivity in production-like environment.", 
        expected: "Backend authentication is active and reachable.",
        originalRef: "App Completeness"
      },
      { 
        id: "iOS-C-2.1.4", 
        gl: "GL-001", 
        ref: "2.1.4", 
        title: "If you offer in-app purchases make sure they are complete, pricing is up-to-date and visible", 
        steps: "1. Reconcile in-game prices with App Store Connect metadata.\n2. Verify purchase flow completes correctly.", 
        expected: "IAPs are complete and correctly priced.",
        originalRef: "App Completeness"
      },
      // Section: Beta Testing
      { 
        id: "iOS-C-2.2.1", 
        gl: "GL-001", 
        ref: "2.2.1", 
        title: "Demos, betas and trial versions of the app must not be submitted to App Store- Test Flight should be used instead", 
        steps: "1. Ensure this submission is a full production version.\n2. Use TestFlight for feature testing.", 
        expected: "Submission is not a demo or beta version.",
        originalRef: "Beta Testing"
      },
      { 
        id: "iOS-C-2.2.2", 
        gl: "GL-001", 
        ref: "2.2.2", 
        title: "Apps submitted for beta distribution via Test Flight should be intended for public distribution and should comply with App review guidelines", 
        steps: "1. Confirm Beta builds follow Safety and Performance rules.\n2. Verify the intent is eventual production.", 
        expected: "Beta builds are compliant with core guidelines.",
        originalRef: "Beta Testing"
      },
      { 
        id: "iOS-C-2.2.3", 
        gl: "GL-001", 
        ref: "2.2.3", 
        title: "Apps using Test Flight cannot be distributed to testers in exchange for compensation of any kind", 
        steps: "1. Confirm no 'paid beta' schemes.\n2. Review tester recruitment for mentions of rewards.", 
        expected: "No compensation offered to beta testers.",
        originalRef: "Beta Testing"
      },
      { 
        id: "iOS-C-2.2.4", 
        gl: "GL-001", 
        ref: "2.2.4", 
        title: "Significant updates to the beta build should be submitted to Test Flight App Review before being distributed", 
        steps: "1. Submit new versions through the 'TestFlight' review tab in ASC.", 
        expected: "Beta updates are reviewed by Apple.",
        originalRef: "Beta Testing"
      },
      // Section: Accurate Metadata
      { 
        id: "iOS-C-2.3.1", 
        gl: "GL-001", 
        ref: "2.3.1", 
        title: "Don’t include any hidden, dormant, or undocumented features in your app; your app’s functionality should be clear to end-users and App Review. All new features, functionality, and product changes must be described with specificity in the Notes for Review section of App Store Connect (generic descriptions will be rejected) and accessible for review. Similarly, marketing your app in a misleading way, such as by promoting content or services that it does not actually offer (e.g. iOS-based virus and malware scanners) or promoting a false price, whether within or outside of the App Store, is grounds for removal of your app from the App Store and termination of your developer account. Egregious or repeated behavior is grounds for removal from the Developer Program. We work hard to make the App Store a trustworthy ecosystem and expect our app developers to follow suit; if you’re dishonest, we don’t want to do business with you.", 
        steps: "1. Review all app features against the description in App Store Connect.\n2. Ensure no hidden modules or diagnostic tools exist.\n3. Verify marketing claims match actual app capabilities.", 
        expected: "Functionality is transparent; marketing is accurate.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.2", 
        gl: "GL-001", 
        ref: "2.3.2", 
        title: "If you decide to promote in-app purchases on the App Store, ensure that the IAP Display Name and Description are written for a public audience, that you follow the guidance found in Promoting Your In-App Purchases , and that your app properly handles the SKPaymentTransactionObserver method so that customers can seamlessly complete the purchase when your app launches.", 
        steps: "1. Verify IAP metadata is public-facing and clear.\n2. Ensure purchase flow is handled properly if initiated from the App Store.", 
        expected: "IAP promotion is compliant and functional.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.3", 
        gl: "GL-001", 
        ref: "2.3.3", 
        title: "Screenshots should show the app in use, and not merely the title art, log-in page, or splash screen.", 
        steps: "1. Audit App Store screenshots.\n2. Confirm at least 60% of images show inside-app gameplay/UI.", 
        expected: "Screenshots represent actual app use.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.4", 
        gl: "GL-001", 
        ref: "2.3.4", 
        title: "Previews are a great way for customers to see what your app looks like and what it does. To ensure people understand what they’ll be getting with your app, previews may only use video screen captures of the app itself. You can add narration and video or textual overlays to help explain anything that isn’t clear from the video alone", 
        steps: "1. Examine app previews for non-app footage.\n2. Ensure video content is primarily screen-captured UI/Gameplay.", 
        expected: "Previews are based on authentic screen capture.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.5", 
        gl: "GL-001", 
        ref: "2.3.5", 
        title: "Select the most appropriate category for your app", 
        steps: "1. Verify app category in App Store Connect matches core functionality.", 
        expected: "Category selection is appropriate.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.6", 
        gl: "GL-001", 
        ref: "2.3.6", 
        title: "Answer the age rating questions in App Store Connect honestly so that your app aligns properly with parental controls. If your app is mis-rated, customers might be surprised by what they get, or it could trigger an inquiry from government regulators. If your app includes media that requires the display of content ratings or warnings (e.g. films, music, games, etc.), you are responsible for complying with local requirements in each territory where your app is available.", 
        steps: "1. Audit the age rating questionnaire answers.\n2. Verify against actual app content (violence, adult themes).", 
        expected: "Age rating is honest and accurate.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.7", 
        gl: "GL-001", 
        ref: "2.3.7", 
        title: "Choose a unique app name, assign keywords that accurately describe your app, and don’t try to pack any of your metadata with trademarked terms, popular app names, pricing information or other irrelevant phrases just to game the system. Apple may modify inappropriate keywords at any time or take other appropriate steps to prevent abuse. App names must be limited to 30 characters. Metadata such as app names, subtitles, screenshots, and previews should not include prices, terms, or descriptions that are not specific to the metadata type. App subtitles are a great way to provide additional context for your app; they must follow our standard metadata rules and should not include inappropriate content, reference other apps, or make unverifiable product claims.", 
        steps: "1. Check app name length (max 30 chars).\n2. Review keywords for trademark spam or competitor names.\n3. Verify subtitles don't contain pricing or unverifiable claims.", 
        expected: "App name and keywords are unique and honest.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.8", 
        gl: "GL-001", 
        ref: "2.3.8", 
        title: "Metadata should be appropriate for all audiences, so make sure your app and in-app purchase icons, screenshots, and previews adhere to a 4+ age rating even if your app is rated higher.", 
        steps: "1. Inspect icons and screenshots for mature content.\n2. Ensure overall presentation is 'safe' for a 4+ audience.", 
        expected: "Store metadata is safe for children (4+).",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.9", 
        gl: "GL-001", 
        ref: "2.3.9", 
        title: "You are responsible for securing the rights to use all materials in your app icons, screenshots, and previews, and you should display fictional account information instead of data from a real person", 
        steps: "1. Verify property rights for all marketing assets.\n2. Ensure 'John Doe' or fictional data is used in screenshots.", 
        expected: "Rights are secured; fictional data is displayed.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.10", 
        gl: "GL-001", 
        ref: "2.3.10", 
        title: "Make sure your app is focused on the iOS, macOS, tvOS or watchOS experience, and don’t include names, icons, or imagery of other mobile platforms in your app or metadata, unless there is specific, approved interactive functionality. Make sure your app metadata is focused on the app itself and its experience. Don’t include irrelevant information.", 
        steps: "1. Search for 'Android', 'Google Play' or logos of other platforms in metadata/app imagery.\n2. Confirm focus is entirely on Apple OS experience.", 
        expected: "No branding or references to competing platforms.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.11", 
        gl: "GL-001", 
        ref: "2.3.11", 
        title: "Apps you submit for pre-order on the App Store must be complete and deliverable as submitted. Ensure that the app you ultimately release is not materially different from what you advertise while the app is in a pre-order state. If you make material changes to the app (e.g. change business models), you should restart your pre-order sales.", 
        steps: "1. Compare pre-order promises with current build functionality.\n2. Verify business model hasn't shifted significantly.", 
        expected: "Pre-order promises align with current deliverable.",
        originalRef: "Accurate Metadata"
      },
      { 
        id: "iOS-C-2.3.12", 
        gl: "GL-001", 
        ref: "2.3.12", 
        title: "Apps must clearly describe new features and product changes in their “What’s New” text. Simple bug fixes, security updates, and performance improvements may rely on a generic description, but more significant changes must be listed in the notes.", 
        steps: "1. Review 'What's New' text for specificity.\n2. Ensure major updates aren't hidden under 'bug fixes'.", 
        expected: "Significant changes are explicitly described.",
        originalRef: "Accurate Metadata"
      },
      // Section: Hardware Compatibility
      { 
        id: "iOS-C-2.4.1", 
        gl: "GL-001", 
        ref: "2.4.1", 
        title: "iPhone apps should run on iPad whenever possible", 
        steps: "1. Install the iPhone-only binary on an iPad.\n2. Verify the 1x/2x compatibility mode works without crashes.", 
        expected: "App runs on iPad in compatibility mode.",
        originalRef: "Hardware Compatibility"
      },
      { 
        id: "iOS-C-2.4.2", 
        gl: "GL-001", 
        ref: "2.4.2", 
        title: "Design your app to use power efficiently and be used in a way that does not risk damage to the device. Apps should not rapidly drain battery, generate excessive heat, or put unnecessary strain on device resources. Apps, including any third-party advertisements displayed within them, may not run unrelated background processes, such as cryptocurrency mining.", 
        steps: "1. Monitor battery usage during a 5-minute session.\n2. Check device temperature.\n3. Verify no hidden mining or heavy background tasks.", 
        expected: "No excessive heat or battery drain; no mining.",
        originalRef: "Hardware Compatibility"
      },
      { 
        id: "iOS-C-2.4.3", 
        gl: "GL-001", 
        ref: "2.4.3", 
        title: "People should be able to use your Apple TV app without the need for hardware inputs beyond the Siri remote or third-party game controllers, but feel free to provide enhanced functionality when other peripherals are connected. If you require a game controller, make sure you clearly explain that in your metadata so customers know they need additional equipment to play.", 
        steps: "1. (tvOS only) Test functionality with Siri Remote only.\n2. Verify metadata mentions controller requirements if applicable.", 
        expected: "Core features work with Siri remote.",
        originalRef: "Hardware Compatibility"
      },
      { 
        id: "iOS-C-2.4.4", 
        gl: "GL-001", 
        ref: "2.4.4", 
        title: "Apps should never suggest or require a restart of the device or modifications to system settings unrelated to the core functionality of the app. For example, don’t encourage users to turn off Wi-Fi, disable security features, etc.", 
        steps: "1. Scan for prompts asking to reboot.\n2. Verify app doesn't ask to disable system security (VPN, Wi-Fi).", 
        expected: "No unrequested system modifications or restarts.",
        originalRef: "Hardware Compatibility"
      },
      // Section: Software Requirements
      { 
        id: "iOS-C-2.5.1", 
        gl: "GL-001", 
        ref: "2.5.1", 
        title: "Apps may only use public APIs and MUST run on latest shipping iOS. Keep your apps up-to-date and make sure you phase out any deprecated features, frameworks or technologies that will no longer be supported in future versions of an OS, for this take confirmation from DEV team. Apps should use APIs and frameworks for their intended purposes and indicate that integration in their app description.", 
        steps: "1. Run on the latest public iOS release.\n2. Confirm no private API usage (grep symbols if possible).\n3. Verify APIs are used as intended.", 
        expected: "Runs on latest iOS using only public APIs.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.2", 
        gl: "GL-001", 
        ref: "2.5.2", 
        title: "Apps should be self-contained in their bundles, and may not read or write data outside the designated container area, nor may they download, install, or execute code which introduces or changes features or functionality of the app, including other iOS, watchOS, Mac OS X, or tvOS apps.", 
        steps: "1. Verify app doesn't try to download zip/binary updates for features.\n2. Check that all logic is in the bundle.", 
        expected: "Executable code is entirely self-contained.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.4", 
        gl: "GL-001", 
        ref: "2.5.4", 
        title: "Multitasking apps may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc. If your app uses location background mode, include a reminder that doing so may dramatically decrease battery life.", 
        steps: "1. Check plist for Background Modes.\n2. Verify usage matches intent.\n3. Look for 'battery life' warning if using BG Location.", 
        expected: "Background modes are justified and warned.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.5", 
        gl: "GL-001", 
        ref: "2.5.5", 
        title: "Apps must be fully functional on IPv6-only networks", 
        steps: "1. Connect device to an IPv6-only hotspot.\n2. Launch app and test all network-dependent features.", 
        expected: "App functions fully on IPv6.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.6", 
        gl: "GL-001", 
        ref: "2.5.6", 
        title: "If your game is server dependent/has multiplayer, check the game functionality and loading process while being connected to IPv6 network", 
        steps: "1. Matchmake or join session on IPv6 network.\n2. Verify latency and stability.", 
        expected: "Multiplayer works on IPv6.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.7", 
        gl: "GL-001", 
        ref: "2.5.7", 
        title: "Verify In-App purchases can be made successfully through IPv6 Network", 
        steps: "1. Trigger IAP purchase on IPv6 network.\n2. Complete sandbox transaction.", 
        expected: "IAP works on IPv6.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.10", 
        gl: "GL-001", 
        ref: "2.5.10", 
        title: "Apps that browse the web must use the appropriate WebKit framework and WebKit JavaScript.", 
        steps: "1. Inspect internal browser modules.\n2. Confirm usage of WKWebView.", 
        expected: "App uses WebKit for web browsing.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.12", 
        gl: "GL-001", 
        ref: "2.5.12", 
        title: "Apps that alter or disable the functions of standard switches, such as the Volume Up/Down and Ring/Silent switches, or other native user interface elements or behaviors will be rejected. For example, apps should not block links out to other apps or other features that users would expect to work a certain way", 
        steps: "1. Test hardware buttons while app is active.\n2. Confirm volume/silent buttons still drive system changes.", 
        expected: "Standard switches function normally.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.14", 
        gl: "GL-001", 
        ref: "2.5.14", 
        title: "Apps integrating SiriKit and Shortcuts should only sign up for intents they can handle without the support of an additional app and that users would expect from the stated functionality.", 
        steps: "1. (If applicable) Test Siri intents.\n2. Verify they resolve directly.", 
        expected: "Intents are handled directly and logically.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.18", 
        gl: "GL-001", 
        ref: "2.5.18", 
        title: "Apps using facial recognition for account authentication must use LocalAuthentication (and not ARKit or other facial recognition technology) where possible, and must use an alternate authentication method for users under 13 years old.", 
        steps: "1. Check Auth implementation.\n2. Confirm alternate path for kids < 13.", 
        expected: "FaceID uses LocalAuth and supports under 13s.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.19", 
        gl: "GL-001", 
        ref: "2.5.19", 
        title: "Apps must request explicit user consent and provide a clear visual and/or audible indication when recording, logging, or otherwise making a record of user activity. This includes any use of the device camera, microphone, screen recordings, or other user inputs.", 
        steps: "1. Trigger recording features.\n2. Verify system permission prompts AND clear in-app indicators (recording dot).", 
        expected: "Recording is transparent and consented.",
        originalRef: "Software Requirements"
      },
      { 
        id: "iOS-C-2.5.22", 
        gl: "GL-001", 
        ref: "2.5.22", 
        title: "Apps that contain ads must also include the ability for users to report any inappropriate or age-inappropriate ads", 
        steps: "1. Locate 'Ad choice' or 'Report' icon on banners.\n2. Verify flow for reporting bad ads.", 
        expected: "Ad reporting mechanism is present.",
        originalRef: "Software Requirements"
      },
      // Section: Payments
      { 
        id: "iOS-C-3.1.1", 
        gl: "GL-001", 
        ref: "3.1.1", 
        title: "To unlock features or functionality within your app, In-App purchase must be used. Apps may not use their own mechanisms to unlock content or functionality, such as license keys, augmented reality markers, QR codes, etc.", 
        steps: "1. Verify that 'Premium' features are unlocked via StoreKit.\n2. Ensure no 'Input Code' field for feature unlocks.", 
        expected: "IAP used for all digital unlocks.",
        originalRef: "Payments"
      },
      { 
        id: "iOS-C-3.1.2", 
        gl: "GL-001", 
        ref: "3.1.2", 
        title: "App may not include buttons, external links or other calls to action that direct customers to purchasing mechanism other than IAP", 
        steps: "1. Scan for 'Buy on Website' links.\n2. Check for hidden URLs in buttons.", 
        expected: "No external purchase redirects.",
        originalRef: "Payments"
      },
      { 
        id: "iOS-C-3.1.7", 
        gl: "GL-001", 
        ref: "3.1.7", 
        title: "Apps offering “loot boxes” or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase.", 
        steps: "1. Locate Loot Crate/Gacha info.\n2. Verify drop rates (e.g. Rare 5%) are visible.", 
        expected: "Drop odds are disclosed clearly.",
        originalRef: "Payments"
      },
      { 
        id: "iOS-C-3.1.8", 
        gl: "GL-001", 
        ref: "3.1.8", 
        title: "Digital gift cards, certificates, vouchers, and coupons which can be redeemed for digital goods or services can only be sold in your app using in-app purchase.", 
        steps: "1. Check for gift card sales.\n2. Confirm they use IAP tiers.", 
        expected: "Digital gift cards use IAP.",
        originalRef: "Payments"
      },
      // Section: Hardware-Specific Content
      { 
        id: "iOS-C-3.2.1", 
        gl: "GL-001", 
        ref: "3.2.1", 
        title: "When features are dependent upon specific hardware to function, app may unlock that functionality without using in-app purchase (e.g. an astronomy app that adds features when synced with a telescope)", 
        steps: "1. Connect external hardware.\n2. Verify features unlock automatically without IAP interaction.", 
        expected: "Hardware-based unlocks are enabled without IAP.",
        originalRef: "Hardware-Specific Content"
      },
      { 
        id: "iOS-C-3.2.2", 
        gl: "GL-001", 
        ref: "3.2.2", 
        title: "App features that work in combination with an approved physical product (such as a toy) on an optional basis may unlock functionality without using in-app purchase, provided that an in-app purchase option is available as well.", 
        steps: "1. Verify both 'Physical Toy' unlock and 'Digital IAP' unlock paths exist for the same feature.", 
        expected: "Digital alternative to physical toy unlock is present.",
        originalRef: "Hardware-Specific Content"
      },
      // Section: Cryptocurrencies
      { 
        id: "iOS-C-3.1.5", 
        gl: "GL-001", 
        ref: "3.1.5", 
        title: "Wallets: Apps may facilitate virtual currency storage, provided they are offered by developers enrolled as an organization.", 
        steps: "1. (ASC check) Verify developer account type is 'Organization'.\n2. Check wallet functionality.", 
        expected: "Wallet app is from an organizational account.",
        originalRef: "Cryptocurrencies"
      },
      { 
        id: "iOS-C-3.1.6", 
        gl: "GL-001", 
        ref: "3.1.6", 
        title: "Mining: Apps may not mine for cryptocurrencies unless the processing is performed off device (e.g. cloud-based mining).", 
        steps: "1. Monitor CPU/GPU usage.\n2. Verify NO on-device hashing logic exists.", 
        expected: "No on-device crypto mining.",
        originalRef: "Cryptocurrencies"
      },
      { 
        id: "iOS-C-3.1.9", 
        gl: "GL-001", 
        ref: "3.1.9", 
        title: "Exchanges: Apps may facilitate transactions or transmissions of cryptocurrency on an approved exchange, provided they are offered by the exchange itself.", 
        steps: "1. Verify app ownership matches the exchange entity.", 
        expected: "Exchange app is official.",
        originalRef: "Cryptocurrencies"
      },
      // Section: Advertising
      { 
        id: "iOS-C-3.4.1", 
        gl: "GL-001", 
        ref: "3.4.1", 
        title: "Display advertising should be limited to your main app binary, and should not be included in extensions, App Clips, widgets, notifications, keyboards, watchOS apps, etc.", 
        steps: "1. Trigger notifications/widgets.\n2. Verify NO advertisements are displayed in these secondary interfaces.", 
        expected: "Ads only appear in the main app.",
        originalRef: "Advertising"
      },
      { 
        id: "iOS-C-3.4.2", 
        gl: "GL-001", 
        ref: "3.4.2", 
        title: "Ads displayed in an app must be appropriate for the app’s age rating, allow the user to see all information used to target them for that ad (without requiring the user to leave the app), and may not engage in targeted or behavioral advertising based on sensitive user data", 
        steps: "1. Check ad content against app age rating.\n2. Verify 'Why this ad' info is accessible in-app.", 
        expected: "Ads are age-appropriate and transparent.",
        originalRef: "Advertising"
      },
      { 
        id: "iOS-C-3.4.3", 
        gl: "GL-001", 
        ref: "3.4.3", 
        title: "Interstitial ads or ads that interrupt or block the user experience must clearly indicate that they are an ad, must not manipulate or trick users into tapping into them, and must provide easily accessible and visible close/skip buttons large enough for people to easily dismiss the ad.", 
        steps: "1. Trigger interstitial/video ads.\n2. Verify presence of clear 'Ad' label.\n3. Test the close button size and accessibility (no dark patterns).", 
        expected: "Ads have clear labels and accessible close buttons.",
        originalRef: "Advertising"
      },
      // Section: Other Business Model Issues
      { 
        id: "iOS-C-3.5.1", 
        gl: "GL-001", 
        ref: "3.5.1", 
        title: "Acceptable :Displaying your own apps for purchase or promotion within your app, provided the app is not merely a catalog of your apps", 
        steps: "1. Review app promotion sections.\n2. Confirm the app provides core utility beyond just listing other developer apps.", 
        expected: "App is not a mere catalog; promotions are secondary to functionality.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.2", 
        gl: "GL-001", 
        ref: "3.5.2", 
        title: "Acceptable :Displaying or recommending a collection of third party apps that are designed for a specific approved need (e.g. health management, aviation, accessibility). Your app should provide robust editorial content so that it doesn’t seem like a mere storefront.", 
        steps: "1. Inspect app recommendations.\n2. Verify the presence of robust editorial content/descriptions for each recommendation.", 
        expected: "Recommendations include editorial value and serve a specific approved need.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.3", 
        gl: "GL-001", 
        ref: "3.5.3", 
        title: "Acceptable :Disabling access to specific approved rental content (e.g. films, television programs, music, books) after the rental period has expired; all other items and services may not expire.", 
        steps: "1. Test rental period expiration logic.\n2. Verify that non-rental purchases do not have expiration dates.", 
        expected: "Only approved rental content expires; all other digital goods are permanent.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.4", 
        gl: "GL-001", 
        ref: "3.5.4", 
        title: "Acceptable :Wallet passes can be used to make or receive payments, transmit offers, or offer identification (such as movie tickets, coupons, and VIP credentials). Other uses may result in the rejection of the app and the revocation of Wallet credentials.", 
        steps: "1. Inspect usage of Wallet passes.\n2. Confirm they are used for payments, offers, or ID as per guidelines.", 
        expected: "Wallet pass usage is restricted to approved categories.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.5", 
        gl: "GL-001", 
        ref: "3.5.5", 
        title: "Acceptable :Insurance apps must be free, in legal-compliance in the regions distributed, and cannot use IAP.", 
        steps: "1. Verify insurance app is free to download.\n2. Confirm NO in-app purchases are used for premiums or features.", 
        expected: "Insurance app is free and does not utilize IAP.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.6", 
        gl: "GL-001", 
        ref: "3.5.6", 
        title: "Acceptable :Approved nonprofits may fundraise directly within their own apps or third-party apps, provided those fundraising campaigns adhere to all App Review Guidelines and offer Apple Pay support. These apps must disclose how the funds will be used, abide by all required local and federal laws, and ensure appropriate tax receipts are available to donors", 
        steps: "1. Verify non-profit status and campaign legality.\n2. Confirm Apple Pay support.\n3. Check for fund usage disclosures and tax receipt availability.", 
        expected: "Fundraising is transparent, legal, and supports Apple Pay.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.7", 
        gl: "GL-001", 
        ref: "3.5.7", 
        title: "Acceptable :Apps may enable individual users to give a monetary gift to another individual without using in-app purchase, provided that (a) the gift is a completely optional choice by the giver, and (b) 100% of the funds go to the receiver of the gift", 
        steps: "1. Test person-to-person gifting flow.\n2. Verify 100% of funds reach the recipient (ignoring standard processor fees).\n3. Confirm gifting is purely optional.", 
        expected: "Gifting is optional and developer takes 0% commission.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.8", 
        gl: "GL-001", 
        ref: "3.5.8", 
        title: "Acceptable :Apps used for financial trading, investing, or money management should be submitted by the financial institution performing such services.", 
        steps: "1. Verify developer account ownership matches the financial institution.\n2. Review app for financial management features.", 
        expected: "App is submitted by the official financial institution.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.9", 
        gl: "GL-001", 
        ref: "3.5.9", 
        title: "Unacceptable: Creating an interface for displaying third party apps, extensions, or plug-ins similar to the App Store or as a general-interest collection.", 
        steps: "1. Analyze app interfaces that list other apps.\n2. Confirm it does not mimic the App Store's catalog or aggregation style.", 
        expected: "App does not behave as a third-party app store or general collection.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.10", 
        gl: "GL-001", 
        ref: "3.5.10", 
        title: "Unacceptable: Artificially increasing the number of impressions or click-throughs of ads, as well as apps that are designed predominantly for the display of ads.", 
        steps: "1. Check for ad-farming logic (auto-refresh, fake clicks).\n2. Evaluate if the app has purpose beyond ad display.", 
        expected: "No ad manipulation; app has distinct utility.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.11", 
        gl: "GL-001", 
        ref: "3.5.11", 
        title: "Unacceptable: Collecting funds within the app for charities and fundraisers. Apps that seek to raise money for such causes must be free on the App Store and may only collect funds outside of the app, such as via Safari or SMS.", 
        steps: "1. Check for charity donation buttons.\n2. Verify they redirect to Safari or initiate SMS for payment rather than in-app processing.", 
        expected: "Charity fundraising occurs outside the app binary flow.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.12", 
        gl: "GL-001", 
        ref: "3.5.12", 
        title: "Unacceptable: Arbitrarily restricting who may use the app, such as by location or carrier.", 
        steps: "1. Check for geofences or carrier-specific blocks that aren't legally required.\n2. Verify app is available to all users within target regions.", 
        expected: "No arbitrary usage restrictions found.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.13", 
        gl: "GL-001", 
        ref: "3.5.13", 
        title: "Unacceptable: Artificially manipulating a user’s visibility, status, or rank on other services unless permitted by that service’s Terms and Conditions", 
        steps: "1. Check for 'Follower growth' or 'Like manipulation' features.\n2. Verify no unofficial API usage for status boosting.", 
        expected: "No unauthorized service rank manipulation.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.14", 
        gl: "GL-001", 
        ref: "3.5.14", 
        title: "Unacceptable: Apps that facilitate binary options trading are not permitted on the App Store. Consider a web app instead. Apps that facilitate trading in contracts for difference (“CFDs”) or other derivatives (e.g. FOREX) must be properly licensed in all jurisdictions where the service is available.", 
        steps: "1. Review trading features for binary options.\n2. If CFD/Forex is present, verify licenses for all active territories.", 
        expected: "No binary options; CFD/Forex is properly licensed.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-3.5.15", 
        gl: "GL-001", 
        ref: "3.5.15", 
        title: "Unacceptable: Apps offering personal loans must clearly and conspicuously disclose all loan terms, including but not limited to equivalent maximum Annual Percentage Rate (APR) and payment due date. Apps may not charge a maximum APR higher than 36%, including costs and fees, and may not require repayment in full in 60 days or less.", 
        steps: "1. Audit personal loan terms and disclosures.\n2. Calculate max APR including fees; confirm <= 36%.\n3. Verify repayment term is > 60 days.", 
        expected: "Loan terms are clear, APR is <= 36%, and repayment > 60 days.",
        originalRef: "Other Business Model Issues"
      },
      { 
        id: "iOS-C-4.1.0", 
        gl: "GL-001", 
        ref: "4.1.0", 
        title: "Make sure that the app you are submitting is not a copy of other app. App is not simply a copy of other app with minor changes to app's name or UI and Passed it off as your own. Submitting an apps which impersonate other apps or services is considered a violation of the Developer Code of Conduct and may result in removal from the Apple Developer Program.", 
        steps: "1. Research similar apps in the same category.\n2. Verify the UI and name are distinct and unique.\n3. Confirm no impersonation of existing services.", 
        expected: "App is unique and does not impersonate other services.",
        originalRef: "Copycats"
      },
      // Section: Minimum Functionality
      { 
        id: "iOS-C-4.2.1", 
        gl: "GL-001", 
        ref: "4.2.1", 
        title: "Apps using ARKit should provide rich and integrated augmented reality experiences; merely dropping a model into an AR view or replaying animation is not enough.", 
        steps: "1. Test AR features for interactivity and environmental integration.\n2. Verify that AR adds significant functional value beyond simple viewing.", 
        expected: "AR experience is rich and interactive.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.2", 
        gl: "GL-001", 
        ref: "4.2.2", 
        title: "Other than catalogs, which have a dedicated category, apps shouldn’t primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links", 
        steps: "1. Review app content for original utility.\n2. Confirm the app is not just a wrapper for a website or a list of external links.", 
        expected: "App provides unique utility beyond web content or marketing.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.3", 
        gl: "GL-001", 
        ref: "4.2.3", 
        title: "Your app should work on its own without requiring installation of another app to function.", 
        steps: "1. Run the app on a fresh device without any other third-party apps.\n2. Verify all core functions work without 'Please install App X' prompts.", 
        expected: "App is fully functional standalone.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.4", 
        gl: "GL-001", 
        ref: "4.2.4", 
        title: "Make sure you include sufficient content in the binary for the app to function at launch.", 
        steps: "1. Test the app without network connectivity if possible (for offline-capable features).\n2. Verify initial screens are populated with useful data.", 
        expected: "App has enough built-in content to function immediately.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.5", 
        gl: "GL-001", 
        ref: "4.2.5", 
        title: "If your app needs to download additional resources in order to function on initial launch, disclose the size of the download and prompt users before doing so. Also ensure that the user has an option decline the download", 
        steps: "1. Trigger initial resource download.\n2. Check for size disclosure and user prompt.\n3. Verify decline option exists.", 
        expected: "Large downloads are transparent and optional.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.6", 
        gl: "GL-001", 
        ref: "4.2.6", 
        title: "Apps created from a commercialized template or app generation service will be rejected. These services should not submit apps on behalf of their clients and should offer tools that let their clients create customized, innovative apps that provide unique customer experiences", 
        steps: "1. Review code and assets for 'generic template' patterns.\n2. Verify unique branding and custom feature sets.", 
        expected: "App is unique and not a generic template clone.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.7.1", 
        gl: "GL-001", 
        ref: "4.2.7 (a)", 
        title: "The app must only connect to a user-owned host device that is a personal computer or dedicated game console owned by the user, and both the host device and client must be connected on a local and LAN-based network.", 
        steps: "1. Check remote desktop connection logic.\n2. Verify it only targets local/LAN hosts owned by the user.", 
        expected: "Connections are limited to user-owned local devices.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.7.2", 
        gl: "GL-001", 
        ref: "4.2.7 (b)", 
        title: "Any software or services appearing in the client are fully executed on the host device, rendered on the screen of the host device, and may not use APIs or platform features beyond what is required to stream the Remote Desktop.", 
        steps: "1. Verify no local execution of streamed apps.\n2. Confirm no usage of local system APIs beyond streaming.", 
        expected: "Execution happens entirely on the host.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.7.3", 
        gl: "GL-001", 
        ref: "4.2.7 (c)", 
        title: "All account creation and management must be initiated from the host device.", 
        steps: "1. Check for account sign-up buttons in the client.\n2. Verify they redirect to or occur on the host computer.", 
        expected: "Account management is offloaded to the host.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.7.4", 
        gl: "GL-001", 
        ref: "4.2.7 (d)", 
        title: "The UI appearing on the client does not resemble an iOS or App Store view, does not provide a store-like interface, or include the ability to browse, select, or purchase software not already owned or licensed by the user.", 
        steps: "1. Audit the client-side UI.\n2. Ensure no 'App Store' clones or browseable catalogs of unowned software.", 
        expected: "Client UI is purely a streaming pipe, not a store.",
        originalRef: "Minimum Functionality"
      },
      { 
        id: "iOS-C-4.2.7.5", 
        gl: "GL-001", 
        ref: "4.2.7 (e)", 
        title: "Thin clients for cloud-based apps are not appropriate for the App Store.", 
        steps: "1. Evaluate if the app is a mere front-end for a cloud service (e.g. game streaming without host ownership).", 
        expected: "App is not a non-compliant thin client.",
        originalRef: "Minimum Functionality"
      },
      // Section: Spam
      { 
        id: "iOS-C-4.3.1", 
        gl: "GL-001", 
        ref: "4.3.1", 
        title: "Don't create multiple Bundle IDs of the same app. Consider submitting a single app and provide the variation using in-app purchase", 
        steps: "1. Check developer account for duplicate apps.\n2. Verify if functionality can be merged into a single multi-tier app.", 
        expected: "No duplicate bundle IDs for the same core app.",
        originalRef: "Spam"
      },
      { 
        id: "iOS-C-4.3.2", 
        gl: "GL-001", 
        ref: "4.3.2", 
        title: "Do not spam the category of app which is already saturated. App store has enough fart, burp, flashlight, fortune telling, dating, drinking games & Kama Sutra apps already.", 
        steps: "1. Check if the app falls into a 'cluttered' category.\n2. Verify the app provides unique value beyond existing flashlight/joke apps.", 
        expected: "App is not part of a saturated spam category.",
        originalRef: "Spam"
      },
      // Section: Extensions
      { 
        id: "iOS-C-4.4.1", 
        gl: "GL-001", 
        ref: "4.4.1", 
        title: "Keyboard extensions must:\n- Provide keyboard input functionality (e.g. typed characters);\n- Follow Sticker guidelines if the keyboard includes images or emojis;\n- Provide a method for progressing to the next keyboard;\n- Remain functional without full network access and without requiring full access;\n- Collect user activity only to enhance the functionality of the user’s keyboard extension on the iOS device.\n\nThey must not:\n- Launch other apps besides Settings; or\n- Repurpose keyboard buttons for other behaviors (e.g. holding down the “return” key to launch the camera).", 
        steps: "1. Test character input functionality.\n2. Check sticker guideline compliance.\n3. Verify the 'Next Keyboard' button exists.\n4. Test functionality in offline mode.\n5. Audit keyboard button behaviors for repurposing.", 
        expected: "Keyboard extension follows all input, privacy, and behavior rules.",
        originalRef: "Extensions"
      },
      { 
        id: "iOS-C-4.4.2", 
        gl: "GL-001", 
        ref: "4.4.2", 
        title: "Safari extensions must run on the current version of Safari on OS X. They may not interfere with System or Safari UI elements and must never include malicious or misleading content or code. Safari extensions should not claim access to more websites than strictly necessary to function.", 
        steps: "1. Test extension on current macOS Safari.\n2. Verify it doesn't overlap or break browser UI.\n3. Audit permissions for excessive website access.", 
        expected: "Safari extension is stable, honest, and uses minimal permissions.",
        originalRef: "Extensions"
      },
      // Section: Apple Sites and Services
      { 
        id: "iOS-C-5.1.1", 
        gl: "GL-001", 
        ref: "5.1.1", 
        title: "Apps may use approved Apple RSS feeds such as the iTunes Store RSS feed, but may not scrape any information from Apple sites (e.g. apple.com, the iTunes Store, App Store, App Store Connect, developer portal, etc.) or create rankings using this information.", 
        steps: "1. Review app data sources.\n2. Confirm no scraping logic for Apple domains.\n3. Verify RSS feed usage is limited to approved sources.", 
        expected: "No unauthorized scraping of Apple sites found.",
        originalRef: "Apple Sites and Services"
      },
      { 
        id: "iOS-C-5.1.2", 
        gl: "GL-001", 
        ref: "5.1.2", 
        title: "MusicKit on iOS: Users must initiate the stream and be able to navigate playback using standard media controls such as “play,” “pause,” and “skip;” apps may not automate these actions. Moreover, your app may not require payment or indirectly monetize access to the Apple Music service (e.g. in-app purchase, advertising, requesting user info). Do not download, upload, or enable sharing of music files sourced from the MusicKit APIs, except as explicitly permitted in MusicKit documentation.", 
        steps: "1. Test MusicKit playback controls.\n2. Verify NO automation of play/pause/skip.\n3. Confirm access to Apple Music is not gated behind payments or ads.\n4. Verify no unauthorized sharing or downloading of MusicKit files.", 
        expected: "MusicKit implementation is manual, non-monetized, and secure.",
        originalRef: "Apple Sites and Services"
      },
      { 
        id: "iOS-C-5.1.3", 
        gl: "GL-001", 
        ref: "5.1.3", 
        title: "Do not use Apple Services to spam, phish, or send unsolicited messages to customers, including Game Center, Push Notifications, etc. Do not attempt to reverse lookup, trace, relate, associate, mine, harvest, or otherwise exploit Player IDs, aliases, or other information obtained through Game Center, or you will be removed from the Apple Developer Program.", 
        steps: "1. Audit usage of Game Center and Push Notifications.\n2. Confirm no phishing or spamming behaviors.\n3. Verify Player IDs are not exploited or reverse-traced.", 
        expected: "No abuse of Apple services for spam or exploitation.",
        originalRef: "Apple Sites and Services"
      },
      { 
        id: "iOS-C-5.1.4", 
        gl: "GL-001", 
        ref: "5.1.4", 
        title: "Push Notifications must not be required for the app to function, and should not be used for advertising, promotions, or direct marketing purposes or to send sensitive personal or confidential information. Abuse of these services may result in revocation of your privileges.", 
        steps: "1. Test app functionality with notifications disabled.\n2. Review notification content for marketing or sensitive data.\n3. Confirm app works without notification consent.", 
        expected: "Push notifications are optional and used appropriately.",
        originalRef: "Apple Sites and Services"
      },
      { 
        id: "iOS-C-5.1.5", 
        gl: "GL-001", 
        ref: "5.1.5", 
        title: "Only use Game Center Player IDs in a manner approved by the Game Center terms and do not display them in the app or to any third party.", 
        steps: "1. Inspect UI for Game Center Player ID visibility.\n2. Confirm IDs are used only for approved internal logic.", 
        expected: "Game Center Player IDs are kept confidential.",
        originalRef: "Apple Sites and Services"
      },
      { 
        id: "iOS-C-5.1.6", 
        gl: "GL-001", 
        ref: "5.1.6", 
        title: "Apps may use Unicode characters that render as Apple emojis in their app and app metadata. Apple emojis may not be used on other platforms or embedded directly in your app binary.", 
        steps: "1. Review emoji implementation.\n2. Confirm emojis are rendered via Unicode and NOT static assets (PNGs) embedded in the binary.", 
        expected: "Emojis use Unicode rendering; no prohibited binary embedding.",
        originalRef: "Apple Sites and Services"
      },
      // Section: Alternate App Icons
      { 
        id: "iOS-C-4.5.1", 
        gl: "GL-001", 
        ref: "4.5.1", 
        title: "Apps may display customized icons, provided that each change is initiated by the user.", 
        steps: "1. Test icon change initiation inside the app.\n2. Verify each alternate icon variant change requires explicit user permission or action.", 
        expected: "Each icon change is user-initiated, not triggered automatically.",
        originalRef: "Alternate App Icons"
      },
      { 
        id: "iOS-C-4.5.2", 
        gl: "GL-001", 
        ref: "4.5.2", 
        title: "App must include the setting to revert to original icon.", 
        steps: "1. Review settings or profile areas for icon preferences.\n2. Verify a clear toggle or button exists to restore the original/default app icon.", 
        expected: "A visible setting allows users to revert back to the original app icon.",
        originalRef: "Alternate App Icons"
      },
      { 
        id: "iOS-C-4.5.3", 
        gl: "GL-001", 
        ref: "4.5.3", 
        title: "All icon variants must relate to the content of the app and changes should be consistent across all system assets. E.g. icon in settings, notifications etc. must match the new springboard icon.", 
        steps: "1. Verify theme/alternate icon designs are relevant to the application.\n2. Ensure changed icons look consistent across settings, notifications, and the iOS springboard screen.", 
        expected: "Alternate icon variants are descriptive and fully synchronized across all system assets.",
        originalRef: "Alternate App Icons"
      },
      { 
        id: "iOS-C-4.5.4", 
        gl: "GL-001", 
        ref: "4.5.4", 
        title: "This feature may not be used in order to dynamically, automatic changing the icon.", 
        steps: "1. Analyze icon change scripts and triggers.\n2. Check for dynamic or scheduled icon alterations without explicit user confirmation.", 
        expected: "The application contains no logic for automated or dynamic background icon modifications.",
        originalRef: "Alternate App Icons"
      },
      // Section: HTML5 Games, Bots, etc.
      { 
        id: "iOS-C-4.7.1", 
        gl: "GL-001", 
        ref: "4.7.1", 
        title: "Apps may offer certain software that is not embedded in the binary (HTML5 mini apps/games, streaming games, chatbots, plugins, retro emulators). You are responsible for all such software ensuring compliance with Guidelines & laws.", 
        steps: "1. Inspect any non-embedded software utilities inside the app.\n2. Identify external widgets/games and confirm total accountability.", 
        expected: "Host-app has oversight and ensures external/mini software blocks are clean.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.2", 
        gl: "GL-001", 
        ref: "4.7.2", 
        title: "The software is free or purchased using in-app purchase.", 
        steps: "1. Verify that non-embedded offerings cannot be bought through third-party credit processors.\n2. Ensure standard Apple In-App Purchase is used.", 
        expected: "Mini-app billing models use Apple IAPs or are completely free.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.3", 
        gl: "GL-001", 
        ref: "4.7.3", 
        title: "Only uses capabilities available in a standard WebKit view; your app must use WebKit and JavaScript Core to run third party software and should not attempt to extend or expose native platform APIs to third party software.", 
        steps: "1. Audit third-party script containers.\n2. Ensure no non-standard APIs are appended to the WebKit host runtime.", 
        expected: "The app utilizes sandboxed default WebKit views to load third-party scripts securely.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.4", 
        gl: "GL-001", 
        ref: "4.7.4", 
        title: "The software/App is Offered by developers that have joined the Apple Developer Program and signed the Apple Developer Program License Agreement.", 
        steps: "1. Audit identity and verification states of external suppliers.\n2. Ensure creators have accepted and signed Apple developer terms.", 
        expected: "All mini-app authors are verified Apple Developer Program members.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.5", 
        gl: "GL-001", 
        ref: "4.7.5", 
        title: "Software/App does not provide access to real money gaming, lotteries, or charitable donations.", 
        steps: "1. Probe sub-menus of external software.\n2. Check for real money casinos, external sweepstakes, lotto ticket purchases, or non-compliant charity links.", 
        expected: "No casino, lotto, gambling, or standard donation systems are reachable.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.6", 
        gl: "GL-001", 
        ref: "4.7.6", 
        title: "Software/App adheres to the terms of these App Review Guidelines (e.g. does not include objectionable content).", 
        steps: "1. Review list of mini-apps for any objectionable or adult content.\n2. Confirm standard offensive-material blocks are working.", 
        expected: "Hosted contents conform smoothly to main App Store standards.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.7", 
        gl: "GL-001", 
        ref: "4.7.7", 
        title: "Software/App does not support digital commerce.", 
        steps: "1. Verify whether mini-apps facilitate retail shopping, physical goods purchases, or digital subscription bypasses.", 
        expected: "No e-commerce or digital stores are contained within hosted plugins.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.8", 
        gl: "GL-001", 
        ref: "4.7.8", 
        title: "Your app may not extend or expose native platform APIs to the software without prior permission from Apple.", 
        steps: "1. Audit native hook methods for JavaScript interfaces.\n2. Confirm no undocumented API access is unlocked for third-party programs.", 
        expected: "Native APIs remain strictly unexposed.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.9", 
        gl: "GL-001", 
        ref: "4.7.9", 
        title: "Your app may not share data or privacy permissions to any individual software offered in your app without explicit user consent in each instance.", 
        steps: "1. Trigger camera/location call inside a mini-app.\n2. Verify the host app presents a distinct user consent pop-up.", 
        expected: "Privacy permissions are not shared automatically; individual explicit consent is required.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.10", 
        gl: "GL-001", 
        ref: "4.7.10", 
        title: "You must provide an index of software and metadata available in your app. It must include universal links that lead to all of the software offered in your app.", 
        steps: "1. Check for directory page, search view, or grid of mini-apps.\n2. Confirm universal links are present for easy navigation.", 
        expected: "A fully linked, standardized directory of all hosted software is accessible.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      { 
        id: "iOS-C-4.7.11", 
        gl: "GL-001", 
        ref: "4.7.11", 
        title: "Your app must share the age rating of the highest age-rated content available in your app.", 
        steps: "1. Analyze content rating profiles of all embedded items.\n2. Ensure App Store store-front values match the maximum age constraint.", 
        expected: "The host app is rated correctly matching the highest tier content hosted.",
        originalRef: "HTML5 Games, Bots, etc."
      },
      // Section: Login Services.
      { 
        id: "iOS-C-4.8.1", 
        gl: "GL-001", 
        ref: "4.8.1", 
        title: "If game/app allows user to login with any third party social accounts (e.g. Facebook, Gmail etc.) in order to authenticate themselves/to enter the game, then it is mandatory to offer sign in with Apple as well", 
        steps: "1. Test user authentication flows.\n2. Verify if third-party social account logins are implemented.\n3. Verify that an equivalent Sign in with Apple option is provided or that it is mandatory if other social logins are present.", 
        expected: "Sign in with Apple is offered alongside other social login authentication options.",
        originalRef: "Login Services"
      },
      { 
        id: "iOS-C-4.8.2", 
        gl: "GL-001", 
        ref: "4.8.2", 
        title: "The login service limits data collection to the user’s name and email address.", 
        steps: "1. Audit data requested by the login scopes during authentication.\n2. Ensure the app does not request additional profiles, friends lists, or unneeded personal details.", 
        expected: "Requested login scopes are strictly limited to user name and email address.",
        originalRef: "Login Services"
      },
      { 
        id: "iOS-C-4.8.3", 
        gl: "GL-001", 
        ref: "4.8.3", 
        title: "The login service allows users to keep their email address private as part of setting up their account.", 
        steps: "1. Test the registration/login flow on a clean account.\n2. Verify that the login option offers a 'Hide My Email' or similar privacy feature (e.g. private relay address wrapper).", 
        expected: "Users have an option to hide their true email address using private email relays.",
        originalRef: "Login Services"
      },
      { 
        id: "iOS-C-4.8.4", 
        gl: "GL-001", 
        ref: "4.8.4", 
        title: "The login service does not collect interactions with your app for advertising purposes without consent.", 
        steps: "1. Check background requests and tracking pixels on the login page.\n2. Confirm no tracking or behavioral advertising is triggered unless explicit user consent has been obtained.", 
        expected: "No unsolicited third-party advertising tracking occurs during or after the login flow.",
        originalRef: "Login Services"
      },
      // Section: Sign in with Apple
      { 
        id: "iOS-C-4.9.1", 
        gl: "GL-001", 
        ref: "4.9.1", 
        title: "Your app exclusively uses your company’s own account setup and sign-in systems.", 
        steps: "1. Verify if the app only utilizes custom registration/login mechanisms owned by your company.\n2. Confirm no third-party identity providers require a conditional comparison if only proprietary accounts are used.", 
        expected: "Exclusive proprietary account sign-in requires no multi-party identity integrations.",
        originalRef: "Sign in with Apple"
      },
      { 
        id: "iOS-C-4.9.2", 
        gl: "GL-001", 
        ref: "4.9.2", 
        title: "Your app is an alternative app marketplace, or an app distributed from an alternative app marketplace, that uses a marketplace-specific login for account, download, and commerce features.", 
        steps: "1. Verify if the app acts as or is distributed by an alternative app marketplace.\n2. Check that the login methods coordinate correctly with marketplace-specific account and commerce portals.", 
        expected: "Marketplace login options are compliant, stable, and appropriately isolated.",
        originalRef: "Sign in with Apple"
      },
      { 
        id: "iOS-C-4.9.3", 
        gl: "GL-001", 
        ref: "4.9.3", 
        title: "Your app is a client for a specific third-party service and users are required to sign in to their mail, social media, or other third-party account directly to access their content.", 
        steps: "1. Inspect if the app serves as a dedicated wrapper or client for a third-party service.\n2. Confirm that users log directly and securely into that third-party service to retrieve their raw personal data.", 
        expected: "Direct third-party auth allows the client wrapper to safely process the third-party service's materials.",
        originalRef: "Sign in with Apple"
      },
      // Section: Apple Pay
      {
        id: "iOS-C-4.10.1",
        gl: "GL-001",
        ref: "4.10.1",
        title: "Apps using Apple Pay for recurring payments must disclose the length of the renewal term and clearly state that the payment will continue until cancelled.",
        steps: "1. Verify subscription screens using Apple Pay.\n2. Confirm that the length of the renewal term is clearly stated.\n3. Verify clear disclosure that billing continues until cancelled.",
        expected: "Length of renewal term and continuation warning are clearly disclosed.",
        originalRef: "Apple Pay"
      },
      {
        id: "iOS-C-4.10.2",
        gl: "GL-001",
        ref: "4.10.2",
        title: "Apps using Apple Pay for recurring payments must disclose what goods, services, or content will be provided during each billing period.",
        steps: "1. Review user interface for the recurring product.\n2. Ensure exactly what features/services/goods are delivered during the period are clearly defined.",
        expected: "Details of provided goods/services per billing period are clearly declared to the customer.",
        originalRef: "Apple Pay"
      },
      {
        id: "iOS-C-4.10.3",
        gl: "GL-001",
        ref: "4.10.3",
        title: "Apps using Apple Pay for recurring payments must disclose the actual charges that will be billed to the customer for each recurring payment period.",
        steps: "1. Check the subscription price tags and disclosures.\n2. Confirm the precise currency amount billed recurringly is shown.",
        expected: "Actual charges for each payment period are fully disclosed before confirmation.",
        originalRef: "Apple Pay"
      },
      {
        id: "iOS-C-4.10.4",
        gl: "GL-001",
        ref: "4.10.4",
        title: "Apps using Apple Pay for recurring payments must disclose clear instructions explaining how the customer can cancel the recurring payment or subscription.",
        steps: "1. Inspect the billing information, help, or product display screen.\n2. Confirm the presence of precise steps explaining how the subscription can be cancelled.",
        expected: "Clear cancellation instructions are accessible to users.",
        originalRef: "Apple Pay"
      },
      // Section: Monetizing Built-In Capabilities
      {
        id: "iOS-C-4.11.1",
        gl: "GL-001",
        ref: "4.11.1",
        title: "You may not monetize built-in capabilities provided by the hardware or operating system, such as Push Notifications, the camera, or the gyroscope; or Apple services and technologies, such as Apple Music access, iCloud storage, or Screen Time APIs.",
        steps: "1. Verify features like Push Notifications, Camera, and Gyroscope do not require paid access or subscriptions.\n2. Check that integrated Apple APIs (Apple Music, iCloud, Screen Time) are not gated behind monetization layers.",
        expected: "All built-in system capabilities and Apple services remain unmonetized.",
        originalRef: "Monetizing Built-In Capabilities"
      },
      // Section: Privacy
      {
        id: "iOS-C-5.1",
        gl: "GL-001",
        ref: "5.1.1",
        title: "Privacy Policies: All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner. The privacy policy must clearly and explicitly: Identify what data, if any, the app/service collects, how it collects that data, and all uses of that data.",
        steps: "1. Locate the privacy policy link within the app.\n2. Confirm the policy clearly specifies collected data types, collection methods, and all data uses.",
        expected: "Privacy policy link is easily accessible and fully details data collection and usage.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.2",
        gl: "GL-001",
        ref: "5.1.2",
        title: "Confirm that any third party with whom an app shares user data (in compliance with these Guidelines) — such as analytics tools, advertising networks and third party SDKs, as well as any parent, subsidiary or other related entities that will have access to user data — will provide the same or equal protection of user data as stated in the app’s privacy policy and required by these Guidelines.",
        steps: "1. Review list of integrated third-party SDKs and service providers.\n2. Confirm the privacy policy states that all third parties provide same or equal data protection.",
        expected: "Privacy policy explicitly guarantees equal data protection by all third parties.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.3",
        gl: "GL-001",
        ref: "5.1.3",
        title: "Explain its data retention/deletion policies and describe how a user can revoke consent and/or request deletion of the user’s data.",
        steps: "1. Check the privacy policy for explicit details on data retention and deletion.\n2. Verify the policy describes steps for users to revoke consent or request deletion.",
        expected: "Data retention, deletion, and consent revocation instructions are clearly explained.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.4",
        gl: "GL-001",
        ref: "5.1.4",
        title: "Permissions: Apps that collect user or usage data must secure user consent for the collection, even if such data is considered to be anonymous at the time of or immediately following collection.",
        steps: "1. Identify all telemetry or analytical tracking calls.\n2. Confirm that user consent is obtained before any data collection starts.",
        expected: "User consent is secured for any collection of user or usage data.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.5",
        gl: "GL-001",
        ref: "5.1.5",
        title: "Paid functionality must not be dependent on or require a user to grant access to this data.",
        steps: "1. Attempt to access paid features while declining non-essential data permissions.\n2. Verify that declining permissions does not block access to paid functionality.",
        expected: "Declining data tracking or access permissions does not restrict paid functionality.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.6",
        gl: "GL-001",
        ref: "5.1.6",
        title: "Apps must also provide the customer with an easily accessible and understandable way to withdraw consent.",
        steps: "1. Navigate to in-app settings or account options.\n2. Locate the consent withdrawal mechanism and verify it is easy to understand and use.",
        expected: "An understandable and accessible toggle or option allows users to withdraw consent.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.7",
        gl: "GL-001",
        ref: "5.1.7",
        title: "Ensure your purpose strings clearly and completely describe your use of the data.",
        steps: "1. Inspect the Info.plist permission description strings (e.g., Camera, Location, Contacts).\n2. Verify the strings describe exactly why the app needs the permission.",
        expected: "Purpose strings clearly and completely describe the utility of the requested data.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.8",
        gl: "GL-001",
        ref: "5.1.8",
        title: "Apps that collect data for a legitimate interest without consent by relying on the terms of the European Union’s General Data Protection Regulation (“GDPR”) or similar statute must comply with all terms of that law.",
        steps: "1. Verify GDPR policy links and legal grounds stated for data processing without direct consent.\n2. Verify complete compliance with EU GDPR data inventory rules.",
        expected: "Legitimate-interest data processing satisfies all criteria under GDPR.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.9",
        gl: "GL-001",
        ref: "5.1.9",
        title: "Data Minimization: Apps should only request access to data relevant to the core functionality of the app and should only collect and use data that is required to accomplish the relevant task. Where possible, use the out-of-process picker or a share sheet rather than requesting full access to protected resources like Photos or Contacts.",
        steps: "1. Checklist of required scopes vs. core functionality.\n2. Verify if the out-of-process document picker or system share sheet is preferred over raw full-access permission requests.",
        expected: "Data collection is minimal and utilizes native secure picker/share sheet delegates where possible.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.10",
        gl: "GL-001",
        ref: "5.1.10",
        title: "Access Apps must respect the user’s permission settings and not attempt to manipulate, trick, or force people to consent to unnecessary data access. Where possible, provide alternative solutions for users who don’t grant consent. For example, if a user declines to share Location, offer the ability to manually enter an address.",
        steps: "1. Ensure there are no coercive pop-ups forcing a permission grant.\n2. Verify that alternative solutions (such as manual input when Location is denied) are functional.",
        expected: "Permission settings are respected without coercive prompts, and fallback inputs are present.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.11",
        gl: "GL-001",
        ref: "5.1.11",
        title: "Account Sign-In: If your app doesn’t include significant account-based features, let people use it without a login. If your app supports account creation, you must also offer account deletion within the app. Apps may not require users to enter personal information to function, except when directly relevant to the core functionality of the app or required by law.",
        steps: "1. Confirm user can interact with core offline elements before or without registering support.\n2. Locate in-app account deletion controls.",
        expected: "Login is optional for non-account features, and registration is minimal and deletable.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.12",
        gl: "GL-001",
        ref: "5.1.12",
        title: "Ensure that the game offers an option to delete the game account [A dedicated BUTTON must be present in Settings].",
        steps: "1. Open settings sub-menu inside the app/game.\n2. Confirm a dedicated, clearly visible account deletion button exists.",
        expected: "A dedicated delete account button exists in the Settings section.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.13",
        gl: "GL-001",
        ref: "5.1.13",
        title: "For Games Authenticated by Ubi-account, the DELETE button navigates the user to Ubi-connect 'Account management' where the account can be delete [https://account.ubisoft.com/en-GB].",
        steps: "1. Log in with a Ubisoft/Ubi-account.\n2. Click the delete account button.\n3. Verify the browser/SafariViewController loads 'https://account.ubisoft.com/en-GB'.",
        expected: "Ubi-account deletion directs user to Ubisoft Connect account management URL.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.14",
        gl: "GL-001",
        ref: "5.1.14",
        title: "For Games Authenticated by Guest Account - The DELETE button triggers the account deletion flow [Starting with a warning pop-up that detailing it's effect - Refer to the screenshot beside].",
        steps: "1. Check guest session active state.\n2. Tap delete and verify a warning dialog explaining immediate data loss effects is present.",
        expected: "Guest account deletion triggers warning screen of permanent progress deletion.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.15",
        gl: "GL-001",
        ref: "5.1.15",
        title: "Upon confirming account deletion, ensure that the game reloads and starts afresh.",
        steps: "1. Initiate and confirm guest/local account deletion.\n2. Verify the application automatically clears cache, resets internal identifiers, reloads state, and starts from initial screen.",
        expected: "App clears all localized memory, triggers complete clean reload, and starts fresh.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.16",
        gl: "GL-001",
        ref: "5.1.16",
        title: "The app must also include a mechanism to revoke social network credentials and disable data access between the app and social network from within the app.",
        steps: "1. Check settings for linked accounts.\n2. Verify an explicit button exists to disconnect or revoke social network permissions from within the app.",
        expected: "Credentials can be revoked directly inside settings to disable active social integrations.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.17",
        gl: "GL-001",
        ref: "5.1.17",
        title: "Developers that use their apps to surreptitiously discover passwords or other private data will be removed from the Apple Developer Program.",
        steps: "1. Audit password inputs to ensure standard text field security masking (isSecureTextEntry).\n2. Probe network calls to confirm no phishing or unauthorized data discovery occurs.",
        expected: "Passwords and private entries are protected and never surreptitiously scanned or harvested.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.18",
        gl: "GL-001",
        ref: "5.1.18",
        title: "SafariViewContoller must be used to visibly present information to users; the controller may not be hidden or obscured by other views or layers. Additionally, an app may not use SafariViewController to track users without their knowledge and consent.",
        steps: "1. Trigger external documentation or oauth inside the app.\n2. Ensure SafariViewController is shown completely visible (unobscured).\n3. Confirm no tracking cookies/pixels are run over hidden views.",
        expected: "SafariViewController is displayed cleanly and visibly, without covert tracking behaviors.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.19",
        gl: "GL-001",
        ref: "5.1.19",
        title: "Apps that compile personal information from any source that is not directly from the user or without the user’s explicit consent, even public databases, are not permitted on the App Store.",
        steps: "1. Check if the app pulls and compiles personal records or files from remote public/private directories.\n2. Confirm explicit user consent is secured for any aggregated details.",
        expected: "No personal information is compiled or retrieved from non-consented collections or databases.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.20",
        gl: "GL-001",
        ref: "5.1.20",
        title: "Apps that provide services in highly-regulated fields (such as banking and financial services, healthcare, gambling, legal cannabis use, and air travel) or that require sensitive user information should be submitted by a legal entity that provides the services, and not by an individual developer. Apps that facilitate the legal sale of cannabis must be geo-restricted to the corresponding legal jurisdiction.",
        steps: "1. Confirm the submitter profile belongs to a vetted company/legal entity.\n2. Confirm geo-restrictions are active to enforce legal compliance bounds where required.",
        expected: "The app represents a formal legal entity and regulates sensitive activities geographically.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.21",
        gl: "GL-001",
        ref: "5.1.21",
        title: "Apps may request basic contact information (such as name and email address) so long as the request is optional for the user, features and services are not conditional on providing the information, and it complies with all other provisions of these guidelines, including limitations on collecting information from kids.",
        steps: "1. Locate contact request panels.\n2. Confirm a clear 'Skip' or 'Not Now' toggle exists.\n3. Verify all features run properly regardless of contact entry.",
        expected: "Contact details requests are completely optional, non-conditional, and protect minors.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.22",
        gl: "GL-001",
        ref: "5.1.22",
        title: "Unless otherwise permitted by law, you may not use, transmit, or share someone’s personal data without first obtaining their permission. You must provide access to information about how and where the data will be used. Data collected from apps may only be shared with third parties to improve the app or serve advertising (in compliance with the Apple Developer Program License Agreement.). You must receive explicit permission from users via the App Tracking Transparency APIs to track their activity. Learn more about tracking. Apps that share user data without user consent or otherwise complying with data privacy laws may be removed from sale and may result in your removal from the Apple Developer Program. English wording : \"Your data will be used to deliver you personalized and relevant ads\"",
        steps: "1. Confirm App Tracking Transparency dialog triggers on startup.\n2. Verify the exact wording: 'Your data will be used to deliver you personalized and relevant ads'.",
        expected: "App Tracking Transparency pop-up displays the required explicit tracking wording.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.23",
        gl: "GL-001",
        ref: "5.1.23",
        title: "Data collected for one purpose may not be repurposed without further consent unless otherwise explicitly permitted by law.",
        steps: "1. Review functional targets of collected datasets.\n2. Verify no data collected for one context is passed to a secondary, unrelated system without explicit re-consent.",
        expected: "Purpose-bound data holds its strict parameters and never flows into secondary pipelines unconsented.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.24",
        gl: "GL-001",
        ref: "5.1.24",
        title: "Apps should not attempt to surreptitiously build a user profile based on collected data and may not attempt, facilitate, or encourage others to identify anonymous users or reconstruct user profiles based on data collected from Apple-provided APIs or any data that you say has been collected in an “anonymized,” “aggregated,” or otherwise non-identifiable way.",
        steps: "1. Analyze ID tracking protocols and background identifiers.\n2. Check for fingerprinting or profile-reconstruction scripts.",
        expected: "The app forbids stealth profile building or matching of anonymized records.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.25",
        gl: "GL-001",
        ref: "5.1.25",
        title: "Do not use information from Contacts, Photos, or other APIs that access user data to build a contact database for your own use or for sale/distribution to third parties, and don’t collect information about which other apps are installed on a user’s device for the purposes of analytics or advertising/marketing.",
        steps: "1. Audit Photos/Contacts utilization.\n2. Confirm no localized address list compilation or installed-app checks exist.",
        expected: "Device resources are never scraped to build unauthorized contact lists or competitor app lists.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.26",
        gl: "GL-001",
        ref: "5.1.26",
        title: "Do not contact people using information collected via a user’s Contacts or Photos, except at the explicit initiative of that user on an individualized basis; do not include a Select All option or default the selection of all contacts. You must provide the user with a clear description of how the message will appear to the recipient before sending it",
        steps: "1. Trigger invitations screen.\n2. Confirm there is no 'Select All' contacts checkbox.\n3. Check for a detailed template mockup preview of how the message will appear.",
        expected: "Invitations are strictly individualized, lack default auto-selections, and display a message preview.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.27",
        gl: "GL-001",
        ref: "5.1.27",
        title: "Data gathered from the HomeKit API, HealthKit, Clinical Health Records API, MovementDisorder APIs, ClassKit or from depth and/or facial mapping tools (e.g. ARKit, Camera APIs, or Photo APIs) may not be used for marketing, advertising or use-based data mining, including by third parties.",
        steps: "1. Review utilization of specialized APIs like ARKit, HealthKit, and ClassKit.\n2. Ensure no gathered attributes are passed down to advertisement trackers or brokers.",
        expected: "Framework metrics are fully isolated from marketing, ad networks, or data mining profiles.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.28",
        gl: "GL-001",
        ref: "5.1.28",
        title: "Apps using Apple Pay may only share user data acquired via Apple Pay with third parties to facilitate or improve delivery of goods and services.",
        steps: "1. Inspect outgoing payloads of custom checkout handlers.\n2. Verify the transactional information is only shared strictly for billing + logistics delivery fulfillment.",
        expected: "Apple Pay details are strictly shared for purchase fulfillment with no advertising reuse.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.29",
        gl: "GL-001",
        ref: "5.1.29",
        title: "Apps may not use or disclose to third parties data gathered in the health, fitness, and medical research context for advertising or other use-based data mining purposes other than improving health management, or for the purpose of health research, and then only with permission. Apps may, however, use a user’s health or fitness data to provide a benefit directly to that user (such as a reduced insurance premium), provided that the app is submitted by the entity providing the benefit, and the data is not be shared with a third party. You must disclose the specific health data that you are collecting from the device.",
        steps: "1. Audit fitness/health metric routing.\n2. Ensure health data feeds directly into patient utilities rather than target advertisement clusters.",
        expected: "Sensitive health tracking records are fully ring-fenced from data broker integrations.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.30",
        gl: "GL-001",
        ref: "5.1.30",
        title: "Apps must not write false or inaccurate data into HealthKit and may not store personal health information in iCloud",
        steps: "1. Check HealthKit save and edit routines.\n2. Verify that no spoofed data profiles are created.\n3. Ensure health records are saved locally or in appropriate backends, NOT on iCloud.",
        expected: "Write commands into HealthKit are verified and personal health information avoids iCloud storages.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.31",
        gl: "GL-001",
        ref: "5.1.31",
        title: "Apps conducting health-related human subject research must obtain consent from participants or, in the case of minors, their parent or guardian.",
        steps: "1. Inspect clinical test consent dialogs.\n2. Confirm explicit adult signature pathways or parent/guardian verification triggers for children.",
        expected: "Formal research workflows receive pre-screening validation checkpoints.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.32",
        gl: "GL-001",
        ref: "5.1.32",
        title: "Apps conducting health-related human subject research must secure approval from an independent ethics review board. Proof of such approval must be provided upon request.",
        steps: "1. Locate certification, study registration records, and IRB labels.\n2. Confirm active ethics review board clearances accompany the metadata records.",
        expected: "Comprehensive medical trials verify active independent review declarations.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.33",
        gl: "GL-001",
        ref: "5.1.33",
        title: "It is critical to use care when dealing with personal data from kids, and we encourage you to carefully review all the requirements for complying with laws like the Children’s Online Privacy Protection Act (“COPPA”), the European Union’s General Data Protection Regulation (“GDPR”), and any international or local equivalents.",
        steps: "1. Review registration ages.\n2. Confirm presence of high privacy gating when treating child accounts.",
        expected: "Underage accounts are securely separated with maximum COPPA and GDPR compliant constraints.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.34",
        gl: "GL-001",
        ref: "5.1.34",
        title: "Apps may ask for birthdate and parental contact information only for the purpose of complying with these statutes, but must include some useful functionality or entertainment value regardless of a person’s age.",
        steps: "1. Check if the app locks behind age walls without providing reasonable default games or activities.\n2. Confirm collected birthdate values are used only to establish legal compliance.",
        expected: "Basic system loops remain open and playable without blocking younger segments.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.35",
        gl: "GL-001",
        ref: "5.1.35",
        title: "Apps intended for kids may not include third-party advertising or analytics.",
        steps: "1. Verify if the 'Kids Category' target is selected in metadata.\n2. Audit and confirm the complete removal of Google AdMob, Unity Ads, and commercial analytics SDKs.",
        expected: "Kids category apps remain completely clean of third-party ads and analytics engines.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.36",
        gl: "GL-001",
        ref: "5.1.36",
        title: "Apps in Kids category or those that collect, transmit, or have the capability to share personal information from a minor must include a privacy policy. and must comply with all applicable children’s privacy statutes.",
        steps: "1. Confirm the presence of children terms inside the primary privacy link.\n2. Verify that child-data handling matches localized global privacy laws.",
        expected: "Children's privacy clauses are fully articulated and compliant.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.37",
        gl: "GL-001",
        ref: "5.1.37",
        title: "Collecting and transmitting data to third parties from apps in the Kids category is not allowed.",
        steps: "1. Trap networks calling outside of host domains for Kids target category.\n2. Confirm absolutely zero telemetry is shipped to foreign commercial data receptors.",
        expected: "Absolute local sandboxing blocks any external telemetry output.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.38",
        gl: "GL-001",
        ref: "5.1.38",
        title: "Location services must be used only when it is directly relevant to the features and services provided by the app",
        steps: "1. Check if background or foreground location tracking is active.\n2. Confirm the feature (e.g., store locator) directly maps to that location dependency.",
        expected: "Location tracking options align tightly with explicit app functions.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.39",
        gl: "GL-001",
        ref: "5.1.39",
        title: "Ensure that you notify and obtain consent before collecting, transmitting, or using location data.",
        steps: "1. Check for the native OS permission pop-up configuration.\n2. Ensure no coordinate transmission starts prior to user tap.",
        expected: "Location coordinates stay uncollected until immediate consent is approved.",
        originalRef: "Privacy"
      },
      {
        id: "iOS-C-5.40",
        gl: "GL-001",
        ref: "5.1.40",
        title: "If your app uses location services, be sure to explain the purpose in your app",
        steps: "1. Review NSLocationWhenInUseUsageDescription inside Info.plist metadata.\n2. Verify the description clearly informs users of the exact benefit of sharing target coordinates.",
        expected: "The purpose explanation shows absolute transparency.",
        originalRef: "Privacy"
      }
    ]
  },
  android: {
    guidelines: [
      { id: "AGL-001", title: "Compliance", description: "Android Google Play checklist: Compliance", category: "Compliance", impact: "high" }
    ],
    testCases: [
      { id: "And-C-1", gl: "AGL-001", ref: "1.1.1", title: "Objectionable Content - General Policy", steps: "1. Review app content for prohibited material.\n2. Verify against Play Store policies.", expected: "Content is compliant with policy." }
    ]
  }
};

export const IOS_ICONS: Record<string, string> = { 
  'Compliance': '📋' 
};

export const AND_ICONS: Record<string, string> = { 
  'Compliance': '📋' 
};
