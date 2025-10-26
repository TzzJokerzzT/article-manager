export class Rating {
  public readonly articleId: string;
  public readonly userId?: string;
  public readonly rating: number;
  public readonly createdAt: Date;

  constructor(
    articleId: string,
    rating: number,
    createdAt: Date,
    userId?: string
  ) {
    this.articleId = articleId;
    this.rating = rating;
    this.createdAt = createdAt;
    this.userId = userId;

    this.validateRating(rating);
  }

  private validateRating(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    if (!Number.isInteger(rating)) {
      throw new Error('Rating must be an integer');
    }
  }

  public static create(props: {
    articleId: string;
    rating: number;
    userId?: string;
  }): Rating {
    return new Rating(props.articleId, props.rating, new Date(), props.userId);
  }
}
