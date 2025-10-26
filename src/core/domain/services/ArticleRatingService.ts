import { Article } from '../entities';

export class ArticleRatingService {
  public calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    return Math.round(average * 100) / 100;
  }

  public isHighRated(article: Article): boolean {
    return article.rating >= 4.0 && article.ratingCount >= 5;
  }

  public canBeRated(_article: Article, _userId?: string): boolean {
    return true;
  }

  public updateArticleRating(article: Article, newRating: number): Article {
    return article.addRating(newRating);
  }
}
