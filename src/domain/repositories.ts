import type { Article, ArticleFilters, PaginatedResponse } from './types';

/**
 * Repository interface for article data operations
 * Defines the contract for article persistence layer
 */
export interface ArticleRepository {
  /**
   * Retrieves articles with filtering and pagination
   * @param filters - Filter and pagination parameters
   * @returns Promise resolving to paginated article response
   */
  findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>>;

  /**
   * Finds a single article by its ID
   * @param id - Article unique identifier
   * @returns Promise resolving to article or null if not found
   */
  findById(id: string): Promise<Article | null>;

  /**
   * Creates a new article
   * @param article - Article data without system-generated fields
   * @returns Promise resolving to the created article
   */
  create(
    article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article>;

  /**
   * Updates an existing article
   * @param id - Article ID to update
   * @param article - Partial article data for update
   * @returns Promise resolving to the updated article
   */
  update(id: string, article: Partial<Article>): Promise<Article>;

  /**
   * Deletes an article by ID
   * @param id - Article ID to delete
   * @returns Promise that resolves when deletion is complete
   */
  delete(id: string): Promise<void>;
}

/**
 * Repository interface for article rating operations
 */
export interface RatingRepository {
  /**
   * Rates an article
   * @param articleId - ID of the article to rate
   * @param rating - Rating value (typically 1-5)
   * @param userId - Optional user ID making the rating
   * @returns Promise that resolves when rating is saved
   */
  rateArticle(
    articleId: string,
    rating: number,
    userId?: string
  ): Promise<void>;

  /**
   * Gets the current rating for an article
   * @param articleId - ID of the article
   * @returns Promise resolving to rating statistics
   */
  getArticleRating(
    articleId: string
  ): Promise<{ rating: number; count: number }>;
}

/**
 * Repository interface for favorite article operations
 */
export interface FavoriteRepository {
  /**
   * Adds an article to favorites
   * @param articleId - ID of the article to favorite
   * @param userId - Optional user ID
   * @returns Promise that resolves when favorite is added
   */
  addFavorite(articleId: string, userId?: string): Promise<void>;

  /**
   * Removes an article from favorites
   * @param articleId - ID of the article to unfavorite
   * @param userId - Optional user ID
   * @returns Promise that resolves when favorite is removed
   */
  removeFavorite(articleId: string, userId?: string): Promise<void>;

  /**
   * Gets all favorite article IDs for a user
   * @param userId - Optional user ID
   * @returns Promise resolving to array of article IDs
   */
  getFavorites(userId?: string): Promise<string[]>;

  /**
   * Checks if an article is favorited by a user
   * @param articleId - ID of the article to check
   * @param userId - Optional user ID
   * @returns Promise resolving to boolean indicating favorite status
   */
  isFavorite(articleId: string, userId?: string): Promise<boolean>;
}
