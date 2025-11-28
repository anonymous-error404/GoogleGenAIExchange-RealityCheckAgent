import confiuration from '../config/index.js';


const hf_client = confiuration.hf_client;
const gemini = confiuration.context_llm_model;

async function extractKeywords(text) {
  // const result = await hf_client.tokenClassification({
  //   model: "ml6team/keyphrase-extraction-distilbert-inspec",
  //   inputs: text,
  //   provider: "hf-inference",
  //   parameters : { aggregation_strategy:"simple" }
  // });

  // const keywords = result
  //   .filter(obj => obj.score >= minScore)
  //   .map(obj => obj.word.trim().toLowerCase());

  const prompt = `You are an advanced keyword extraction system.

                  Extract the most relevant keywords and key phrases from the input text. 
                  The output should help identify the main subjects, concepts, entities, and context.

                  **Rules:**
                  - Return only a JSON array of strings.
                  - Include key phrases, not just single words (e.g., "climate change", "Elon Musk", "Bihar Assembly Elections").
                  - Prioritize named entities such as:
                    - Person names
                    - Locations
                    - Organizations
                    - Events
                    - Dates and time references
                  - Include technical terms, domain-specific phrases, and topics.
                  - Do NOT include:
                    - Stopwords (the, and, or, of, etc.)
                    - Generic filler words with no meaning
                    - Irrelevant fragments or single letters

                  Text:
                  """
                  ${text}

                  Example Output:
                  ["climate change", "Elon Musk", "Bihar Assembly Elections"]
                  """`;

  const raw_output = (await gemini.generateContent(prompt)).response.text();

  const jsonMatch = raw_output.match(/```json([\s\S]*?)```/);

  let keywords = [];

  if (jsonMatch && jsonMatch[1]) {
    try {
      keywords = JSON.parse(jsonMatch[1].trim());
    } catch (err) {
      console.error("❌ JSON parsing failed:", err);
    }
  }

  const tokens = normalizekeywords(keywords);

  console.log(keywords,tokens);

  return [keywords,tokens];
}

function normalizekeywords(keywords) {
  const tokens = new Set();

  keywords.forEach(k => {
    tokens.add(k.toLowerCase());

    // Add individual words (only if keyword has >1 token)
    const parts = k.toLowerCase().split(/[\s-]+/);
    if (parts.length > 1) {
      parts.forEach(p => tokens.add(p));
    }
  });

  return Array.from(tokens);
};

export default extractKeywords;