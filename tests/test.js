import articleStoreService from "../services/articleStore.service.js";


const keywordexaple = ["climate change", "Elon Musk", "Bihar Assembly Elections"];
const tokenexample = [
  "Artificial Intelligence",
  "artificial",
  "intelligence",
  "Elon Musk",
  "elon",
  "musk",
  "Bihar Assembly Elections",
  "bihar",
  "assembly",
  "elections"
]

articleStoreService.
  getArticlesByKeywords(keywordexaple, tokenexample).then(res => {
    console.log("Articles fetched by keywords:", res);
  }).catch(err => {
    console.error("Error fetching articles by keywords:", err);
  });