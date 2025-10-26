export class ArticleId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('ArticleId cannot be empty');
    }
  }

  public static create(value: string): ArticleId {
    return new ArticleId(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ArticleId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
