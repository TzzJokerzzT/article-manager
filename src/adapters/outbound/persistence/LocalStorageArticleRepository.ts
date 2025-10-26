import { Article } from '../../../core/domain';
import type { ArticleFilters, PaginatedResponse } from '../../../core/domain';
import type { ArticleRepository } from '../../../core/application/ports/outbound/repositories';
import { generateId } from '../../../shared/utils';
import { CATEGORIES, STORAGE_KEYS } from '../../../shared/constants';

const generateMockArticles = (): Article[] => {
  const articles: Article[] = [];

  const sampleTitles = [
    'Introduction to React Hooks',
    'Building Scalable APIs with Node.js',
    'Machine Learning Fundamentals',
    'Mobile App Development Best Practices',
    'The Future of Web Development',
    'Understanding TypeScript',
    'Database Design Patterns',
    'Cloud Computing Overview',
    'Cybersecurity Best Practices',
    'Artificial Intelligence Ethics',
  ];

  const sampleAuthors = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Wilson',
    'Alex Brown',
  ];

  for (let i = 0; i < 50; i++) {
    const categoryIndex = i % CATEGORIES.length;
    const category = CATEGORIES[categoryIndex];
    const subcategory =
      category.subcategories?.[i % (category.subcategories?.length || 1)];

    const articleData = {
      id: generateId(),
      title: sampleTitles[i % sampleTitles.length] + ` ${i + 1}`,
      content: `This is the full content for article ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      summary: `Summary for article ${i + 1}`,
      author: sampleAuthors[i % sampleAuthors.length],
      categoryId: category.id,
      subcategoryId: subcategory?.id,
      tags: ['tech', 'programming', 'development'].slice(0, (i % 3) + 1),
      rating: 3 + (i % 3),
      ratingCount: 10 + (i % 20),
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    };

    articles.push(
      new Article(
        articleData.id,
        articleData.title,
        articleData.content,
        articleData.summary,
        articleData.author,
        articleData.categoryId,
        articleData.tags,
        articleData.rating,
        articleData.ratingCount,
        articleData.createdAt,
        articleData.updatedAt,
        articleData.subcategoryId
      )
    );
  }

  return articles;
};

export class LocalStorageArticleRepository implements ArticleRepository {
  private articles: Article[] = [];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (stored) {
      const storedData = JSON.parse(stored);
      this.articles = storedData.map(
        (data: {
          id: string;
          title: string;
          content: string;
          summary: string;
          author: string;
          categoryId: string;
          tags: string[];
          rating: number;
          ratingCount: number;
          createdAt: string;
          updatedAt: string;
          subcategoryId?: string;
          isFavorite?: boolean;
        }) =>
          new Article(
            data.id,
            data.title,
            data.content,
            data.summary,
            data.author,
            data.categoryId,
            data.tags,
            data.rating,
            data.ratingCount,
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.subcategoryId,
            data.isFavorite
          )
      );
    } else {
      this.articles = generateMockArticles();
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    const serializedArticles = this.articles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
      summary: article.summary,
      author: article.author,
      categoryId: article.categoryId,
      tags: article.tags,
      rating: article.rating,
      ratingCount: article.ratingCount,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      subcategoryId: article.subcategoryId,
      isFavorite: article.isFavorite,
    }));
    localStorage.setItem(
      STORAGE_KEYS.ARTICLES,
      JSON.stringify(serializedArticles)
    );
  }

  async findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>> {
    let filteredArticles = [...this.articles];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.content.toLowerCase().includes(search) ||
          article.author.toLowerCase().includes(search)
      );
    }

    if (filters.categoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.categoryId === filters.categoryId
      );
    }

    if (filters.subcategoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.subcategoryId === filters.subcategoryId
      );
    }

    if (filters.minRating) {
      filteredArticles = filteredArticles.filter(
        (article) => article.rating >= filters.minRating!
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.tags!.some((tag: string) => article.tags.includes(tag))
      );
    }

    const total = filteredArticles.length;
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      data: paginatedArticles,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    };
  }

  async findById(id: string): Promise<Article | null> {
    const article = this.articles.find((a) => a.id === id);
    return article || null;
  }

  async create(articleData: {
    title: string;
    content: string;
    summary: string;
    author: string;
    categoryId: string;
    subcategoryId?: string;
    tags: string[];
    rating: number;
    ratingCount: number;
    isFavorite?: boolean;
  }): Promise<Article> {
    const article = new Article(
      generateId(),
      articleData.title,
      articleData.content,
      articleData.summary,
      articleData.author,
      articleData.categoryId,
      articleData.tags,
      0,
      0,
      new Date(),
      new Date(),
      articleData.subcategoryId,
      false
    );

    this.articles.unshift(article);
    this.saveToStorage();
    return article;
  }

  async update(
    id: string,
    updateData: {
      title?: string;
      content?: string;
      summary?: string;
      author?: string;
      categoryId?: string;
      subcategoryId?: string;
      tags?: string[];
      rating?: number;
      ratingCount?: number;
      isFavorite?: boolean;
    }
  ): Promise<Article> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    const currentArticle = this.articles[index];
    const updatedArticle = new Article(
      currentArticle.id,
      updateData.title ?? currentArticle.title,
      updateData.content ?? currentArticle.content,
      updateData.summary ?? currentArticle.summary,
      updateData.author ?? currentArticle.author,
      updateData.categoryId ?? currentArticle.categoryId,
      updateData.tags ?? currentArticle.tags,
      updateData.rating ?? currentArticle.rating,
      updateData.ratingCount ?? currentArticle.ratingCount,
      currentArticle.createdAt,
      new Date(),
      updateData.subcategoryId ?? currentArticle.subcategoryId,
      updateData.isFavorite ?? currentArticle.isFavorite
    );

    this.articles[index] = updatedArticle;
    this.saveToStorage();
    return updatedArticle;
  }

  async delete(id: string): Promise<void> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articles.splice(index, 1);
    this.saveToStorage();
  }
}
