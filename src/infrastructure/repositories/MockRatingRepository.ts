import type { RatingRepository } from '@/domain/repositories';
import { STORAGE_KEYS, MOCK_USER_ID } from '@/shared/constants';

interface StoredRating {
  articleId: string;
  userId: string;
  rating: number;
  createdAt: string;
}

export class MockRatingRepository implements RatingRepository {
  private getRatings(): StoredRating[] {
    const stored = localStorage.getItem(STORAGE_KEYS.RATINGS);
    return stored ? JSON.parse(stored) : [];
  }

  private saveRatings(ratings: StoredRating[]): void {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  }

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

    if (existingIndex >= 0) {
      ratings[existingIndex] = newRating;
    } else {
      ratings.push(newRating);
    }

    this.saveRatings(ratings);
  }

  async getArticleRating(
    articleId: string
  ): Promise<{ rating: number; count: number }> {
    const ratings = this.getRatings().filter((r) => r.articleId === articleId);

    if (ratings.length === 0) {
      return { rating: 0, count: 0 };
    }

    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return {
      rating: total / ratings.length,
      count: ratings.length,
    };
  }
}
