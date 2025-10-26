import type { RatingRepository } from '../../../core/application/ports/outbound/repositories';
import { STORAGE_KEYS } from '../../../shared/constants';

interface StoredRating {
  articleId: string;
  userId?: string;
  rating: number;
  createdAt: string;
}

export class LocalStorageRatingRepository implements RatingRepository {
  private ratings: StoredRating[] = [];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.RATINGS || 'ratings');
    if (stored) {
      this.ratings = JSON.parse(stored);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(
      STORAGE_KEYS.RATINGS || 'ratings',
      JSON.stringify(this.ratings)
    );
  }

  async rateArticle(
    articleId: string,
    rating: number,
    userId?: string
  ): Promise<void> {
    const existingRatingIndex = this.ratings.findIndex(
      (r) => r.articleId === articleId && r.userId === userId
    );

    const newRating: StoredRating = {
      articleId,
      rating,
      userId,
      createdAt: new Date().toISOString(),
    };

    if (existingRatingIndex >= 0) {
      this.ratings[existingRatingIndex] = newRating;
    } else {
      this.ratings.push(newRating);
    }

    this.saveToStorage();
  }

  async getArticleRating(
    articleId: string
  ): Promise<{ rating: number; count: number }> {
    const articleRatings = this.ratings.filter(
      (r) => r.articleId === articleId
    );

    if (articleRatings.length === 0) {
      return { rating: 0, count: 0 };
    }

    const totalRating = articleRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / articleRatings.length;

    return {
      rating: Math.round(averageRating * 100) / 100,
      count: articleRatings.length,
    };
  }
}
