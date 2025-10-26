import { Article } from '../../domain';
import type { ArticleFilters, PaginatedResponse } from '../../domain';
import type { ArticleRepository } from '../ports/outbound/repositories';

export class GetArticlesUseCase {
  private readonly articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(filters: ArticleFilters): Promise<PaginatedResponse<Article>> {
    return await this.articleRepository.findAll(filters);
  }
}
