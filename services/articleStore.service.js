import { Op } from "sequelize";
import { Article, ArticleKeyword, ArticleImage } from "../db_entities/index.js";

class articleStoreService {
  async getArticlesByKeywords(keywords) {
    try {
      const articles = await Article.findAll({
        include: [
          {
            model: ArticleKeyword,
            where: {
              keyword: {
                [Op.or]: keywords.map(k => ({
                  [Op.iLike]: `%${k}%`,
                })),
              },
            },
            attributes: [], // No need to return keyword rows
          }
        ],
        attributes: ["article_id"], // Only return the data you need
        distinct: true,
      });

      return articles.map(a => ({ article_id: a.article_id }));

    } catch (error) {
      console.error("Error fetching articles by keywords:", error);
      throw error;
    }
  }


  async getArticlesByIds(results) {

    if (!results || results.length === 0) return [];

    // Extract IDs and preserve order
    const articleIds = results.map(r => r.article_id);

    // Fetch all articles matching the IDs
    const articles = await Article.findAll({
      where: {
        article_id: {
          [Op.in]: articleIds
        }
      }
    });

    // Preserve the order returned by pgvector
    const articleMap = new Map(articles.map(a => [a.article_id, a.toJSON()]));

    const orderedArticles = results
      .map(r => ({
        ...articleMap.get(r.article_id),
        avg_distance: r.avg_distance // include similarity score
      }))
      .filter(a => a); // remove nulls if any missing

    return orderedArticles;
  }
}

export default new articleStoreService();
