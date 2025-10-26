import { Article } from '../../../domain';
import type { ArticleFilters } from '../../../domain';

export interface GetArticlesQuery {
  filters: ArticleFilters;
}

export interface GetArticleByIdQuery {
  id: string;
}

export interface CreateArticleCommand {
  article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
}

export interface UpdateArticleCommand {
  id: string;
  article: Partial<Article>;
}

export interface DeleteArticleCommand {
  id: string;
}

export interface RateArticleCommand {
  articleId: string;
  rating: number;
  userId?: string;
}

export interface ToggleFavoriteCommand {
  articleId: string;
  userId?: string;
}
