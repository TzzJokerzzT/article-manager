export class Article {
  public readonly id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly summary: string;
  public readonly author: string;
  public readonly categoryId: string;
  public readonly tags: string[];
  public readonly rating: number;
  public readonly ratingCount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly subcategoryId?: string;
  public readonly isFavorite?: boolean;

  constructor(
    id: string,
    title: string,
    content: string,
    summary: string,
    author: string,
    categoryId: string,
    tags: string[],
    rating: number,
    ratingCount: number,
    createdAt: Date,
    updatedAt: Date,
    subcategoryId?: string,
    isFavorite?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.summary = summary;
    this.author = author;
    this.categoryId = categoryId;
    this.tags = tags;
    this.rating = rating;
    this.ratingCount = ratingCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.subcategoryId = subcategoryId;
    this.isFavorite = isFavorite;

    this.validateTitle(title);
    this.validateContent(content);
    this.validateRating(rating);
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Article title cannot be empty');
    }
    if (title.length > 200) {
      throw new Error('Article title cannot exceed 200 characters');
    }
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error('Article content cannot be empty');
    }
  }

  private validateRating(rating: number): void {
    if (rating < 0 || rating > 5) {
      throw new Error('Article rating must be between 0 and 5');
    }
  }

  public updateTitle(newTitle: string): Article {
    return new Article(
      this.id,
      newTitle,
      this.content,
      this.summary,
      this.author,
      this.categoryId,
      this.tags,
      this.rating,
      this.ratingCount,
      this.createdAt,
      new Date(),
      this.subcategoryId,
      this.isFavorite
    );
  }

  public updateContent(newContent: string): Article {
    return new Article(
      this.id,
      this.title,
      newContent,
      this.summary,
      this.author,
      this.categoryId,
      this.tags,
      this.rating,
      this.ratingCount,
      this.createdAt,
      new Date(),
      this.subcategoryId,
      this.isFavorite
    );
  }

  public addRating(newRating: number): Article {
    const totalRating = this.rating * this.ratingCount + newRating;
    const newRatingCount = this.ratingCount + 1;
    const newAverageRating = totalRating / newRatingCount;

    return new Article(
      this.id,
      this.title,
      this.content,
      this.summary,
      this.author,
      this.categoryId,
      this.tags,
      Math.round(newAverageRating * 100) / 100,
      newRatingCount,
      this.createdAt,
      new Date(),
      this.subcategoryId,
      this.isFavorite
    );
  }

  public markAsFavorite(): Article {
    return new Article(
      this.id,
      this.title,
      this.content,
      this.summary,
      this.author,
      this.categoryId,
      this.tags,
      this.rating,
      this.ratingCount,
      this.createdAt,
      this.updatedAt,
      this.subcategoryId,
      true
    );
  }

  public unmarkAsFavorite(): Article {
    return new Article(
      this.id,
      this.title,
      this.content,
      this.summary,
      this.author,
      this.categoryId,
      this.tags,
      this.rating,
      this.ratingCount,
      this.createdAt,
      this.updatedAt,
      this.subcategoryId,
      false
    );
  }

  public static create(props: {
    id: string;
    title: string;
    content: string;
    summary: string;
    author: string;
    categoryId: string;
    tags: string[];
    subcategoryId?: string;
  }): Article {
    return new Article(
      props.id,
      props.title,
      props.content,
      props.summary,
      props.author,
      props.categoryId,
      props.tags,
      0,
      0,
      new Date(),
      new Date(),
      props.subcategoryId,
      false
    );
  }
}
