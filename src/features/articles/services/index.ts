import { MockArticleRepository } from '@/infrastructure/repositories/MockArticleRepository';
import { MockRatingRepository } from '@/infrastructure/repositories/MockRatingRepository';
import { MockFavoriteRepository } from '@/infrastructure/repositories/MockFavoriteRepository';

/** Singleton instance of article repository for data operations */
export const articleRepository = new MockArticleRepository();

/** Singleton instance of rating repository for article ratings */
export const ratingRepository = new MockRatingRepository();

/** Singleton instance of favorite repository for user favorites */
export const favoriteRepository = new MockFavoriteRepository();
