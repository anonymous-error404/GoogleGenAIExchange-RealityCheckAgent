import hf_client from '../config/huggingface.config.js';

const text = "53rd CJI Surya Kant: Congratulations pour in Published - November 24, 2025 01:22 pm IST - New Delhi “Extending my warm wishes to Justice Surya Kant on taking oath as the 53rd Chief Justice of India,” All India Congress Committee President Mallikarjuna Kharge said. File | Photo Credit: The Hindu Congress president Mallikarjun Kharge on Monday (November 24, 2025) said Justice Surya Kant’s elevation to the post of Chief Justice of India comes at a critical juncture for the justice system, and expressed confidence that under his leadership, constitutional values and public trust in the rule of law will be further reinforced. Justice Kant, who has been part of several landmark verdicts, including on abrogation of Article 370 removing Jammu and Kashmir’s special status, took oath as the 53rd Chief Justice of India on Monday (November 24). He succeeded Justice B.R. Gavai. “Extending my warm wishes to Justice Surya Kant on taking oath as the 53rd Chief Justice of India. His elevation marks the beginning of a 14-month tenure at a critical juncture for our justice system,” Mr. Kharge said on X. “I am confident that under his leadership, Constitutional values, institutional strength, and public trust in the rule of law will be further reinforced, advancing the promise of justice for every citizen,” the Congress chief said. President Droupadi Murmu administered the oath to Justice Kant at a brief ceremony held at Rashtrapati Bhavan. Vice President C.P. Radhakrishnan and Prime Minister Narendra Modi were among the senior leaders who attended the ceremony. Published - November 24, 2025 01:22 pm IST";
const result = await hf_client.tokenClassification({
    model: "ml6team/keyphrase-extraction-distilbert-inspec",
    inputs: text,
    provider: "hf-inference",
    parameters: { aggregation_strategy: "simple" }
  });

  const keywords = result
    .filter(obj => obj.score >= 0.5)
    .map(obj => obj.word.trim().toLowerCase())
    .filter((word, idx, arr) => word && arr.indexOf(word) === idx);

    console.log("Extracted keywords:", keywords);