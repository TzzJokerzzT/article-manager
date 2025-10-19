import type {
  Article,
  ArticleFilters,
  PaginatedResponse,
} from '@/domain/types';
import type { ArticleRepository } from '@/domain/repositories';
import { generateId } from '@/shared/utils';
import { CATEGORIES, STORAGE_KEYS } from '@/shared/constants';

/**
 * Generates mock articles for development and testing purposes
 * @returns Array of mock article objects with sample data
 */
const generateMockArticles = (): Article[] => {
  const articles: Article[] = [];

  /** Sample article titles for mock data generation */
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

  /** Sample author names for mock data generation */
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

    articles.push({
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
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return articles;
};

/**
 * Mock implementation of ArticleRepository using localStorage for persistence
 * Used for development and testing when no backend is available
 */
export class MockArticleRepository implements ArticleRepository {
  /** In-memory cache of articles */
  private articles: Article[] = [];

  /**
   * Initializes the repository with data from localStorage or generates mock data
   */
  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (stored) {
      this.articles = JSON.parse(stored);
    } else {
      this.articles = generateMockArticles();
      this.saveToStorage();
    }
  }

  /**
   * Persists current articles to localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(this.articles));
  }

  /**
   * Retrieves articles with filtering and pagination support
   * @param filters - Combined filter and pagination parameters
   * @returns Promise resolving to paginated article response
   */
  async findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>> {
    let filteredArticles = [...this.articles];

    // Apply search filter across title, content, and author
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.content.toLowerCase().includes(search) ||
          article.author.toLowerCase().includes(search)
      );
    }

    // Filter by category
    if (filters.categoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.categoryId === filters.categoryId
      );
    }

    // Filter by subcategory
    if (filters.subcategoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.subcategoryId === filters.subcategoryId
      );
    }

    // Filter by minimum rating
    if (filters.minRating) {
      filteredArticles = filteredArticles.filter(
        (article) => article.rating >= filters.minRating!
      );
    }

    // Filter by tags (articles must contain at least one of the specified tags)
    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.tags!.some((tag: string) => article.tags.includes(tag))
      );
    }

    // Apply pagination
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

  /**
   * Finds a single article by its unique identifier
   * @param id - Article ID to search for
   * @returns Promise resolving to the article or null if not found
   */
  async findById(id: string): Promise<Article | null> {
    const article = this.articles.find((a) => a.id === id);
    return article || null;
  }

  /**
   * Creates a new article with auto-generated ID and timestamps
   * @param articleData - Article data without system-generated fields
   * @returns Promise resolving to the newly created article
   */
  async create(
    articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article> {
    const now = new Date().toISOString();
    const article: Article = {
      ...articleData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    // Add to beginning of array for chronological order
    this.articles.unshift(article);
    this.saveToStorage();
    return article;
  }

  /**
   * Updates an existing article with new data
   * @param id - ID of the article to update
   * @param updateData - Partial article data to merge with existing article
   * @returns Promise resolving to the updated article
   * @throws Error if article with given ID is not found
   */
  async update(id: string, updateData: Partial<Article>): Promise<Article> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articles[index] = {
      ...this.articles[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    this.saveToStorage();
    return this.articles[index];
  }

  /**
   * Deletes an article by its ID
   * @param id - ID of the article to delete
   * @returns Promise that resolves when deletion is complete
   * @throws Error if article with given ID is not found
   */
  async delete(id: string): Promise<void> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articles.splice(index, 1);
    this.saveToStorage();
  }
}
