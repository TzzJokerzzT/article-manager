import type { FavoriteRepository } from '@/domain/repositories';
import { STORAGE_KEYS, MOCK_USER_ID } from '@/shared/constants';

/**
 * Interface for storing favorite data in localStorage
 */
interface StoredFavorite {
  /** ID of the favorited article */
  articleId: string;
  /** ID of the user who favorited the article */
  userId: string;
  /** ISO string timestamp when favorite was created */
  createdAt: string;
}

/**
 * Mock implementation of FavoriteRepository using localStorage
 * Manages user's favorite articles with persistent storage
 */
export class MockFavoriteRepository implements FavoriteRepository {
  /**
   * Retrieves stored favorites from localStorage
   * @returns Array of stored favorite objects
   */
  private getStoredFavorites(): StoredFavorite[] {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Persists favorites to localStorage
   * @param favorites - Array of favorites to save
   */
  private saveFavorites(favorites: StoredFavorite[]): void {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  /**
   * Adds an article to user's favorites (prevents duplicates)
   * @param articleId - ID of the article to favorite
   * @param userId - User ID (defaults to mock user)
   * @returns Promise that resolves when favorite is added
   */
  async addFavorite(articleId: string, userId = MOCK_USER_ID): Promise<void> {
    const favorites = this.getStoredFavorites();
    const exists = favorites.some(
      (f) => f.articleId === articleId && f.userId === userId
    );

    if (!exists) {
      favorites.push({
        articleId,
        userId,
        createdAt: new Date().toISOString(),
      });
      this.saveFavorites(favorites);
    }
  }

  /**
   * Removes an article from user's favorites
   * @param articleId - ID of the article to unfavorite
   * @param userId - User ID (defaults to mock user)
   * @returns Promise that resolves when favorite is removed
   */
  async removeFavorite(
    articleId: string,
    userId = MOCK_USER_ID
  ): Promise<void> {
    const favorites = this.getStoredFavorites();
    const filtered = favorites.filter(
      (f) => !(f.articleId === articleId && f.userId === userId)
    );
    this.saveFavorites(filtered);
  }

  /**
   * Gets all favorite article IDs for a specific user
   * @param userId - User ID (defaults to mock user)
   * @returns Promise resolving to array of article IDs
   */
  async getFavorites(userId = MOCK_USER_ID): Promise<string[]> {
    const favorites = this.getStoredFavorites();
    return favorites.filter((f) => f.userId === userId).map((f) => f.articleId);
  }

  /**
   * Checks if an article is in user's favorites
   * @param articleId - ID of the article to check
   * @param userId - User ID (defaults to mock user)
   * @returns Promise resolving to boolean indicating favorite status
   */
  async isFavorite(articleId: string, userId = MOCK_USER_ID): Promise<boolean> {
    const favorites = this.getStoredFavorites();
    return favorites.some(
      (f) => f.articleId === articleId && f.userId === userId
    );
  }
}
