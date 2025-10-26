import { Article } from '../../domain';
import type { ArticleRepository } from '../ports/outbound/repositories';

export class GetArticleByIdUseCase {
  private readonly articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(id: string): Promise<Article | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Article ID is required');
    }

    return await this.articleRepository.findById(id);
  }
}
