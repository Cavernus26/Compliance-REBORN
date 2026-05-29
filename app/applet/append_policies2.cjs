const fs = require('fs');

const file = 'src/data.ts';
let content = fs.readFileSync(file, 'utf8');

const newData = `      },
      {
        id: "And-GPGP-1.26",
        gl: "AGL-006",
        ref: "1.26",
        title: "Unauthorized Use of Copyrighted Content",
        steps: "1. Inspect all visual assets (icons, backgrounds, item sprites, promotional banners) for unoriginal, copyrighted material.\\n2. Verify the app does not incorporate unauthorized audio tracks or sound effects from popular media.\\n3. Check if 'fan art' or modified versions of copyrighted properties are present without verified authorization.",
        expected: "All assets are original, appropriately licensed, or public domain.",
        policyText: "Unauthorized Use of Copyrighted Content\\nWe don’t allow apps that infringe copyright. Modifying copyrighted content may still lead to a violation. Developers may be required to provide evidence of their rights to use copyrighted content.\\nFollowing are the examples of copyrighted content that is often used without authorization or a legally valid reason:\\n1) Cover art for music albums, video games, and books.\\n2) Marketing images from movies, television, or video games.\\n3) Artwork or images from comic books, cartoons, movies, music videos, or television.\\n4) College and professional sports team logos.\\n5) Photos taken from a public figure’s social media account.\\n6) Professional images of public figures.\\n7) Reproductions or “fan art” indistinguishable from the original work under copyright.\\n8) Apps that have soundboards that play audio clips from copyrighted content.\\n9) Full reproductions or translations of books that are not in the public domain.",
        originalRef: "Intellectual Property :"
      },
      {
        id: "And-GPGP-1.27",
        gl: "AGL-006",
        ref: "1.27",
        title: "Encouraging Infringement of Copyright",
        steps: "1. Check if the app features any functionality allowing users to stream or download copyrighted material without limits/rights.\\n2. Ensure the app does not provide instructions, mechanisms, or links to third-party piracy sites.",
        expected: "The app does not promote or facilitate the unauthorized acquisition of copyrighted materials.",
        policyText: "Encouraging Infringement of Copyright:\\nApps are not allowed that induce or encourage copyright infringement. Before you publish your app, look for ways your app may be encouraging copyright infringement and get legal advice if necessary.\\n\\nFollowing are the examples of common violations:\\n1) Streaming apps that allow users to download a local copy of copyrighted content without authorization.\\n2) Apps that encourage users to stream and download copyrighted works, including music and video, in violation of applicable copyright law",
        originalRef: "Intellectual Property :"
      },
      {
        id: "And-GPGP-1.28",
        gl: "AGL-006",
        ref: "1.28",
        title: "Trademark Infringement",
        steps: "1. Review the app's name, logo, and in-game brand descriptions to ensure they do not replicate existing trademarks.\\n2. Confirm whether identical or confusingly similar trademarks are used that might imply false affiliations.",
        expected: "App identity and assets do not illegally mimic formal trademarks belonging to other entities.",
        policyText: "Trademark Infringement:\\n1) Apps are not allowed that infringe on others’ trademarks. A trademark is a word, symbol, or combination that identifies the source of a good or service. Once acquired, a trademark gives the owner exclusive rights to the trademark usage with respect to certain goods or services.\\n2) Trademark infringement is improper or unauthorized use of an identical or similar trademark in a way that is likely to cause confusion as to the source of that product. If your app uses another party’s trademarks in a way that is likely to cause confusion, your app may be suspended",
        originalRef: "Intellectual Property :"
      },
      {
        id: "And-GPGP-1.29",
        gl: "AGL-006",
        ref: "1.29",
        title: "Counterfeit",
        steps: "1. Verify any physical or digital merchandise sold/promoted via the app is officially branded.\\n2. Ensure the app does not distribute counterfeit items mimicking genuine products or attempt to deceive users regarding a brand's authenticity.",
        expected: "The application absolutely avoids promoting, housing, or facilitating counterfeit brands and goods.",
        policyText: "Counterfeit:\\nWe don't allow apps that sell or promote for sale counterfeit goods. Counterfeit goods contain a trademark or logo that is identical to or substantially indistinguishable from the trademark of another. They mimic the brand features of the product in an attempt to pass themselves off as a genuine product of the brand owner.",
        originalRef: "Intellectual Property :"
`;

const searchRegEx = /       expected: "NFTs are utilized solely to enhance gameplay without functioning as gambling instruments.",\n        policyText: "Additional Requirements for NFT Gamification\\n1\) Apps that do not qualify as gambling apps or are not part of Other Real-Money Game Pilots should not accept anything of monetary value in exchange for a chance to obtain an NFT of unknown value.\\n2\) NFTs purchased by users should be used within the game to enhance the user experience or aid in advancing gameplay.\\n3\) NFTs must not be used for gambling purposes, including wagering, or staking in exchange for opportunities to win real-world monetary prizes, including other NFTs.\\nExamples:\\n• Apps that sell bundles of NFTs without disclosing the specific contents and values of the NFTs.\\n• Pay-to-play social casino games, such as slot machines, that reward NFTs.",\n        originalRef: "Restricted Content"\n      }\n    \]\n  \}/s;

content = content.replace(searchRegEx, match => {
  return match.replace(/      \}\n    \]\n  \}/s, newData + `      }\n    ]\n  }`);
});

fs.writeFileSync(file, content);
console.log('Appended policies.');
