import type { RatingRepository } from '@/domain/repositories';
import { STORAGE_KEYS, MOCK_USER_ID } from '@/shared/constants';

/**
 * Interface for storing rating data in localStorage
 */
interface StoredRating {
  /** ID of the rated article */
  articleId: string;
  /** ID of the user who made the rating */
  userId: string;
  /** Rating value (typically 1-5) */
  rating: number;
  /** ISO string timestamp when rating was created */
  createdAt: string;
}

/**
 * Mock implementation of RatingRepository using localStorage
 * Manages article ratings with persistent storage
 */
export class MockRatingRepository implements RatingRepository {
  /**
   * Retrieves all stored ratings from localStorage
   * @returns Array of stored rating objects
   */
  private getRatings(): StoredRating[] {
    const stored = localStorage.getItem(STORAGE_KEYS.RATINGS);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Persists ratings to localStorage
   * @param ratings - Array of ratings to save
   */
  private saveRatings(ratings: StoredRating[]): void {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  }

  /**
   * Rates an article (creates new rating or updates existing one)
   * @param articleId - ID of the article to rate
   * @param rating - Rating value (typically 1-5)
   * @param userId - User ID (defaults to mock user)
   * @returns Promise that resolves when rating is saved
   */
  async rateArticle(
    articleId: string,
    rating: number,
    userId = MOCK_USER_ID
  ): Promise<void> {
    const ratings = this.getRatings();
    const existingIndex = ratings.findIndex(
      (r) => r.articleId === articleId && r.userId === userId
    );

    const newRating: StoredRating = {
      articleId,
      userId,
      rating,
      createdAt: new Date().toISOString(),
    };

    // Update existing rating or add new one
    if (existingIndex >= 0) {
      ratings[existingIndex] = newRating;
    } else {
      ratings.push(newRating);
    }

    this.saveRatings(ratings);
  }

  /**
   * Calculates average rating and count for an article
   * @param articleId - ID of the article to get rating for
   * @returns Promise resolving to rating statistics (average and count)
   */
  async getArticleRating(
    articleId: string
  ): Promise<{ rating: number; count: number }> {
    const ratings = this.getRatings().filter((r) => r.articleId === articleId);

    if (ratings.length === 0) {
      return { rating: 0, count: 0 };
    }

    // Calculate average rating
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return {
      rating: total / ratings.length,
      count: ratings.length,
    };
  }
}
