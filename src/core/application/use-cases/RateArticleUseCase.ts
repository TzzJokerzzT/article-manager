import type {
  ArticleRepository,
  RatingRepository,
} from '../ports/outbound/repositories';

export class RateArticleUseCase {
  private readonly articleRepository: ArticleRepository;
  private readonly ratingRepository: RatingRepository;

  constructor(
    articleRepository: ArticleRepository,
    ratingRepository: RatingRepository
  ) {
    this.articleRepository = articleRepository;
    this.ratingRepository = ratingRepository;
  }

  async execute(
    articleId: string,
    rating: number,
    userId?: string
  ): Promise<void> {
    if (!articleId || articleId.trim().length === 0) {
      throw new Error('Article ID is required');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const article = await this.articleRepository.findById(articleId);
    if (!article) {
      throw new Error(`Article with id ${articleId} not found`);
    }

    await this.ratingRepository.rateArticle(articleId, rating, userId);

    const { rating: newRating, count } =
      await this.ratingRepository.getArticleRating(articleId);
    await this.articleRepository.update(articleId, {
      rating: newRating,
      ratingCount: count,
    });
  }
}
