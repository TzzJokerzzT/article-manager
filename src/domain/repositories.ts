import type { Article, ArticleFilters, PaginatedResponse } from './types';

export interface ArticleRepository {
  findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>>;
  findById(id: string): Promise<Article | null>;
  create(
    article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article>;
  update(id: string, article: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<void>;
}

export interface RatingRepository {
  rateArticle(
    articleId: string,
    rating: number,
    userId?: string
  ): Promise<void>;
  getArticleRating(
    articleId: string
  ): Promise<{ rating: number; count: number }>;
}

export interface FavoriteRepository {
  addFavorite(articleId: string, userId?: string): Promise<void>;
  removeFavorite(articleId: string, userId?: string): Promise<void>;
  getFavorites(userId?: string): Promise<string[]>;
  isFavorite(articleId: string, userId?: string): Promise<boolean>;
}
