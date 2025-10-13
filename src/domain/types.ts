export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  categoryId: string;
  subcategoryId?: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export interface Rating {
  articleId: string;
  userId?: string;
  rating: number;
  createdAt: string;
}

export interface Favorite {
  articleId: string;
  userId?: string;
  createdAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  categoryId?: string;
  subcategoryId?: string;
  search?: string;
  minRating?: number;
  tags?: string[];
}

export interface ArticleFilters extends FilterParams, PaginationParams {}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
