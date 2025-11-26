import confiuration from '../config/index.js';


const hf_client = confiuration.hf_client;

async function extractKeywords(text, minScore = 0.5) {
  const result = await hf_client.tokenClassification({
    model: "ml6team/keyphrase-extraction-distilbert-inspec",
    inputs: text,
    provider: "hf-inference"
  });

  // Step 1: Extract cleaned keywords from HF result
  const rawKeywords = result
    .filter(obj => obj.score >= minScore)
    .map(obj => obj.word.trim().toLowerCase());

  const finalSet = new Set(); // ensures uniqueness

  for (const keyword of rawKeywords) {
    if (!keyword) continue;

    // Add the full phrase first
    finalSet.add(keyword);

    // If it's a multi-word phrase, also add each individual word
    const parts = keyword.split(/\s+/); // split by one or more spaces
    if (parts.length > 1) {
      for (const part of parts) {
        if (part.length > 1) { // avoid adding junk like single-letter tokens
          finalSet.add(part);
        }
      }
    }
  }

  const keywords = Array.from(finalSet);
  console.log("Extracted keywords:", keywords);

  return keywords;
}

export default extractKeywords;
