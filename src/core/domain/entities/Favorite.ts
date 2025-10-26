export class Favorite {
  public readonly articleId: string;
  public readonly userId?: string;
  public readonly createdAt: Date;

  constructor(articleId: string, createdAt: Date, userId?: string) {
    this.articleId = articleId;
    this.createdAt = createdAt;
    this.userId = userId;

    this.validateArticleId(articleId);
  }

  private validateArticleId(articleId: string): void {
    if (!articleId || articleId.trim().length === 0) {
      throw new Error('Article ID cannot be empty');
    }
  }

  public static create(props: {
    articleId: string;
    userId?: string;
  }): Favorite {
    return new Favorite(props.articleId, new Date(), props.userId);
  }
}
