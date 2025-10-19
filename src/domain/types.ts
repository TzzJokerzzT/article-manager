/**
 * Core article entity interface
 */
export interface Article {
  /** Unique identifier for the article */
  id: string;
  /** Article title */
  title: string;
  /** Full article content */
  content: string;
  /** Brief summary of the article */
  summary: string;
  /** Article author name */
  author: string;
  /** ID of the category this article belongs to */
  categoryId: string;
  /** Optional ID of the subcategory */
  subcategoryId?: string;
  /** Array of tags associated with the article */
  tags: string[];
  /** Average rating score */
  rating: number;
  /** Number of ratings received */
  ratingCount: number;
  /** ISO string of when the article was created */
  createdAt: string;
  /** ISO string of when the article was last updated */
  updatedAt: string;
  /** Whether the article is marked as favorite by current user */
  isFavorite?: boolean;
}

/**
 * Category interface for organizing articles
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Category display name */
  name: string;
  /** Category description */
  description: string;
  /** Optional array of subcategories */
  subcategories?: Subcategory[];
}

/**
 * Subcategory interface for fine-grained article organization
 */
export interface Subcategory {
  /** Unique identifier for the subcategory */
  id: string;
  /** Subcategory display name */
  name: string;
  /** Subcategory description */
  description: string;
  /** ID of the parent category */
  categoryId: string;
}

/**
 * Rating interface for article scoring
 */
export interface Rating {
  /** ID of the rated article */
  articleId: string;
  /** Optional user ID who made the rating */
  userId?: string;
  /** Rating value (typically 1-5) */
  rating: number;
  /** ISO string of when the rating was created */
  createdAt: string;
}

/**
 * Favorite interface for user's favorite articles
 */
export interface Favorite {
  /** ID of the favorited article */
  articleId: string;
  /** Optional user ID who favorited the article */
  userId?: string;
  /** ISO string of when the favorite was created */
  createdAt: string;
}

/**
 * Pagination parameters for data fetching
 */
export interface PaginationParams {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Filter parameters for searching and filtering articles
 */
export interface FilterParams {
  /** Filter by category ID */
  categoryId?: string;
  /** Filter by subcategory ID */
  subcategoryId?: string;
  /** Search term for title, content, or author */
  search?: string;
  /** Minimum rating threshold */
  minRating?: number;
  /** Filter by tags */
  tags?: string[];
}

/**
 * Combined filter and pagination parameters
 */
export interface ArticleFilters extends FilterParams, PaginationParams {}

/**
 * Generic paginated response wrapper
 * @template T - Type of the data items
 */
export interface PaginatedResponse<T> {
  /** Array of data items for current page */
  data: T[];
  /** Pagination metadata */
  pagination: {
    /** Current page number */
    page: number;
    /** Items per page */
    limit: number;
    /** Total number of items */
    total: number;
    /** Total number of pages */
    totalPages: number;
  };
}
