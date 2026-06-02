const fs = require('fs');

const file = 'src/data.ts';
let content = fs.readFileSync(file, 'utf8');

const newData = `      },
      {
        id: "And-GPGP-1.30",
        gl: "AGL-006",
        ref: "1.30",
        title: "User Data",
        steps: "1. Check the app's privacy policy and in-app disclosures to ensure transparency regarding data collection.\\n2. Verify the data usage matches the disclosed purposes and user consent.",
        expected: "Complete transparency and adherence to disclosed user data handling practices.",
        policyText: "User Data: \\nApp must be transparent in how it handles user data (e.g., information collected from or about a user, including device information), disclosing the collection, use, and sharing of the data, and limiting the use of the data to the purposes disclosed, and the consent provided by the user.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.31",
        gl: "AGL-006",
        ref: "1.31",
        title: "Personal and Sensitive Information",
        steps: "1. Audit the app to verify it only collects data needed for documented features.\\n2. Check that all sensitive data is transmitted securely (e.g., HTTPS).\\n3. Ensure runtime permissions are requested before accessing sensitive data.\\n4. Confirm the app does not sell personal/sensitive data.",
        expected: "Sensitive user data is handled securely, not sold, and collected only for necessary features.",
        policyText: "Personal and Sensitive Information : \\nPersonal and sensitive user data includes, but isn't limited to, personally identifiable information, financial and payment information, authentication information, phonebook, contacts SMS and call related data, microphone and camera sensor data, and sensitive device or usage data. Following are the guidelines -\\n1) App must limit your collection and use of this data to purposes directly related to providing and improving the features of the app (e.g. user anticipated functionality that is documented and promoted in the app's description). Apps that extend usage of this data for serving advertising must be in compliance with our Ads Policy.\\n2) App may also transfer data as necessary to service providers or for legal reasons such as to comply with a valid governmental request, applicable law, or as part of a merger or acquisition with legally adequate notice to users.\\n3) App must Handle all personal and sensitive user data securely, including transmitting it using modern cryptography (for example, over HTTPS)\\n4) App must Use a runtime permissions request whenever available, prior to accessing data gated by Android permissions\\n5) Not to sell personal and sensitive user data.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.32",
        gl: "AGL-006",
        ref: "1.32",
        title: "Prominent Disclosure Requirement",
        steps: "1. Launch the app and observe if a prominent disclosure is shown before sensitive data is collected.\\n2. Check that the disclosure is in-app (not just web/settings), clearly describes what data is collected, and how it's used.\\n3. Ensure the consent dialog requires an affirmative tap/check (not an auto-dismiss or passing navigation).",
        expected: "Prominent, in-app disclosures and explicit consent dialogs correctly precede any data collection.",
        policyText: "Prominent Disclosure Requirement :\\nApps requesting users for their personal or sensitive user data provide or improve the features of the app must provide an in-app disclosure of your data collection and use as mentioned below -\\n1) Must be within the app itself, not only in the app description or on a website;\\n2) Must be displayed in the normal usage of the app and not require the user to navigate into a menu or settings;\\n3) Must describe the data being accessed or collected;\\n4) Must explain how the data will be used and/or shared;\\n5) Cannot only be placed in a privacy policy or terms of service; and\\n6) Cannot be included with other disclosures unrelated to personal or sensitive data collection.\\n\\nSecondarily, the App providing in-app disclosure must include a request for user consent and MUST contain following :\\n1) Must present the consent dialog clearly and unambiguously;\\n2) Must require affirmative user action (e.g. tap to accept, tick a check-box);\\n3) Must not interpret navigation away from the disclosure (including tapping away D361or pressing the back or home button) as consent; and\\n4) Must not use auto-dismissing or expiring messages as a means of obtaining user consent.\\n5) Must be granted by the user before  app can begin to collect or access the personal and sensitive user data.\\nTo meet policy requirements, it’s recommended that you reference the following example format for Prominent Disclosure when it’s required:\\n- “[This app] collects/transmits/syncs/stores [type of data] to enable  [\\\"feature\\\"], [in what scenario].\"\\n- Example: “Fitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising.”\\n- Example: “Call buddy collects read and write call log data to enable contact organization even when the app is not in use.”\\n\\nApp that accesses a user's inventory of installed apps and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.\\n\\nFitness Funds collects location data to enable fitness tracking even when the app is closed or not in use and is also used to support advertising\\n\\nAn app that accesses a user's phone or contact book data and doesn't treat this data as personal or sensitive data subject to the Privacy Policy, Secure Transmission, and Prominent Disclosure requirements.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.33",
        gl: "AGL-006",
        ref: "1.33",
        title: "Privacy Policy",
        steps: "1. Open the Play Console data and the app itself to locate the Privacy Policy.\\n2. Read the policy to confirm it specifies developer info, data types collected, secure handling procedures, and a clear data retention/deletion policy.",
        expected: "A clear, accessible Privacy Policy is present both in the app and on the Play listing.",
        policyText: "Privacy Policy\\nApps must post a privacy policy in both the designated field in Play Console and within the app itself. The privacy policy must, together with any in-app disclosures, comprehensively disclose how your app accesses, collects, uses, and shares user data, not limited by the data disclosed in the Data Safety section.\\nApps should include - \\n• Developer information and a privacy point of contact or a mechanism to submit inquiries\\n• Disclosing the types of personal and sensitive user data your app accesses, collects, uses, and shares; and any parties with which any personal or • Sensitive user data is shared\\n• Secure data handling procedures for personal and sensitive user data\\n• Developer’s data retention and deletion policy\\n• Clear labeling as a privacy policy (e.g., listed as “privacy policy” in title)",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.34",
        gl: "AGL-006",
        ref: "1.34",
        title: "Account Deletion Requirement",
        steps: "1. Create an account within the app.\\n2. Look for a clearly visible in-app option to delete the account.\\n3. Verify an external web link is provided for account deletion.\\n4. Confirm that deletion removes associated data, rather than just freezing the account.",
        expected: "Users can readily discover and initiate a true account deletion both in-app and via web.",
        policyText: "Account Deletion Requirement\\n1) Your app must provide users with the ability to create an account directly within the app.\\n2) Users should be able to request deletion of their account from both within the app and through an external method, such as visiting your website.\\n3) A clearly visible option for initiating account deletion must be readily discoverable within the app interface.\\n4) You must provide a designated URL in the Play Console where users can find information and initiate account deletion.\\n5) Deleting an app account, upon user request, necessitates the deletion of all associated user data.\\n6) Merely deactivating, disabling, or freezing an account does not qualify as deletion.\\n7) If certain data must be retained for legitimate purposes (e.g., security, fraud prevention, regulatory compliance), users must be informed about these practices in your privacy policy.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.35",
        gl: "AGL-006",
        ref: "1.35",
        title: "Usage of App Set ID",
        steps: "1. Review any network outgoing data to check if 'App set ID' is sent to advertising networks.\\n2. Verify the ID is not linked to Android advertising IDs (AAID) or sensitive data for ads tracking.",
        expected: "App set ID is used exclusively for analytics/fraud prevention, never ads personalization.",
        policyText: "Usage of App Set ID\\nAndroid introduce a new ID to support essential use cases such as analytics and fraud prevention. Such as -\\n\\n• Usage: App set ID must not be used for ads personalization and ads measurement. \\n• Association with personally-identifiable information or other identifiers: App set ID may not be connected to any Android identifiers (e.g., AAID) or any personal and sensitive data for advertising purposes.\\n• Transparency and consent: The collection and use of the app set ID and commitment to these terms must be disclosed to users in a legally adequate privacy notification, including your privacy policy.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.36",
        gl: "AGL-006",
        ref: "1.36",
        title: "EU-U.S., Swiss Privacy Shield",
        steps: "1. Check if the app targets or accesses personal data from EU/Swiss citizens via Google.\\n2. Confirm the app strictly complies with the Privacy Shield framework and related European data security rules.",
        expected: "EU and Swiss user data is handled securely under the appropriate privacy shields and laws.",
        policyText: "EU-U.S., Swiss Privacy Shield\\nApps which access, use, or process personal information made available by Google that directly or indirectly identifies an individual and that originated in the European Union or Switzerland (“EU Personal Information”), then - \\n• Comply with all applicable privacy, data security, and data protection laws, directives, regulations, and rules\\n• Access, use or process EU Personal Information only for purposes that are consistent with the consent obtained from the individual to whom the EU Personal Information relates\\n• Implement appropriate organizational and technical measures to protect EU Personal Information against loss, misuse, and unauthorized or unlawful access, disclosure, alteration and destruction\\n• Provide the same level of protection as is required by the Privacy Shield Principles",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.37",
        gl: "AGL-006",
        ref: "1.37",
        title: "Permissions",
        steps: "1. Extract the AndroidManifest.xml and review requested permissions.\\n2. Match permissions to current app features; flag unneeded or unused permissions.\\n3. Test the app by denying permissions to ensure it gracefully handles missing access.",
        expected: "Requested permissions are minimal, understood contextually, and tightly connected to current features.",
        policyText: "Permissions :\\nRequested permissions by app should be simple to understand, and can request permissions that are necessary to implement critical current features or services in your application\\nApp is not allowed to use permissions that give access to user or device data for undisclosed, unimplemented, or disallowed features or purposes. Personal or sensitive data accessed through permissions may never be sold.\\nRequest permissions to access data in context (via incremental auth), so that users understand why your app is requesting the permission. Use the data only for purposes that the user has consented to. If you later wish to use the data for other purposes, you must ask users and make sure they affirmatively agree to the additional uses",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.38",
        gl: "AGL-006",
        ref: "1.38",
        title: "Restricted Permissions",
        steps: "1. Identify if Restricted Permissions (like Call Logs, SMS) are requested.\\n2. Deny the restricted permission and check if the app provides a manual alternative.\\n3. Confirm data from these permissions is not sold or transferred beyond core functionality needs.",
        expected: "Restricted permissions are treated with high sensitivity and users are never forced into granting them.",
        policyText: "Restricted Permissions :-\\n1) Sensitive user or device data accessed through Restricted Permissions may only be transferred to third parties if necessary to provide or improve current features or services in the app from which the data was collected. App is allowed to transfer data as necessary to comply with applicable law or as part of a merger, acquisition, or sale of assets with legally adequate notice to users. All other transfers or sales of the user data are prohibited.\\n2) Respect users’ decisions if they decline a request for a Restricted Permission, and users may not be manipulated or forced into consenting to any non-critical permission. App must accommodate users who do not grant access to sensitive permissions (e.g., allowing a user to manually enter a phone number if they’ve restricted access to Call Logs).\\n3) Use of permissions in contravention of official Android developer App permissions best practices or in violation of existing policies (including Elevated Privilege Abuse) are expressly prohibited.\\n4) Certain Restricted Permissions may be subject to additional requirements as detailed below. The objective of these restrictions is to safeguard user privacy. We may make limited exceptions to the requirements below in very rare cases where apps provide a highly compelling or critical feature and where there is no alternative method available to provide the feature. We evaluate proposed exceptions against the potential privacy or security impacts on users.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.39",
        gl: "AGL-006",
        ref: "1.39",
        title: "Location Permissions",
        steps: "1. Ensure background location isn't requested unless the app offers a compelling, core feature that requires it.\\n2. Confirm coarse location is preferred over fine location where applicable.\\n3. Check that location data isn't used purely for advertising.",
        expected: "Location tracking is tightly scoped and primarily foreground unless heavily justified.",
        policyText: "Location Permissions :Apps may not access data protected by location permissions (e.g., ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION) after it is no longer necessary to deliver current features or services in your app.\\n\\nApp's should never request location permissions from users for the sole purpose of advertising or analytics. Apps that extend permitted usage of this data for serving advertising must be in compliance with our Ads Policy.\\n\\nApps should request the minimum scope necessary (i.e., coarse instead of fine, and foreground instead of background) to provide the current feature or service requiring location and users should reasonably expect that the feature or service needs the level of location requested. For example, we may reject apps that request or access background location without compelling justification.\\n\\nBackground location may only be used to provide features beneficial to the user and relevant to the core functionality of the app.\\n\\nApps are allowed to access location using foreground service (when the app only has foreground access e.g.: \\"while in use\\") permission if the use:\\n1) has been initiated as a continuation of an in-app user-initiated action, and\\n2) is terminated immediately after the intended use case of the user-initiated action is completed by the application.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.40",
        gl: "AGL-006",
        ref: "1.40",
        title: "Package (App) Visibility Permission",
        steps: "1. Search for 'QUERY_ALL_PACKAGES' in the manifest.\\n2. Verify if broad visibility is absolutely necessary for the app to function (e.g., an antivirus or launcher).\\n3. Replace broad app visibility queries with targeted approaches if specific packages are known.",
        expected: "Broad app visibility permissions are restricted to verified utility/launcher apps and absent otherwise.",
        policyText: "Package (App) Visibility Permission :-\\nApps that have a core purpose to launch, search, or interoperate with other apps on the device, may obtain scope-appropriate visibility to other installed apps on the device as outlined below\\nBroad app visibility : Capability of an app to have extensive (or “broad”) visibility of the installed apps (“packages”) on a device.\\n• For apps targeting API level 30 or later, broad visibility to installed apps via the QUERY_ALL_PACKAGES permission is restricted to specific use cases where awareness of and/or interoperability with any and all apps on the device are required for the app to function. \\n• You may not use QUERY_ALL_PACKAGES if your app can operate with a more targeted scoped package visibility declaration(e.g. querying and interacting with specific packages instead of requesting broad visibility).\\n• Use of alternative methods to approximate the broad visibility level associated with QUERY_ALL_PACKAGES permission are also restricted to user-facing core app functionality and interoperability with any apps discovered via this method.\\n• Please see this Help Center article for allowable use cases for the QUERY_ALL_PACKAGES permission.\\n\\nLimited app visibility : Limited visibility is when an app minimizes access to data by querying for specific apps using more targeted (instead of “broad”) methods\\n• Visibility to the inventory of installed apps on a device must be directly related to the core purpose or core functionality that users access within your app. \\n• App inventory data queried from Play-distributed apps may never be sold nor shared for analytics or ads monetization purposes.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.41",
        gl: "AGL-006",
        ref: "1.41",
        title: "Accessibility API",
        steps: "1. Test if the app requests Accessibility services.\\n2. Confirm it does not stealthily change system settings or prevent uninstalls using the API.\\n3. Ensure the service isn't used to bypass built-in privacy controls.",
        expected: "Accessibility APIs are strictly used to assist users, not for deceptive configuration changes.",
        policyText: "Accessibility API :-\\nThe Accessibility API cannot be used to:\\n• Change user settings without their permission unless authorized by a parent or guardian through a parental control app or by authorized administrators through enterprise management software; \\n• Prevent the ability for users to disable or uninstall any app or service, \\n• Work around Android built-in privacy controls and notifications, or\\n• Change or leverage the user interface in a way that is deceptive or otherwise violates Google Play Developer Policies",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.42",
        gl: "AGL-006",
        ref: "1.42",
        title: "Device and Network Abuse",
        steps: "1. Test the app for background activities that circumvent power management without being whitelisted.\\n2. Verify the application doesn't block other apps from displaying ads.\\n3. Ensure 'USE_FULL_SCREEN_INTENT' isn't abused to push disruptive notifications.\\n4. Confirm all downloaded code/SDKs are hosted safely and are not arbitrary executables.",
        expected: "The app respects the device ecosystem, system limits, and other applications on the user's device.",
        policyText: "Device and Network Abuse: \\nApps are not allowed on store that interfere with, disrupt, damage, or access in an unauthorized manner the user’s device, other devices or computers, servers, networks, application programming interfaces (APIs), or services, including but not limited to other apps on the device, any Google service, or an authorized carrier’s network. \\nApps on Google Play must comply with the default Android system optimization requirements documented in the Core App Quality guidelines for Google Play.\\nExamples of common violations -\\n• Apps that block or interfere with another app displaying ads.\\n• Game cheating apps that affect the gameplay of other apps.\\n• Apps that facilitate or provide instructions on how to hack services, software or hardware, or circumvent security protections.\\n• Apps that access or use a service or API in a manner that violates its terms of service.\\n• Apps that are not eligible for whitelisting and attempt to bypass system power management .\\n• Apps that facilitate proxy services to third parties may only do so in apps where that is the primary, user-facing core purpose of the app.\\n• Apps or third party code (e.g., SDKs) that download executable code, such as dex files or native code, from a source other than Google Play.\\n• Apps that install other apps on a device without the user's prior consent.\\n• Apps that link to or facilitate the distribution or installation of malicious software.\\n• Apps or third party code (e.g., SDKs) containing a WebView with added JavaScript Interface that loads untrusted web content.\\n• Apps that use the full-screen intent permission to force user interaction with disruptive ads or notifications.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.43",
        gl: "AGL-006",
        ref: "1.43",
        title: "Deceptive Behavior",
        steps: "1. Playtest the app to confirm its actual function matches its store description and screenshots.\\n2. Look for UI elements that mimic Android system notifications or warnings.\\n3. Verify the app doesn't incentivize users into rating or uninstalling third-party apps.",
        expected: "App operates precisely as marketed without system mimicry or functional deception.",
        policyText: "Deceptive Behavior:\\nApps are not allowed that  that attempt to deceive users or enable dishonest behavior including but not limited to apps which are determined to be functionally impossible. Apps must provide an accurate disclosure, description and images/video of their functionality in all parts of the metadata and should perform as reasonably expected by the user. Apps must not attempt to mimic functionality or warnings from the operating system or other apps. Any changes to device settings must be made with the user's knowledge and consent and be easily reversible by the user.\\n• Apps must not encourage, incentivize or mislead users into removing or disabling third-party apps except as part of a security service provided by the app.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.44",
        gl: "AGL-006",
        ref: "1.44",
        title: "Misleading Claims",
        steps: "1. Check the app title and description for false affiliations (like 'Official Government App').\\n2. Ensure the app doesn't claim medically impossible or physically unfeasible tasks (like an insect repellent audio tool).\\n3. Ensure the app is correctly categorized in the Play Console.",
        expected: "Descriptions and titles reflect only the real, achievable capabilities of the app.",
        policyText: "Misleading Claims : \\nApps are not allowed that contain false or misleading information or claims, including in the description, title, icon, and screenshots.\\nExamples of common violations\\n1) Apps that misrepresent or do not accurately and clearly describe their functionality:\\n2) An app that claims to be a racing game in its description and screenshots, but is actually a puzzle block game using a picture of a car.\\n3) An app that claims to be an antivirus app, but only contains a text guide explaining how to remove viruses.\\n4) Apps that feature medical or health-related content or functionalities that are misleading or potentially harmful.\\n5) Apps that claim functionalities that are not possible to implement, such as insect repellent apps, even if it is represented as a prank, fake, joke, etc.\\n6) Apps that are improperly categorized, including but not limited to the app rating or app category.\\n7) Demonstrably deceptive or false content that may interfere with voting processes.\\n8) Apps that falsely claim affiliation with a government entity or to provide or facilitate government services for which they are not properly authorized.\\n9) Apps that falsely claim to be the official app of an established entity. Titles like “Justin Bieber Official” are not allowed without the necessary permissions or rights.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.45",
        gl: "AGL-006",
        ref: "1.45",
        title: "Deceptive Device Settings Changes",
        steps: "1. Confirm the app does not alter home screen shortcuts, bookmarks, or system settings outside its purview.\\n2. Verify any authorized settings modifications are easily reversible.\\n3. Ensure ads served in the app do not modify device settings.",
        expected: "The app strictly obeys system boundaries and user configurations.",
        policyText: "Deceptive Device Settings Changes :\\n Apps are not allowed that make changes to the user’s device settings or features outside of the app without the user’s knowledge and consent. Device settings and features include system and browser settings, bookmarks, shortcuts, icons, widgets, and the presentation of apps on the home screen.\\n\\nAdditionally, following settings are not allowed:\\n- Apps that modify device settings or features with the user’s consent but do so in a way that is not easily reversible.\\n- Apps or ads that modify device settings or features as a service to third parties or for advertising purposes.\\n- Apps that mislead users into removing or disabling third-party apps or modifying device settings or features.\\n- Apps that encourage or incentivize users into removing or disabling third-party apps or modifying device settings or features unless it is part of a verifiable security service.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.46",
        gl: "AGL-006",
        ref: "1.46",
        title: "Enabling Dishonest Behavior",
        steps: "1. Ensure the app does not create fake IDs, forged diplomas, or fake credit cards (even if labeled as a 'prank').\\n2. Test that it doesn't display real-world PII of non-consenting users.\\n3. Ensure core functionality doesn't drastically change post-review without store listing updates.",
        expected: "No deceptive generation engines or hidden proxy logic exist in the app.",
        policyText: "Enabling Dishonest Behavior :\\n1) Apps are not allowed that help users to mislead others, including, but not limited to, apps that generate or facilitate the generation of ID cards, social security numbers, passports, diplomas, credit cards and driver's licenses. \\n2) Any claim that an app is a \\"prank\\", \\"for entertainment purposes\\" (or other synonym) does not exempt an app from application of our policies.\\n3) Apps must provide accurate disclosures, titles, descriptions and images/video regarding the app's functionality and/or content and should perform as reasonably and accurately expected by the user.\\n\\nExamples of common violations - \\n• Apps that mimic other apps or websites to trick users into disclosing personal or authentication information.\\n• Apps that depict or display unverified or real world phone numbers, contacts, addresses, or personally identifiable information of non-consenting individuals or entities.\\n• Apps with different core functionality based on a user’s geography, device parameters, or other user-dependent data where those differences are not prominently advertised to the user in the store listing.  \\n• Apps that change significantly between versions without alerting the user (e.g., ‘what’s new’ section) and updating the store listing.\\n• Apps that attempt to modify or obfuscate behavior during review.\\n• Apps with content delivery network (CDN) facilitated downloads that fail to prompt the user and disclose the download size prior to downloading.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.47",
        gl: "AGL-006",
        ref: "1.47",
        title: "Manipulated Media",
        steps: "1. If the app facilitates deepfakes or altered media, ensure it embeds prominent watermarks.\\n2. Confirm the app does not encourage generating false news clips or sensitive event manipulation.",
        expected: "Altered media tools implement clear disclaimers and visible watermarks on outputs.",
        policyText: "Manipulated Media :\\n- Apps that promote or help create false or misleading information or claims conveyed through imagery, videos and/or text are not allowed. \\n- Apps that determined to promote or perpetuate demonstrably misleading or deceptive imagery, videos and/or text, which may cause harm pertaining to a sensitive event, politics, social issues, or other matters of public concern.\\n- Apps that manipulate or alter media, beyond conventional and editorially acceptable adjustments for clarity or quality, must prominently disclose or watermark altered media when it may not be clear to the average person that the media has been altered.\\nExamples of common violations - \\n• Apps adding a public figure to a demonstration during a politically sensitive event.\\n• Apps using public figures or media from a sensitive event to advertise media altering capability within an app's store listing.\\n• Apps that alter media clips to mimic a news broadcast.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.48",
        gl: "AGL-006",
        ref: "1.48",
        title: "Behavior Transparency",
        steps: "1. Audit the source code and app bundles for hidden 'dormant' features that wait until post-launch.\\n2. Make sure UI flows are reasonably clear and avoid trick-based interactions.",
        expected: "The app limits itself strictly to transparent, documented behavior.",
        policyText: "Behavior Transparency\\nApp’s functionality should be reasonably clear to users; don't include any hidden, dormant, or undocumented features within the app. Techniques to evade app reviews are not allowed. Apps may be required to provide additional details to ensure user safety, system integrity, and policy compliance.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.49",
        gl: "AGL-006",
        ref: "1.49",
        title: "Misrepresentation",
        steps: "1. Verify the developer account details match the app's apparent origin and purpose.\\n2. Ensure the app is not coordinating artificially with other apps to manipulate user metrics or hide its origin.",
        expected: "Developer identities and the country of origin accurately match what is publicly represented.",
        policyText: "Misrepresentation:\\nApps or developer accounts are not allowed that are - \\n• Impersonate any person or organization, or that misrepresent or conceal their ownership or primary purpose, that engage in coordinated activity to mislead users. This includes, but isn’t limited to, apps or developer accounts that misrepresent or conceal their country of origin and that direct content at users in another country.\\n• Coordinate with other apps, sites, developers, or other accounts to conceal or misrepresent developer or app identity or other material details, where app content relates to politics, social issues or matters of public concern.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.50",
        gl: "AGL-006",
        ref: "1.50",
        title: "Google Play's Target API Level Policy",
        steps: "1. Check the build.gradle or manifest for the targetSdkVersion.\\n2. Ensure it targets an API level released within the last year for new apps, or two years for updates.\\n3. Compile to confirm no deprecated APIs conflict with the target level.",
        expected: "The application targets the most recent, secure Android API standards.",
        policyText: "Google Play's Target API Level Policy\\n1) New Apps and Updates:\\n•Apps must target an Android API level within one year of the latest major Android version release.\\n•Failure to meet this requirement will prevent new app submissions in Play Console.\\n2) Existing Apps:\\n•Apps on Google Play must target an API level within two years of the latest major Android version release.\\n•Apps that do not comply will not be available to new users on devices running newer Android OS versions.\\n•Existing users who have installed the app from Google Play can still discover, re-install, and use the app on any supported Android OS version.",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.51",
        gl: "AGL-006",
        ref: "1.51",
        title: "SDK Requirements",
        steps: "1. Review all third-party SDKs imported into the app (e.g., ads, analytics).\\n2. Verify the SDKs do not covertly steal OAuth tokens, AAIDs, locations, or bypass the permission model.\\n3. Ensure SDK usage matches user consent scopes (e.g. data given to an anti-fraud SDK is not used for ads).",
        expected: "Integrated SDKs meet the same privacy, security, and consent burdens as native code.",
        policyText: "SDK Requirements\\nPersonal and Sensitive User Data\\n•Limit the access, collection, use, and sharing of personal and sensitive user data acquired through the app to app and service functionality and policy conforming purposes reasonably expected by the user:\\n•Apps that extend usage of personal and sensitive user data for serving advertising must comply with Google Play’s Ads policy.\\n•Handle all personal and sensitive user data securely, including transmitting it using modern cryptography (for example, over HTTPS).\\n•Use a runtime permissions request whenever available, prior to accessing data gated by Android permissions\\nSale of Personal and Sensitive User Data\\nDo not sell personal and sensitive user data.\\n•\\"Sale\\" means the exchange or transfer of personal and sensitive user data to a third party for monetary consideration.\\n•User-initiated transfer of personal and sensitive user data (for example, when the user is using a feature of the app to transfer a file to a third party, or when the user chooses to use a dedicated purpose research study app), is not regarded as sale.\\nProminent Disclosure & Consent Requirements\\nYour app’s access, collection, use, or sharing of personal and sensitive user data may not be within the reasonable expectation of the user of the product or feature in question, you must meet the prominent disclosure and consent requirements of the User Data policy.\\nExamples of SDK-caused violations\\n•An app with an SDK that collects personal and sensitive user data and doesn’t treat this data as subject to this User Data policy, access, data handling (including disallowed sale), and prominent disclosure and consent requirements.\\n•An app integrates an SDK that collects personal and sensitive user data by default in violation of this policy’s requirements regarding user consent and prominent disclosure.\\n•An app with an SDK that claims to collect personal and sensitive user data only to provide anti-fraud and anti-abuse functionality for the app, but the SDK also shares the data it collects with third parties for advertising or analytics.\\n•An app includes an SDK that transmits users’ installed packages information without meeting the prominent disclosure guidelines and/or privacy policy guidelines.\\n•An app using an SDK which links Android ID and Location\\n•An app with an SDK which connects AAID to persistent device identifiers for any advertising purpose or analytics purpose.\\n•An app using an SDK that connects AAID and email address for analytics purposes.\\n•Your app includes an SDK which requests location in the background for an unallowed or undisclosed purpose.\\n•Your app includes an SDK which transmits IMEI derived from the read_phone_state Android permission without user consent.\\n•An app that includes SDK libraries from providers that distribute malicious software.\\n•An app that violates the Android permissions model, or steals credentials (such as OAuth tokens) from other apps.\\n•Apps that abuse features to prevent them from being uninstalled or stopped.\\n•An app that disables SELinux.\\n•An app includes an SDK that violates the Android permissions model by gaining elevated privileges through the access of device data for an undisclosed purpose.\\n•An app includes an SDK with code that tricks users into subscribing to or purchasing content via their mobile phone bill.\\nTransparent behavior and clear disclosures\\nAll code should deliver on promises made to the user. Apps should provide all communicated functionality. Apps should not confuse users.\\n•Example violations:\\noAd fraud\\noSocial Engineering\\n\\nProtect user data\\nBe clear and transparent about the access, use, collection, and sharing of personal and sensitive user data. Uses of user data in must adhere to all relevant User Data Policies, where applicable, and take all precautions to protect the data.\\nExample violations:\\n•Data Collection (cf Spyware)\\n•Restricted Permissions abuse",
        originalRef: "Privacy, Security, and Deception"
      },
      {
        id: "And-GPGP-1.52",
        gl: "AGL-006",
        ref: "1.52",
        title: "Mobile Unwanted Software",
        steps: "1. Review the app for deceptive promises or trick installations (e.g., bundling).\\n2. Verify app transparency and user approval flows for significant changes.\\n3. Check for accurate representation of device status, ensuring no fake security alerts.",
        expected: "The app delivers clear, expected functionality without deception, bundles, or system alterations.",
        policyText: "Key Characteristics of Unwanted Software:\\n1) Deceptive Promises: Claims value that it fails to deliver.\\n2) Trick Installations: Misleads users into installation or bundles with other software without disclosure.\\n3) Lack of Transparency: Fails to communicate significant functions clearly.\\n4) Unexpected System Effects: Alters user systems in unforeseen ways.\\n5) Privacy Violations: Collects or transmits personal information without user consent or secure handling.\\n6) Bundling: Is included with other software without proper notification.\\nGoogle commits to taking action against software that violates these principles to protect users and maintain a healthy software ecosystem. The Mobile Unwanted Software policy will continue to evolve to address emerging threats.\\n\\nApps must fulfill the promises made to users and provide clear, communicated functionality without causing confusion. \\nKey requirements include:\\n1) Transparency: Apps should clearly outline their functionality and objectives, explaining any system changes they will implement.\\n2) User Approval: Users must be allowed to review and approve significant installation options and changes.\\n3) Accuracy: Apps must not misrepresent the status of the user’s device, such as falsely claiming critical security issues or infections.\\n4) Integrity: Invalid practices to boost ad traffic or conversions are prohibited.\\n5) Impersonation: Apps must not mislead users by impersonating other developers, companies, or apps.\\nExample Violations:\\nAd fraud\\nSocial engineering\\n\\nTo protect user data and privacy, apps must:\\n1) Transparency: Clearly communicate how personal and sensitive data is accessed, used, collected, and shared, in compliance with relevant User Data policies.\\n2) User Consent: Obtain user agreement before collecting any data, including details about third-party accounts, location, and other sensitive information.\\n3) Data Security: Handle collected data securely, ensuring transmission uses modern encryption methods like HTTPS.\\n4) Functional Relevance: Only transmit personal data that is necessary for the app's functionality.\\n5) Avoid Deception: Do not mislead users into disabling device security features, such as Google Play Protect, for additional app benefits.\\nExample Violations:\\nUnauthorized data collection (akin to spyware)\\nMisuse of restricted permissions\\n\\nThe mobile user experience should be clear, straightforward, and aligned with user choices, providing a distinct value without disruption. Key principles include:\\n1) Clarity: The user experience must be easy to understand and not interfere with the expected functionality.\\n2) Ad Presentation: Ads should not disrupt usability, appear unexpectedly, or require complex dismissals without proper consent and attribution.\\n3) Non-Interference: Apps should not disrupt other applications or device usability.\\n4) Clear Uninstall Options: Users should have clear options for uninstalling apps.\\n5) Avoid Mimicking System Prompts: Apps must not imitate device OS prompts or suppress important alerts from other apps.\\nExample Violations:\\nDisruptive ads\\nUnauthorized use or imitation of system functionality",
        originalRef: "Mobile Unwanted Software"
      },
      {
        id: "And-GPGP-1.53",
        gl: "AGL-006",
        ref: "1.53",
        title: "Hostile Downloader",
        steps: "1. Ensure the app does not contain code designed to download and install mobile unwanted software (MUwS).\\n2. Confirm the app does not drive downloads without user interaction.",
        expected: "The app does not act as a hostile downloader spreading MUwS.",
        policyText: "Code that isn't in itself unwanted software, but downloads other mobile unwanted software (MUwS).\\nCode may be a hostile downloader if:\\n1) There is reason to believe it was created to spread MUwS and it has downloaded MUwS or contains code that could download and install apps; or\\n2) At least 5% of apps downloaded by it are MUwS with a minimum threshold of 500 observed app downloads (25 observed MUwS downloads).\\n3) Major browsers and file-sharing apps aren't considered hostile downloaders as long as:They don't drive downloads without user interaction; and All software downloads are initiated by consenting users.",
        originalRef: "Mobile Unwanted Software"
      },
      {
        id: "And-GPGP-1.54",
        gl: "AGL-006",
        ref: "1.54",
        title: "Ad Fraud",
        steps: "1. Monitor network traffic to ensure no invisible or fake clicking activity is artificially generating ad revenue.\\n2. Prevent apps from rendering out-of-context ads or modifying system device IDs to falsely attribute installs.",
        expected: "The app does not participate in any ad fraud, invalid clicks, or misrepresentation of ad inventory.",
        policyText: "Ad fraud is strictly forbidden and involves generating interactions that deceive ad networks into thinking traffic comes from genuine user interest. This type of invalid traffic can occur through methods such as displaying hidden ads, automatically clicking on ads, or manipulating information. Such practices may involve non-human actions (like bots) or intentional human activities aimed at creating invalid traffic. Ad fraud is detrimental to advertisers, developers, and users, undermining trust in the mobile advertising ecosystem in the long run.\\n\\nExamples of common violations-\\n1) An app that renders ads that are not visible to the user.\\n2) An app that automatically generates clicks on ads without the user's intention or that produces equivalent network traffic to fraudulently give click credits.\\n3) An app sending fake installation attribution clicks to get paid for installations that did not originate from the sender’s network.\\n4) An app that pops up ads when the user is not within the app interface.\\n5) False representations of the ad inventory by an app, for example, an app that communicates to ad networks that it is running on an iOS device when it is in fact running on an Android device; an app that misrepresents the package name that is being monetized.",
        originalRef: "Mobile Unwanted Software"
      },
      {
        id: "And-GPGP-1.55",
        gl: "AGL-006",
        ref: "1.55",
        title: "Mimicking System Functionality",
        steps: "1. Audit in-app dialogs and notifications to ensure they don't mimic native system warnings or OS updates.\\n2. Confirm system-level notification mechanisms are only used for the app's integral features.",
        expected: "App interfaces and notifications do not mimic OS features to trick users.",
        policyText: "Apps and Ads are not allowed that mimic or interfere with system functionality, such as  notifications or warnings. System level notifications may only be used for an app’s integral features, such as an airline app that notifies users of special deals, or a game that notifies users of in-game promotions.",
        originalRef: "Mobile Unwanted Software"
      },
      {
        id: "And-GPGP-1.56",
        gl: "AGL-006",
        ref: "1.56",
        title: "Impersonation",
        steps: "1. Verify the app isn't pretending to be another app, company, or developer.\\n2. Assure users aren't deceived into giving login credentials meant for another trusted app.",
        expected: "The app maintains a clear, distinct identity and does not impersonate other trusted entities.",
        policyText: "Apps are not allowed that pretend to be another app with the intention of deceiving users into performing actions that the user intended for the original trusted app.",
        originalRef: "Mobile Unwanted Software"
      },
      {
        id: "And-GPGP-1.57",
        gl: "AGL-006",
        ref: "1.57",
        title: "Payments & In-App Purchases",
        steps: "1. Verify if the app offers digital goods, subscriptions, or virtual currencies.\\n2. Confirm Google Play In-app Billing is used as the payment method for these items.\\n3. Check for transparent pricing and loot box odds disclosures before purchase.",
        expected: "All digital purchases utilize Play Billing, with clear pricing and odds where applicable.",
        policyText: "Payments:Apps that employ in-store or in-app purchases must comply with the following guidelines:\\n1. In-store purchases: Developers charging for apps and downloads from Google Play must use Google Play’s payment system.\\n\\n2. In-app purchases: Apps that employ in-store or in-app purchases must comply with the following guidelines:\\n• Developers offering products within a game downloaded from Google Play or providing access to game content must use Google Play In-app Billing as the method of payment.\\n• Play-distributed apps requiring or accepting payment for access to in-app features or services, including any app functionality, digital content or goods (collectively “in-app purchases”), must use Google Play’s billing system for those transactions\\nExamples of app features or services requiring use of Google Play's billing system include, but are not limited to, in-app purchases of:\\n• Items (such as virtual currencies, extra lives, additional playtime, add-on items, characters and avatars)\\n• Subscription services (such as fitness, game, dating, education, music, video, service upgrades and other content subscription services)\\n• App functionality or content (such as an ad-free version of an app or new features not available in the free version); and\\n• Cloud software and services (such as data storage services, business productivity software, and financial management software)\\n5. In-app virtual currencies must only be used within the app or game title for which they were purchased.\\n6. Developers must clearly and accurately inform users about the terms and pricing of their app or any in-app features or subscriptions offered for purchase. App listing must clearly notify users that payment is required to access those features.\\n7. Apps and games offering mechanisms to receive randomized virtual items from a purchase including, but not limited to, “loot boxes” must clearly disclose the odds of receiving those items in advance of, and in close and timely proximity to, that purchase.\\n8. Unless the conditions described in Section 3 apply, developers of Play-distributed apps on mobile phones and tablets requiring or accepting payment from users in South Korea for access to in-app purchases may offer users an in-app billing system in addition to Google Play's billing system for those transactions if they successfully complete the additional in-app billing system declaration form and agree to the additional terms and program requirements included therein.\\n9. Developers of Play-distributed apps may lead users in the European Economic Area (EEA) outside the app, including to promote offers for digital in-app features and services. Developers who lead EEA users outside the app must successfully complete the declaration form for the program and agree to the additional terms and program requirements included therein.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.58",
        gl: "AGL-006",
        ref: "1.58",
        title: "Payments - External Systems & Exceptions",
        steps: "1. Identify purchases of physical goods/services or those exempt from Play Billing.\\n2. Ensure the app does not lead users to external payment methods for digital goods (unless exceptions like South Korea/EEA forms are completed).",
        expected: "External payments are only used for physical goods/exempt categories.",
        policyText: "3. Google Play's billing system must not be used in cases where:\\na) Payment is primarily for the purchase or rental of physical goods (such as groceries, clothing, housewares, electronics);\\nb) For the purchase of physical services (such as transportation services, cleaning services, airfare, gym memberships, food delivery, tickets for live \\nc) Remittance in respect of a credit card bill or utility bill\\nd) Payments include peer-to-peer payments, online auctions, and tax exempt donations;\\ne) Payment is for content or services that facilitate online gambling, as described in the Gambling Apps section of the Real-Money Gambling, Games, and Contests policy;\\nf) Payment is in respect of any product category deemed unacceptable under Google’s Payments Center Content Policies.\\n4. As per Section 3 and Section 8, apps may not lead users to a payment method other than Google Play's billing system. This prohibition includes, but is not limited to, leading users to other payment methods via:\\n• An app’s listing in Google Play\\n• In-app promotions related to purchasable content\\n• In-app webviews, buttons, links, messaging, advertisements or other calls to action\\n• In-app user interface flows, including account creation or sign-up flows",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.59",
        gl: "AGL-006",
        ref: "1.59",
        title: "Subscriptions, Free Trials & Cancellation",
        steps: "1. Audit subscription flows, splash screens, and free trials for clear terms (billing cycle, cost).\\n2. Verify the presence of an easy-to-find subscription cancellation interface or instructions.",
        expected: "Subscription terms are fully transparent without requiring extra action, and cancellations are supported.",
        policyText: "Subscriptions : App must not mislead users about any subscription services or content you offer within your app. It is critical to communicate clearly in any in-app promotions or splash screens. \\nIn your app: You must be transparent about your offer. This includes being explicit about your offer terms, the cost of your subscription, the frequency of your billing cycle, and whether a subscription is required to use the app. Users should not have to perform any additional action to review the information.\\n\\nFree Trials & Introductory Offers :\\nBefore enrolling any user in the subscription, App must clearly and accurately describe the terms of your offer, including the duration, pricing, and description of accessible content or services. Be sure to let your users know how and when a free trial will convert to a paid subscription, how much the paid subscription will cost, and that a user can cancel if they do not want to convert to a paid subscription.\\n\\nSubscription Management & Cancellation\\nApp(s) should clearly disclose how a user can manage or cancel their subscription. If a user cancels a subscription purchased from an app on Google Play, as per the Google policy, the user will not receive a refund for the current billing period, but will continue to receive their subscription content for the remainder of the current billing period, regardless of the cancellation date. The user's cancellation goes into effect after the current billing period has passed.You (as the content or access provider) may implement a more flexible refund policy with your users directly. It is your responsibility to notify your users of any changes to your subscription, cancellation and refund policies and ensure that the policies comply with applicable law.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.60",
        gl: "AGL-006",
        ref: "1.60",
        title: "Deceptive & Disruptive Ads",
        steps: "1. Ensure ads only display inside the app serving them and do not pose as system warnings.\\n2. Confirm interstitial ads are easily dismissible without forcing clicks or personal data submission.",
        expected: "Ads are clearly identifiable, easily dismissible, and non-disruptive to the user experience.",
        policyText: "ADS: Apps are not allowed that contain deceptive or disruptive ads. Ads must only be displayed within the app serving them. We consider ads served in your app as part of your app.\\n\\nDeceptive Ads :\\nAds must not simulate or impersonate the user interface of any app, notification, or warning elements of an operating system. It must be clear to the user which app is serving each ad.\\nFor e.g. - Ads that mimic an app's UI OR Ads that mimic a system notification wont be accepted.\\n\\nDisruptive Ads\\n• Ads should not be shown in a way that results in inadvertent clicks. Forcing a user to click an ad or submit personal information for advertising purposes before they can fully use an app is prohibited.\\n• Interstitial ads may only be displayed inside of the app serving them. If your app displays interstitial ads or other ads that interfere with normal use, they must be easily dismissible without penalty. \\nFollowing is an example of a common violation:\\n• Ads that take up the entire screen or interfere with normal use and do not provide a clear means to dismiss the ad",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.61",
        gl: "AGL-006",
        ref: "1.61",
        title: "Use of Location Data for Ads",
        steps: "1. If location is used for ads, verify the privacy policy mentions this usage explicitly.\\n2. Ensure the location permission was requested for a core feature first, not solely for advertising.",
        expected: "Location data used for ads complies strictly with permission policies and is disclosed fully.",
        policyText: "Use of Location Data for Ads :\\nApps that extend usage of permission based device location data for serving ads are subject to the Personal and Sensitive Information policy, and must also comply with the following requirements:\\n1) Use or collection of permission based device location data for advertising purposes must be clear to the user and documented in the app’s mandatory privacy policy, including linking to any relevant ad network privacy policies addressing location data use.\\n2) In accordance with Location Permissions requirements, location permissions may only be requested to implement current features or services within your app, and may not request device location permissions solely for the use of ads.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.62",
        gl: "AGL-006",
        ref: "1.62",
        title: "Lock Screen Monetization",
        steps: "1. Observe device lock screen behavior after installation.\\n2. Guarantee that ads do not appear on the lock screen unless the app's sole purpose is to serve as a lock screen.",
        expected: "Lock screen monetization is strictly avoided in non-lock-screen applications.",
        policyText: "Lock screen Monetization\\nApps may not introduce ads or features that monetize the locked display of a device, unless the exclusive purpose of the app is that of a lock screen.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.63",
        gl: "AGL-006",
        ref: "1.63",
        title: "Interfering Ads & Made for Ads",
        steps: "1. Validate that ads don't trigger when navigating via the home button or exiting the app.\\n2. Ensure interstitial ads are not spawned consecutively (spamming) after normal user actions (e.g. clicks/swipes).",
        expected: "Ad volume and placement do not degrade system interaction or distract from the core app.",
        policyText: "Interfering with Apps and Third-party Ads, or Device Functionality :\\n• Ads associated with your app must not interfere with other apps, ads, or the operation of the device, including system or device buttons and ports. This includes overlays, companion functionality, and widgetized ad units. Ads must only be displayed within the app serving them.\\nFollowing is an example of common violations: \\n1) Ads that display outside of the app serving them OR Ads that are triggered by the home button or other features explicitly designed for exiting the app.\\n2) Ads that are triggered by the home button or other features explicitly designed for exiting the ap\\n\\nMade for Ads\\nApps are not allowed that display interstitial ads repeatedly to distract users from interacting with an app and performing in-app tasks.\\nExamples of common violations-\\n1) Apps where an interstitial ad is placed after a user action (including but not limited to clicks, swipes, etc.) in a consecutive manner.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.64",
        gl: "AGL-006",
        ref: "1.64",
        title: "Usage of Android Advertising ID",
        steps: "1. Verify the AAID is only utilized for analytics/ads and respects user opt-outs.\\n2. Confirm AAID is not linked with persistent hardware identifiers (IMEI, MAC) or PII without explicit user consent.",
        expected: "AAID is handled compliantly, preserving user anonymity and opt-out preferences.",
        policyText: "Usage of Android advertising ID\\nGoogle Play Services version 4.0 introduced new APIs and an ID for use by advertising and analytics providers. Terms for the use of this ID are below.\\n\\n• Usage. The Android advertising identifier must only be used for advertising and user analytics. The status of the “Opt-out of Interest-based Advertising” setting must be verified on each access of the ID.\\n• Association with personally identifiable information or other identifiers. The advertising identifier must not be connected to personally identifiable information or associated with any persistent device identifier (for example: SSAID, MAC address, IMEI, etc.) without the explicit consent of the user.\\n• Respecting users' selections. Upon reset, a new advertising identifier must not be connected to a previous advertising identifier or data derived from a previous advertising identifier without the explicit consent of the user. Furthermore, you must abide by a user’s “Opt out of Interest-based Advertising” setting. If a user has enabled this setting, you may not use the advertising identifier for creating user profiles for advertising purposes or for targeting users with interest-based advertising. Allowed activities include contextual advertising, frequency capping, conversion tracking, reporting and security and fraud detection.\\n• Transparency to users. The collection and use of the advertising identifier and commitment to these terms must be disclosed to users in a legally adequate privacy notification.\\n• Abiding by the terms of use. The advertising identifier may only be used in accordance with these terms, including by any party that you may share it with in the course of your business. Beginning 1 August 2014, all updates and new apps uploaded to the Play Store must use the advertising ID (when available on a device) in lieu of any other device identifiers for any advertising purposes.",
        originalRef: "Monetization and Ads"
      },
      {
        id: "And-GPGP-1.65",
        gl: "AGL-006",
        ref: "1.65",
        title: "Family Ads Program",
        steps: "1. Identify if the app is directed towards children.\\n2. Verify the ad SDK is certified by Google Play for Families.\\n3. Confirm personalized/interest-based ads are disabled for child audiences.",
        expected: "Child-directed applications use only certified SDKs and protect minors from inappropriate/personalized ads.",
        policyText: "Family Ads Program\\nApps that serve Ads, and includes children as the target audience as described in the Families Policy, then App must use ad SDKs that have self-certified compliance with Google Play policies, including the Ad SDK certification requirements below. If the target audience for your app includes both children and older users, you must implement age screening measures and make sure that ads shown to children come exclusively from one of these self-certified ad SDKs. Apps in the Designed for Families program are required to only use self-certified ad SDKs.\\n\\nAd SDK Certification Requirements\\n• Define what are objectionable ad content and behaviors and prohibit them in the ad network's terms or policies. The definitions should not result in non-compliance with Play's Developer Program Policies.\\n• Create a method to rate your ad creatives according to age appropriate groups, including at least groups for Everyone and Mature. The rating methodology must align with the methodology that Google supplies to certified networks.\\n• Allow publishers, on a per-request or per-app basis, to request child-directed treatment for ad serving. Such treatment must be in compliance with at least the US Children's Online Privacy and Protection Act (COPPA) and the EU General Data Protection Regulation (GDPR), Google Play also requires disabling of personalized ads, interest based advertising, and remarketing as part of the child-directed treatment.\\n• Allow publishers to select ad formats that are compliant with Play’s Families Ads and Monetization policy, and meet the requirement of the Teacher Approved program. \\n• Ensure that when real-time bidding is used to serve ads to children, the creatives have been reviewed and privacy indicators are propagated to the bidders.\\n• Provide Google with sufficient information to verify the ad network's compliance with all certification requirements, and respond in a timely manner to any subsequent requests for information.\\nNote: Ad networks must support ad serving that complies with all relevant statutes and regulations concerning children that may apply to their publishers.\\nMediation requirements for serving platforms when serving ads to children:\\n• only use Play certified ad networks or implement safeguards necessary to ensure that all ads served from mediation networks comply with these requirements; and\\n• pass signals necessary to indicate the ad content rating and any applicable child-directed treatment.\\nDevelopers can find a list of self-certified ad SDKs HERE.",
        originalRef: "Monetization and Ads"
      }
    ]
  }
};`;

const regex = /      },\n      {\n        id: "And-GPGP-1\.30"(.*?)\n  \}\n\};/s;

content = content.replace(regex, newData);
fs.writeFileSync('src/data.ts', content);
console.log('Fixed policies with full texts');
