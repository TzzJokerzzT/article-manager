import type { FavoriteRepository } from '../../../core/application/ports/outbound/repositories';
import { STORAGE_KEYS, MOCK_USER_ID } from '../../../shared/constants';

interface StoredFavorite {
  articleId: string;
  userId: string;
  createdAt: string;
}

export class LocalStorageFavoriteRepository implements FavoriteRepository {
  private favorites: StoredFavorite[] = [];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (stored) {
      this.favorites = JSON.parse(stored);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(
      STORAGE_KEYS.FAVORITES,
      JSON.stringify(this.favorites)
    );
  }

  async addFavorite(
    articleId: string,
    userId: string = MOCK_USER_ID
  ): Promise<void> {
    const existingFavorite = this.favorites.find(
      (f) => f.articleId === articleId && f.userId === userId
    );

    if (!existingFavorite) {
      this.favorites.push({
        articleId,
        userId,
        createdAt: new Date().toISOString(),
      });
      this.saveToStorage();
    }
  }

  async removeFavorite(
    articleId: string,
    userId: string = MOCK_USER_ID
  ): Promise<void> {
    this.favorites = this.favorites.filter(
      (f) => !(f.articleId === articleId && f.userId === userId)
    );
    this.saveToStorage();
  }

  async getFavorites(userId: string = MOCK_USER_ID): Promise<string[]> {
    return this.favorites
      .filter((f) => f.userId === userId)
      .map((f) => f.articleId);
  }

  async isFavorite(
    articleId: string,
    userId: string = MOCK_USER_ID
  ): Promise<boolean> {
    return this.favorites.some(
      (f) => f.articleId === articleId && f.userId === userId
    );
  }
}
