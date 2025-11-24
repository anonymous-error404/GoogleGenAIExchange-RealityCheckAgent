import verification_model from "../config/verify_llm.config.js";
import context_extraction_model from "../config/context_llm.config.js";

class LLMService {

    async getContext(text, image_url, tweet_image_content, deepfake_analysis_result) {
        const prompt = `You are a neutral text interpretation engine. Your role is to explain the *literal meaning* and *intent* of the given content as if describing it directly — not narrating where it came from.
                        You are expected to describe the images prvided(if any) in the content, based on what is shown in the image, the text extracted(if any) from the image, and the deepfake analysis of the image(if any).
                        
                        You must:
                        1. Explain the meaning or implication of the combined content directly.
                        2. Detect the most prominent language used in the content.
                        3. Respond strictly in JSON format with the exact fields:
                        {
                            "context": "...",
                            "language": "..."
                        }

                        Example of the correct response style:
                        {
                        "context": "The text uses slang and refers to a tutorial for creating fake videos, possibly indicating deceptive intent.",
                        "language": "English"
                        }

                        Now analyze the following input:

                        Tweet Text (if any): ${text}
                        Tweet Image Url (if any): ${image_url}
                        Text Extracted from Tweet Image (if any): ${tweet_image_content}
                        Tweet Image DeepFake Analysis Result (if any): ${deepfake_analysis_result}
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

        const prompt = `You are an expert, non-partisan fact-checker. Your role is to evaluate the accuracy of the given tweet using verifiable knowledge and any relevant reference content. You should speak confidently and objectively, as someone who independently knows or has verified the facts—do not phrase statements as if someone provided you information.

                  **Input :**
                  * **Tweet Context:** "${tweet_context}"
                  * **Response Language:** ${language}
                  * **Reference Content:** ${references} 

                  **Instructions:**
                  Using the tweet context and any relevant information from the provided reference content (if not provided, then use your own knowledge base), perform the following steps:

                  **Your Task:**
                  1.  **Analyze the Claims:** Identify the core verifiable claims made in the tweet, with the help of the reference content(if any).
                  2.  **Evaluate the Source:** Assess the author's bio and typical content, if relevant.
                  3.  **Check for Misinformation Tropes:** Look for signs like emotional language, calls to outrage, lack of sources, or use of buzzwords.
                  4.  **Synthesize Findings:** Based on your analysis, generate a JSON object with your assessment. Provide references to your response from the reference content(if any).
                  5. **Back Your Verdict with Evidence:** Ensure your verdict is supported by specific evidence from the reference content(if any) or your knowledge base. Add news headlines, reference links, etc. inside your response under they key "sources".
                  6. **If the context provides information about some images in the post (like deepfake analysis report, extracted text), do mention it in your response.
                  7. **If completely unrelated references are provided, then completely ignore them and do not mention anything about it in your response.

                  **Output Format:**
                  Respond ONLY with a valid JSON object following this schema.

                  {
                    "verdict": "string", // Must be one of: "Likely Real", "Likely Misinformation", "Misleading", "Lacks Context", "Unverified"
                    "confidence": "float", // A value between 0.0 (low confidence) and 1.0 (high confidence) in your verdict.
                    "reason": "string", // A concise, evidence-based explanation for your verdict. Mention the specific claims checked and what you found.
                    "awareness_factor": "string" // Explain the common misinformation techniques or psychological triggers this tweet uses or could use (e.g., "Appeals to fear," "Creates an 'us vs. them' narrative," "Uses a kernel of truth to sell a larger falsehood," "Lack of verifiable sources").
                    "sources": "array of json objects with each object having keys the following keys: 'headline','publication', 'link'" // news headlines, publications, urls of articles or documentation that were provided in references or from your own knowledge base
                  }`;

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
