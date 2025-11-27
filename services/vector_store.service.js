import configuration from '../config/index.js';
import articleStoreService from './articleStore.service.js';
import sequelizeClient from '../config/database.config.js';
import dotenv from 'dotenv';

dotenv.config();

class VectorStoreService {

    vectorStoreClient = configuration.database_client;

    async retrieveSimilarArticles(queryEmbeddings, topN=50) {  //add filtered_articles parameter when using keyword based filtering
        try {
            // Convert JS arrays into PostgreSQL array literals
            const queryEmbeddingLiteral = queryEmbeddings
                .map(vec => `'[${vec.join(", ")}]'::vector`)
                .join(", ");

            // const filteredArticlesLiteral = filtered_articles
            //     .map(a => Number(a.article_id))
            //     .filter(id => !isNaN(id))
            //     .join(", ");

            const sql = `
                        SELECT * FROM find_similar_articles_topk_fromall(
                            ${queryEmbeddings.length > 0 
                            ? `ARRAY[${queryEmbeddingLiteral}]::vector[]` 
                            : `ARRAY[]::vector[]`},
                            3,
                            ${topN}
                        );
                        `;

                        // ${filtered_articles.length > 0                          give this parameter for find_similar_articles_topk()
                        //     ? `ARRAY[${filteredArticlesLiteral}]::bigint[]` 
                        //     : `ARRAY[]::bigint[]`},

            const [results] = await sequelizeClient.query(sql);

            const reference_articles = await articleStoreService.getArticlesByIds(results)
            return reference_articles;
        }
        catch (error) {
            console.error("Error retrieving similar articles from vector store:", error);
            return { error: error.message };
        }
    }
}

export default new VectorStoreService();
