const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function processBatch(batch, startIndex) {
  const prompt = `You are a technical writer preparing an onboarding guide for first-time manual QA testers.
Rewrite the following test steps to make them onboarding-ready.
Constraints:
- Write from the perspective of a first-time user of the app being tested.
- Provide clear, actionable step-by-step instructions.
- Remove assumptions, ambiguities, and internal context.
- Start with basic instructions if necessary (e.g. "Open the app.").
- Do not use QA jargon like "Verify" without explaining what to look for (use simple words like "Check that...").
- Only rewrite the "steps" property. Keep the same "id".
- Return ONLY valid JSON, adhering to this schema:
[
  { "id": "Test ID", "steps": "1. Open the app.\\n2. Navigate to...\\n3. Check that..." },
  ...
]

Here are the test cases to rewrite (IDs ${startIndex} to ${startIndex + batch.length - 1}):
${JSON.stringify(batch.map(b => ({ id: b.id, current_steps: b.steps })), null, 2)}`;

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.2
        }
      });
      let text = response.text();
      text = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(text);
    } catch (e) {
      console.error('Error on batch starting at index', startIndex, e.message);
      retries--;
      if (retries === 0) return [];
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function main() {
  const cases = require('./ios_test_cases.json');
  console.log('Total iOS cases:', cases.length);
  
  const batchSize = 100;
  const newSteps = [];
  
  for (let i = 0; i < cases.length; i += batchSize) {
    console.log(`Processing batch ${i} to ${i + batchSize}`);
    const batch = cases.slice(i, i + batchSize);
    const rewritten = await processBatch(batch, i);
    newSteps.push(...rewritten);
  }
  
  fs.writeFileSync('ios_rewritten.json', JSON.stringify(newSteps, null, 2));
  console.log('Finished writing ios_rewritten.json');
}

main().catch(console.error);
