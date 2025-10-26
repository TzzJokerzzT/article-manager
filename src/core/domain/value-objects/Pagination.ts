export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  categoryId?: string;
  subcategoryId?: string;
  search?: string;
  minRating?: number;
  tags?: string[];
}

export interface ArticleFilters extends FilterParams, PaginationParams {}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class Pagination {
  public readonly page: number;
  public readonly limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
    this.validate();
  }

  private validate(): void {
    if (this.page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (this.limit < 1 || this.limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
  }

  public static create(page: number, limit: number): Pagination {
    return new Pagination(page, limit);
  }

  public getOffset(): number {
    return (this.page - 1) * this.limit;
  }

  public next(): Pagination {
    return new Pagination(this.page + 1, this.limit);
  }

  public previous(): Pagination {
    if (this.page <= 1) {
      throw new Error('Cannot go to previous page from page 1');
    }
    return new Pagination(this.page - 1, this.limit);
  }
}
