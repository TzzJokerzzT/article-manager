import { Article } from '../../../domain';
import type { ArticleFilters, PaginatedResponse } from '../../../domain';

export interface ArticleQueryService {
  getArticles(filters: ArticleFilters): Promise<PaginatedResponse<Article>>;
  getArticleById(id: string): Promise<Article | null>;
}
