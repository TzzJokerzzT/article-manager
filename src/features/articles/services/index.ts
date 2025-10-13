import { MockArticleRepository } from '@/infrastructure/repositories/MockArticleRepository';
import { MockRatingRepository } from '@/infrastructure/repositories/MockRatingRepository';
import { MockFavoriteRepository } from '@/infrastructure/repositories/MockFavoriteRepository';

export const articleRepository = new MockArticleRepository();
export const ratingRepository = new MockRatingRepository();
export const favoriteRepository = new MockFavoriteRepository();
