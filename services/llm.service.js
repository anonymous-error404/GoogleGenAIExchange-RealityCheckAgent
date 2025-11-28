import verification_model from "../config/verify_llm.config.js";
import context_extraction_model from "../config/context_llm.config.js";

class LLMService {

  async getContext(text, image_url, tweet_image_content, deepfake_analysis_result) {
    console.log(`tweet image content : ${tweet_image_content}`);
    const prompt = `You are a neutral text interpretation engine. Your only job is to describe the *literal meaning* and *intent* of the provided content without evaluating whether it is true, false, misleading, or opinion-based.

                    You must follow these rules strictly:

                    ---

                    ### 1. Tone and Role Rules

                    - Stay neutral — do NOT add opinions, warnings, fact-checking, disclaimers, or corrections.
                    - Do NOT refer to the content as a "claim", "statement", "post", "tweet", or similar wording.
                    - Do NOT speculate beyond what is shown.

                    ---

                    ### 2. Interpretation Rules

                    Your job is to:

                    1. Explain the meaning and implied intention of the combined content (text + images if provided).
                    2. Detect and state the most prominent language used.
                    3. Identify slang, idioms, sarcasm, emotional tone, or cultural references if present.
                    4. If an image exists:
                      - Describe exactly what is visible, including people, objects, background elements, text, symbols or gestures.
                      - If text is extracted from the image, explain that text directly using phrases like “the image text says”.
                    5. If deepfake analysis results are provided:
                      - Directly classify the image using one of the following exact terms:
                        - "real"
                        - "edited"
                        - "AI-generated"
                        - "fabricated"
                        - "unsure"
                      - Do NOT use phrasing like "analysis suggests", "the result claims", or "appears to be".

                    ---

                    ### 3. Forbidden Phrases

                    You MUST NOT use:

                    - “the tweet says”
                    - “according to”
                    - “claims”
                    - “suggests”
                    - “it appears that”
                    - “probably”
                    - “likely”
                    - Any speculative language or narrative-style descriptions.

                    ---

                    ### 4. Output Format

                    Respond **strictly** in this JSON structure:

                    {
                      "context": "<your interpretation here>",
                      "language": "<detected language>"
                    }

                    - No extra text before or after.
                    - No markdown formatting inside the JSON.
                    - No additional keys or metadata.

                    ---

                    ### 5. Example of Correct Style

                    Example Input:
                    Text: "Bro this politician is finished 😭😭"
                    Image: Shows a man at a podium with a digitally added red banner reading "LOSER".
                    Deepfake Result: Fake.

                    Correct Output:

                    {
                      "context": "The content uses slang, emojis, and mocking tone to insult a politician. The image shows a man speaking at a podium with a digitally added red banner reading 'LOSER'. The provided image is AI-generated.",
                      "language": "English"
                    }

                    ---

                    Now analyze the following content:

                    Tweet Text: ${text}
                    Tweet Image Url: ${image_url}
                    Extracted Image Text: ${tweet_image_content}
                    DeepFake Analysis Result: ${deepfake_analysis_result}
                    `;


    try {
      const raw_output = (await context_extraction_model.generateContent(prompt)).response.text();
      const json_response_string = raw_output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const json_response_object = JSON.parse(json_response_string);

      return json_response_object;
    }
    catch (err) {
      return { error: err };
    }
  }

  async verifyContext(tweet_context, language, references) {

    const prompt = `You are an expert, non-partisan fact-checker. Your role is to evaluate the accuracy of the given content using verified knowledge and, when provided, reference material. Speak confidently and objectively as someone who independently confirms facts — do NOT phrase statements as speculation or as if someone else provided the information.

                    You must follow all instructions strictly.

                    ---

                    ### ⚠️ Behavioral Rules

                    - Do NOT use hedging language like "it seems", "might be", "could be", "may suggest".
                    - Do NOT simply restate the tweet — analyze it.
                    - Do NOT provide personal opinions, political bias, or emotional tone.
                    - Do NOT refuse unless the content requests harm, illegal acts, or political persuasion.

                    ---

                    ### 📌 Task Checklist

                    Using the input content and reference material (if present), complete the following:

                    1. **Analyze the Verifiable Claims**
                      - Identify the main factual statements in the content.
                      - Only analyze claims that can be verified.

                    2. **Evaluate the Source**
                      - If author information is available, assess credibility based on posting patterns, exaggeration trends, or anonymity — only if relevant.

                    3. **Check for Misinformation Indicators**
                      - Identify emotional triggers, exaggeration, lack of sources, cherry-picked facts, partisan framing, or conspiracy tropes.

                    4. **Use Evidence**
                      - If references are provided and relevant, use them as primary sources.
                      - If references are missing or irrelevant, rely on established factual knowledge.
                      - Do NOT mention or include unrelated references.

                    5. **Consider Attached Media Context (if provided)**
                      - If there is an image deepfake analysis result, include it.
                      - If image text extraction exists, incorporate it.
                      - Mention them separately in the reasoning.

                    6. **Support the Verdict**
                      - Provide clear evidence inside the response under "sources" using real headlines, publication names, and URLs (from provided references or known reputable sources).

                    ---

                    ### 📌 Output Rules

                    Respond ONLY in the following JSON format:

                    {
                      "verdict": "string", 
                      "confidence": "float", 
                      "reason": "string", 
                      "awareness_factor": "string", 
                      "sources": [
                        {
                          "headline": "string",
                          "publication": "string",
                          "link": "string"
                        }
                      ]
                    }

                    **Verdict must be EXACTLY one of the following:**
                    - "Likely Real"
                    - "Likely Misinformation"
                    - "Misleading"
                    - "Lacks Context"
                    - "Unverified"

                    **Confidence must be a number between 0 and 1.**

                    ---

                    ### 📌 Required Reasoning Structure

                    In the "reason" field, include these points in this order where applicable:

                    1. Whether any images are **real, edited, fabricated, or AI-generated** (based on provided analysis).
                    2. Whether any extracted image text is **accurate or misleading**.
                    3. Whether the primary written content is **accurate, misleading, or false**, and why — supported by verifiable evidence.

                    ---

                    ### 📌 Example Output (Style Reference)

                    {
                      "verdict": "Misleading",
                      "confidence": "0.87",
                      "reason": "The attached image is AI-generated based on the metadata analysis. The extracted text is authentic but taken out of context. The written content exaggerates election results and falsely implies official confirmation.",
                      "awareness_factor": "Uses emotional language, absolutist framing, and implies hidden knowledge to create urgency and suspicion.",
                      "sources": [
                        {
                          "headline": "2024 Election Data Release",
                          "publication": "Associated Press",
                          "link": "https://apnews.com/election"
                        }
                      ]
                    }

                    ---

                    ### 📌 Now analyze the following content:

                    - Tweet Context: ${tweet_context}
                    - Response Language: ${language}
                    - Reference Content: ${references}
                    `;

    try {
      const raw_output = (await verification_model.generateContent(prompt)).response.text();
      const json_response_string = raw_output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const json_response_object = JSON.parse(json_response_string);

      return json_response_object;
    }
    catch (err) {
      return { error: err };
    }
  }
}

export default new LLMService();
