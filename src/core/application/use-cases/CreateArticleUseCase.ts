import { Article } from '../../domain';
import type { ArticleRepository } from '../ports/outbound/repositories';

export class CreateArticleUseCase {
  private readonly articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(
    articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article> {
    this.validateArticleData(articleData);
    return await this.articleRepository.create(articleData);
  }

  private validateArticleData(
    articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): void {
    if (!articleData.title || articleData.title.trim().length === 0) {
      throw new Error('Article title is required');
    }
    if (!articleData.content || articleData.content.trim().length === 0) {
      throw new Error('Article content is required');
    }
    if (!articleData.author || articleData.author.trim().length === 0) {
      throw new Error('Article author is required');
    }
    if (!articleData.categoryId || articleData.categoryId.trim().length === 0) {
      throw new Error('Article category is required');
    }
  }
}
