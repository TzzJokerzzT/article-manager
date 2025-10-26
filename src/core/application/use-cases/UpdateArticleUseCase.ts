import { Article } from '../../domain';
import type { ArticleRepository } from '../ports/outbound/repositories';

export class UpdateArticleUseCase {
  private readonly articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(id: string, updateData: Partial<Article>): Promise<Article> {
    if (!id || id.trim().length === 0) {
      throw new Error('Article ID is required');
    }

    const existingArticle = await this.articleRepository.findById(id);
    if (!existingArticle) {
      throw new Error(`Article with id ${id} not found`);
    }

    return await this.articleRepository.update(id, updateData);
  }
}
