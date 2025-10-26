import { Article } from '../../../domain';
import type { ArticleFilters, PaginatedResponse } from '../../../domain';

// Data interfaces for repository operations (without domain entity methods)
interface CreateArticleData {
  title: string;
  content: string;
  summary: string;
  author: string;
  categoryId: string;
  subcategoryId?: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  isFavorite?: boolean;
}

interface UpdateArticleData {
  title?: string;
  content?: string;
  summary?: string;
  author?: string;
  categoryId?: string;
  subcategoryId?: string;
  tags?: string[];
  rating?: number;
  ratingCount?: number;
  isFavorite?: boolean;
}

export interface ArticleRepository {
  findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>>;
  findById(id: string): Promise<Article | null>;
  create(article: CreateArticleData): Promise<Article>;
  update(id: string, article: UpdateArticleData): Promise<Article>;
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
