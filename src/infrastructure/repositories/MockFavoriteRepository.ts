import type { FavoriteRepository } from '@/domain/repositories';
import { STORAGE_KEYS, MOCK_USER_ID } from '@/shared/constants';

interface StoredFavorite {
  articleId: string;
  userId: string;
  createdAt: string;
}

export class MockFavoriteRepository implements FavoriteRepository {
  private getStoredFavorites(): StoredFavorite[] {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(favorites: StoredFavorite[]): void {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

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

  async getFavorites(userId = MOCK_USER_ID): Promise<string[]> {
    const favorites = this.getStoredFavorites();
    return favorites.filter((f) => f.userId === userId).map((f) => f.articleId);
  }

  async isFavorite(articleId: string, userId = MOCK_USER_ID): Promise<boolean> {
    const favorites = this.getStoredFavorites();
    return favorites.some(
      (f) => f.articleId === articleId && f.userId === userId
    );
  }
}
