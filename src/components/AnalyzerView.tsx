import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Clipboard, 
  FileCode, 
  Sparkles, 
  HelpCircle,
  FileText,
  ShieldCheck,
  Check,
  Copy,
  FolderOpen
} from 'lucide-react';

interface AnalyzerViewProps {
  platform: 'ios' | 'android';
}

interface iOSKeyResult {
  key: string;
  description: string;
  isMandatory: boolean;
  isPresent: boolean;
  value?: string;
}

interface PermissionResult {
  permission: string;
  description: string;
  value?: string;
  isPresent: boolean;
}

// Predefined iOS Mandatory compliance keys
const IOS_MANDATORY_KEYS = [
  { key: 'CFBundleName', desc: 'Bundle Name - Short name of the bundle (e.g., app name)' },
  { key: 'DTPlatformVersion', desc: 'Platform Version - The version of the SDK platform used to build the app' },
  { key: 'CFBundleVersion', desc: 'Bundle Version - Build number of the release' },
  { key: 'CFBundleShortVersionString', desc: 'Bundle Short Version String - Release version number shown to users' },
  { key: 'CFBundleDevelopmentRegion', desc: 'Development Region - Default language code/locale for the bundle' },
  { key: 'CFBundleInfoDictionaryVersion', desc: 'Info Dictionary Version - Version of the Info.plist structure format' },
  { key: 'CFBundleDisplayName', desc: 'Display Name - Human-readable name displayed on the user\'s home screen' },
  { key: 'CFBundleIdentifier', desc: 'Bundle Identifier - Unique App ID with App Store Connect' },
  { key: 'DTXcode', desc: 'Xcode Version - Version number of Xcode used to build the app' },
  { key: 'CFBundleExecutable', desc: 'Executable File - Name of the app\'s main runnable file' }
];

// Predefined iOS Non-Mandatory/Recommended compliance keys
const IOS_NON_MANDATORY_KEYS = [
  { key: 'CFBundleAllowMixedLocalizations', desc: 'Allow Mixed Localizations - Allows the app to assist with mixing localization resources' },
  { key: 'CFBundleURLTypes', desc: 'URL Types - Custom URL scheme protocols supported by the app' },
  { key: 'GKGameCenterBadgingDisabled', desc: 'Game Center Badging - Indicates if Game Center icon badges are toggled off' },
  { key: 'UTExportedTypeDeclarations', desc: 'Exported Type Declarations - Uniform Type Identifiers exported by the app' },
  { key: 'UISupportedInterfaceOrientations', desc: 'Supported Orientations - Governs allowed landscape/portrait rotations' },
  { key: 'NSLocationUsageDescription', desc: 'Location Usage - Description for legacy location services on older devices' },
  { key: 'GCSupportsMultipleMicroGamepads', desc: 'Supports Multiple Micro Gamepads - Allows multi-player controller setup' },
  { key: 'UIRequiredDeviceCapabilities', desc: 'Required Device Capabilities - Limits downloads to specific hardware' },
  { key: 'DTSDKBuild', desc: 'SDK Build Number - Build number of the SDK used to compile' },
  { key: 'UIDeviceFamily', desc: 'Device Family - Target iOS device category families (iPhone, iPad, etc.)' },
  { key: 'NSUbiquitousContainer', desc: 'iCloud Ubiquitous Container - Root layout configuration for iCloud sync folders' },
  { key: 'CFBundleIconFile', desc: 'Icon File - Main icon file declaration of the app bundle' },
  { key: 'LSApplicationQueriesSchemes', desc: 'Application Queries Schemes - Allowed custom URL schemes the app can call' },
  { key: 'GCSupportedGameControllers', desc: 'Supported Game Controllers - List of supported gamepad interface models' },
  { key: 'UILaunchStoryboardName', desc: 'Launch Screen Storyboard - Name of user-facing launch screen interface' },
  { key: 'CFBundleLocalizations', desc: 'Localizations - Explicit list of localized region codes supported' },
  { key: 'LSRequiresIPhoneOS', desc: 'Requires iOS - Ensures app runs selectively on iOS devices' },
  { key: 'UIWhitePointAdaptivityStyle', desc: 'White Point Adaptivity Style - Tone adjustment settings for display adaptation' },
  { key: 'DTPlatformName', desc: 'Platform Name - Target operating system name (e.g. iphoneos)' },
  { key: 'UIStatusBarStyle', desc: 'Status Bar Style - Establishes light/dark theme behavior of system status bar' },
  { key: 'DTPlatformBuild', desc: 'Platform Build Number - Build number of target deployment platform' },
  { key: 'UILaunchImages', desc: 'Launch Images - Static launch representations and background splash sizes' },
  { key: 'UILaunchImageFile', desc: 'Launch Image File - Specific file specifying initial launch splash assets' },
  { key: 'UIPrerenderedIcon', desc: 'Prerendered Icon - Tells Apple to skip adding standard gloss overlays to app icon' },
  { key: 'MKDirectionsApplicationSupportedModes', desc: 'Maps Directions - Declares supported routing types (driving, transit, walking)' },
  { key: 'DTXcodeBuild', desc: 'Xcode Build Number - Exact Xcode assembly build version tag' },
  { key: 'DTSDKName', desc: 'SDK Name - Full name of compiler-targeted SDK environment' },
  { key: 'UIViewEdgeAntialiasing', desc: 'Edge Antialiasing - Enables sub-pixel graphics edge filtering' },
  { key: 'CFBundleIcons', desc: 'Icon Packages - Group containing primary and alternative launcher icon dictionaries' },
  { key: 'NSAppTransportSecurity', desc: 'App Transport Security - Dictates HTTP/HTTPS exclusion exceptions settings' },
  { key: 'UISupportedExternalAccessoryProtocols', desc: 'External Accessory Protocols - Communication keys for authorized MFi hardware accessories' },
  { key: 'UIFileSharingEnabled', desc: 'File Sharing - Exposes app documents folder in iTunes/Finder UI' },
  { key: 'CFBundleIconName', desc: 'Icon Name - The catalog name of primary icon asset' },
  { key: 'UINewsstandApp', desc: 'Newsstand Support - Configures bundle integration as Newsstand subscription' },
  { key: 'UIInterfaceOrientation', desc: 'Initial Orientation - Baseline layout orientation loaded upon startup' },
  { key: 'coreSpotlightContinuation', desc: 'CoreSpotlight Continuation - Lets Spotlight search items restore user activity' },
  { key: 'UIApplicationExitsOnSuspend', desc: 'Exit on Suspend - Terminates app immediately instead of running background processes' },
  { key: 'NSUbiquitousContainerIsDocumentScopePublic', desc: 'iCloud Document Scope - Public access flag for folder sharing' },
  { key: 'UIAppSupportsHDR', desc: 'HDR Compatibility - Explicit graphics pipeline compatibility flag' },
  { key: 'NSMainNibFile', desc: 'Main Interface Nib - Standard main storyboard/interface filename' },
  { key: 'CFBundleDocumentTypes', desc: 'Document Types - File formats app is registered to associate to' },
  { key: 'NSSupportsPurgeableLocalStorage', desc: 'Purgeable Storage - Allows clearing cached data layers' },
  { key: 'DTCompiler', desc: 'Compiler Suite - Specific compiler version string identifying build runner' },
  { key: 'CoreSpotlightContinuation', desc: 'Spotlight Continuation Identifier - Configured indexing handler tags' },
  { key: 'NSUbiquitousContainerSupportedFolderLevels', desc: 'iCloud Folder Levels - Dictates nested folder depth for cloud workspace' },
  { key: 'UIRequiresPersistentWiFi', desc: 'Requires WiFi - Configures iOS to hold active Wi-Fi connections when dormant' },
  { key: 'NSUbiquitousContainerName', desc: 'iCloud Container Name - Human display title of iCloud folder' },
  { key: 'UIBackgroundModes', desc: 'Background Modes - Declares background audio, location, or background task requirements' },
  { key: 'NSUbiquitousDisplaySet', desc: 'iCloud Display Set - Internal identifier collection indexing iCloud spaces' },
  { key: 'CFBundleSpokenName', desc: 'Spoken Name - Optional text to speak instead of spelling app text' },
  { key: 'UIViewGroupOpacity', desc: 'Group Opacity - Coordinates subview opacity transitions on standard layers' },
  { key: 'UIApplicationShortcutWidget', desc: 'Shortcut Widget - Widget identifier tied directly to app shortcuts' },
  { key: 'UIApplicationShortcutItems', desc: 'Shortcut Items - Rich definitions of force-touch home screen quick actions' },
  { key: 'CFBundleIconFiles', desc: 'Icon Asset Array - List of filenames representing icons in bundle' },
  { key: 'UIRequiresFullScreen', desc: 'Requires Full Screen - Inhibits Split View and Slide Over multi-tasking on iPad' },
  { key: 'UIAppFonts', desc: 'App Fonts - Declares custom font files embedded inside application' },
  { key: 'UTImportedTypeDeclarations', desc: 'Imported Types - Declared standards imported for association' },
  { key: 'MinimumOSVersion', desc: 'Minimum OS Version - Absolute lowest version required to execute' },
  { key: 'UIStatusBarHidden', desc: 'Hide Status Bar - Toggles default status bar initial visibility' }
];

// Known iOS Permission usage description keys with explanations
const IOS_PERMISSION_KEYS = [
  { permission: 'NSCameraUsageDescription', desc: 'Camera access (e.g. scanning QR codes, profile pictures)' },
  { permission: 'NSMicrophoneUsageDescription', desc: 'Microphone access (e.g. audio calling, sound recording)' },
  { permission: 'NSLocationWhenInUseUsageDescription', desc: 'Location access while in use (e.g. map center, localized features)' },
  { permission: 'NSLocationAlwaysAndWhenInUseUsageDescription', desc: 'Persistent location access (e.g. background alerts, geo-fencing)' },
  { permission: 'NSPhotoLibraryUsageDescription', desc: 'Photo Library access (e.g. uploading images, attachment attachments)' },
  { permission: 'NSUserTrackingUsageDescription', desc: 'App Tracking Transparency (e.g. tailored analytics, ad attribution)' },
  { permission: 'NSContactsUsageDescription', desc: 'Contacts access (e.g. finding friends, address synchronization)' },
  { permission: 'NSCalendarsUsageDescription', desc: 'Calendars access (e.g. scheduling events, scheduling sessions)' },
  { permission: 'NSFaceIDUsageDescription', desc: 'Face ID authentication access (e.g. bio-locks, login protection)' },
  { permission: 'NSBluetoothAlwaysUsageDescription', desc: 'Persistent Bluetooth access (e.g. hardware integrations, beacon sync)' },
  { permission: 'NSLocalNetworkUsageDescription', desc: 'Local Network authorization (e.g. discovery of peripheral devices)' }
];

// Android Dangerous Permissions (conforming to compliance warning criteria)
const ANDROID_DANGEROUS_PERMISSIONS = [
  { permission: 'android.permission.ACCESS_FINE_LOCATION', desc: 'Precise Location - Accesses high-accuracy GPS/Galileo coordinate trackers' },
  { permission: 'android.permission.ACCESS_COARSE_LOCATION', desc: 'Approximate Location - Accesses cellular/WiFi-based network estimates' },
  { permission: 'android.permission.CAMERA', desc: 'Camera - Operates camera lenses for taking photos or videos' },
  { permission: 'android.permission.RECORD_AUDIO', desc: 'Record Audio - Activates microphone recording channels at any time' },
  { permission: 'android.permission.READ_CONTACTS', desc: 'Read Contacts - Scans personal contact directory listing records' },
  { permission: 'android.permission.WRITE_CONTACTS', desc: 'Write Contacts - Add/updates storage files inside user address list' },
  { permission: 'android.permission.READ_EXTERNAL_STORAGE', desc: 'Read Storage (Legacy) - Accesses shared memory folders, media archives, or text dumps' },
  { permission: 'android.permission.WRITE_EXTERNAL_STORAGE', desc: 'Write Storage (Legacy) - Allows creating or deleting files anywhere in shared folders' },
  { permission: 'android.permission.READ_PHONE_STATE', desc: 'Read Phone State - Reads IMEI identifier, active cell data, and cellular operator indices' },
  { permission: 'android.permission.SEND_SMS', desc: 'Send SMS - Dispatches standard text service payloads with direct carrier pricing' },
  { permission: 'android.permission.RECEIVE_SMS', desc: 'Receive SMS - Intercepts incoming wireless cell notification packets' },
  { permission: 'android.permission.READ_SMS', desc: 'Read SMS - Views private records of inbox text messages' },
  { permission: 'android.permission.POST_NOTIFICATIONS', desc: 'Post Notifications - Pushes custom pop-ups and alert tags on SDK 33+' },
  { permission: 'android.permission.BLUETOOTH_CONNECT', desc: 'Bluetooth Connect - Connects to peripheral devices (Android 12+)' },
  { permission: 'android.permission.BLUETOOTH_SCAN', desc: 'Bluetooth Scan - Scans for nearby beacons and peripherals' }
];

// Helper functions to parse binary plists (bplist00) and convert them to compliant XML format
function parseBinaryPlist(buffer: ArrayBuffer): any {
  const view = new DataView(buffer);
  const u8 = new Uint8Array(buffer);
  
  if (u8.length < 8) {
    throw new Error('File too short');
  }
  
  const header = String.fromCharCode(...Array.from(u8.slice(0, 8)));
  if (header !== 'bplist00') {
    throw new Error('Not a binary plist');
  }
  
  const len = buffer.byteLength;
  if (len < 32) throw new Error('File too short for trailer');
  
  const trailerOffset = len - 32;
  const offsetIntSize = view.getUint8(trailerOffset + 6);
  const objectRefSize = view.getUint8(trailerOffset + 7);
  
  const numObjects = readUInt64(view, trailerOffset + 8);
  const topObject = readUInt50(view, trailerOffset + 16);
  const offsetTableOffset = readUInt50(view, trailerOffset + 24);
  
  const offsets: number[] = [];
  for (let i = 0; i < numObjects; i++) {
    const off = readInt(u8, offsetTableOffset + i * offsetIntSize, offsetIntSize);
    offsets.push(off);
  }
  
  function readInt(bytes: Uint8Array, offset: number, size: number): number {
    let val = 0;
    for (let i = 0; i < size; i++) {
      val = (val * 256) + bytes[offset + i];
    }
    return val;
  }
  
  function readUInt64(dataView: DataView, offset: number): number {
    const high = dataView.getUint32(offset);
    const low = dataView.getUint32(offset + 4);
    return high * 0x100000000 + low;
  }
  
  function readUInt50(dataView: DataView, offset: number): number {
    const high = dataView.getUint32(offset);
    const low = dataView.getUint32(offset + 4);
    return high * 0x100000000 + low;
  }
  
  function parseObject(objIndex: number): any {
    if (objIndex >= offsets.length || objIndex < 0) {
      return null;
    }
    const offset = offsets[objIndex];
    if (offset >= len || offset < 0) {
      return null;
    }
    const typeByte = u8[offset];
    const type = typeByte & 0xF0;
    const count = typeByte & 0x0F;
    
    if (typeByte === 0x00) return null;
    if (typeByte === 0x08) return false;
    if (typeByte === 0x09) return true;
    if (typeByte === 0x0F) return null;
    
    if (type === 0x10) {
      const size = Math.pow(2, count);
      return readInt(u8, offset + 1, size);
    }
    
    if (type === 0x20) {
      const size = Math.pow(2, count);
      if (size === 4) return view.getFloat32(offset + 1);
      if (size === 8) return view.getFloat64(offset + 1);
      return 0;
    }
    
    if (typeByte === 0x33) {
      const seconds = view.getFloat64(offset + 1);
      const appleEpoch = Date.UTC(2001, 0, 1, 0, 0, 0);
      return new Date(appleEpoch + seconds * 1000);
    }
    
    if (type === 0x40) {
      let size = count;
      let nextOffset = offset + 1;
      if (count === 15) {
        const sizeByte = u8[offset + 1];
        const sizeLength = Math.pow(2, sizeByte & 0x0F);
        size = readInt(u8, offset + 2, sizeLength);
        nextOffset = offset + 2 + sizeLength;
      }
      return u8.slice(nextOffset, nextOffset + size);
    }
    
    if (type === 0x50) {
      let size = count;
      let nextOffset = offset + 1;
      if (count === 15) {
        const sizeByte = u8[offset + 1];
        const sizeLength = Math.pow(2, sizeByte & 0x0F);
        size = readInt(u8, offset + 2, sizeLength);
        nextOffset = offset + 2 + sizeLength;
      }
      let str = "";
      for (let i = 0; i < size; i++) {
        str += String.fromCharCode(u8[nextOffset + i]);
      }
      return str;
    }
    
    if (type === 0x60) {
      let size = count;
      let nextOffset = offset + 1;
      if (count === 15) {
        const sizeByte = u8[offset + 1];
        const sizeLength = Math.pow(2, sizeByte & 0x0F);
        size = readInt(u8, offset + 2, sizeLength);
        nextOffset = offset + 2 + sizeLength;
      }
      let str = "";
      for (let i = 0; i < size; i++) {
        const code = (u8[nextOffset + i * 2] << 8) | u8[nextOffset + i * 2 + 1];
        str += String.fromCharCode(code);
      }
      return str;
    }
    
    if (type === 0x80) {
      return readInt(u8, offset + 1, count + 1);
    }
    
    if (type === 0xA0) {
      let size = count;
      let nextOffset = offset + 1;
      if (count === 15) {
        const sizeByte = u8[offset + 1];
        const sizeLength = Math.pow(2, sizeByte & 0x0F);
        size = readInt(u8, offset + 2, sizeLength);
        nextOffset = offset + 2 + sizeLength;
      }
      const arr: any[] = [];
      for (let i = 0; i < size; i++) {
        const refIdx = nextOffset + i * objectRefSize;
        if (refIdx + objectRefSize <= u8.length) {
          const ref = readInt(u8, refIdx, objectRefSize);
          arr.push(parseObject(ref));
        }
      }
      return arr;
    }
    
    if (type === 0xD0) {
      let size = count;
      let nextOffset = offset + 1;
      if (count === 15) {
        const sizeByte = u8[offset + 1];
        const sizeLength = Math.pow(2, sizeByte & 0x0F);
        size = readInt(u8, offset + 2, sizeLength);
        nextOffset = offset + 2 + sizeLength;
      }
      const dict: Record<string, any> = {};
      const keyRefs: number[] = [];
      const valRefs: number[] = [];
      for (let i = 0; i < size; i++) {
        const refIdx = nextOffset + i * objectRefSize;
        if (refIdx + objectRefSize <= u8.length) {
          keyRefs.push(readInt(u8, refIdx, objectRefSize));
        }
      }
      const valOffset = nextOffset + size * objectRefSize;
      for (let i = 0; i < size; i++) {
        const refIdx = valOffset + i * objectRefSize;
        if (refIdx + objectRefSize <= u8.length) {
          valRefs.push(readInt(u8, refIdx, objectRefSize));
        }
      }
      for (let i = 0; i < Math.min(keyRefs.length, valRefs.length); i++) {
        const k = parseObject(keyRefs[i]);
        const v = parseObject(valRefs[i]);
        if (typeof k === 'string') {
          dict[k] = v;
        }
      }
      return dict;
    }
    
    return null;
  }
  
  return parseObject(topObject);
}

function jsToXmlPlist(val: any, indent = ''): string {
  const nextIndent = indent + '    ';
  if (val === null || val === undefined) {
    return `${indent}<string></string>`;
  }
  if (typeof val === 'boolean') {
    return `${indent}<${val}/>`;
  }
  if (typeof val === 'number') {
    if (Number.isInteger(val)) {
      return `${indent}<integer>${val}</integer>`;
    } else {
      return `${indent}<real>${val}</real>`;
    }
  }
  if (val instanceof Date) {
    return `${indent}<date>${val.toISOString()}</date>`;
  }
  if (typeof val === 'string') {
    const escaped = val
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `${indent}<string>${escaped}</string>`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return `${indent}<array/>`;
    }
    const items = val.map(item => jsToXmlPlist(item, nextIndent)).join('\n');
    return `${indent}<array>\n${items}\n${indent}</array>`;
  }
  if (typeof val === 'object') {
    if (val instanceof Uint8Array) {
      let binaryStr = "";
      for (let i = 0; i < val.length; i++) {
        binaryStr += String.fromCharCode(val[i]);
      }
      const base64 = btoa(binaryStr);
      return `${indent}<data>${base64}</data>`;
    }
    const keys = Object.keys(val);
    if (keys.length === 0) {
      return `${indent}<dict/>`;
    }
    const entries = keys.map(k => {
      const escapedKey = k.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `${nextIndent}<key>${escapedKey}</key>\n${jsToXmlPlist(val[k], nextIndent)}`;
    }).join('\n');
    return `${indent}<dict>\n${entries}\n${indent}</dict>`;
  }
  return `${indent}<string>${val}</string>`;
}

export default function AnalyzerView({ platform }: AnalyzerViewProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(platform);
  const [rawText, setRawText] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [analysisDone, setAnalysisDone] = useState<boolean>(false);
  const [copiedSample, setCopiedSample] = useState<boolean>(false);

  // Analysis result states
  const [iosMandatory, setIosMandatory] = useState<iOSKeyResult[]>([]);
  const [iosNonMandatory, setIosNonMandatory] = useState<iOSKeyResult[]>([]);
  const [iosPermissions, setIosPermissions] = useState<PermissionResult[]>([]);
  const [androidDangerous, setAndroidDangerous] = useState<Array<{ permission: string; desc: string; isPresent: boolean }>>([]);
  const [manifestPermissions, setManifestPermissions] = useState<string[]>([]);

  // Automatically sync with platform selection changes
  useEffect(() => {
    setActiveTab(platform);
    setRawText('');
    setAnalysisDone(false);
  }, [platform]);

  // Handle drag configurations
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (!buffer) return;
      
      const u8 = new Uint8Array(buffer);
      const isBinary = u8.length >= 8 && String.fromCharCode(...Array.from(u8.slice(0, 8))) === 'bplist00';

      if (isBinary) {
        try {
          const parsed = parseBinaryPlist(buffer);
          const body = jsToXmlPlist(parsed, '    ');
          const xmlText = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${body}
</plist>`;
          // If loaded file is binary plist but current tab is Android, auto-switch to iOS
          if (activeTab === 'android') {
            setActiveTab('ios');
          }
          setRawText(xmlText);
          analyzeContent(xmlText, 'ios');
        } catch (err: any) {
          console.error("Failed to parse binary plist, falling back to text decoder:", err);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(buffer);
          setRawText(text);
          analyzeContent(text, activeTab);
        }
      } else {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(buffer);
        setRawText(text);
        analyzeContent(text, activeTab);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Content analyzer
  const analyzeContent = (content: string, type: 'ios' | 'android') => {
    if (!content.trim()) return;

    if (type === 'ios') {
      // 1. Extract values of keys inside Plist XML
      // Plists typically represent keys in <key>KEY_NAME</key> followed by <string>VALUE</string>, <true/>, <false/>, or <array> etc.
      const mandatoryResults: iOSKeyResult[] = IOS_MANDATORY_KEYS.map(item => {
        // Construct dynamic regex to look for <key>KEY_NAME</key>
        const keyEscaped = item.key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const keyRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>`, 'i');
        const isPresent = keyRegex.test(content);
        
        // Attempt to extract string value or type
        let value = undefined;
        if (isPresent) {
          const valueRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>\\s*<string>([^<]+)<\/string>`, 'i');
          const valueBlock = content.match(valueRegex);
          if (valueBlock && valueBlock[1]) {
            value = valueBlock[1].trim();
          } else {
            // Check for simple booleans or other types
            const boolRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>\\s*<(true|false|array|integer)\\s*\/?>`, 'i');
            const boolBlock = content.match(boolRegex);
            if (boolBlock && boolBlock[1]) {
              value = boolBlock[1].toLowerCase() === 'true' ? 'Boolean (True)' : boolBlock[1].toLowerCase() === 'false' ? 'Boolean (False)' : `<${boolBlock[1]}> structure`;
            } else {
              value = 'Declared (Present)';
            }
          }
        }

        return {
          key: item.key,
          description: item.desc,
          isMandatory: true,
          isPresent,
          value
        };
      });

      const nonMandatoryResults: iOSKeyResult[] = IOS_NON_MANDATORY_KEYS.map(item => {
        const keyEscaped = item.key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const keyRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>`, 'i');
        const isPresent = keyRegex.test(content);

        let value = undefined;
        if (isPresent) {
          const valueRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>\\s*<string>([^<]+)<\/string>`, 'i');
          const valueBlock = content.match(valueRegex);
          if (valueBlock && valueBlock[1]) {
            value = valueBlock[1].trim();
          } else {
            const boolRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>\\s*<(true|false|array|dict|integer)\\s*\/?>`, 'i');
            const boolBlock = content.match(boolRegex);
            if (boolBlock && boolBlock[1]) {
              value = boolBlock[1].toLowerCase() === 'true' ? 'True' : boolBlock[1].toLowerCase() === 'false' ? 'False' : `<${boolBlock[1]}> configuration`;
            } else {
              value = 'Declared';
            }
          }
        }

        return {
          key: item.key,
          description: item.desc,
          isMandatory: false,
          isPresent,
          value
        };
      });

      // Extract details about specified Permissions in Info.plist
      const permResults: PermissionResult[] = IOS_PERMISSION_KEYS.map(item => {
        const keyEscaped = item.permission.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const keyRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>`, 'i');
        const isPresent = keyRegex.test(content);

        let value = undefined;
        if (isPresent) {
          const valueRegex = new RegExp(`<key>\\s*${keyEscaped}\\s*<\/key>\\s*<string>([^<]+)<\/string>`, 'i');
          const valueBlock = content.match(valueRegex);
          if (valueBlock && valueBlock[1]) {
            value = valueBlock[1].trim();
          } else {
            value = 'Present (No descriptive string found!)';
          }
        }

        return {
          permission: item.permission,
          description: item.desc,
          value,
          isPresent
        };
      });

      setIosMandatory(mandatoryResults);
      setIosNonMandatory(nonMandatoryResults);
      setIosPermissions(permResults.filter(p => p.isPresent));

    } else {
      // Android Manifest parsing
      // Extract all permission tags present in manifest (Uses-Permission tags)
      const scannedPerms: string[] = [];
      const usesPermRegex = /<uses-permission[^>]*android:name=["']([^"']+)["']/g;
      let match;
      while ((match = usesPermRegex.exec(content)) !== null) {
        scannedPerms.push(match[1]);
      }

      // Fallback for simple raw string matches if user pasted output from command line logs
      if (scannedPerms.length === 0) {
        const rawMatches = content.match(/android\.permission\.[A-Z_]+/g);
        if (rawMatches) {
          scannedPerms.push(...Array.from(new Set(rawMatches)));
        }
      }

      setManifestPermissions(scannedPerms);

      // Detect matches with dangerous ones
      const dangerousResults = ANDROID_DANGEROUS_PERMISSIONS.map(item => {
        const isPresent = scannedPerms.some(p => p.toLowerCase().includes(item.permission.toLowerCase()) || item.permission.toLowerCase().includes(p.toLowerCase()));
        return {
          permission: item.permission,
          desc: item.desc,
          isPresent
        };
      });

      setAndroidDangerous(dangerousResults.filter(dp => dp.isPresent));
    }

    setAnalysisDone(true);
  };

  // Predefined Sample contents
  const loadValidIossample = () => {
    const validPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIdentifier</key>
    <string>com.example.compliancehub</string>
    <key>CFBundleVersion</key>
    <string>42</string>
    <key>CFBundleShortVersionString</key>
    <string>1.2.0</string>
    <key>CFBundleExecutable</key>
    <string>ComplianceHub</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>CFBundleDisplayName</key>
    <string>Compliance Hub Pro</string>
    <key>ITSAppUsesNonExemptEncryption</key>
    <false/>
    <key>NSCameraUsageDescription</key>
    <string>This application requires camera privileges to scan test case manifest QR codes inside the sandbox testing workspace.</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>Your location determines cellular regulatory boundaries for wireless interface validation testing.</string>
</dict>
</plist>`;
    setRawText(validPlist);
    analyzeContent(validPlist, 'ios');
  };

  const loadMissingIossample = () => {
    const invalidPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Critical identifiers are missing here! (e.g. CFBundleIdentifier and CFBundleVersion) -->
    <key>CFBundleShortVersionString</key>
    <string>0.9.0-rc1</string>
    <key>CFBundleExecutable</key>
    <string>IncompleteTarget</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>CFBundleDisplayName</key>
    <string>Sandbox Beta</string>
</dict>
</plist>`;
    setRawText(invalidPlist);
    analyzeContent(invalidPlist, 'ios');
  };

  const loadDangerousAndroidSample = () => {
    const dangerousManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.leaktarget">

    <!-- Benign permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Dangerous Permissions which flags warnings -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="LeakSandbox">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
    setRawText(dangerousManifest);
    analyzeContent(dangerousManifest, 'android');
  };

  const loadCleanAndroidSample = () => {
    const cleanManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.cleancompliance">

    <!-- Only minimal non-dangerous permissions specified -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:label="StrictSecure">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
    setRawText(cleanManifest);
    analyzeContent(cleanManifest, 'android');
  };

  const handleClear = () => {
    setRawText('');
    setAnalysisDone(false);
    setIosMandatory([]);
    setIosNonMandatory([]);
    setIosPermissions([]);
    setAndroidDangerous([]);
    setManifestPermissions([]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full uppercase tracking-wider font-mono font-bold">
            Interactive Diagnostics
          </span>
          <h1 className="text-3xl font-black text-[var(--text-highlight)] tracking-tight uppercase mt-2 font-sans">
            Manifest & Info.plist Analyzer
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Upload or paste security manifest layouts to automatically audit regulatory structural properties, mandatory iOS plist variables, and identify high-risk Android dangerous permission declarations.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex bg-[var(--surface2)]/50 p-1 rounded-xl border border-[var(--border)] max-w-md">
        <button
          onClick={() => {
            setActiveTab('ios');
            handleClear();
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${activeTab === 'ios' ? 'bg-indigo-600 text-white shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
        >
          🍎 iOS Info.plist
        </button>
        <button
          onClick={() => {
            setActiveTab('android');
            handleClear();
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${activeTab === 'android' ? 'bg-indigo-600 text-white shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
        >
          🤖 Android Manifest
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUT WORKSPACE (Left Side) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-highlight)] flex items-center gap-2">
              <FileCode className="text-indigo-400" size={16} />
              <span>Diagnostic Workspace</span>
            </h3>

            {/* DRAG AND DROP ZONE */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[160px] relative cursor-pointer ${
                dragActive 
                  ? 'border-indigo-400 bg-indigo-500/10 shadow-lg' 
                  : 'border-[var(--border)] hover:border-indigo-500/30 bg-[var(--bg)]/10'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept={activeTab === 'ios' ? '.plist,text/xml' : '.xml,text/xml'}
                onChange={handleFileInput}
                className="hidden"
              />
              <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 animate-pulse">
                  <Upload size={20} />
                </div>
                <p className="text-xs font-semibold text-[var(--text-highlight)] font-sans">
                  Click to choose file or drag & drop
                </p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">
                  {activeTab === 'ios' ? 'Accepts .plist files' : 'Accepts AndroidManifest.xml'}
                </p>
              </label>
            </div>

            {/* WORKSPACE ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]/45">
              <div>
                {rawText.trim() && (
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 bg-[var(--surface2)] border border-[var(--border)] hover:bg-[var(--surface3)] active:scale-95 text-[var(--text-muted)] rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Clear Workspace
                  </button>
                )}
              </div>

              {/* Instant Load Templates (Fulfills sandbox-friendly testability) */}
              <div className="space-y-1.5">
                <span className="block text-[8px] font-mono font-bold text-indigo-400 tracking-wider uppercase text-right">
                  ⚡ Load Test Templates
                </span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {activeTab === 'ios' ? (
                    <>
                      <button
                        onClick={loadValidIossample}
                        className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono transition cursor-pointer"
                      >
                        Valid Plist
                      </button>
                      <button
                        onClick={loadMissingIossample}
                        className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/20 rounded text-[9px] font-mono transition cursor-pointer"
                      >
                        Missing Keys
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={loadDangerousAndroidSample}
                        className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-550 dark:text-amber-400 border border-amber-500/20 rounded text-[9px] font-mono transition cursor-pointer"
                      >
                        With Warnings
                      </button>
                      <button
                        onClick={loadCleanAndroidSample}
                        className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono transition cursor-pointer"
                      >
                        Clean Manifest
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ANALYSIS OUTCOME REPORT (Right Side) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!analysisDone ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[var(--surface2)]/30 border border-dashed border-[var(--border)] rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--surface2)] flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] mb-4">
                  <FileCode size={32} />
                </div>
                <h4 className="text-base font-bold text-[var(--text-highlight)] mt-1 font-sans">
                  No Manifest File Parsed Yet
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-2 max-w-sm leading-relaxed">
                  Upload an existing platform configuration file, paste code content, or click any of our pre-built sandbox test templates on the left to review parsed results instantly.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* GENERAL ANALYSIS SCOREBOARD BANNER */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-sm shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-highlight)] font-sans uppercase">
                          {activeTab === 'ios' ? 'iOS plist Audit Report' : 'Android Manifest Audit Report'}
                        </h3>
                        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-mono">
                          Format: XML-structure parser • Verified UTC 2026
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {activeTab === 'ios' ? (
                        (() => {
                          const passedCount = iosMandatory.filter(m => m.isPresent).length;
                          const totalCount = iosMandatory.length;
                          const pct = Math.round((passedCount / totalCount) * 100);
                          return (
                            <div>
                              <span className={`text-base font-black font-mono leading-none ${pct === 100 ? 'text-emerald-450' : 'text-rose-450'}`}>
                                {passedCount} / {totalCount}
                              </span>
                              <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-0.5 font-sans">
                                Mandatory Keys Passed
                              </p>
                            </div>
                          );
                        })()
                      ) : (
                        <div>
                          <span className={`text-base font-black font-mono leading-none ${androidDangerous.length === 0 ? 'text-emerald-450' : 'text-amber-450'}`}>
                            {androidDangerous.length}
                          </span>
                          <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-0.5 font-sans">
                            Run-time Warnings Registered
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SUB-SECTION RENDERERS */}
                  {activeTab === 'ios' ? (
                    <div className="space-y-6">
                      {/* 1. MANDATORY KEYS SECTION */}
                      <div className="space-y-3.5">
                        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-1.5">
                          <span className="text-[11px] font-bold text-red-500 dark:text-red-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full animate-ping" />
                            Mandatory Structure Keys ({iosMandatory.filter(m => m.isPresent).length} / {iosMandatory.length})
                          </span>
                          <span className="text-[9px] text-[var(--text-muted)] italic font-semibold font-sans">
                            Must be present for App Store upload
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {iosMandatory.map((item) => (
                            <div 
                              key={item.key} 
                              className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-colors duration-200 ${
                                item.isPresent 
                                  ? 'bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/10 text-emerald-800 dark:text-emerald-300' 
                                  : 'bg-rose-500/10 dark:bg-rose-500/5 border-rose-500/20 dark:border-rose-500/10 text-rose-800 dark:text-rose-300'
                              }`}
                            >
                              <div className="space-y-1 max-w-[80%]">
                                <div className="flex items-baseline gap-2.5 flex-wrap">
                                  <span className={`text-xs font-mono font-bold font-sans select-all selection:bg-indigo-500/30 ${
                                    item.isPresent 
                                      ? 'text-emerald-900 dark:text-emerald-250' 
                                      : 'text-rose-900 dark:text-rose-250'
                                  }`}>
                                    {item.key}
                                  </span>
                                  {item.isPresent && item.value && (
                                    <span className="text-[9px] bg-emerald-500/15 dark:bg-black/45 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono truncate max-w-[200px]">
                                      {item.value}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[10px] leading-snug font-sans ${
                                  item.isPresent
                                    ? 'text-emerald-800 dark:text-zinc-405'
                                    : 'text-rose-800 dark:text-zinc-405'
                                }`}>
                                  {item.description}
                                </p>
                              </div>

                              <div className="shrink-0">
                                {item.isPresent ? (
                                  <div className="flex items-center gap-1 bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm">
                                    <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-500" />
                                    <span>Passed</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 bg-rose-500/15 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm animate-pulse">
                                    <XCircle size={11} className="text-rose-600 dark:text-rose-500" />
                                    <span>Failed</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. NON-MANDATORY KEYS SECTION */}
                      <div className="space-y-3.5 pt-2">
                        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-1.5">
                          <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full" />
                            Non-Mandatory / Recommended Keys ({iosNonMandatory.filter(n => n.isPresent).length} / {iosNonMandatory.length})
                          </span>
                          <span className="text-[9px] text-[var(--text-muted)] italic font-semibold font-sans">
                            Optional metadata properties
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {iosNonMandatory.map((item) => (
                            <div 
                              key={item.key} 
                              className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-colors duration-200 ${
                                item.isPresent 
                                  ? 'bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/15 dark:border-emerald-500/10 text-emerald-800 dark:text-emerald-300' 
                                  : 'bg-[var(--surface2)]/80 border-[var(--border)] text-[var(--text-muted)]'
                              }`}
                            >
                              <div className="space-y-1 max-w-[80%]">
                                <div className="flex items-baseline gap-2.5 flex-wrap">
                                  <span className={`text-xs font-mono font-bold ${
                                    item.isPresent 
                                      ? 'text-emerald-900 dark:text-emerald-200' 
                                      : 'text-[var(--text-muted)] font-semibold'
                                  }`}>
                                    {item.key}
                                  </span>
                                  {item.isPresent && item.value && (
                                    <span className="text-[9px] bg-emerald-500/15 dark:bg-black/45 border border-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-mono truncate max-w-[200px]">
                                      {item.value}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[10px] leading-snug font-sans ${
                                  item.isPresent 
                                    ? 'text-emerald-800 dark:text-zinc-400' 
                                    : 'text-[var(--text-muted)]/85'
                                }`}>
                                  {item.description}
                                </p>
                              </div>

                              <div className="shrink-0 col-span-1">
                                {item.isPresent ? (
                                  <div className="flex items-center gap-1 bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm">
                                    <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-500" />
                                    <span>Passed</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 bg-[var(--surface3)] text-[var(--text-muted)] border border-[var(--border)] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm">
                                    <HelpCircle size={11} className="text-[var(--text-muted)]/70" />
                                    <span>Not Applicable</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. EXTRACTED PRIVACY DESCRIPTIONS SECTION */}
                      <div className="space-y-3.5 pt-2">
                        <div className="border-b border-[var(--border)] pb-1.5">
                          <span className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <ShieldAlert size={14} className="text-indigo-550 dark:text-indigo-400" />
                            Extracted App Store Privacy Declarations ({iosPermissions.length})
                          </span>
                        </div>

                        {iosPermissions.length === 0 ? (
                          <div className="p-5 text-center bg-[var(--surface2)]/40 border border-[var(--border)] rounded-xl">
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                              No Apple Privacy Permission keys (NSCameraUsageDescription, NSLocationWhenInUseUsageDescription, etc.) were found inside this plist file.
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-2.5">
                            {iosPermissions.map((item) => (
                              <div key={item.permission} className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl space-y-2">
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 select-all selection:bg-indigo-500/30">
                                    {item.permission}
                                  </span>
                                  <span className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">
                                    Privacy Key
                                  </span>
                                </div>
                                <div className="p-2.5 bg-[var(--surface2)] border border-[var(--border)] rounded-lg">
                                  <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase font-mono">
                                    Core Context:
                                  </p>
                                  <p className="text-[11px] text-[var(--text)] leading-normal font-sans italic mt-0.5 select-all font-medium">
                                    "{item.value}"
                                  </p>
                                </div>
                                <p className="text-[9.5px] text-[var(--text-muted)]">
                                  Explanation: {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* ANDROID OUTPUT RENDERER */
                    <div className="space-y-6">
                      {/* DANGEROUS PERMISSIONS LIST */}
                      <div className="space-y-4">
                        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-1.5">
                          <span className="text-[11px] font-bold text-amber-550 dark:text-amber-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                            Scanned Dangerous Permission Audits ({androidDangerous.length})
                          </span>
                          <span className="text-[9px] text-[var(--text-muted)] italic font-semibold font-sans">
                            Subject to custom run-time gating rules
                          </span>
                        </div>

                        {androidDangerous.length === 0 ? (
                          <div className="p-8 text-center bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 dark:border-emerald-500/10 rounded-2xl flex flex-col items-center justify-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 size={16} />
                            </div>
                            <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                              Manifest Compliance Clean!
                            </h5>
                            <p className="text-[10px] text-[var(--text-muted)] max-w-sm leading-relaxed">
                              No Google Play dangerous permissions were found in this manifest. App complies directly with background sandboxing without requiring structural runtime prompts.
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3">
                            {androidDangerous.map((item) => (
                              <div 
                                key={item.permission} 
                                className="p-4 bg-[var(--surface)] border border-amber-500/25 dark:border-amber-500/15 rounded-xl space-y-3 shadow-sm"
                              >
                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-500 select-all selection:bg-amber-500/30">
                                    {item.permission}
                                  </span>
                                  <div className="flex items-center gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm">
                                    <AlertTriangle size={11} className="text-amber-600 dark:text-amber-500 animate-pulse" />
                                    <span>Warning Status</span>
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <p className="text-[10.5px] text-[var(--text)] font-sans leading-relaxed">
                                    <span className="font-semibold text-[var(--text-highlight)] font-sans">Scope impact:</span> {item.desc}
                                  </p>
                                  <div className="p-2.5 px-3 bg-[var(--surface2)] border border-amber-500/15 rounded-lg text-[10px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-sans leading-normal">
                                    <span className="text-sm">⚠️</span>
                                    <span>Confirm permission is indeed necessary during app runtime and verify fallback gracefully handles denials.</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* OTHER PARSED PERMISSIONS GENERAL ACCORDION */}
                      <div className="space-y-3 pt-2">
                        <div className="border-b border-[var(--border)] pb-1.5">
                          <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <FolderOpen size={14} className="text-[var(--text-muted)]" />
                            All Scanned Permissions Raw Collection ({manifestPermissions.length})
                          </span>
                        </div>

                        {manifestPermissions.length === 0 ? (
                          <div className="p-4 text-center bg-[var(--surface2)]/40 border border-[var(--border)] rounded-xl">
                            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed italic">
                              No permissions overall declared in the loaded document.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-[var(--bg)] rounded-xl border border-[var(--border)] max-h-48 overflow-y-auto scrollbar-thin">
                            <div className="flex flex-wrap gap-2">
                              {manifestPermissions.map((perm, idx) => {
                                const isDangerous = ANDROID_DANGEROUS_PERMISSIONS.some(dp => dp.permission === perm);
                                return (
                                  <span 
                                    key={idx} 
                                    className={`px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-semibold border tracking-tight ${
                                      isDangerous 
                                        ? 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-400' 
                                        : 'bg-[var(--surface3)] border border-[var(--border)] text-[var(--text-muted)]'
                                    }`}
                                  >
                                    {perm}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
